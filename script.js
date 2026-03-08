/* ===================================================
   DEVELOPER PORTFOLIO — SCRIPT.JS
   Animations, interactivity, and dynamic effects
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========== INITIALIZE AOS ==========
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        delay: 0
    });

    // ========== CURSOR GLOW EFFECT ==========
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateGlow() {
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
            requestAnimationFrame(animateGlow);
        }
        animateGlow();
    }

    // ========== TYPEWRITER EFFECT ==========
    const typewriterEl = document.getElementById('typewriterText');
    const phrases = [
        'AI-powered solutions.',
        'data-driven applications.',
        'intelligent systems.',
        'full-stack projects.',
        'machine learning models.'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400; // Pause before next phrase
        }

        setTimeout(typeWriter, typeSpeed);
    }

    if (typewriterEl) {
        setTimeout(typeWriter, 1000);
    }

    // ========== HERO PARTICLES ==========
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        const particleCount = 40;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = (Math.random() * 4) + 's';
            particle.style.animationDuration = (3 + Math.random() * 3) + 's';

            // Random sizes
            const size = 2 + Math.random() * 3;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            // Random colors
            const colors = ['#6c63ff', '#00d4aa', '#a855f7', '#ff6b9d'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];

            particlesContainer.appendChild(particle);
        }
    }

    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // ========== MOBILE NAV TOGGLE ==========
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('open');
        });

        // Close mobile nav when clicking a link
        navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinksContainer.classList.remove('open');
            });
        });
    }

    // ========== STAT COUNTER ANIMATION ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 1500;
            const stepTime = 50;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, stepTime);
        });
    }

    // Observe when stats section is in view
    const aboutSection = document.getElementById('about');
    if (aboutSection && statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(aboutSection);
    }

    // ========== CERTIFICATE MODAL ==========
    const certModal = document.getElementById('certModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalPdf = document.getElementById('modalPdf');

    // Make the function globally accessible
    window.openCertModal = function (imageSrc, title) {
        modalTitle.textContent = title;

        // Check if the file is an image (png, jpg, jpeg, webp) or a PDF
        const ext = imageSrc.split('.').pop().toLowerCase();
        const isImage = ['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(ext);

        if (isImage) {
            // Hide iframe, show image
            modalPdf.style.display = 'none';
            let modalImg = document.getElementById('modalImg');
            if (!modalImg) {
                modalImg = document.createElement('img');
                modalImg.id = 'modalImg';
                modalImg.className = 'modal-cert-img';
                modalPdf.parentNode.insertBefore(modalImg, modalPdf.nextSibling);
            }
            modalImg.src = imageSrc;
            modalImg.alt = title;
            modalImg.style.display = 'block';
        } else {
            // Hide image, show iframe
            const modalImg = document.getElementById('modalImg');
            if (modalImg) modalImg.style.display = 'none';
            modalPdf.style.display = 'block';
            modalPdf.src = imageSrc;
        }

        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    if (modalClose) {
        modalClose.addEventListener('click', closeCertModal);
    }

    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                closeCertModal();
            }
        });
    }

    function closeCertModal() {
        certModal.classList.remove('active');
        document.body.style.overflow = '';
        modalPdf.src = '';
        modalPdf.style.display = 'block';
        const modalImg = document.getElementById('modalImg');
        if (modalImg) {
            modalImg.style.display = 'none';
            modalImg.src = '';
        }
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (certModal.classList.contains('active')) {
                closeCertModal();
            }
            if (resumeModal && resumeModal.classList.contains('active')) {
                closeResumeModal();
            }
        }
    });

    // ========== RESUME MODAL ==========
    const resumeModal = document.getElementById('resumeModal');
    const resumePdf = document.getElementById('resumePdf');

    window.openResumeModal = function () {
        resumePdf.src = 'resume/Dhananjay_resume_26.pdf';
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeResumeModal = function () {
        resumeModal.classList.remove('active');
        document.body.style.overflow = '';
        resumePdf.src = '';
    };

    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                closeResumeModal();
            }
        });
    }

    // ========== SMOOTH SCROLL FOR NAV LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========== PROJECT CARD TILT EFFECT ==========
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 768) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ========== SKILL CARD STAGGER REVEAL ==========
    const skillCards = document.querySelectorAll('.skill-card');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08}s`;
        skillsObserver.observe(card);
    });

    // ========== CONTACT FORM HANDLING ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            // If using Formspree, let the form submit naturally.
            // If you want custom handling, you can modify this.

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Re-enable after submission (for Formspree redirect)
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // ========== TEXT REVEAL ANIMATION ==========
    const revealElements = document.querySelectorAll('.hero-title, .hero-description');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
    });

    // Trigger after a short delay for hero entrance
    setTimeout(() => {
        revealElements.forEach((el, i) => {
            setTimeout(() => {
                el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, i * 200);
        });
    }, 300);

    // ========== NAVBAR HIDE ON SCROLL DOWN, SHOW ON SCROLL UP ==========
    let lastScrollY = 0;
    let ticking = false;

    function updateNavbar() {
        const scrollY = window.scrollY;

        if (scrollY > lastScrollY && scrollY > 200) {
            // Scrolling down — hide navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up — show navbar
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // ========== INTERACTIVE PARTICLE CANVAS ==========
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const section = document.getElementById('interactiveArea');
        let particles = [];
        let mouse = { x: -9999, y: -9999, active: false };
        const PARTICLE_COUNT = 150;
        const REPEL_RADIUS = 120;
        const REPEL_FORCE = 8;
        const RETURN_SPEED = 0.03;
        const CONNECT_DIST = 100;

        function resizeCanvas() {
            canvas.width = section.offsetWidth;
            canvas.height = section.offsetHeight;
        }

        function createParticles() {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particles.push({
                    homeX: x, homeY: y,
                    x: x, y: y,
                    vx: 0, vy: 0,
                    size: 1.5 + Math.random() * 2,
                    color: ['#6c63ff', '#00d4aa', '#a855f7', '#ff6b9d'][Math.floor(Math.random() * 4)],
                    alpha: 0.3 + Math.random() * 0.5
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections first
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECT_DIST) {
                        const opacity = (1 - dist / CONNECT_DIST) * 0.15;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(108, 99, 255, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw and update particles
            particles.forEach(p => {
                // Mouse repulsion
                if (mouse.active) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < REPEL_RADIUS && dist > 0) {
                        const force = (REPEL_RADIUS - dist) / REPEL_RADIUS * REPEL_FORCE;
                        p.vx += (dx / dist) * force;
                        p.vy += (dy / dist) * force;
                    }
                }

                // Spring back to home
                const homeDx = p.homeX - p.x;
                const homeDy = p.homeY - p.y;
                p.vx += homeDx * RETURN_SPEED;
                p.vy += homeDy * RETURN_SPEED;

                // Friction / damping
                p.vx *= 0.9;
                p.vy *= 0.9;

                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.fill();
                ctx.globalAlpha = 1;

                // Glow effect for nearby mouse
                if (mouse.active) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < REPEL_RADIUS * 1.5) {
                        const glow = (1 - dist / (REPEL_RADIUS * 1.5)) * 0.6;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                        ctx.fillStyle = p.color;
                        ctx.globalAlpha = glow;
                        ctx.fill();
                        ctx.globalAlpha = 1;
                    }
                }
            });

            requestAnimationFrame(drawParticles);
        }

        // Get mouse position relative to canvas
        section.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
        });

        section.addEventListener('mouseleave', () => {
            mouse.active = false;
            mouse.x = -9999;
            mouse.y = -9999;
        });

        // Handle resize
        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });

        // Initialize
        resizeCanvas();
        createParticles();
        drawParticles();
    }

    // ========== PAGE LOAD ANIMATION ==========
    document.body.classList.add('loaded');

    console.log('%c👋 Hey there! Thanks for checking out my portfolio!',
        'color: #6c63ff; font-size: 16px; font-weight: bold;');
    console.log('%cBuilt with ❤️ using HTML, CSS & JS',
        'color: #00d4aa; font-size: 12px;');

});
