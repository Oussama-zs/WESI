// Forum Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize forum functionality
    const forumThreads = document.querySelectorAll('.forum-thread');
    const replyForms = document.querySelectorAll('.reply-form');
    
    // Handle thread clicks
    forumThreads.forEach(thread => {
        thread.addEventListener('click', function(e) {
            // Don't trigger if clicking on links or buttons inside the thread
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
            
            // Toggle thread expansion
            this.classList.toggle('expanded');
            const content = this.querySelector('.thread-content');
            if (content) {
                content.style.display = this.classList.contains('expanded') ? 'block' : 'none';
            }
        });
    });
    
    // Handle reply form submission
    replyForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const textarea = this.querySelector('textarea');
            const replyText = textarea.value.trim();
            
            if (replyText) {
                // Here you would typically send the reply to your backend
                console.log('Posting reply:', replyText);
                // postReply(threadId, replyText);
                
                // For demo purposes, just clear the form
                textarea.value = '';
            }
        });
    });
    
    // Initialize any rich text editors if present
    initializeEditors();
});

// Function to initialize rich text editors
function initializeEditors() {
    // Check if any rich text editors need to be initialized
    const editors = document.querySelectorAll('.rich-text-editor');
    if (editors.length > 0) {
        console.log('Initializing rich text editors');
        // You would typically initialize a rich text editor library here
        // For example: new SimpleMDE({ element: editor });
    }
}

// Function to post a new thread
function createNewThread(title, content, category) {
    // Implementation would depend on your backend
    console.log('Creating new thread:', { title, content, category });
    // fetch('/api/threads', {
    //     method: 'POST',
    //     body: JSON.stringify({ title, content, category }),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    // .then(response => response.json())
    // .then(data => {
    //     // Handle successful thread creation
    //     window.location.reload();
    // })
    // .catch(error => console.error('Error creating thread:', error));
}
