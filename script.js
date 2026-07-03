document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    }

    // 2. Navigation Menu Toggle (Mobile)
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 3. Sticky Navbar & Scroll Progress Indicator
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        // Sticky Navbar state
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress Line
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }

        // Active Navigation Link on Scroll
        let currentSection = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // 4. Typing Text Effect
    const typedTarget = document.getElementById('typed-target');
    const roles = ['Software Developer', 'Data Analyst', 'Python Developer', 'React Enthusiast'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typedTarget.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typedTarget.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 1500; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    if (typedTarget) {
        setTimeout(typeEffect, 500);
    }

    // 5. Skill Bars Animation on Scroll
    const skillSection = document.getElementById('about');
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const progress = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = progress;
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });

    if (skillSection) {
        skillObserver.observe(skillSection);
    }

    // 6. Portfolio Cards Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and add to current
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 7. Projects Modal Details
    const projectModal = document.getElementById('project-modal');
    const modalContentTarget = document.getElementById('modal-content-target');
    const modalCloseBtn = projectModal.querySelector('.modal-close');
    const modalBackdrop = projectModal.querySelector('.modal-backdrop');
    const viewDetailsButtons = document.querySelectorAll('.view-project-details');

    const projectData = {
        '1': {
            title: 'IMDB Movie Review Sentiment Analysis using LSTM',
            tag: 'Machine Learning / NLP',
            desc: 'A deep learning project designed to evaluate sentiment in movie reviews using Long Short-Term Memory (LSTM) networks, deployed interactively.',
            features: [
                'Developed a deep learning model using LSTM to classify IMDB movie reviews as positive or negative.',
                'Performed NLP preprocessing including tokenization, stopword removal, and sequence padding using NLTK and Keras.',
                'Built a Streamlit web application to enable interactive sentiment analysis for single and batch review predictions.'
            ],
            tech: ['Python', 'LSTM', 'Keras', 'NLTK', 'Streamlit', 'Git']
        },
        '2': {
            title: 'Interactive Resume Dashboard',
            tag: 'Frontend & React',
            desc: 'A premium single-page visual resume dashboard constructed to showcase personal skills, tools, and background analytics.',
            features: [
                'Designed responsive custom layouts using Material UI (MUI) components.',
                'Implemented client-side interactivity, theme customization, and smooth navigation animations.',
                'Organized clean, reusable React components with persistent configuration.'
            ],
            tech: ['React.js', 'Material UI (MUI)', 'HTML5', 'CSS3', 'JavaScript']
        },
        '3': {
            title: 'EDA on Sales Datasets',
            tag: 'Data Analytics',
            desc: 'An analytical dashboard and reporting script executing exploratory analysis on transactional retail sales data.',
            features: [
                'Conducted rigorous data cleaning, handling null values and datatype corrections.',
                'Created rich plots (bar charts, line plots, heatmaps) to outline sales trends using Matplotlib and Seaborn.',
                'Wrote advanced SQL queries to filter, aggregate, and slice customer metrics in PostgreSQL.'
            ],
            tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'SQL', 'PostgreSQL']
        }
    };


    viewDetailsButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const data = projectData[projectId];

            if (data) {
                // Populate Modal content
                modalContentTarget.innerHTML = `
                    <span class="project-detail-tag">${data.tag}</span>
                    <h2>${data.title}</h2>
                    <p>${data.desc}</p>
                    <h4>Key Accomplishments</h4>
                    <ul>
                        ${data.features.map(feat => `<li><i class="fa-solid fa-chevron-right"></i> <span>${feat}</span></li>`).join('')}
                    </ul>
                    <h4>Technologies Utilized</h4>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 30px;">
                        ${data.tech.map(t => `<span style="background-color: var(--bg-tertiary); border: 1px solid var(--border-color); padding: 6px 12px; border-radius: 4px; font-size: 13px; font-weight: 500;">${t}</span>`).join('')}
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-primary" onclick="alert('Redirecting to demo...')">Launch App</button>
                        <button class="btn btn-secondary" onclick="alert('Redirecting to source...')">Source Code</button>
                    </div>
                `;

                // Open modal
                projectModal.classList.add('open');
                projectModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    function closeModal() {
        projectModal.classList.remove('open');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore background scrolling
    }

    modalCloseBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('open')) {
            closeModal();
        }
    });

    // 8. Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const formStatusMsg = document.getElementById('form-status-msg');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const inputs = contactForm.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            const formGroup = input.parentElement;
            if (!input.value.trim()) {
                formGroup.classList.add('invalid');
                isValid = false;
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                formGroup.classList.add('invalid');
                isValid = false;
            } else {
                formGroup.classList.remove('invalid');
            }
        });

        if (isValid) {
            const submitBtn = contactForm.querySelector('.submit-btn');
            const submitBtnText = submitBtn.querySelector('span');
            const submitBtnIcon = submitBtn.querySelector('i');

            // Visual sending state
            submitBtn.disabled = true;
            submitBtnText.textContent = 'Sending...';
            submitBtnIcon.className = 'fa-solid fa-spinner fa-spin';

            // Simulate server request
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtnText.textContent = 'Send Message';
                submitBtnIcon.className = 'fa-solid fa-paper-plane';

                formStatusMsg.textContent = 'Thank you! Your message has been sent successfully.';
                formStatusMsg.className = 'form-status-msg success';
                
                // Clear form
                contactForm.reset();
                
                // Clear validation classes
                inputs.forEach(input => {
                    input.parentElement.classList.remove('invalid');
                });

                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatusMsg.style.opacity = '0';
                    setTimeout(() => {
                        formStatusMsg.textContent = '';
                        formStatusMsg.className = 'form-status-msg';
                        formStatusMsg.style.opacity = '1';
                    }, 300);
                }, 5000);

            }, 1500);
        }
    });

    // Remove invalid class on input
    const formFields = contactForm.querySelectorAll('input, textarea');
    formFields.forEach(field => {
        field.addEventListener('input', () => {
            if (field.value.trim()) {
                field.parentElement.classList.remove('invalid');
            }
        });
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
