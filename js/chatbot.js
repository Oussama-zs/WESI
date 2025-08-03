document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('chatbot-toggle');
    const closeBtn = document.getElementById('close-chat');
    const container = document.getElementById('chatbot-container');
    const messagesDiv = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    const API_KEY = "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";

    // Add message to chat
    function addMessage(sender, message, isHTML = false) {
        const messageElement = document.createElement('div');
        messageElement.style.margin = '5px';
        messageElement.style.padding = '8px';
        messageElement.style.borderRadius = '5px';
        messageElement.style.backgroundColor = sender === 'user' ? '#00bcd4' : '#1e1e1e';
        messageElement.style.color = 'white';
        messageElement.style.maxWidth = '80%';
        messageElement.style.marginLeft = sender === 'user' ? 'auto' : '0';
        if (isHTML) {
            messageElement.innerHTML = message;
        } else {
            messageElement.textContent = message;
        }
        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    // Show loading indicator
    function showLoadingIndicator() {
        const loadingElement = document.createElement('div');
        loadingElement.id = 'loading-indicator';
        loadingElement.style.margin = '5px';
        loadingElement.style.padding = '8px';
        loadingElement.style.borderRadius = '5px';
        loadingElement.style.backgroundColor = '#1e1e1e';
        loadingElement.style.color = 'white';
        loadingElement.style.maxWidth = '80%';
        loadingElement.style.marginLeft = '0';
        loadingElement.style.display = 'flex';
        loadingElement.style.alignItems = 'center';
        loadingElement.innerHTML = `
            <span style="color: #00bcd4; font-size: 20px; font-weight: bold; margin-right: 10px;">WESI</span>
            <span>Working...</span>
        `;
        messagesDiv.appendChild(loadingElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    // Remove loading indicator
    function removeLoadingIndicator() {
        const loadingElement = document.getElementById('loading-indicator');
        if (loadingElement) {
            loadingElement.remove();
        }
    }

    // Fetch response from OpenRouter API
    async function fetchChatbotResponse(userMessage) {
        showLoadingIndicator();
        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": "deepseek/deepseek-chat-v3-0324:free",
                    "messages": [
                        {
                            "role": "user",
                            "content": userMessage
                        }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error("Failed to fetch response.");
            }

            const data = await response.json();
            const botMessage = data.choices[0]?.message?.content || "Sorry, I couldn't process your request.";
            const isGeneralQuestion = !botMessage.includes("WESI"); // Example condition to detect general questions

            // Format the response for better presentation
            const formattedMessage = botMessage.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

            // Scale chatbot window for general questions
            if (isGeneralQuestion) {
                container.classList.add('scaled');
                setTimeout(() => {
                    container.classList.remove('scaled');
                }, 3000); // Reset after 3 seconds
            }

            addMessage('bot', formattedMessage, true);
        } catch (error) {
            console.error(error);
            addMessage('bot', "An error occurred while connecting to the chatbot service.");
        } finally {
            removeLoadingIndicator();
        }
    }

    // Handle user input
    function handleUserInput() {
        const input = userInput.value.trim();
        if (!input) return;

        addMessage('user', input);
        userInput.value = '';

        // Fetch response from OpenRouter API
        fetchChatbotResponse(input);
    }

    // Toggle chatbot visibility
    toggleBtn.addEventListener('click', function () {
        container.style.display = container.style.display === 'block' ? 'none' : 'block';
    });

    // Close chatbot
    closeBtn.addEventListener('click', function () {
        container.style.display = 'none';
    });

    // Send button and Enter key functionality
    sendBtn.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') handleUserInput();
    });

    // Initial greeting
    setTimeout(() => {
        addMessage('bot', "Hi! I'm WESI Assistant. Ask me anything!");
    }, 1000);

    // Forum post functionality
    function postMessage() {
        const postContent = document.getElementById("postContent").value.trim();
        if (postContent !== "") {
            const forumPosts = document.getElementById("forumPosts");
            const postId = 'post-' + Date.now();
            const currentDate = new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            // Remove empty state if it exists
            const emptyState = forumPosts.querySelector('.empty-state');
            if (emptyState) {
                emptyState.remove();
            }
            
            const newPost = document.createElement("div");
            newPost.className = "post";
            newPost.id = postId;
            newPost.innerHTML = `
                <div class="post-content">${escapeHtml(postContent).replace(/\n/g, '<br>')}</div>
                <div class="post-meta">
                    <span class="post-time">${currentDate}</span>
                    <div class="post-actions">
                        <button class="forum-btn btn-reply">
                            <i class="fa-regular fa-comment"></i> Reply
                        </button>
                    </div>
                </div>
                <div class="replies"></div>
            `;
            
            // Insert new post at the top
            forumPosts.insertBefore(newPost, forumPosts.firstChild);
            
            // Add event listener to the reply button
            newPost.querySelector('.btn-reply').addEventListener('click', showReplyForm);
            
            // Clear and focus the textarea
            document.getElementById("postContent").value = "";
            document.getElementById("postContent").focus();
            
            // Save to localStorage
            saveForumState();
        }
    }

    // Show reply form
    function showReplyForm(event) {
        const post = event.target.closest('.post');
        const replyForm = post.querySelector('.reply-form');
        
        // Toggle reply form visibility
        if (replyForm) {
            replyForm.remove();
            return;
        }
        
        // Create new reply form
        const newForm = document.createElement('div');
        newForm.className = 'reply-form';
        newForm.innerHTML = `
            <textarea class="reply-input" placeholder="Write your reply..." rows="3"></textarea>
            <div class="forum-actions">
                <button class="forum-btn btn-primary reply-submit">Post Reply</button>
                <button class="forum-btn btn-secondary reply-cancel">Cancel</button>
            </div>
        `;
        
        // Insert the form before the replies container
        const repliesContainer = post.querySelector('.replies');
        repliesContainer.parentNode.insertBefore(newForm, repliesContainer);
        
        // Focus the textarea
        newForm.querySelector('.reply-input').focus();
        
        // Add event listeners
        newForm.querySelector('.reply-submit').addEventListener('click', () => submitReply(post, newForm));
        newForm.querySelector('.reply-cancel').addEventListener('click', () => newForm.remove());
        
        // Submit on Enter (Shift+Enter for new line)
        newForm.querySelector('.reply-input').addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitReply(post, newForm);
            }
        });
    }
    
    // Submit reply
    function submitReply(post, form) {
        const replyInput = form.querySelector('.reply-input');
        const replyContent = replyInput.value.trim();
        
        if (replyContent) {
            const repliesContainer = post.querySelector('.replies');
            const currentDate = new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            const newReply = document.createElement('div');
            newReply.className = 'reply';
            newReply.innerHTML = `
                <div class="reply-content">${escapeHtml(replyContent).replace(/\n/g, '<br>')}</div>
                <div class="reply-meta">
                    <span class="reply-time">${currentDate}</span>
                </div>
            `;
            
            repliesContainer.appendChild(newReply);
            form.remove();
            saveForumState();
        }
    }
    
    // Save forum state to localStorage
    function saveForumState() {
        const forumPosts = document.getElementById("forumPosts");
        // Don't save the empty state message
        const postsToSave = Array.from(forumPosts.children)
            .filter(el => !el.classList.contains('empty-state'));
            
        if (postsToSave.length === 0) {
            // If no posts, add empty state
            forumPosts.innerHTML = `
                <div class="empty-state">
                    <p>No posts yet. Be the first to start a discussion!</p>
                </div>
            `;
            localStorage.removeItem("forumData");
        } else {
            // Save posts HTML
            const tempDiv = document.createElement('div');
            tempDiv.append(...postsToSave);
            localStorage.setItem("forumData", tempDiv.innerHTML);
        }
    }
    
    // Load saved forum posts on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Add event listeners
        document.getElementById("post").addEventListener("click", postMessage);
        document.getElementById("clearPosts").addEventListener("click", clearAllPosts);
        
        // Post on Enter (Shift+Enter for new line)
        document.getElementById("postContent").addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                postMessage();
            }
        });
        
        // Load saved posts
        const savedPosts = localStorage.getItem("forumData");
        if (savedPosts) {
            const forumPosts = document.getElementById("forumPosts");
            forumPosts.innerHTML = savedPosts;
            
            // Reattach event listeners to all reply buttons
            document.querySelectorAll(".btn-reply").forEach(btn => {
                btn.addEventListener("click", showReplyForm);
            });
        }

        // FAQ Accordion Functionality
        const faqItems = document.querySelectorAll('.faq-item');
        
        // Close all FAQ items except the first one by default
        faqItems.forEach((item, index) => {
            if (index === 0) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
            
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                // Toggle the current item
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0';
                });
                
                // If the clicked item wasn't active, open it
                if (!isActive) {
                    item.classList.add('active');
                    const answer = item.querySelector('.faq-answer');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
            
            // Handle keyboard navigation
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        });
        
        // Smooth scroll to FAQ section when clicking on FAQ links
        document.querySelectorAll('a[href="#FAQs"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelector('#FAQs').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    });

    function clearAllPosts() {
        if (confirm('Are you sure you want to clear all posts? This cannot be undone.')) {
            localStorage.removeItem('forumPosts');
            document.getElementById('forum-posts').innerHTML = '';
        }
    }

    // Helper function to escape HTML
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});