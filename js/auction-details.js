document.addEventListener('DOMContentLoaded', function() {
    // Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            // Show the corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Thumbnail gallery functionality
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // For a real implementation, you would update the main image src here
            // For this demo, we'll just apply a small animation
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 200);
        });
    });
    
    // Bid button effect
    const bidButton = document.querySelector('.btn-bid');
    if (bidButton) {
        bidButton.addEventListener('click', function(e) {
            const termsCheckbox = document.getElementById('agree-terms');
            if (!termsCheckbox.checked) {
                e.preventDefault();
                
                // Show error notification
                const notification = document.createElement('div');
                notification.classList.add('bid-notification');
                notification.style.backgroundColor = 'rgba(231, 76, 60, 0.9)';
                notification.innerHTML = `
                    <div class="bid-notification-content">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>يجب الموافقة على شروط الاستخدام وسياسة الخصوصية للمتابعة</p>
                    </div>
                `;
                
                document.body.appendChild(notification);
                
                // Remove notification after 3 seconds
                setTimeout(() => {
                    notification.remove();
                }, 3000);
                
                return;
            }
            
            e.preventDefault();
            
            // Add pulse animation
            this.classList.add('btn-pulse');
            
            // Show a simple confirmation (in a real app, you'd validate and submit the bid)
            const bidInput = document.querySelector('.bid-input');
            const bidAmount = bidInput.value;
            
            // Create a success notification
            const notification = document.createElement('div');
            notification.classList.add('bid-notification');
            notification.innerHTML = `
                <div class="bid-notification-content">
                    <i class="fas fa-check-circle"></i>
                    <p>تم تقديم مزايدتك بنجاح بمبلغ ${bidAmount} ريال!</p>
                </div>
            `;
            
            // Add notification styles
            const notificationStyle = document.createElement('style');
            notificationStyle.textContent = `
                .bid-notification {
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
                }
                
                .bid-notification-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .bid-notification i {
                    font-size: 20px;
                }
                
                .bid-notification p {
                    margin: 0;
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
            document.body.appendChild(notification);
            
            // Remove notification after 5 seconds
            setTimeout(() => {
                notification.remove();
                notificationStyle.remove();
                this.classList.remove('btn-pulse');
            }, 5000);
            
            // Update the current bid to simulate a successful bid
            const currentBidValue = document.querySelector('.price-item.current .value');
            currentBidValue.textContent = bidAmount + ' ريال';
            
            // Add the bid to the history (in a real app, this would come from the server)
            const bidHistory = document.querySelector('.bid-history');
            if (bidHistory) {
                const newBid = document.createElement('div');
                newBid.classList.add('bid-history-item');
                newBid.innerHTML = `
                    <div class="bidder-info">
                        <div class="bidder-avatar">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" fill="#e0e0e0"/>
                                <circle cx="20" cy="15" r="6" fill="#bdbdbd"/>
                                <path d="M20 30 C 14 30 8 35 8 42 L 32 42 C 32 35 26 30 20 30 Z" fill="#bdbdbd"/>
                            </svg>
                        </div>
                        <div class="bidder-details">
                            <div class="bidder-name">أنت</div>
                            <div class="bid-time">الآن</div>
                        </div>
                    </div>
                    <div class="bid-amount">${bidAmount} ريال</div>
                `;
                
                bidHistory.insertBefore(newBid, bidHistory.firstChild);
                
                // Highlight the new bid
                newBid.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
                setTimeout(() => {
                    newBid.style.transition = 'background-color 1s ease';
                    newBid.style.backgroundColor = 'transparent';
                }, 100);
            }
        });
    }
    
    // Action buttons hover effects
    const actionButtons = document.querySelectorAll('.btn-action');
    actionButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1)';
        });
    });
    
    // Countdown Timer for Auction
    function updateAuctionCountdown() {
        const countdownElement = document.getElementById('auction-countdown');
        if (!countdownElement) return;
        
        const targetDate = new Date(countdownElement.getAttribute('data-time'));
        const now = new Date();
        const timeDifference = targetDate - now;
        
        if (timeDifference <= 0) {
            countdownElement.textContent = "انتهى المزاد";
            
            // Update status
            const statusValue = document.querySelector('.status-value');
            if (statusValue) {
                statusValue.textContent = "منتهي";
                statusValue.classList.remove('active');
                statusValue.style.backgroundColor = "rgba(231, 76, 60, 0.15)";
                statusValue.style.color = "#e74c3c";
            }
            
            // Disable bid button
            const bidButton = document.querySelector('.btn-bid');
            if (bidButton) {
                bidButton.disabled = true;
                bidButton.style.backgroundColor = "#ccc";
                bidButton.style.cursor = "not-allowed";
                bidButton.textContent = "انتهى المزاد";
            }
            
            return;
        }
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        // Format display
        if (days > 0) {
            countdownElement.textContent = `${days} أيام`;
        } else {
            countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    // Initialize and update auction countdown
    updateAuctionCountdown();
    setInterval(updateAuctionCountdown, 1000);
    
    // Initialize and update related auction countdowns
    const relatedCountdowns = document.querySelectorAll('.related-auctions .countdown');
    
    function updateRelatedCountdowns() {
        relatedCountdowns.forEach(element => {
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
    
    updateRelatedCountdowns();
    setInterval(updateRelatedCountdowns, 1000);
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('header a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only process internal links
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add reveal animations for content sections
    const revealElements = document.querySelectorAll('.auction-details-wrapper, .auction-tabs, .related-auctions .section-header, .related-auctions .auction-card');
    
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
});