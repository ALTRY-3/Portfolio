// Hamburger menu toggle
const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');
const closeMenu = document.getElementById('close-menu');
const header = document.querySelector('header');

if (menuIcon && navbar) {
    // Open menu
    menuIcon.addEventListener('click', function() {
        navbar.classList.add('active');
        header.classList.add('menu-open');
        menuIcon.style.opacity = '0';
        menuIcon.style.pointerEvents = 'none';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });

    // Close menu
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            navbar.classList.remove('active');
            header.classList.remove('menu-open');
            menuIcon.style.opacity = '1';
            menuIcon.style.pointerEvents = 'auto';
            document.body.style.overflow = 'auto';
        });
    }
}

// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking a link
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                header.classList.remove('menu-open');
                menuIcon.style.opacity = '1';
                menuIcon.style.pointerEvents = 'auto';
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// Skills progress bar animation
const progressBars = document.querySelectorAll('.progress-bar');

const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const progressObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const progress = progressBar.getAttribute('data-progress');
            
            setTimeout(() => {
                progressBar.style.width = progress + '%';
            }, 200);
            
            progressObserver.unobserve(progressBar);
        }
    });
}, observerOptions);

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// Timeline animation - Education items slide in on scroll
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            timelineObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2}s`;
    timelineObserver.observe(item);
});

// Form validation and submission with Formspree
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const inputs = this.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        // Check all required fields
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                isValid = false;
                input.style.borderColor = '#ff0000';
                
                // Reset border color after 2 seconds
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 2000);
            } else {
                input.style.borderColor = '#00b4d8';
            }
        });
        
        if (isValid) {
            const submitBtn = this.querySelector('input[type="submit"]');
            const originalValue = submitBtn.value;
            
            // Show sending state
            submitBtn.value = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Submit the form data to Formspree
                const formData = new FormData(this);
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    submitBtn.value = 'Sent';
                    submitBtn.style.backgroundColor = '#4CAF50';
                    submitBtn.style.borderColor = '#4CAF50';
                    
                    // Reset form after 3 seconds
                    setTimeout(() => {
                        this.reset();
                        submitBtn.value = originalValue;
                        submitBtn.style.backgroundColor = '';
                        submitBtn.style.borderColor = '';
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Show error message
                submitBtn.value = 'Failed';
                submitBtn.style.backgroundColor = '#ff0000';
                submitBtn.style.borderColor = '#ff0000';
                
                setTimeout(() => {
                    submitBtn.value = originalValue;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            }
        }
    });
}

// Loading animation - Smooth fade-in on page load
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Dynamic greeting based on time of day
function setDynamicGreeting() {
    const greetingElement = document.getElementById('dynamic-greeting');
    const hour = new Date().getHours();
    
    let greeting;
    if (hour >= 5 && hour < 12) {
        greeting = 'Good Morning';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Evening';
    }
    
    if (greetingElement) {
        greetingElement.textContent = greeting;
    }
}

// Set greeting on page load
setDynamicGreeting();

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    // Update icon
    if (body.classList.contains('light-mode')) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// Typing animation with Typed.js
const typed = new Typed('.type-text span', {
    strings: [
        'an aspiring developer.',
        'a 3rd-year BSIT student.',
        'passionate about web development.'
    ],
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
    loop: true
});

// Project image slider
document.querySelectorAll('.project-box').forEach(projectBox => {
    const images = projectBox.querySelectorAll('.slider-images img');
    const prevBtn = projectBox.querySelector('.prev-btn');
    const nextBtn = projectBox.querySelector('.next-btn');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });
});

console.log('Portfolio JavaScript loaded! 🚀');
