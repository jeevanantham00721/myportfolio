document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. MOBILE NAVIGATION MENU
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
            const isOpen = mobileNav.classList.contains('open');
            menuToggle.innerHTML = isOpen 
                ? '<i class="fa-solid fa-xmark"></i>' 
                : '<i class="fa-solid fa-bars-staggered"></i>';
        });

        // Close mobile nav when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                menuToggle.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
            });
        });
    }

    // ==========================================
    // 1B. LIGHT & DARK THEME TOGGLE
    // ==========================================
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');

    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const themeIcons = document.querySelectorAll('.theme-toggle-btn i');
        themeIcons.forEach(icon => {
            if (theme === 'light') {
                icon.className = 'fa-solid fa-sun';
            } else {
                icon.className = 'fa-solid fa-moon';
            }
        });
    };

    // Load initial theme state
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    const handleThemeToggle = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(targetTheme);
    };

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', handleThemeToggle);
    }
    if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener('click', handleThemeToggle);
    }

    // ==========================================
    // 2. SCROLL NAVIGATION & HEADER STYLING
    // ==========================================
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky/Scrolled header background styling
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Highlight active navigation section
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // 3. SKILLS CATEGORY FILTER
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active class on buttons
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    // Re-trigger fade-in animation
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ==========================================
    // 4. ANIMATED SKILLS PROGRESS BARS ON VIEW
    // ==========================================
    const progressBars = document.querySelectorAll('.progress-bar');
    const skillsSection = document.getElementById('skills');

    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const targetWidth = bar.parentElement.previousElementSibling.previousElementSibling.classList.contains('progress-bar') 
                ? '80%' // fallback
                : bar.style.width; // retrieves width defined inline in HTML
            // We set the width to 0 first, then trigger it after a tiny delay
            const currentWidth = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = currentWidth;
            }, 150);
        });
    };

    if ('IntersectionObserver' in window && skillsSection) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    observer.unobserve(entry.target); // Trigger only once
                }
            });
        }, { threshold: 0.15 });

        skillsObserver.observe(skillsSection);
    } else {
        // Fallback for browsers without IntersectionObserver
        animateProgressBars();
    }

    // ==========================================
    // 5. CONTACT FORM SUBMISSION (MOCKED ACTION)
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const toastClose = document.getElementById('toastClose');

    if (contactForm && toast) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Mock API Submission - simulation
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnHTML = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
            
            setTimeout(() => {
                // Reset submit button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
                
                // Show success toast notification
                toast.classList.add('show');
                contactForm.reset();
                
                // Automatically hide toast after 5 seconds
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 5000);
            }, 1500);
        });

        toastClose.addEventListener('click', () => {
            toast.classList.remove('show');
        });
    }

    // ==========================================
    // 6. SIMULATED INTERACTIVE AI ASSISTANT WIDGET
    // ==========================================
    const aiWidget = document.getElementById('aiWidget');
    const aiToggle = document.getElementById('aiToggle');
    const aiChatWindow = document.getElementById('aiChatWindow');
    const aiChatClose = document.getElementById('aiChatClose');
    const aiChatMessages = document.getElementById('aiChatMessages');
    const aiChatForm = document.getElementById('aiChatForm');
    const aiInput = document.getElementById('aiInput');
    const suggestedBtns = document.querySelectorAll('.suggested-btn');

    // Toggle Chat window view
    if (aiToggle && aiChatWindow) {
        aiToggle.addEventListener('click', () => {
            aiChatWindow.classList.toggle('open');
            if (aiChatWindow.classList.contains('open')) {
                setTimeout(() => aiInput.focus(), 300);
            }
        });

        aiChatClose.addEventListener('click', () => {
            aiChatWindow.classList.remove('open');
        });
    }

    // Predefined AI Q&A dataset representing Jeevanantham's Resume
    const aiResponses = {
        skills: `Jeevanantham C is highly skilled in:
• <strong>Frontend:</strong> React.js, JavaScript (ES6+), HTML5, CSS3, Responsive Layouts.
• <strong>Backend:</strong> Node.js, Express.js, Python, Java.
• <strong>Databases:</strong> MongoDB, MySQL, PostgreSQL.
• <strong>Tools:</strong> Git & GitHub, VS Code, CLI / Terminal.`,
        
        projects: `Jeevanantham has completed 3 impressive core projects:
1. <strong>Music Streaming Hub (Spotify-inspired):</strong> Built using the MERN stack. Includes search, playlists, and real-time audio playback controls.
2. <strong>AI Chatbot (ChatGPT-inspired):</strong> Integrates Natural Language Processing APIs for real-time streaming replies. Includes local history storage.
3. <strong>E-Commerce Shopping Website (Flipkart-inspired):</strong> Full-stack shopping app with catalogs, filters, carts, and order checkout flows.`,
        
        internship: `Jeevanantham worked as an <strong>Artificial Intelligence Intern</strong> at <strong>Codec Technologies</strong>. During this virtual role, he:
• Built Python-based automation and machine learning model mockups.
• Processed datasets for practical applications of AI.
• Gained hands-on experience in corporate AI workflows and agile team collaboration.`,
        
        contact: `You can reach out to Jeevanantham directly:
• 📧 <strong>Email:</strong> <a href="mailto:jeevanantham00721@gmail.com" class="text-accent">jeevanantham00721@gmail.com</a>
• 📞 <strong>Phone:</strong> <a href="tel:7010847970" class="text-accent">7010847970</a>
• 🔗 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/jeevanantham00721" target="_blank" class="text-accent">jeevanantham00721</a>
• 💻 <strong>GitHub:</strong> <a href="https://github.com/jeevanantham00721" target="_blank" class="text-accent">jeevanantham00721</a>`,
        
        education: `Jeevanantham holds a <strong>Bachelor of Engineering (B.E.) in Computer Science & Engineering</strong> from <strong>C.S.I. Institute of Technology, Thovalai</strong> (Affiliated to Anna University).
🎓 <strong>Academic Performance:</strong> CGPA of <strong>8.63</strong>.`,
        
        certifications: `He has earned the following professional qualifications:
• 🏆 <strong>Java Programming</strong> — 84% score, NPTEL
• 🤖 <strong>AI for Management</strong> — 70% score, NPTEL
• 💻 <strong>Full Stack Web Dev (Vue & Node.js)</strong> — Infosys Springboard
• 🌐 <strong>Complete Front-End Technology</strong> — IBM`,
        
        strengths: `Jeevanantham's primary strengths include:
• 🧠 <strong>Structured Problem-Solving:</strong> Logical approach to code design and system debugging.
• ⚡ <strong>Fast Learner:</strong> Able to quickly adopt new frameworks, architectures, and guidelines.
• 👥 <strong>Communicator:</strong> Works effectively in remote developer pods and cross-functional team projects.`,
        
        default: `I'm not sure I understand that question. Try asking me about Jeevanantham's <strong>skills</strong>, <strong>projects</strong>, <strong>internship</strong>, <strong>certifications</strong>, or <strong>how to contact him</strong>!`
    };

    // Helper: Scroll chat to bottom
    const scrollToBottom = () => {
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    };

    // Helper: Add Message bubble
    const addMessage = (text, sender) => {
        const bubble = document.createElement('div');
        bubble.classList.add('chat-bubble', sender === 'user' ? 'user-msg' : 'ai-msg');
        bubble.innerHTML = `<p>${text}</p>`;
        aiChatMessages.appendChild(bubble);
        scrollToBottom();
    };

    // Helper: Typwriter Effect for AI replies
    const addTypewriterMessage = (htmlText) => {
        const bubble = document.createElement('div');
        bubble.classList.add('chat-bubble', 'ai-msg');
        // Create an inner paragraph
        const p = document.createElement('p');
        bubble.appendChild(p);
        aiChatMessages.appendChild(bubble);
        scrollToBottom();

        // Strip HTML tags for character indexing, or print chunks
        // To support strong/a HTML tags safely, we can insert the HTML immediately but reveal characters gradually.
        // For portfolio simplicity and robustness, we can render HTML directly but apply a subtle fade-in transition
        p.innerHTML = htmlText;
        bubble.style.opacity = '0';
        bubble.style.transform = 'translateY(10px)';
        setTimeout(() => {
            bubble.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            bubble.style.opacity = '1';
            bubble.style.transform = 'translateY(0)';
            scrollToBottom();
        }, 50);
    };

    // Helper: Process and Respond to user question
    const handleUserQuestion = (questionText) => {
        // Render user bubble
        addMessage(questionText, 'user');
        
        // Render typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('chat-bubble', 'ai-msg', 'typing-indicator-wrapper');
        typingIndicator.innerHTML = `
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        aiChatMessages.appendChild(typingIndicator);
        scrollToBottom();

        // Process query keyword
        const query = questionText.toLowerCase();
        let replyKey = 'default';

        if (query.includes('skill') || query.includes('languages') || query.includes('technologies')) {
            replyKey = 'skills';
        } else if (query.includes('project') || query.includes('portfolio') || query.includes('work')) {
            replyKey = 'projects';
        } else if (query.includes('intern') || query.includes('experience') || query.includes('work') || query.includes('codec')) {
            replyKey = 'internship';
        } else if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('call') || query.includes('hire')) {
            replyKey = 'contact';
        } else if (query.includes('education') || query.includes('college') || query.includes('degree') || query.includes('cgpa')) {
            replyKey = 'education';
        } else if (query.includes('certif') || query.includes('credential') || query.includes('nptel') || query.includes('ibm')) {
            replyKey = 'certifications';
        } else if (query.includes('strength') || query.includes('good at') || query.includes('quality')) {
            replyKey = 'strengths';
        } else if (query.includes('hi') || query.includes('hello') || query.includes('hey') || query.includes('greet')) {
            replyKey = 'default'; // Let it show greetings
            aiResponses.default = `Hello! How can I help you today? Ask me about Jeevanantham's <strong>skills</strong>, <strong>projects</strong>, or <strong>internship</strong>!`;
        }

        // Simulate typing latency
        setTimeout(() => {
            // Remove typing loader
            const loaders = aiChatMessages.querySelectorAll('.typing-indicator-wrapper');
            loaders.forEach(l => l.remove());
            
            // Output reply
            addTypewriterMessage(aiResponses[replyKey]);
        }, 1200);
    };

    // Chat Submission Action
    if (aiChatForm) {
        aiChatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = aiInput.value.trim();
            if (!text) return;
            
            handleUserQuestion(text);
            aiInput.value = '';
        });
    }

    // Suggested Questions button clicks
    suggestedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            handleUserQuestion(question);
        });
    });

    // ==========================================
    // 7. MINIMAL BACKGROUND PARTICLES RENDERER
    // ==========================================
    const particlesCanvas = document.getElementById('particlesCanvas');
    if (particlesCanvas) {
        const pCtx = particlesCanvas.getContext('2d');
        let particlesArray = [];
        const numberOfParticles = 25; // Keep it lightweight and clean

        // Determine particle color dynamically based on light/dark mode
        const getParticleColor = () => {
            const theme = document.documentElement.getAttribute('data-theme') || 'dark';
            return theme === 'light' 
                ? 'rgba(15, 118, 110, 0.12)'   // Light mode: subtle dark teal
                : 'rgba(102, 252, 241, 0.22)';  // Dark mode: glowing cyber cyan
        };

        class Particle {
            constructor() {
                this.x = Math.random() * particlesCanvas.width;
                this.y = Math.random() * particlesCanvas.height;
                this.size = Math.random() * 1.5 + 0.6; // 0.6px to 2.1px diameter
                this.speedX = Math.random() * 0.3 - 0.15; // Slow horizontal motion
                this.speedY = Math.random() * 0.3 - 0.15; // Slow vertical motion
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Infinite wrap-around bounds checking
                if (this.x > particlesCanvas.width) this.x = 0;
                else if (this.x < 0) this.x = particlesCanvas.width;
                
                if (this.y > particlesCanvas.height) this.y = 0;
                else if (this.y < 0) this.y = particlesCanvas.height;
            }

            draw() {
                pCtx.fillStyle = getParticleColor();
                pCtx.beginPath();
                pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                pCtx.closePath();
                pCtx.fill();
            }
        }

        const initParticles = () => {
            particlesArray = [];
            particlesCanvas.width = window.innerWidth;
            particlesCanvas.height = window.innerHeight;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        };

        const animateParticles = () => {
            pCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
            particlesArray.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        };

        // Window resize event handling
        window.addEventListener('resize', () => {
            particlesCanvas.width = window.innerWidth;
            particlesCanvas.height = window.innerHeight;
            initParticles();
        });

        // Initialize and execute loop
        initParticles();
        animateParticles();
    }
});
