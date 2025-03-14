document.addEventListener('DOMContentLoaded', function() {
    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle current item
            item.classList.toggle('active');
            
            // Close other items (optional - uncomment for accordion behavior)
            // faqItems.forEach(otherItem => {
            //     if (otherItem !== item) {
            //         otherItem.classList.remove('active');
            //     }
            // });
        });
    });
    
    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to your server
            console.log('Form submission:', { name, email, phone, subject, message });
            
            // Show success message
            const formContainer = this.parentElement;
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = `
                <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                <h3>تم إرسال رسالتك بنجاح!</h3>
                <p>شكراً لتواصلك معنا، سنقوم بالرد عليك في أقرب وقت ممكن.</p>
                <button class="btn btn-primary send-new">إرسال رسالة جديدة</button>
            `;
            
            // Apply success message styles
            const successStyle = document.createElement('style');
            successStyle.textContent = `
                .success-message {
                    text-align: center;
                    padding: 20px;
                    animation: fadeIn 0.5s ease;
                }
                
                .success-icon {
                    font-size: 50px;
                    color: #27ae60;
                    margin-bottom: 15px;
                }
                
                .success-message h3 {
                    color: var(--text-color);
                    margin-bottom: 10px;
                }
                
                .success-message p {
                    color: var(--text-light);
                    margin-bottom: 20px;
                }
                
                .send-new {
                    margin-top: 10px;
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
            `;
            document.head.appendChild(successStyle);
            
            // Hide form and show success message
            this.style.display = 'none';
            formContainer.appendChild(successMessage);
            
            // Setup "send new message" button
            const sendNewBtn = formContainer.querySelector('.send-new');
            if (sendNewBtn) {
                sendNewBtn.addEventListener('click', function() {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    successMessage.remove();
                });
            }
        });
    }
    
    // Add reveal animations for content sections
    const revealElements = document.querySelectorAll('.contact-info, .contact-form-container, .map-container, .faq-container');
    
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
});