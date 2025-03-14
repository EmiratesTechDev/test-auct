document.addEventListener('DOMContentLoaded', function() {
    // View options toggle
    const gridViewBtn = document.querySelector('.grid-view');
    const listViewBtn = document.querySelector('.list-view');
    const auctionsGrid = document.querySelector('.auctions-grid');
    
    if (gridViewBtn && listViewBtn && auctionsGrid) {
        gridViewBtn.addEventListener('click', function() {
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            auctionsGrid.classList.remove('list-view-active');
            
            // Add animation for smooth transition
            auctionsGrid.style.opacity = '0';
            setTimeout(() => {
                auctionsGrid.style.opacity = '1';
            }, 50);
        });
        
        listViewBtn.addEventListener('click', function() {
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            auctionsGrid.classList.add('list-view-active');
            
            // Add animation for smooth transition
            auctionsGrid.style.opacity = '0';
            setTimeout(() => {
                auctionsGrid.style.opacity = '1';
            }, 50);
            
            // Add list view styles if not already added
            if (!document.getElementById('list-view-styles')) {
                const listViewStyles = document.createElement('style');
                listViewStyles.id = 'list-view-styles';
                listViewStyles.textContent = `
                    .auctions-grid.list-view-active {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                    }
                    
                    .auctions-grid.list-view-active .auction-card {
                        display: flex;
                        flex-direction: row;
                        height: auto;
                    }
                    
                    .auctions-grid.list-view-active .auction-image {
                        flex: 0 0 200px;
                        height: 150px;
                    }
                    
                    .auctions-grid.list-view-active .auction-info {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }
                    
                    .auctions-grid.list-view-active .auction-meta {
                        flex-direction: row;
                        justify-content: space-between;
                    }
                    
                    @media (max-width: 768px) {
                        .auctions-grid.list-view-active .auction-card {
                            flex-direction: column;
                        }
                        
                        .auctions-grid.list-view-active .auction-image {
                            flex: auto;
                            width: 100%;
                        }
                    }
                `;
                document.head.appendChild(listViewStyles);
            }
        });
    }
    
    // Filter reset button
    const resetBtn = document.querySelector('.reset-btn');
    const filterSelects = document.querySelectorAll('.filter-select');
    const filterInputs = document.querySelectorAll('.filter-input');
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            filterSelects.forEach(select => {
                select.selectedIndex = 0;
            });
            
            filterInputs.forEach(input => {
                input.value = '';
            });
        });
    }
    
    // Update countdowns for auctions
    function updateCountdowns() {
        const countdownElements = document.querySelectorAll('.countdown');
        
        countdownElements.forEach(element => {
            const targetDate = new Date(element.getAttribute('data-time'));
            const now = new Date();
            const timeDifference = targetDate - now;
            
            if (timeDifference <= 0) {
                element.textContent = "انتهى المزاد";
                return;
            }
            
            // Calculate days, hours, minutes, seconds
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            
            // Format display
            if (days > 0) {
                element.textContent = `${days} أيام`;
            } else {
                element.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        });
    }
    
    // Initialize and update countdowns
    updateCountdowns();
    setInterval(updateCountdowns, 1000);
    
    // Pagination click handlers
    const pageLinks = document.querySelectorAll('.pagination a');
    
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all page numbers
            document.querySelectorAll('.page-number').forEach(page => {
                page.classList.remove('active');
            });
            
            // If it's a page number, add active class
            if (this.classList.contains('page-number')) {
                this.classList.add('active');
            }
            
            // Scroll to top of results
            const resultsSection = document.querySelector('.auction-results');
            if (resultsSection) {
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // In a real application, you would load new results here
            // For this demo, we'll just simulate a loading state
            const auctionsGrid = document.querySelector('.auctions-grid');
            if (auctionsGrid) {
                auctionsGrid.style.opacity = '0.5';
                auctionsGrid.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    auctionsGrid.style.opacity = '1';
                    auctionsGrid.style.pointerEvents = 'auto';
                }, 500);
            }
        });
    });
    
    // Notification button functionality (for upcoming auctions)
    const notificationBtns = document.querySelectorAll('.notification-btn');
    
    notificationBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle notification state
            if (this.classList.contains('active-notification')) {
                this.classList.remove('active-notification');
                this.innerHTML = '<i class="far fa-bell"></i> تنبيهي عند البدء';
                this.classList.remove('btn-primary');
                this.classList.add('btn-outline');
                
                // Show notification cancelled message
                showNotification('تم إلغاء التنبيه بنجاح', 'info');
            } else {
                this.classList.add('active-notification');
                this.innerHTML = '<i class="fas fa-bell"></i> تم تفعيل التنبيه';
                this.classList.remove('btn-outline');
                this.classList.add('btn-primary');
                
                // Show notification set message
                showNotification('سيتم تنبيهك عند بدء المزاد', 'success');
            }
        });
    });
    
    // Function to show notifications
    function showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `auction-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="${type === 'success' ? 'fas fa-check-circle' : 'fas fa-info-circle'}"></i>
                <p>${message}</p>
            </div>
        `;
        
        // Add notification styles
        const notificationStyle = document.createElement('style');
        notificationStyle.textContent = `
            .auction-notification {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(46, 204, 113, 0.9);
                color: white;
                padding: 12px 20px;
                border-radius: 6px;
                z-index: 9999;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                animation: slideDown 0.5s ease, fadeOut 0.5s ease 4s forwards;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .auction-notification.info {
                background-color: rgba(52, 152, 219, 0.9);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .auction-notification i {
                font-size: 18px;
            }
            
            .auction-notification p {
                margin: 0;
                font-size: 13px;
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
            
            @keyframes fadeOut {
                to {
                    opacity: 0;
                    transform: translate(-50%, -20px);
                }
            }
        `;
        
        if (!document.getElementById('notification-styles')) {
            notificationStyle.id = 'notification-styles';
            document.head.appendChild(notificationStyle);
        }
        
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    // Add reveal animations for content sections
    const revealElements = document.querySelectorAll('.auction-card');
    
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