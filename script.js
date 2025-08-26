// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile navigation toggle (if needed in future)
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Add scroll-to-top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll-to-top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effects to phase cards
    const phaseCards = document.querySelectorAll('.phase-card');
    phaseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add progress indicator for phase pages
    if (window.location.pathname.includes('phase')) {
        addProgressIndicator();
    }

    // External link handling
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
});

// Progress indicator for phase pages
function addProgressIndicator() {
    const currentPhase = getCurrentPhaseNumber();
    if (currentPhase) {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-indicator';
        progressContainer.style.cssText = `
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            height: 4px;
            background-color: rgba(52, 152, 219, 0.2);
            z-index: 999;
        `;
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.cssText = `
            height: 100%;
            background-color: #3498db;
            width: ${(currentPhase / 6) * 100}%;
            transition: width 0.3s ease;
        `;
        
        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);
    }
}

// Get current phase number from URL
function getCurrentPhaseNumber() {
    const path = window.location.pathname;
    const match = path.match(/phase(\d+)\.html/);
    return match ? parseInt(match[1]) : null;
}

// Add animation to elements when they come into view
function addScrollAnimations() {
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

    // Observe content sections
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', addScrollAnimations);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Navigate between phases with arrow keys
    if (e.altKey) {
        const currentPhase = getCurrentPhaseNumber();
        if (currentPhase) {
            if (e.key === 'ArrowLeft' && currentPhase > 1) {
                window.location.href = `phase${currentPhase - 1}.html`;
            } else if (e.key === 'ArrowRight' && currentPhase < 6) {
                window.location.href = `phase${currentPhase + 1}.html`;
            } else if (e.key === 'ArrowUp') {
                window.location.href = 'index.html';
            }
        }
    }
});

// Add search functionality (basic)
function addSearchFunctionality() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 1000;
        display: none;
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search content...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        padding: 10px;
        border: 2px solid #3498db;
        border-radius: 25px;
        outline: none;
        width: 250px;
    `;
    
    searchContainer.appendChild(searchInput);
    document.body.appendChild(searchContainer);
    
    // Toggle search with Ctrl+F
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            searchContainer.style.display = searchContainer.style.display === 'none' ? 'block' : 'none';
            if (searchContainer.style.display === 'block') {
                searchInput.focus();
            }
        }
    });
    
    // Simple search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const textElements = document.querySelectorAll('p, li, h1, h2, h3');
        
        textElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (searchTerm && text.includes(searchTerm)) {
                element.style.backgroundColor = '#fff3cd';
            } else {
                element.style.backgroundColor = '';
            }
        });
    });
}

