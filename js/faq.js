// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqContainer = document.querySelector('.faq-container');
    const faqItems = document.querySelectorAll('.faq-item');
    const faqCategories = document.querySelectorAll('.faq-category');
    let activeItem = null;
    
    // Close all FAQ items by default
    faqItems.forEach(item => {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });

    
    // Function to show all categories and items
    function showAllCategories() {
        faqCategories.forEach(cat => {
            // Reset all category styles
            cat.style.display = 'block';
            cat.style.opacity = '1';
            cat.style.height = '';
            cat.style.overflow = '';
            cat.style.transition = '';
            
            // Show all category titles
            const h3 = cat.querySelector('h3');
            if (h3) {
                h3.style.display = 'block';
            }
            
            // Reset all items in this category
            const items = cat.querySelectorAll('.faq-item');
            items.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                item.style.pointerEvents = 'auto';
                item.style.display = 'block';
                
                // Close any open answers except the first one if it's the initial state
                if (!item.classList.contains('active') || (activeItem && item !== activeItem)) {
                    const answer = item.querySelector('.faq-answer');
                    if (answer) {
                        answer.style.maxHeight = '0';
                    }
                    item.classList.remove('active');
                } else if (item === activeItem) {
                    // Keep the active item's answer open
                    const answer = item.querySelector('.faq-answer');
                    if (answer) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                }
            });
        });
    }
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const category = item.closest('.faq-category');
        const categoryTitle = category ? category.querySelector('h3') : null;
        
        // Add click event
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // If clicking the active item, close it and show all
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
                activeItem = null;
                showAllCategories();
            } else {
                // Hide all categories and items except the current one
                faqCategories.forEach(cat => {
                    if (cat !== category) {
                        cat.style.opacity = '0';
                        cat.style.height = '0';
                        cat.style.overflow = 'hidden';
                        cat.style.transition = 'opacity 0.3s ease, height 0.3s ease';
                    } else {
                        // For the current category, hide other items
                        const itemsInCategory = cat.querySelectorAll('.faq-item');
                        itemsInCategory.forEach(faqItem => {
                            if (faqItem !== item) {
                                faqItem.style.opacity = '0';
                                faqItem.style.transform = 'translateY(-10px)';
                                faqItem.style.pointerEvents = 'none';
                                faqItem.classList.remove('active');
                                faqItem.querySelector('.faq-answer').style.maxHeight = '0';
                            }
                        });
                    }
                });
                
                // Show current category and item
                if (category) {
                    category.style.opacity = '1';
                    category.style.height = 'auto';
                    category.style.overflow = 'visible';
                    
                    // Show category title
                    if (categoryTitle) {
                        categoryTitle.style.display = 'block';
                    }
                }
                
                // Show current item
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                item.style.pointerEvents = 'auto';
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                activeItem = item;
                
                // Scroll to the active item if it's not fully visible
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        // Add keyboard navigation
        question.setAttribute('tabindex', '0');
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
