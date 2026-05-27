// ============================================
// VIKRAM JHA - PERSONAL WEBSITE SCRIPTS
// Complete Version with Extended Effects
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ============================================
    // 2. MOBILE MENU TOGGLE
    // ============================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // ============================================
    // 3. TYPEWRITER EFFECT
    // ============================================
    const typedText = document.querySelector('.typed-text');
    const textArray = [
        'Ethical Hacker',
        'Penetration Tester',
        'Bug Bounty Hunter',
        'Cybersecurity Enthusiast',
        'Security Researcher'
    ];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = textArray[textArrayIndex];
        
        if (isDeleting) {
            typedText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, newTextDelay);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textArrayIndex++;
            if (textArrayIndex === textArray.length) {
                textArrayIndex = 0;
            }
            setTimeout(type, typingDelay);
        } else {
            setTimeout(type, isDeleting ? erasingDelay : typingDelay);
        }
    }
    
    if (typedText) {
        type();
    }
    
    // ============================================
    // 4. MATRIX RAIN EFFECT
    // ============================================
    const canvas = document.getElementById('matrix-canvas');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;
        
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        function drawMatrix() {
            ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff41';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(drawMatrix, 33);
    }
    
    // ============================================
    // 5. SCROLL REVEAL ANIMATION
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // ============================================
    // 6. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // ============================================
    // 7. CONTACT FORM HANDLING
    // ============================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Show success message
            alert(`Thank you, ${name}! Your message has been sent.\n\nI'll get back to you at ${email} soon.`);
            
            contactForm.reset();
        });
    }
    
    // ============================================
    // 8. ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // ============================================
    // 9. SKILL BARS ANIMATE ON SCROLL
    // ============================================
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // ============================================
    // 10. CUSTOM CURSOR (Hacker Style)
    // ============================================
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    document.querySelectorAll('a, button, .skill-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // ============================================
    // 11. PREVENT RIGHT CLICK
    // ============================================
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showToast('🔒 Right click disabled for security!');
    });
    
    // ============================================
    // 12. KEYBOARD SHORTCUT EASTER EGGS
    // ============================================
    document.addEventListener('keydown', function(e) {
        // Ctrl + Shift + V = View Source
        if (e.ctrlKey && e.shiftKey && e.key === 'V') {
            console.log('%c🎯 Vikram Jha | Cybersecurity Portfolio', 'font-size: 20px; color: #00ff41;');
            console.log('%cSystem Status: Online', 'color: #0ff0fc;');
            console.log('%c⚠️ Unauthorized access prohibited!', 'color: #ff6b6b;');
        }
        
        // Konami Code = Secret
        if (e.key === 'ArrowUp' && window.konamiIndex === 0) {
            window.konamiIndex = 1;
        } else if (e.key === 'ArrowUp' && window.konamiIndex === 1) {
            window.konamiIndex = 2;
        } else if (e.key === 'ArrowDown' && window.konamiIndex === 2) {
            window.konamiIndex = 3;
        } else if (e.key === 'ArrowDown' && window.konamiIndex === 3) {
            window.konamiIndex = 4;
        } else if (e.key === 'ArrowLeft' && window.konamiIndex === 4) {
            window.konamiIndex = 5;
        } else if (e.key === 'ArrowRight' && window.konamiIndex === 5) {
            window.konamiIndex = 6;
        } else if (e.key === 'b' && window.konamiIndex === 6) {
            window.konamiIndex = 7;
        } else if (e.key === 'a' && window.konamiIndex === 7) {
            window.konamiIndex = 0;
            alert('🎯 KONAMI CODE ACTIVATED!\n\nAccessing: ROOT SHELL...\n\nWelcome, Hacker!');
        } else {
            window.konamiIndex = 0;
        }
    });
    
    window.konamiIndex = 0;
    
    // ============================================
    // 13. TOAST NOTIFICATIONS
    // ============================================
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
    
    // ============================================
    // 14. TERMINAL TYPING FOR CONSOLE
    // ============================================
    function terminalLog(text, color = '#00ff41') {
        console.log(`%c${text}`, `color: ${color}; font-family: 'Fira Code'; font-size: 14px;`);
    }
    
    terminalLog('🎯 VIKRAM JHA PORTFOLIO INITIALIZED', '#00ff41');
    terminalLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━', '#0ff0fc');
    terminalLog('✓ System Online', '#00ff41');
    terminalLog('✓ Matrix Rain Active', '#00ff41');
    terminalLog('✓ Custom Cursor Enabled', '#00ff41');
    terminalLog('✓ Security Protocols Active', '#00ff41');
    terminalLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━', '#0ff0fc');
    terminalLog('⚡ Ready for Deployment', '#0ff0fc');
    
    // ============================================
    // 15. LOADER ANIMATION
    // ============================================
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });
    
    // ============================================
    // 16. PARALLAX EFFECT (Optional)
    // ============================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / 700);
        }
    });
    
    // ============================================
    // 17. MAGNETIC BUTTON EFFECT
    // ============================================
    const magneticButtons = document.querySelectorAll('.btn');
    
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            btn.style.transform = 'translate(0, 0)';
        });
    });
    
    // ============================================
    // 18. CURRENT YEAR
    // ============================================
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });
    
    // ============================================
    // 19.Lazy Loading Images
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // ============================================
    // 20. EXIT INTENT (Show on mouse leave)
    // ============================================
    let exited = false;
    
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exited) {
            exited = true;
            showToast('👋 Don\'t forget to check my GitHub!');
        }
    });
    
    console.log('%c🎯 Portfolio Fully Loaded!', 'font-size: 24px; color: #00ff41; font-weight: bold;');
});