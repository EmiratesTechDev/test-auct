document.addEventListener('DOMContentLoaded', function() {
    // Profile tabs functionality
    const profileTabButtons = document.querySelectorAll('.profile-tab-btn');
    const profileTabPanes = document.querySelectorAll('.profile-tab-pane');
    
    profileTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            profileTabButtons.forEach(btn => btn.classList.remove('active'));
            profileTabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            // Show the corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Add hover effects for auction cards
    const auctionCards = document.querySelectorAll('.auction-card');
    auctionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = 'var(--hover-shadow)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--card-shadow)';
        });
    });
    
    // Update countdown timer for auctions
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
    
    // Initialize and update auction countdowns
    updateCountdowns();
    setInterval(updateCountdowns, 1000);
    
    // Form validation for profile settings
    const settingsForm = document.getElementById('profile-settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-notification');
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> تم حفظ التغييرات بنجاح';
            
            // Add notification styles
            const notificationStyle = document.createElement('style');
            notificationStyle.textContent = `
                .success-notification {
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: rgba(46, 204, 113, 0.9);
                    color: white;
                    padding: 15px 25px;
                    border-radius: 6px;
                    z-index: 9999;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    animation: slideDown 0.5s ease, fadeOut 0.5s ease 4s forwards;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .success-notification i {
                    font-size: 20px;
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
            
            document.head.appendChild(notificationStyle);
            document.body.appendChild(successMessage);
            
            // Remove notification after 5 seconds
            setTimeout(() => {
                successMessage.remove();
                notificationStyle.remove();
            }, 5000);
        });
    }
    
    // Toggle notification switches
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            // In a real application, you would update user preferences on the server
            console.log('Notification preference changed:', this.id, this.checked);
        });
    });
    
    // Add reveal animations for content sections
    const revealElements = document.querySelectorAll('.profile-header, .profile-tabs, .account-balance, .my-auctions .auction-card');
    
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
    
    revealElements.forEach(el => {
        el.classList.add('reveal-element');
        revealObserver.observe(el);
    });
    
    // Add reveal animation styles
    const revealStyle = document.createElement('style');
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
    
    // Handle logout button
    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real application, you would perform logout actions
            window.location.href = 'index.html';
        });
    }
});