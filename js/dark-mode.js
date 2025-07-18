// Dark Mode Toggle Feature
document.addEventListener('DOMContentLoaded', function() {
    
    // Create dark mode toggle button
    function createDarkModeToggle() {
        const toggleButton = document.createElement('button');
        toggleButton.id = 'dark-mode-toggle';
        toggleButton.setAttribute('aria-label', 'Toggle dark mode');
        toggleButton.innerHTML = `
            <span class="light-icon">🌙</span>
            <span class="dark-icon">☀️</span>
        `;
        
        // Style the toggle button
        toggleButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2em;
        `;
        
        // Add hover effect
        toggleButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.background = 'rgba(255, 255, 255, 0.3)';
        });
        
        toggleButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        document.body.appendChild(toggleButton);
        return toggleButton;
    }
    
    // Apply dark mode styles
    function applyDarkMode(isDark) {
        const root = document.documentElement;
        
        if (isDark) {
            root.style.setProperty('--bg-color', '#0f0f23');
            root.style.setProperty('--text-color', '#ffffff');
            root.style.setProperty('--glass-bg', 'rgba(0, 0, 0, 0.3)');
            root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.1)');
            
            document.body.style.background = 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)';
            document.body.style.color = '#ffffff';
            
            // Update glassmorphism elements
            const glassElements = document.querySelectorAll('.bg-glassmorphism');
            glassElements.forEach(el => {
                el.style.background = 'rgba(0, 0, 0, 0.3)';
                el.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            });
            
            // Update toggle button appearance
            const toggle = document.getElementById('dark-mode-toggle');
            if (toggle) {
                toggle.querySelector('.light-icon').style.display = 'none';
                toggle.querySelector('.dark-icon').style.display = 'block';
                toggle.style.background = 'rgba(0, 0, 0, 0.3)';
                toggle.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }
            
        } else {
            root.style.removeProperty('--bg-color');
            root.style.removeProperty('--text-color');
            root.style.removeProperty('--glass-bg');
            root.style.removeProperty('--card-bg');
            
            document.body.style.background = '';
            document.body.style.color = '';
            
            // Restore glassmorphism elements
            const glassElements = document.querySelectorAll('.bg-glassmorphism');
            glassElements.forEach(el => {
                el.style.background = 'rgba(255, 255, 255, 0.24)';
                el.style.borderColor = '';
            });
            
            // Update toggle button appearance
            const toggle = document.getElementById('dark-mode-toggle');
            if (toggle) {
                toggle.querySelector('.light-icon').style.display = 'block';
                toggle.querySelector('.dark-icon').style.display = 'none';
                toggle.style.background = 'rgba(255, 255, 255, 0.2)';
                toggle.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }
        }
    }
    
    // Initialize dark mode functionality
    function initDarkMode() {
        const toggleButton = createDarkModeToggle();
        
        // Check for saved preference or default to light mode
        const savedMode = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDarkMode = savedMode === 'true' || (savedMode === null && prefersDark);
        
        // Apply initial mode
        applyDarkMode(isDarkMode);
        
        // Add click event listener
        toggleButton.addEventListener('click', function() {
            const currentlyDark = localStorage.getItem('darkMode') === 'true';
            const newMode = !currentlyDark;
            
            localStorage.setItem('darkMode', newMode.toString());
            applyDarkMode(newMode);
            
            // Announce to screen readers
            const announcement = newMode ? 'Dark mode enabled' : 'Light mode enabled';
            const announcementEl = document.createElement('div');
            announcementEl.setAttribute('aria-live', 'polite');
            announcementEl.setAttribute('aria-atomic', 'true');
            announcementEl.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
            announcementEl.textContent = announcement;
            document.body.appendChild(announcementEl);
            
            setTimeout(() => {
                document.body.removeChild(announcementEl);
            }, 1000);
        });
        
        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (localStorage.getItem('darkMode') === null) {
                applyDarkMode(e.matches);
            }
        });
    }
    
    // Add CSS for dark mode icons
    const style = document.createElement('style');
    style.textContent = `
        #dark-mode-toggle .dark-icon {
            display: none;
        }
        
        @media (prefers-reduced-motion: reduce) {
            #dark-mode-toggle {
                transition: none !important;
            }
        }
        
        /* Ensure focus visibility */
        #dark-mode-toggle:focus {
            outline: 2px solid #4c9aff;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize the dark mode feature
    initDarkMode();
    
    console.log('Dark mode toggle feature loaded');
});