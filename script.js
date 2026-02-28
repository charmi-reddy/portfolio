
const state = {
    activeTab: 'home',
    tabs: ['home'],
    isFullscreen: false
};

function initNeuralNetwork() {
    const canvas = document.getElementById('neuralCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    const connectionDistance = 180;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.radius = Math.random() * 2.5 + 1.5;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            // Outer glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius + 2, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius + 2);
            gradient.addColorStop(0, 'rgba(168, 85, 247, 0.8)');
            gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#a855f7';
            ctx.shadowColor = '#a855f7';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.6;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
                    ctx.lineWidth = 1.5;
                    ctx.shadowColor = '#a855f7';
                    ctx.shadowBlur = 5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Navigation order
const navOrder = ['home', 'about', 'techstack', 'projects', 'contact'];

function getNavButtons(currentTab) {
    const currentIndex = navOrder.indexOf(currentTab);
    const prevTab = currentIndex > 0 ? navOrder[currentIndex - 1] : null;
    const nextTab = currentIndex < navOrder.length - 1 ? navOrder[currentIndex + 1] : null;
    
    return `
        <div class="flex justify-between items-center pt-12 mt-12 border-t border-purple-900/20">
            ${prevTab ? `
                <button onclick="openTab('${prevTab}')" class="flex items-center gap-2 px-6 py-3 bg-purple-950/20 border border-purple-900/30 rounded-lg hover:bg-purple-950/40 hover:border-purple-500 transition-all group">
                    <i data-lucide="chevron-left" class="w-4 h-4 text-purple-500 group-hover:text-purple-400"></i>
                    <span class="text-purple-300 group-hover:text-white text-sm mono uppercase tracking-wider">Previous</span>
                </button>
            ` : '<div></div>'}
            
            ${nextTab ? `
                <button onclick="openTab('${nextTab}')" class="flex items-center gap-2 px-6 py-3 bg-purple-950/20 border border-purple-900/30 rounded-lg hover:bg-purple-950/40 hover:border-purple-500 transition-all group">
                    <span class="text-purple-300 group-hover:text-white text-sm mono uppercase tracking-wider">Next</span>
                    <i data-lucide="chevron-right" class="w-4 h-4 text-purple-500 group-hover:text-purple-400"></i>
                </button>
            ` : '<div></div>'}
        </div>
    `;
}

const apps = {
    home: {
        name: 'Home',
        icon: 'home',
        content: () => `
            <div class="content-section spine py-20 px-6 space-y-24 relative">
                <section class="space-y-12 relative">
                    <div class="space-y-4">
                        <span class="text-[10px] mono uppercase tracking-[0.5em] text-purple-800">AI/ML Developer</span>
                        <h1 class="text-6xl md:text-[8rem] font-bold tracking-tighter text-white leading-[0.85]">
                            P CHARMI<br/><span class="text-purple-500">REDDY.</span>
                        </h1>
                    </div>
                    <p class="text-xl md:text-2xl text-purple-300/60 font-light leading-tight max-w-xl tracking-tight">
                        Building intelligent systems that learn, adapt, and transform data into <span class="text-white">actionable insights</span>.
                    </p>
                    
                    <!-- Scroll Indicator - appears right after bio -->
                    <div class="scroll-indicator" id="scrollIndicator">
                        <div class="scroll-mouse">
                            <div class="scroll-wheel"></div>
                        </div>
                        <i data-lucide="chevron-down" class="scroll-arrow w-4 h-4"></i>
                    </div>
                </section>

                <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button onclick="openTab('about')" class="card-purple p-10 text-left group">
                        <div class="flex justify-between items-start mb-16">
                            <i data-lucide="user" class="text-purple-500 w-7 h-7"></i>
                            <i data-lucide="arrow-up-right" class="text-purple-900 group-hover:text-purple-400 transition-colors w-5 h-5"></i>
                        </div>
                        <h3 class="text-2xl font-semibold text-white mb-3">About Me</h3>
                        <p class="text-sm text-purple-400/60 mono uppercase tracking-wider">Background & Journey</p>
                    </button>

                    <button onclick="openTab('techstack')" class="card-purple p-10 text-left group">
                        <div class="flex justify-between items-start mb-16">
                            <i data-lucide="code-2" class="text-purple-500 w-7 h-7"></i>
                            <i data-lucide="arrow-up-right" class="text-purple-900 group-hover:text-purple-400 transition-colors w-5 h-5"></i>
                        </div>
                        <h3 class="text-2xl font-semibold text-white mb-3">Tech Stack</h3>
                        <p class="text-sm text-purple-400/60 mono uppercase tracking-wider">Tools & Technologies</p>
                    </button>

                    <button onclick="openTab('projects')" class="card-purple p-10 text-left group">
                        <div class="flex justify-between items-start mb-16">
                            <i data-lucide="folder-git-2" class="text-purple-500 w-7 h-7"></i>
                            <i data-lucide="arrow-up-right" class="text-purple-900 group-hover:text-purple-400 transition-colors w-5 h-5"></i>
                        </div>
                        <h3 class="text-2xl font-semibold text-white mb-3">Projects</h3>
                        <p class="text-sm text-purple-400/60 mono uppercase tracking-wider">Featured Work</p>
                    </button>

                    <button onclick="openTab('contact')" class="card-purple p-10 text-left group">
                        <div class="flex justify-between items-start mb-16">
                            <i data-lucide="mail" class="text-purple-500 w-7 h-7"></i>
                            <i data-lucide="arrow-up-right" class="text-purple-900 group-hover:text-purple-400 transition-colors w-5 h-5"></i>
                        </div>
                        <h3 class="text-2xl font-semibold text-white mb-3">Contact</h3>
                        <p class="text-sm text-purple-400/60 mono uppercase tracking-wider">Get in Touch</p>
                    </button>
                </section>

                <footer class="pt-20 border-t border-purple-900/20 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] mono uppercase tracking-[0.2em] text-purple-900">
                    <span>AI_ML_PORTFOLIO_2024</span>
                    <span>© 2024 / ALL RIGHTS RESERVED</span>
                </footer>
                
                ${getNavButtons('home')}
            </div>
        `
    },
    about: {
        name: 'About',
        icon: 'user',
        content: () => `
            <div class="content-section spine py-24 px-6 space-y-16">
                <header class="space-y-6">
                    <h2 class="text-5xl text-white font-bold tracking-tighter">About Me</h2>
                    <div class="h-px w-full bg-purple-900/20"></div>
                </header>

                <div class="space-y-12">
                    <div class="space-y-6">
                        <h3 class="text-2xl text-purple-400 font-medium">Background</h3>
                        <p class="text-lg text-purple-300/70 leading-relaxed">
                            I'm an AI/ML enthusiast passionate about leveraging cutting-edge technologies to solve real-world problems. 
                            Currently pursuing my degree in Computer Science with a focus on Artificial Intelligence and Machine Learning.
                        </p>
                        <p class="text-lg text-purple-300/70 leading-relaxed">
                            My journey in tech started with curiosity about how machines can learn and make decisions. 
                            Today, I build intelligent systems that transform complex data into meaningful insights.
                        </p>
                    </div>

                    <div class="space-y-6">
                        <h3 class="text-2xl text-purple-400 font-medium">What I Do</h3>
                        <div class="grid gap-4">
                            <div class="p-6 bg-purple-950/20 border border-purple-900/20 rounded-xl">
                                <h4 class="text-white font-medium mb-2">Machine Learning</h4>
                                <p class="text-sm text-purple-400/60">Building predictive models and classification systems</p>
                            </div>
                            <div class="p-6 bg-purple-950/20 border border-purple-900/20 rounded-xl">
                                <h4 class="text-white font-medium mb-2">Natural Language Processing</h4>
                                <p class="text-sm text-purple-400/60">Working with text analysis and prompt engineering</p>
                            </div>
                            <div class="p-6 bg-purple-950/20 border border-purple-900/20 rounded-xl">
                                <h4 class="text-white font-medium mb-2">Web Development</h4>
                                <p class="text-sm text-purple-400/60">Creating responsive and interactive applications</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                ${getNavButtons('about')}
            </div>
        `
    },
    techstack: {
        name: 'Tech Stack',
        icon: 'code-2',
        content: () => `
            <div class="content-section spine py-24 px-6 space-y-16">
                <header class="space-y-6">
                    <h2 class="text-5xl text-white font-bold tracking-tighter">Tech Stack</h2>
                    <div class="h-px w-full bg-purple-900/20"></div>
                </header>

                <div class="space-y-12">
                    <div class="space-y-6">
                        <h3 class="text-xl text-purple-400 font-medium mono uppercase tracking-wider">Languages</h3>
                        <div class="flex flex-wrap gap-3">
                            <span class="tech-tag mono text-white">HTML</span>
                            <span class="tech-tag mono text-white">CSS</span>
                            <span class="tech-tag mono text-white">JavaScript</span>
                            <span class="tech-tag mono text-white">Python</span>
                            <span class="tech-tag mono text-white">Java</span>
                            <span class="tech-tag mono text-white">C</span>
                            <span class="tech-tag mono text-white">C++</span>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <h3 class="text-xl text-purple-400 font-medium mono uppercase tracking-wider">Libraries / Frameworks</h3>
                        <div class="flex flex-wrap gap-3">
                            <span class="tech-tag mono text-white">NumPy</span>
                            <span class="tech-tag mono text-white">Pandas</span>
                            <span class="tech-tag mono text-white">Matplotlib</span>
                            <span class="tech-tag mono text-white">Tailwind CSS</span>
                            <span class="tech-tag mono text-white">Flask</span>
                            <span class="tech-tag mono text-white">Streamlit</span>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <h3 class="text-xl text-purple-400 font-medium mono uppercase tracking-wider">Tools & Platforms</h3>
                        <div class="flex flex-wrap gap-3">
                            <span class="tech-tag mono text-white">Git</span>
                            <span class="tech-tag mono text-white">GitHub</span>
                            <span class="tech-tag mono text-white">MySQL</span>
                            <span class="tech-tag mono text-white">APIs</span>
                            <span class="tech-tag mono text-white">Google Colab</span>
                            <span class="tech-tag mono text-white">Docker</span>
                            <span class="tech-tag mono text-white">n8n</span>
                            <span class="tech-tag mono text-white">Jupyter Notebook</span>
                            <span class="tech-tag mono text-white">Vercel</span>
                        </div>
                    </div>
                </div>
                
                ${getNavButtons('techstack')}
            </div>
        `
    },
    projects: {
        name: 'Projects',
        icon: 'folder-git-2',
        content: () => `
            <div class="content-section spine py-24 px-6 space-y-16">
                <header class="space-y-6">
                    <h2 class="text-5xl text-white font-bold tracking-tighter">Featured Projects</h2>
                    <div class="h-px w-full bg-purple-900/20"></div>
                </header>

                <div class="space-y-8">
                    <div class="project-card group">
                        <div class="relative z-10">
                            <div class="flex justify-between items-start mb-4">
                                <h3 class="text-2xl font-semibold text-white group-hover:text-purple-400 transition-colors">Prompt Improver</h3>
                                <a href="#" class="text-purple-500 hover:text-purple-400 transition-colors">
                                    <i data-lucide="github" class="w-5 h-5"></i>
                                </a>
                            </div>
                            <div class="flex gap-2 mb-4">
                                <span class="text-[10px] mono text-purple-700 bg-purple-950/40 px-3 py-1 rounded-full">PYTHON</span>
                                <span class="text-[10px] mono text-purple-700 bg-purple-950/40 px-3 py-1 rounded-full">PROMPT ENGINEERING</span>
                            </div>
                            <ul class="space-y-3 text-purple-300/70">
                                <li class="flex gap-3">
                                    <span class="text-purple-500 mt-1">•</span>
                                    <span>Built a meta-AI system that rewrites prompts to improve LLM response coherence and intent alignment.</span>
                                </li>
                                <li class="flex gap-3">
                                    <span class="text-purple-500 mt-1">•</span>
                                    <span>Increased output relevance across 50+ prompt variants by systematically reducing ambiguity and noise.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="project-card group">
                        <div class="relative z-10">
                            <div class="flex justify-between items-start mb-4">
                                <h3 class="text-2xl font-semibold text-white group-hover:text-purple-400 transition-colors">SGPA to CGPA Calculator</h3>
                                <a href="#" class="text-purple-500 hover:text-purple-400 transition-colors">
                                    <i data-lucide="external-link" class="w-5 h-5"></i>
                                </a>
                            </div>
                            <div class="flex gap-2 mb-4">
                                <span class="text-[10px] mono text-purple-700 bg-purple-950/40 px-3 py-1 rounded-full">HTML</span>
                                <span class="text-[10px] mono text-purple-700 bg-purple-950/40 px-3 py-1 rounded-full">CSS</span>
                                <span class="text-[10px] mono text-purple-700 bg-purple-950/40 px-3 py-1 rounded-full">JAVASCRIPT</span>
                            </div>
                            <ul class="space-y-3 text-purple-300/70">
                                <li class="flex gap-3">
                                    <span class="text-purple-500 mt-1">•</span>
                                    <span>Built a responsive academic utility used by 200+ students, reducing manual grade calculation time by 95%.</span>
                                </li>
                                <li class="flex gap-3">
                                    <span class="text-purple-500 mt-1">•</span>
                                    <span>Implemented client-side validation and edge-case handling, eliminating 90% of common user input errors.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="project-card group">
                        <div class="relative z-10">
                            <div class="flex justify-between items-start mb-4">
                                <h3 class="text-2xl font-semibold text-white group-hover:text-purple-400 transition-colors">Resume Checker</h3>
                                <a href="#" class="text-purple-500 hover:text-purple-400 transition-colors">
                                    <i data-lucide="external-link" class="w-5 h-5"></i>
                                </a>
                            </div>
                            <div class="flex gap-2 mb-4">
                                <span class="text-[10px] mono text-purple-700 bg-purple-950/40 px-3 py-1 rounded-full">PYTHON</span>
                                <span class="text-[10px] mono text-purple-700 bg-purple-950/40 px-3 py-1 rounded-full">STREAMLIT</span>
                                <span class="text-[10px] mono text-purple-700 bg-purple-950/40 px-3 py-1 rounded-full">NLP</span>
                            </div>
                            <ul class="space-y-3 text-purple-300/70">
                                <li class="flex gap-3">
                                    <span class="text-purple-500 mt-1">•</span>
                                    <span>Engineered an AI-based resume evaluation system scoring structure, clarity, and relevance.</span>
                                </li>
                                <li class="flex gap-3">
                                    <span class="text-purple-500 mt-1">•</span>
                                    <span>Combined heuristic rules with NLP features to deliver actionable feedback and confidence scoring.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="project-card group">
                        <div class="relative z-10">
                            <div class="flex justify-between items-start mb-4">
                                <h3 class="text-2xl font-semibold text-white group-hover:text-purple-400 transition-colors">StoryMorph</h3>
                                <a href="#" class="text-purple-500 hover:text-purple-400 transition-colors">
                                    <i data-lucide="github" class="w-5 h-5"></i>
                                </a>
                            </div>
                            <div class="flex gap-2 mb-4">
                                <span class="text-[10px] mono text-purple-700 bg-purple-950/40 px-3 py-1 rounded-full">PYTHON</span>
                                <span class="text-[10px] mono text-purple-700 bg-purple-950/40 px-3 py-1 rounded-full">NLP</span>
                                <span class="text-[10px] mono text-purple-700 bg-purple-950/40 px-3 py-1 rounded-full">GENERATIVE AI</span>
                            </div>
                            <ul class="space-y-3 text-purple-300/70">
                                <li class="flex gap-3">
                                    <span class="text-purple-500 mt-1">•</span>
                                    <span>Developed a controlled text-generation engine supporting tone, era, and cultural localization.</span>
                                </li>
                                <li class="flex gap-3">
                                    <span class="text-purple-500 mt-1">•</span>
                                    <span>Generated coherent narrative variants across 5+ stylistic dimensions using prompt-conditioned generation.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                ${getNavButtons('projects')}
            </div>
        `
    },
    contact: {
        name: 'Contact',
        icon: 'mail',
        content: () => `
            <div class="content-section spine py-24 px-6 space-y-16">
                <header class="space-y-6">
                    <h2 class="text-5xl text-white font-bold tracking-tighter">Get In Touch</h2>
                    <div class="h-px w-full bg-purple-900/20"></div>
                    <p class="text-xl text-purple-300/60">
                        Open to collaborations, opportunities, and discussions about AI/ML projects.
                    </p>
                </header>

                <div class="space-y-4">
                    <a href="mailto:your.email@example.com" class="flex items-center justify-between p-8 border border-purple-900/10 bg-purple-950/5 hover:border-purple-500/30 rounded-xl transition-all group">
                        <div class="flex items-center gap-4">
                            <i data-lucide="mail" class="text-purple-500 w-6 h-6"></i>
                            <span class="text-white font-medium text-lg">Email</span>
                        </div>
                        <span class="text-purple-700 group-hover:text-purple-400 mono text-sm transition-colors">your.email@example.com</span>
                    </a>
                    <a href="https://github.com/yourusername" target="_blank" class="flex items-center justify-between p-8 border border-purple-900/10 bg-purple-950/5 hover:border-purple-500/30 rounded-xl transition-all group">
                        <div class="flex items-center gap-4">
                            <i data-lucide="github" class="text-purple-500 w-6 h-6"></i>
                            <span class="text-white font-medium text-lg">GitHub</span>
                        </div>
                        <span class="text-purple-700 group-hover:text-purple-400 mono text-sm transition-colors">github.com/yourusername</span>
                    </a>
                    <a href="https://linkedin.com/in/yourprofile" target="_blank" class="flex items-center justify-between p-8 border border-purple-900/10 bg-purple-950/5 hover:border-purple-500/30 rounded-xl transition-all group">
                        <div class="flex items-center gap-4">
                            <i data-lucide="linkedin" class="text-purple-500 w-6 h-6"></i>
                            <span class="text-white font-medium text-lg">LinkedIn</span>
                        </div>
                        <span class="text-purple-700 group-hover:text-purple-400 mono text-sm transition-colors">linkedin.com/in/yourprofile</span>
                    </a>
                    <a href="https://twitter.com/yourusername" target="_blank" class="flex items-center justify-between p-8 border border-purple-900/10 bg-purple-950/5 hover:border-purple-500/30 rounded-xl transition-all group">
                        <div class="flex items-center gap-4">
                            <i data-lucide="twitter" class="text-purple-500 w-6 h-6"></i>
                            <span class="text-white font-medium text-lg">Twitter / X</span>
                        </div>
                        <span class="text-purple-700 group-hover:text-purple-400 mono text-sm transition-colors">@yourusername</span>
                    </a>
                </div>
                
                ${getNavButtons('contact')}
            </div>
        `
    }
};

// Custom Cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%, -50%) scale(0.8)');
document.addEventListener('mouseup', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');

// Interface Management
function renderTabs() {
    const tabBar = document.getElementById('tabBar');
    tabBar.innerHTML = state.tabs.map(tabKey => {
        const app = apps[tabKey];
        const isActive = state.activeTab === tabKey;
        return `
            <button 
                onclick="switchTab('${tabKey}')"
                class="h-full px-6 flex items-center gap-2 text-[10px] mono uppercase tracking-widest transition-all
                ${isActive ? 'tab-active' : 'text-purple-900/60 hover:text-purple-400'}"
            >
                <i data-lucide="${app.icon}" class="w-3 h-3"></i>
                ${app.name}
                ${tabKey !== 'home' ? `<span onclick="closeTab('${tabKey}', event)" class="ml-2 hover:text-white transition-colors">×</span>` : ''}
            </button>
        `;
    }).join('');
    lucide.createIcons();
}

function renderContent() {
    const contentArea = document.getElementById('contentArea');
    const app = apps[state.activeTab];
    contentArea.innerHTML = app.content();
    
    // Scroll to top when content changes
    contentArea.scrollTop = 0;
    
    lucide.createIcons();
    
    document.querySelectorAll('button, a').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });

    // Add scroll listener to hide indicator when user scrolls (only on home page)
    if (state.activeTab === 'home') {
        setTimeout(() => {
            const scrollIndicator = document.getElementById('scrollIndicator');
            if (scrollIndicator) {
                contentArea.addEventListener('scroll', function hideOnScroll() {
                    if (contentArea.scrollTop > 50) {
                        scrollIndicator.style.opacity = '0';
                        scrollIndicator.style.transition = 'opacity 0.3s ease';
                    } else {
                        scrollIndicator.style.opacity = '0.6';
                    }
                });
            }
        }, 100);
    }
}

function openTab(tabKey) {
    if (!state.tabs.includes(tabKey)) {
        state.tabs.push(tabKey);
    }
    state.activeTab = tabKey;
    renderTabs();
    renderContent();
}

function switchTab(tabKey) {
    state.activeTab = tabKey;
    renderTabs();
    renderContent();
}

function closeTab(tabKey, e) {
    e.stopPropagation();
    state.tabs = state.tabs.filter(t => t !== tabKey);
    if (state.activeTab === tabKey) {
        state.activeTab = state.tabs[state.tabs.length - 1] || 'home';
    }
    renderTabs();
    renderContent();
}

function handleTrafficLight(action) {
    const app = document.getElementById('app');
    
    if (action === 'close') {
        // Close current tab only (not all tabs)
        if (state.activeTab !== 'home') {
            const currentTab = state.activeTab;
            state.tabs = state.tabs.filter(t => t !== currentTab);
            state.activeTab = state.tabs[state.tabs.length - 1] || 'home';
            renderTabs();
            renderContent();
        }
    } else if (action === 'maximize') {
        state.isFullscreen = !state.isFullscreen;
        if (state.isFullscreen) {
            app.classList.add('fullscreen');
        } else {
            app.classList.remove('fullscreen');
        }
    }
}

function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('en-US', { hour12: false });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    initNeuralNetwork();
    renderTabs();
    renderContent();
    setInterval(updateClock, 1000);
    updateClock();
});
