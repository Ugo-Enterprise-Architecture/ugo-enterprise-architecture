// Language switching functionality
let currentLanguage = 'en';

const translations = {
    en: {
        'services-title': 'Specialized Services',
        'about-title': 'About',
        'experience-title': 'Recent Projects',
        'contact-title': 'Get In Touch',
        'form-success': 'Thank you for your inquiry! I will respond within 24 hours to discuss your municipal technology project.',
        'dutch-municipal': 'Dutch Municipal',
        'nederlandse-gemeentelijke': 'Nederlandse Gemeentelijke'
    },
    nl: {
        'services-title': 'Gespecialiseerde Diensten',
        'about-title': 'Over Mij',
        'experience-title': 'Recente Projecten',
        'contact-title': 'Neem Contact Op',
        'form-success': 'Bedankt voor uw aanvraag! Ik zal binnen 24 uur reageren om uw gemeentelijke technologie project te bespreken.',
        'dutch-municipal': 'Nederlandse Gemeentelijke',
        'nederlandse-gemeentelijke': 'Nederlandse Gemeentelijke'
    }
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function(error) {
        console.log('Service Worker registration failed:', error);
      });
  });
}

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update active button
    document.getElementById('en-btn').classList.toggle('active', lang === 'en');
    document.getElementById('nl-btn').classList.toggle('active', lang === 'nl');
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-en][data-nl]').forEach(element => {
        const content = lang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-nl');
        if (element.tagName === 'INPUT' && element.type !== 'email' && element.type !== 'tel') {
            element.placeholder = content;
        } else if (element.tagName === 'TEXTAREA') {
            element.placeholder = content;
        } else if (element.tagName === 'OPTION') {
            element.textContent = content;
        } else {
            element.innerHTML = content;
        }
    });
    
    // Update section titles
    Object.keys(translations[lang]).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update hero title highlight
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const highlightClass = lang === 'en' ? 'Dutch Municipal' : 'Nederlandse Gemeentelijke';
        heroTitle.innerHTML = `<span class="highlight">${highlightClass}</span> ${lang === 'en' ? 'Architecture Solutions' : 'Architectuur Oplossingen'}`;
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(44, 62, 80, 0.95)';
    } else {
        header.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
    }
});

// Animate timeline items on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all timeline items and service cards
document.querySelectorAll('.timeline-item, .service-card').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.6s ease';
    observer.observe(item);
});
