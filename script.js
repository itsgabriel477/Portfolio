// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuButton.querySelector('i');
        icon.className = mobileMenu.classList.contains('hidden') 
            ? 'ri-menu-line ri-lg' 
            : 'ri-close-line ri-lg';
    });
    
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.querySelector('i').className = 'ri-menu-line ri-lg';
        });
    });
});

// Portfolio Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.masonry-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => {
                btn.classList.remove('filter-active');
                btn.classList.add('bg-gray-100');
            });
            
            this.classList.add('filter-active');
            this.classList.remove('bg-gray-100');
            
            const filter = this.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                item.style.display = (filter === 'all' || item.getAttribute('data-category') === filter) 
                    ? 'block' 
                    : 'none';
            });
        });
    });
    
    // Lightbox functionality
    const projectCards = document.querySelectorAll('.view-project');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            lightboxImg.src = this.closest('.project-card').querySelector('img').src;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    lightboxClose.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Custom Cursor Animation
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth > 768) {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        window.addEventListener('mousemove', function(e) {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            
            setTimeout(() => {
                cursorOutline.style.left = `${e.clientX}px`;
                cursorOutline.style.top = `${e.clientY}px`;
            }, 50);
        });
        
        document.querySelectorAll('a, button, .interactive').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.borderColor = 'rgba(59, 130, 246, 0.8)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.borderColor = 'rgba(59, 130, 246, 0.5)';
            });
        });
    }
});

// Form Interactions
document.addEventListener('DOMContentLoaded', function() {
    const budgetRange = document.getElementById('budget-range');
    const budgetValue = document.getElementById('budget-value');
    
    if (budgetRange && budgetValue) {
        budgetRange.addEventListener('input', function() {
            const value = parseInt(this.value);
            budgetValue.textContent = value >= 10000 
                ? '$10,000+' 
                : `$${value.toLocaleString()}`;
        });
    }
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            sendMail();

            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }, 1500);
        });
    }
});

// Smooth Scrolling
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});


function sendMail(){
    let parms = {
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
        subject : document.getElementById("subject").value,
        message : document.getElementById("message").value,
        budget_range : document.getElementById("budget-range").value
    }

    emailjs.send("service_xsljyas", "template_wclbwzj",parms).then(alert("Email Sent!!"))
}


const range = document.getElementById('budget-range');
const formatted = document.getElementById('budget-formatted');

range.addEventListener('input', function () {
  const value = parseInt(range.value);
  formatted.value = `$${value.toLocaleString()}`;
});