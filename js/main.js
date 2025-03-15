/**
 * Portfolio Website JavaScript
 * - Mobile Navigation Toggle
 * - Navbar Scroll Effect
 * - Talks Filter
 * - Form Validation
 * - Smooth Scrolling
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const talkCards = document.querySelectorAll('.talk-card');
    const contactForm = document.getElementById('contactForm');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 1. Mobile Navigation Toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // 2. Navbar Scroll Effect
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Call initially to set the correct state based on initial scroll position
    handleScroll();
    
    // 3. Talks Filter Functionality
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                // Filter talk cards
                talkCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // 4. Form Validation
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Reset validation
            [name, email, subject, message].forEach(field => {
                field.classList.remove('error');
            });
            
            // Validate name
            if (!name.value.trim()) {
                name.classList.add('error');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                email.classList.add('error');
                isValid = false;
            }
            
            // Validate subject
            if (!subject.value.trim()) {
                subject.classList.add('error');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                message.classList.add('error');
                isValid = false;
            }
            
            // If valid, you'd typically submit the form or make an AJAX request
            if (isValid) {
                // For demo purposes, we'll just show a success message
                const formElements = contactForm.elements;
                
                // Disable form
                for (let i = 0; i < formElements.length; i++) {
                    formElements[i].disabled = true;
                }
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                contactForm.appendChild(successMessage);
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    successMessage.remove();
                    for (let i = 0; i < formElements.length; i++) {
                        formElements[i].disabled = false;
                    }
                }, 3000);
            }
        });
    }
    
    // 5. Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    
    function setActiveNavLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // 6. Update CSS for error states
    const style = document.createElement('style');
    style.textContent = `
        .error {
            border-color: var(--error-color) !important;
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.2) !important;
        }
        
        .success-message {
            background-color: var(--success-color);
            color: white;
            padding: var(--spacing-md);
            border-radius: var(--border-radius-md);
            margin-top: var(--spacing-md);
            text-align: center;
        }
    `;
    document.head.appendChild(style);
});
