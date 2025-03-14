document.addEventListener('DOMContentLoaded', function() {
    // Topic chips filter
    const topicChips = document.querySelectorAll('.topic-chip');
    
    topicChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // Remove active class from all chips
            topicChips.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked chip
            this.classList.add('active');
            
            // In a real application, you would filter content based on selected topic
            // For this demo, we'll just add a simple animation
            const guideMainContent = document.querySelector('.guide-main-content');
            if (guideMainContent) {
                guideMainContent.style.opacity = '0.5';
                
                setTimeout(() => {
                    guideMainContent.style.opacity = '1';
                }, 300);
            }
        });
    });
    
    // Sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    const guideSections = document.querySelectorAll('.guide-section');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update active state in sidebar
                sidebarLinks.forEach(l => {
                    l.parentElement.classList.remove('active');
                });
                this.parentElement.classList.add('active');
            }
        });
    });
    
    // Update active sidebar link on scroll
    function updateActiveSidebarLink() {
        let currentSectionId = '';
        
        guideSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY + 120;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.id;
            }
        });
        
        if (currentSectionId) {
            sidebarLinks.forEach(link => {
                link.parentElement.classList.remove('active');
                
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.parentElement.classList.add('active');
                }
            });
        }
    }
    
    window.addEventListener('scroll', updateActiveSidebarLink);
    updateActiveSidebarLink();
    
    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle current item
            item.classList.toggle('active');
            
            // Close other items (accordion behavior)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
    
    // Search functionality
    const searchForm = document.querySelector('.search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchInput = this.querySelector('.search-input');
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            if (searchTerm === '') return;
            
            // Highlight search terms in content
            highlightSearchTerm(searchTerm);
            
            // Show search results notification
            showSearchNotification(searchTerm);
            
            // Scroll to first result
            scrollToFirstResult();
        });
    }
    
    function highlightSearchTerm(term) {
        // Remove existing highlights
        document.querySelectorAll('.search-highlight').forEach(el => {
            el.outerHTML = el.innerHTML;
        });
        
        // Get all text nodes in the guide content
        const guideContent = document.querySelector('.guide-main-content');
        if (!guideContent) return;
        
        const textNodes = [];
        const walker = document.createTreeWalker(
            guideContent,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        let node;
        while (node = walker.nextNode()) {
            if (node.nodeValue.trim() !== '' && 
                node.parentNode.nodeName !== 'SCRIPT' && 
                node.parentNode.nodeName !== 'STYLE') {
                textNodes.push(node);
            }
        }
        
        // Highlight term in text nodes
        let resultsCount = 0;
        
        textNodes.forEach(textNode => {
            const text = textNode.nodeValue;
            const lowerText = text.toLowerCase();
            
            if (lowerText.includes(term)) {
                const parts = text.split(new RegExp(`(${term})`, 'gi'));
                const fragment = document.createDocumentFragment();
                
                parts.forEach(part => {
                    if (part.toLowerCase() === term) {
                        const span = document.createElement('span');
                        span.className = 'search-highlight';
                        span.textContent = part;
                        fragment.appendChild(span);
                        resultsCount++;
                    } else {
                        fragment.appendChild(document.createTextNode(part));
                    }
                });
                
                textNode.parentNode.replaceChild(fragment, textNode);
            }
        });
        
        // Add highlight styles
        if (!document.getElementById('highlight-styles')) {
            const highlightStyle = document.createElement('style');
            highlightStyle.id = 'highlight-styles';
            highlightStyle.textContent = `
                .search-highlight {
                    background-color: rgba(241, 196, 15, 0.3);
                    padding: 0 2px;
                    border-radius: 2px;
                    animation: highlight-pulse 1.5s infinite;
                }
                
                @keyframes highlight-pulse {
                    0% {
                        background-color: rgba(241, 196, 15, 0.3);
                    }
                    50% {
                        background-color: rgba(241, 196, 15, 0.6);
                    }
                    100% {
                        background-color: rgba(241, 196, 15, 0.3);
                    }
                }
            `;
            document.head.appendChild(highlightStyle);
        }
        
        return resultsCount;
    }
    
    function showSearchNotification(term) {
        // Count highlights
        const highlights = document.querySelectorAll('.search-highlight');
        const count = highlights.length;
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'search-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-search"></i>
                <p>تم العثور على <strong>${count}</strong> نتيجة لـ "<strong>${term}</strong>"</p>
                <button class="clear-search-btn"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        // Add notification styles
        const notificationStyle = document.createElement('style');
        notificationStyle.textContent = `
            .search-notification {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(52, 152, 219, 0.9);
                color: white;
                padding: 12px 20px;
                border-radius: 6px;
                z-index: 9999;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                animation: slideDown 0.5s ease;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .search-notification i {
                font-size: 18px;
            }
            
            .search-notification p {
                margin: 0;
                font-size: 13px;
            }
            
            .clear-search-btn {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background-color 0.3s ease;
            }
            
            .clear-search-btn:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
            
            @keyframes slideDown {
                from {
                    transform: translate(-50%, -20px);
                    opacity: 0;
                }
                to {
                    transform: translate(-50%, 0);
                    opacity: 1;
                }
            }
        `;
        
        if (!document.getElementById('notification-styles')) {
            notificationStyle.id = 'notification-styles';
            document.head.appendChild(notificationStyle);
        }
        
        // Remove existing notification if any
        const existingNotification = document.querySelector('.search-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        document.body.appendChild(notification);
        
        // Clear search button functionality
        const clearBtn = notification.querySelector('.clear-search-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', function() {
                // Remove highlights
                document.querySelectorAll('.search-highlight').forEach(el => {
                    el.outerHTML = el.innerHTML;
                });
                
                // Remove notification
                notification.remove();
                
                // Clear search input
                const searchInput = document.querySelector('.search-input');
                if (searchInput) {
                    searchInput.value = '';
                    searchInput.focus();
                }
            });
        }
    }
    
    function scrollToFirstResult() {
        const firstResult = document.querySelector('.search-highlight');
        if (firstResult) {
            window.scrollTo({
                top: firstResult.getBoundingClientRect().top + window.pageYOffset - 120,
                behavior: 'smooth'
            });
        }
    }
    
    // Add reveal animations for content sections
    const revealElements = document.querySelectorAll('.process-step, .guide-step, .faq-item, .help-cta');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach((el, index) => {
        el.classList.add('reveal-element');
        el.style.transitionDelay = `${index * 0.05}s`;
        revealObserver.observe(el);
    });
    
    // Add reveal animation styles
    if (!document.getElementById('reveal-styles')) {
        const revealStyle = document.createElement('style');
        revealStyle.id = 'reveal-styles';
        revealStyle.textContent = `
            .reveal-element {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1), 
                            transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
            }
            
            .revealed {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(revealStyle);
    }
});
