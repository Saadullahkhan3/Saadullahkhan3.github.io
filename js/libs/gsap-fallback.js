// GSAP Fallback - Basic animation functions for when GSAP is unavailable
// This provides basic functionality to prevent JavaScript errors

(function() {
    // Check if GSAP is already loaded
    if (window.gsap) {
        console.log('GSAP already loaded from CDN');
        return;
    }

    console.log('GSAP fallback initializing...');
    
    // Create a basic timeline implementation
    function Timeline() {
        this.animations = [];
    }
    
    Timeline.prototype.from = function(elements, options) {
        console.log('GSAP fallback: from animation applied to', elements);
        this.animations.push({type: 'from', elements, options});
        this.executeAnimation(elements, options, 'from');
        return this;
    };
    
    Timeline.prototype.to = function(elements, options) {
        console.log('GSAP fallback: to animation applied to', elements);
        this.animations.push({type: 'to', elements, options});
        this.executeAnimation(elements, options, 'to');
        return this;
    };
    
    Timeline.prototype.executeAnimation = function(elements, options, type) {
        const elementList = typeof elements === 'string' ? 
            document.querySelectorAll(elements) : 
            (elements.length ? elements : [elements]);
            
        Array.from(elementList).forEach((elem, index) => {
            if (!elem) return;
            
            const delay = (options.delay || 0) + (options.stagger ? options.stagger * index : 0);
            
            setTimeout(() => {
                elem.style.transition = `all ${options.duration || 1}s ${options.ease || 'ease'}`;
                
                if (type === 'from') {
                    // Set initial state, then animate to normal
                    if (options.opacity !== undefined) elem.style.opacity = options.opacity;
                    if (options.y !== undefined) elem.style.transform = `translateY(${options.y}px)`;
                    
                    // Animate to normal state
                    setTimeout(() => {
                        elem.style.opacity = '1';
                        elem.style.transform = 'translateY(0px)';
                    }, 10);
                } else {
                    // Animate to target state
                    if (options.opacity !== undefined) elem.style.opacity = options.opacity;
                    if (options.y !== undefined) elem.style.transform = `translateY(${options.y}px)`;
                }
            }, delay * 1000);
        });
    };

    // Create GSAP object with basic functionality
    window.gsap = {
        timeline: function() {
            return new Timeline();
        },
        from: function(elements, options) {
            const tl = new Timeline();
            return tl.from(elements, options);
        },
        to: function(elements, options) {
            const tl = new Timeline();
            return tl.to(elements, options);
        }
    };

    // Add Expo easing fallback
    window.Expo = window.Expo || {
        easeInOut: 'ease-in-out'
    };

    console.log('GSAP fallback loaded - basic functionality available');
})();