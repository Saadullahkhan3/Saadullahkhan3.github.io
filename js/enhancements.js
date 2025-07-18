// Accessibility and UX improvements
document.addEventListener('DOMContentLoaded', function() {
    
    // Add skip to main content link for screen readers
    function addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#home';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    // Add ARIA labels to navigation
    function enhanceNavigation() {
        const nav = document.querySelector('nav');
        if (nav) {
            nav.setAttribute('aria-label', 'Main navigation');
            
            const navLinks = nav.querySelectorAll('a');
            navLinks.forEach(link => {
                const text = link.textContent.trim();
                link.setAttribute('aria-label', `Navigate to ${text} section`);
            });
        }
    }
    
    // Add alt text to images that don't have it
    function enhanceImages() {
        const images = document.querySelectorAll('img:not([alt])');
        images.forEach((img, index) => {
            const src = img.src;
            let altText = 'Image';
            
            if (src.includes('project')) {
                altText = 'Project thumbnail';
            } else if (src.includes('skill') || src.includes('icon')) {
                altText = 'Skill icon';
            } else if (src.includes('social')) {
                altText = 'Social media icon';
            }
            
            img.setAttribute('alt', altText);
        });
    }
    
    // Add keyboard navigation support
    function enhanceKeyboardNavigation() {
        const interactiveElements = document.querySelectorAll('a, button, [tabindex="0"]');
        
        interactiveElements.forEach(element => {
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    if (this.tagName === 'A') {
                        // Let browser handle link navigation
                        return;
                    }
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
    
    // Add loading states for external links
    function enhanceExternalLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        
        externalLinks.forEach(link => {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Add visual indicator for external links
            if (!link.querySelector('.external-icon')) {
                const icon = document.createElement('span');
                icon.className = 'external-icon';
                icon.innerHTML = ' ↗';
                icon.style.fontSize = '0.8em';
                icon.setAttribute('aria-hidden', 'true');
                link.appendChild(icon);
            }
        });
    }
    
    // Simple lazy loading for images
    function addLazyLoading() {
        const images = document.querySelectorAll('img');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    // Add smooth scroll behavior for anchor links
    function enhanceScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, `#${targetId}`);
                }
            });
        });
    }
    
    // Add simple error handling for broken images
    function handleBrokenImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('error', function() {
                this.style.display = 'none';
                console.log('Failed to load image:', this.src);
            });
        });
    }
    
    // Initialize all enhancements
    addSkipLink();
    enhanceNavigation();
    enhanceImages();
    enhanceKeyboardNavigation();
    enhanceExternalLinks();
    addLazyLoading();
    enhanceScrolling();
    handleBrokenImages();
    
    console.log('Accessibility and UX enhancements loaded');
});