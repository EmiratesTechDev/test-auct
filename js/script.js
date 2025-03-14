document.addEventListener('DOMContentLoaded', function() {
    // Simulate logged in state (in a real app, this would come from session or local storage)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // Update login/register buttons in the header
    const userActions = document.querySelector('.user-actions');
    if (userActions) {
        if (isLoggedIn) {
            userActions.innerHTML = `
                <a href="profile.html" class="btn btn-outline"><i class="fas fa-user"></i> حسابي الشخصي</a>
                <a href="#" id="logout-btn" class="btn btn-primary"><i class="fas fa-sign-out-alt"></i> تسجيل الخروج</a>
            `;
            
            // Add logout functionality
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    localStorage.setItem('isLoggedIn', 'false');
                    window.location.reload();
                });
            }
        } else {
            userActions.innerHTML = `
                <a href="#" class="btn btn-outline" id="login-btn"><i class="fas fa-user"></i> تسجيل الدخول</a>
                <a href="#" class="btn btn-primary" id="register-btn"><i class="fas fa-user-plus"></i> إنشاء حساب</a>
            `;
            
            // Add login/register functionality
            const loginBtn = document.getElementById('login-btn');
            const registerBtn = document.getElementById('register-btn');
            
            if (loginBtn) {
                loginBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    showLoginModal();
                });
            }
            
            if (registerBtn) {
                registerBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    showRegisterModal();
                });
            }
        }
    }
    
    // Function to show login modal
    function showLoginModal() {
        const modalHtml = `
            <div class="auth-modal" id="login-modal">
                <div class="auth-modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>تسجيل الدخول</h2>
                    <form id="login-form">
                        <div class="form-group">
                            <label for="login-email">البريد الإلكتروني</label>
                            <input type="email" id="login-email" required>
                        </div>
                        <div class="form-group">
                            <label for="login-password">كلمة المرور</label>
                            <input type="password" id="login-password" required>
                        </div>
                        <div class="form-group form-actions">
                            <button type="submit" class="btn btn-primary btn-full">تسجيل الدخول</button>
                        </div>
                        <div class="form-footer">
                            ليس لديك حساب؟ <a href="#" id="show-register">إنشاء حساب جديد</a>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Add modal styles
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .auth-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            }
            
            .auth-modal-content {
                background-color: white;
                padding: 25px;
                border-radius: 8px;
                max-width: 400px;
                width: 90%;
                position: relative;
            }
            
            .close-modal {
                position: absolute;
                top: 10px;
                left: 15px;
                font-size: 24px;
                cursor: pointer;
                color: var(--text-light);
            }
            
            .auth-modal h2 {
                text-align: center;
                margin-bottom: 20px;
            }
            
            .auth-modal .form-group {
                margin-bottom: 15px;
            }
            
            .auth-modal label {
                display: block;
                margin-bottom: 5px;
                font-weight: 500;
            }
            
            .auth-modal input {
                width: 100%;
                padding: 10px;
                border: 1px solid var(--border-color);
                border-radius: 4px;
                font-family: 'Tajawal', sans-serif;
            }
            
            .form-actions {
                margin-top: 20px;
            }
            
            .form-footer {
                text-align: center;
                margin-top: 15px;
                font-size: 13px;
                color: var(--text-light);
            }
        `;
        document.head.appendChild(modalStyles);
        
        // Get modal elements
        const modal = document.getElementById('login-modal');
        const closeModal = modal.querySelector('.close-modal');
        const loginForm = document.getElementById('login-form');
        const showRegister = document.getElementById('show-register');
        
        // Close modal on X click
        closeModal.addEventListener('click', function() {
            modal.remove();
            modalStyles.remove();
        });
        
        // Close modal on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
                modalStyles.remove();
            }
        });
        
        // Show register form
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            modal.remove();
            modalStyles.remove();
            showRegisterModal();
        });
        
        // Handle login form submission
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, you would validate credentials with the server
            localStorage.setItem('isLoggedIn', 'true');
            modal.remove();
            modalStyles.remove();
            window.location.href = 'profile.html';
        });
    }
    
    // Function to show register modal
    function showRegisterModal() {
        const modalHtml = `
            <div class="auth-modal" id="register-modal">
                <div class="auth-modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>إنشاء حساب جديد</h2>
                    <form id="register-form">
                        <div class="form-group">
                            <label for="register-name">الاسم</label>
                            <input type="text" id="register-name" required>
                        </div>
                        <div class="form-group">
                            <label for="register-email">البريد الإلكتروني</label>
                            <input type="email" id="register-email" required>
                        </div>
                        <div class="form-group">
                            <label for="register-password">كلمة المرور</label>
                            <input type="password" id="register-password" required>
                        </div>
                        <div class="form-group">
                            <label for="register-confirm-password">تأكيد كلمة المرور</label>
                            <input type="password" id="register-confirm-password" required>
                        </div>
                        <div class="form-group form-actions">
                            <button type="submit" class="btn btn-primary btn-full">إنشاء حساب</button>
                        </div>
                        <div class="form-footer">
                            لديك حساب بالفعل؟ <a href="#" id="show-login">تسجيل الدخول</a>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Add modal styles if not already added
        if (!document.head.querySelector('style[data-modal-styles]')) {
            const modalStyles = document.createElement('style');
            modalStyles.setAttribute('data-modal-styles', '');
            modalStyles.textContent = `
                .auth-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }
                
                .auth-modal-content {
                    background-color: white;
                    padding: 25px;
                    border-radius: 8px;
                    max-width: 400px;
                    width: 90%;
                    position: relative;
                }
                
                .close-modal {
                    position: absolute;
                    top: 10px;
                    left: 15px;
                    font-size: 24px;
                    cursor: pointer;
                    color: var(--text-light);
                }
                
                .auth-modal h2 {
                    text-align: center;
                    margin-bottom: 20px;
                }
                
                .auth-modal .form-group {
                    margin-bottom: 15px;
                }
                
                .auth-modal label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: 500;
                }
                
                .auth-modal input {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid var(--border-color);
                    border-radius: 4px;
                    font-family: 'Tajawal', sans-serif;
                }
                
                .form-actions {
                    margin-top: 20px;
                }
                
                .form-footer {
                    text-align: center;
                    margin-top: 15px;
                    font-size: 13px;
                    color: var(--text-light);
                }
            `;
            document.head.appendChild(modalStyles);
        }
        
        // Get modal elements
        const modal = document.getElementById('register-modal');
        const closeModal = modal.querySelector('.close-modal');
        const registerForm = document.getElementById('register-form');
        const showLogin = document.getElementById('show-login');
        
        // Close modal on X click
        closeModal.addEventListener('click', function() {
            modal.remove();
        });
        
        // Close modal on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Show login form
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            modal.remove();
            showLoginModal();
        });
        
        // Handle register form submission
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, you would send registration data to the server
            localStorage.setItem('isLoggedIn', 'true');
            modal.remove();
            window.location.href = 'profile.html';
        });
    }

    // Testimonials Slider
    const testimonialSlider = document.getElementById('testimonials-slider');
    const testimonials = Array.from(testimonialSlider.getElementsByClassName('testimonial'));
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    
    let currentTestimonial = 0;
    
    // Function to show the current testimonial with enhanced transitions
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.style.opacity = 0;
                testimonial.style.display = 'block';
                testimonial.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    testimonial.style.opacity = 1;
                    testimonial.style.transform = 'translateX(0)';
                }, 50);
            } else {
                testimonial.style.opacity = 0;
                testimonial.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    testimonial.style.display = 'none';
                }, 500);
            }
        });
    }
    
    // Add enhanced transition to testimonials
    testimonials.forEach(testimonial => {
        testimonial.style.transition = 'opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1), transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)';
        testimonial.style.opacity = 0;
    });
    
    // Initialize slider with first testimonial visible
    showTestimonial(currentTestimonial);
    
    // Next button click
    nextButton.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    // Previous button click
    prevButton.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    // Scroll horizontally with mouse wheel for auction sections
    const horizontalSections = document.querySelectorAll('.horizontal-auctions');
    
    horizontalSections.forEach(section => {
        section.addEventListener('wheel', function(e) {
            if (e.deltaY !== 0) {
                e.preventDefault();
                this.scrollLeft += e.deltaY * 2;
            }
        });
        
        // Add arrow navigation for horizontal scrolling
        const parentSection = section.closest('.container');
        const viewAllLink = parentSection.querySelector('.view-all');
        
        if (viewAllLink) {
            viewAllLink.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(-3px)';
                setTimeout(() => {
                    this.style.transform = 'translateX(0)';
                }, 200);
            });
        }
    });
    
    // Countdown Timer for Auctions
    const countdownElements = document.getElementsByClassName('countdown');
    
    function updateCountdowns() {
        Array.from(countdownElements).forEach(element => {
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
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('header a, .hero-buttons a');
    
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
    
    // Improved hover effects for auction cards
    const auctionCards = document.querySelectorAll('.auction-card');
    auctionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const btn = this.querySelector('.btn-primary');
            btn.classList.add('btn-pulse');
            
            // Add subtle movement to the card image
            const image = this.querySelector('.auction-image svg');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const btn = this.querySelector('.btn-primary');
            btn.classList.remove('btn-pulse');
            
            // Reset image
            const image = this.querySelector('.auction-image svg');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
    
    // Enhanced pulse effect style
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        .btn-pulse {
            animation: btnPulse 1.5s infinite;
        }
        
        @keyframes btnPulse {
            0% {
                box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.4);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(231, 76, 60, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(231, 76, 60, 0);
            }
        }
        
        .horizontal-auctions::-webkit-scrollbar-thumb:hover {
            background-color: var(--primary-dark);
        }
    `;
    document.head.appendChild(pulseStyle);
    
    // Add smooth scroll reveal animations
    const revealElements = document.querySelectorAll('.section-header, .auction-card, .category-card, .step, .testimonial-content');
    
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
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.auctions-grid, .categories-grid, .steps, .testimonials-slider, .newsletter-content');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.85) {
                setTimeout(() => {
                    element.classList.add('fade-in');
                }, index * 100); // Staggered effect
            }
        });
        
        // Animate category cards with staggered effect
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardPosition < windowHeight * 0.85) {
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, index * 50);
            }
        });
    }
    
    // Add fade-in class for animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeIn 1s ease forwards;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .slide-in {
            animation: slideIn 0.8s ease forwards;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once at load
    
    // Update auction buttons to link to detail page
    const auctionButtons = document.querySelectorAll('.auction-actions .btn-primary');
    
    auctionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'pages/auction-details.html';
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value.trim() !== '') {
                // Show success message
                const formContainer = this.parentElement;
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> تم الاشتراك بنجاح! شكراً لك.';
                
                // Replace form with success message
                this.style.display = 'none';
                formContainer.appendChild(successMessage);
                
                // Add success message styles
                const successStyle = document.createElement('style');
                successStyle.textContent = `
                    .success-message {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: rgba(255, 255, 255, 0.2);
                        padding: 15px;
                        border-radius: 6px;
                        margin-top: 20px;
                    }
                    
                    .success-message i {
                        color: var(--success-color);
                        font-size: 20px;
                        margin-left: 10px;
                    }
                `;
                document.head.appendChild(successStyle);
            }
        });
    }
});
