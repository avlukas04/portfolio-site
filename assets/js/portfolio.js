/**
 * ANDREA LUKAS - PORTFOLIO INTERACTIVE LOGIC
 * High-performance, clean vanilla JS powering story lenses, MCP terminal,
 * video players, case study drawers, and theme controls.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initStoryNavigation();
  initProjectFiltering();
  initGlassSpotlightAndTilt();
  initTextScramble();
  initMetricCounters();
  initMcpTerminal();
  initMediaTabs();
  initVideoControls();
  initCaseStudyModal();
  initMobileNav();
  initScrollEffects();
});

/* --------------------------------------------------------------------------
   1. Theme Toggle (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('alukas-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });

  function setTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
    }
    localStorage.setItem('alukas-theme', theme);
  }
}

/* --------------------------------------------------------------------------
   2A. Story Chapters Navigation (Pure Section Navigation)
   -------------------------------------------------------------------------- */
function initStoryNavigation() {
  const storyPills = document.querySelectorAll('.story-nav-pill');
  if (!storyPills.length) return;

  storyPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = pill.getAttribute('href')?.replace('#', '');
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        storyPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2B. Dedicated Project Filtering in #work (In-Place Filter, No Page Jumps)
   -------------------------------------------------------------------------- */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const bentoCards = document.querySelectorAll('.bento-card[data-category]');
  const statusBadge = document.getElementById('filterStatusBadge');

  if (!filterBtns.length) return;

  const filterLabels = {
    'all': 'Showing All 7 Projects',
    'ai': 'Showing 6 AI & Autonomous Agents Projects',
    'creative': 'Showing 4 3D & Spatial Systems Projects',
    'systems': 'Showing 5 Distributed Systems & Data Projects'
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Set active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update badge
      if (statusBadge && filterLabels[filter]) {
        statusBadge.textContent = filterLabels[filter];
      }

      // Filter cards in-place with animated entrance
      bentoCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   2C. Hyper-Glass Spotlight & 3D Tilt Micro-Interactions
   -------------------------------------------------------------------------- */
function initGlassSpotlightAndTilt() {
  const glassCards = document.querySelectorAll('.glass-spotlight');

  glassCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Feed coordinates to CSS radial gradient spotlight
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Gentle 3D perspective tilt on Bento cards
      if (card.classList.contains('bento-card') && window.innerWidth > 768) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4.5;
        const rotateY = ((x - centerX) / centerX) * 4.5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', `-500px`);
      card.style.setProperty('--mouse-y', `-500px`);

      if (card.classList.contains('bento-card')) {
        card.style.transition = 'transform 0.4s ease, border-color var(--transition-base), box-shadow var(--transition-base)';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2D. Interactive Cybernetic Font Scramble Effect
   -------------------------------------------------------------------------- */
function initTextScramble() {
  const chars = '!<>-_\\/[]{}—=+*^?#________01ABCDEF';
  const scrambleElements = document.querySelectorAll('[data-scramble]');

  function runScramble(el) {
    if (el.dataset.scrambling === 'true') return;
    el.dataset.scrambling = 'true';

    const original = el.dataset.originalText || el.textContent.trim();
    if (!el.dataset.originalText) {
      el.dataset.originalText = original;
    }

    let iteration = 0;
    const maxIterations = original.length;
    const interval = setInterval(() => {
      el.textContent = original
        .split('')
        .map((char, index) => {
          if (char === ' ' || char === '•' || char === '⚡' || char === '🏆') return char;
          if (index < iteration) {
            return original[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iteration >= maxIterations) {
        clearInterval(interval);
        el.textContent = original;
        el.dataset.scrambling = 'false';
      }

      iteration += 1 / 2;
    }, 28);
  }

  scrambleElements.forEach(el => {
    el.addEventListener('mouseenter', () => runScramble(el));
  });

  // Automatically run once on the hero status badge on load
  const heroBadge = document.querySelector('.hero-badge-container span[data-scramble]');
  if (heroBadge) {
    setTimeout(() => runScramble(heroBadge), 400);
  }
}

/* --------------------------------------------------------------------------
   2E. Smooth Animated Metric Counters
   -------------------------------------------------------------------------- */
function initMetricCounters() {
  const metricsSection = document.querySelector('.metrics-grid');
  const counters = document.querySelectorAll('.counter[data-target]');
  if (!metricsSection || !counters.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !hasAnimated) {
      hasAnimated = true;

      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const duration = 1600;
        let startTime = null;

        function animateCount(timestamp) {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          // Ease out cubic: 1 - Math.pow(1 - progress, 3)
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeOut * target);

          counter.textContent = current;

          if (progress < 1) {
            requestAnimationFrame(animateCount);
          } else {
            counter.textContent = target;
          }
        }

        requestAnimationFrame(animateCount);
      });

      observer.disconnect();
    }
  }, { threshold: 0.3 });

  observer.observe(metricsSection);
}

/* --------------------------------------------------------------------------
   3. Interactive MCP Agent Console / Terminal Easter Egg
   -------------------------------------------------------------------------- */
function initMcpTerminal() {
  const terminalInput = document.getElementById('termInput');
  const terminalOutput = document.getElementById('termOutput');
  const terminalChips = document.querySelectorAll('.term-chip');
  const terminalContainer = document.querySelector('.mcp-terminal-container');
  const heroTrigger = document.getElementById('openTerminalBtn');

  if (heroTrigger && terminalContainer) {
    heroTrigger.addEventListener('click', () => {
      terminalContainer.scrollIntoView({ behavior: 'smooth' });
      terminalContainer.style.borderColor = 'var(--accent-emerald)';
      setTimeout(() => {
        if (terminalInput) terminalInput.focus();
      }, 500);
    });
  }

  const commands = {
    'help': () => `
<div class="term-line"><span class="term-accent">Available MCP Commands:</span></div>
<div class="term-line">  <span class="term-highlight">mcp --inspect</span>    Inspect Andrea's profile, Model Context Protocol integration, and core focus</div>
<div class="term-line">  <span class="term-highlight">model --benchmarks</span> View UC Berkeley Centaur cognitive modeling benchmark metrics</div>
<div class="term-line">  <span class="term-highlight">eval --skills</span>      List verified languages, backend frameworks, and AI toolchains</div>
<div class="term-line">  <span class="term-highlight">cat resume</span>         Download or view full PDF resume</div>
<div class="term-line">  <span class="term-highlight">whoami</span>             Returns visitor context and session stats</div>
<div class="term-line">  <span class="term-highlight">contact</span>            Print direct email, LinkedIn, and GitHub links</div>
<div class="term-line">  <span class="term-highlight">clear</span>              Clear terminal history</div>
`,
    'mcp --inspect': () => `
<div class="term-line"><span class="term-success">● MCP Endpoint Status: ACTIVE (Score: 98.4/100)</span></div>
<pre style="color: #A5B4FC; margin: 0.5rem 0;">
{
  "entity": "Andrea Lukas",
  "role": "Full-Stack AI Engineer & Creative Technologist",
  "alma_mater": "University of California, Berkeley '26",
  "degrees": ["B.A. Computer Science", "B.A. Data Science (Public Health)"],
  "gpa": "3.64",
  "specialties": [
    "Autonomous AI Agents & MCP Protocol Optimization (Block)",
    "Production 3D & Generative Asset Pipelines (Netflix, Shibusa)",
    "Cognitive RL & In-Context Learning (UC Berkeley CogSci Lab)",
    "Novel Intelligent User Interfaces (CS160 Ship-It Award Winner)"
  ],
  "current_status": "Ready for high-impact AI/Systems engineering roles"
}
</pre>
`,
    'model --benchmarks': () => `
<div class="term-line"><span class="term-accent">▶ Centaur Cognitive Modeling on Choices13k Multi-Armed Bandit:</span></div>
<div class="term-line">• Evaluated: <span class="term-dim">GPT-4o, LLaMA 3B, 8B, 405B via In-Context Learning (ICL)</span></div>
<div class="term-line">• Decision Accuracy: <span class="term-success">+63% improvement without retraining</span></div>
<div class="term-line">• Risk Choice Alignment: <span class="term-highlight">Fisher's Exact & Wilcoxon p &lt; 0.05 confirmed statistical significance</span></div>
<div class="term-line">• Presented: <span class="term-dim">UC Berkeley AI Research Symposium &amp; Cognitive Science Conference</span></div>
`,
    'eval --skills': () => `
<div class="term-line"><span class="term-accent">Languages:</span> Python, SQL, Java, Go, C, C++, C#, JavaScript, TypeScript</div>
<div class="term-line"><span class="term-accent">AI & ML:</span> PyTorch, Hugging Face (TRL, Transformers), Groq, LangChain, MCP, RL Gym, OpenAI/VLM</div>
<div class="term-line"><span class="term-accent">Backend & Cloud:</span> FastAPI, GCP (Cloud Run, Vertex AI, Compute Engine), AWS, Docker, Node.js, REST APIs</div>
<div class="term-line"><span class="term-accent">Databases:</span> PostgreSQL, MongoDB, Redis, Prisma</div>
<div class="term-line"><span class="term-accent">Creative & 3D:</span> Unity (C#), Autodesk Model Derivative API, Three.js, Figma</div>
`,
    'cat resume': () => {
      setTimeout(() => {
        window.open('https://github.com/avlukas04', '_blank');
      }, 800);
      return `<div class="term-line"><span class="term-success">Opening resume &amp; GitHub profile in new tab...</span></div>`;
    },
    'whoami': () => `
<div class="term-line">Visitor @ <span class="term-highlight">Andrea's Portfolio (avlukas04.github.io/portfolio-site)</span></div>
<div class="term-line">Connection: <span class="term-success">HTTP/2 TLS Encrypted • Latency 14ms</span></div>
<div class="term-line">Status: <span class="term-dim">Authorized to view full project deep-dives below.</span></div>
`,
    'contact': () => `
<div class="term-line"><span class="term-accent">Email:</span> <a href="mailto:andreavl04@berkeley.edu" style="text-decoration: underline; color: #38BDF8;">andreavl04@berkeley.edu</a></div>
<div class="term-line"><span class="term-accent">LinkedIn:</span> <a href="https://linkedin.com/in/andrea-lukas-b56246237" target="_blank" style="text-decoration: underline; color: #38BDF8;">linkedin.com/in/andrea-lukas-b56246237</a></div>
<div class="term-line"><span class="term-accent">GitHub:</span> <a href="https://github.com/avlukas04" target="_blank" style="text-decoration: underline; color: #38BDF8;">github.com/avlukas04</a></div>
<div class="term-line"><span class="term-accent">Location:</span> Berkeley / San Francisco Bay Area, CA</div>
`,
    'clear': () => {
      if (terminalOutput) terminalOutput.innerHTML = '';
      return '';
    }
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const cmdEntry = document.createElement('div');
    cmdEntry.className = 'term-line';
    cmdEntry.innerHTML = `<span class="term-prompt">agent@andrea-mcp:~$</span> <span>${escapeHtml(rawCmd)}</span>`;
    terminalOutput.appendChild(cmdEntry);

    const handler = commands[cmd];
    if (handler) {
      const response = handler();
      if (response) {
        const resEntry = document.createElement('div');
        resEntry.className = 'term-output';
        resEntry.innerHTML = response;
        terminalOutput.appendChild(resEntry);
      }
    } else {
      const errEntry = document.createElement('div');
      errEntry.className = 'term-output';
      errEntry.innerHTML = `<div class="term-line" style="color: #F87171;">Command not found: "${escapeHtml(rawCmd)}". Type <span class="term-highlight">help</span> for supported commands.</div>`;
      terminalOutput.appendChild(errEntry);
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    if (terminalInput) terminalInput.value = '';
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeCommand(terminalInput.value);
      }
    });
  }

  terminalChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) executeCommand(cmd);
    });
  });

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

/* --------------------------------------------------------------------------
   4. Media Tabs (Shibusa Video vs Architecture vs 3D Stair Visualizer)
   -------------------------------------------------------------------------- */
function initMediaTabs() {
  const tabContainers = document.querySelectorAll('.media-tab-container');

  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('.media-tab-btn');
    const panes = container.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-target');

        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const targetPane = container.querySelector(`#${targetId}`);
        if (targetPane) {
          targetPane.classList.add('active');
          // If pane has video, handle play state
          const vid = targetPane.querySelector('video');
          if (vid && vid.paused) {
            vid.play().catch(() => {});
          }
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Custom Video Controls
   -------------------------------------------------------------------------- */
function initVideoControls() {
  const videoBoxes = document.querySelectorAll('.video-box');

  videoBoxes.forEach(box => {
    const video = box.querySelector('video');
    const playBtn = box.querySelector('.ctrl-play');
    const muteBtn = box.querySelector('.ctrl-mute');
    const fsBtn = box.querySelector('.ctrl-fs');

    if (!video) return;

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        if (video.paused) {
          video.play();
          playBtn.innerHTML = '⏸';
        } else {
          video.pause();
          playBtn.innerHTML = '▶';
        }
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted ? '🔇' : '🔊';
      });
    }

    if (fsBtn) {
      fsBtn.addEventListener('click', () => {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   6. Case Study Deep-Dive Modal
   -------------------------------------------------------------------------- */
const projectModalData = {
  'netflix': {
    title: 'Netflix 3D Asset Creation & Character Rigging Pipeline',
    subtitle: 'Software Engineer Intern (Contract) • August 2025 – December 2025',
    category: 'AI & 3D Systems',
    heroMedia: {
      type: 'image',
      src: 'images/bg.jpg'
    },
    narrative: `
      Animators typically spend days manually sculpting and rigging flat character concept art. At Netflix, I built an end-to-end pipeline that takes flat hand-drawn character sheets, normalizes them into clean 3D T-poses with multimodal vision models, and auto-rigs skeletons in Unity—giving creators instant, animatable models directly from their sketchbook.
      <br><br>
      To make this reliable in production, I deployed and owned scalable microservices on GCP (Cloud Run, Vertex AI, Compute Engine) that handled heavy inference payloads with low latency.
      <br><br>
      I chained multi-model vision models (Llama-4-Scout VLM, Qwen, FLUX.1) via Hugging Face Inference API so arbitrary perspective drawings normalize cleanly into standard T-pose meshes without requiring artists to redraw their concept work from scratch.
    `,
    metrics: [
      { label: 'Asset Creation', val: 'Fully Automated' },
      { label: 'VLM Models', val: 'Llama 4, Qwen, FLUX' },
      { label: 'Backend', val: 'GCP Serverless' }
    ],
    techStack: ['Python', 'Unity (C#)', 'GCP Cloud Run', 'Vertex AI', 'Hugging Face API', 'Compute Engine', 'Llama 4 Scout', 'FLUX.1'],
    thumbnails: []
  },
  'shibusa': {
    title: 'Shibusa Systems: 3D Code Compliance Engine',
    subtitle: 'Software Engineer Intern • May 2025 – August 2025',
    category: 'Spatial AI & Full-Stack',
    heroMedia: {
      type: 'video',
      src: 'videos/final-shibusa-demo.mp4'
    },
    narrative: `
      Navigating municipal building codes usually means city planners spending up to 10 months thumbing through hundreds of blueprint pages. At Shibusa Systems, I built a 3D spatial reasoning engine that parses Revit BIM models directly, catching 50+ structural and zoning violations in minutes so affordable housing projects can get approved in weeks instead of a year.
      <br><br>
      Using the Autodesk Model Derivative API, I authored algorithms that extract SVF geometries, evaluate code constraints (such as stair riser/tread tolerances and egress paths), and compile structured compliance audits.
      <br><br>
      The platform was integrated directly into the City of Carmel Planning team's live review process, slashing permit evaluation timelines by 70%.
    `,
    metrics: [
      { label: 'Timeline Reduction', val: '10mo → <1mo' },
      { label: 'IBC Violations Detected', val: '50+' },
      { label: 'Carmel Review Time', val: '-70%' }
    ],
    techStack: ['Python', 'FastAPI', 'Autodesk Model Derivative API', 'Selenium', 'Revit SVF', 'PostgreSQL', 'Three.js'],
    thumbnails: [
      { src: 'images/diagram-export-8-9-2025-10_44_11-AM.png', alt: 'Architecture Diagram' },
      { src: 'images/shibusa-stair-visualizer.png', alt: '3D Stair Visualizer' },
      { src: 'images/IMG_2697.JPG', alt: 'Monterey Inspiration' }
    ]
  },
  'block': {
    title: 'Block: MCP Server Scoring Suite & Goose AI Context Engine',
    subtitle: 'Software Engineer (Contract) • January 2025 – May 2025',
    category: 'Autonomous Agents & LLMs',
    heroMedia: {
      type: 'image',
      src: 'images/block.PNG'
    },
    narrative: `
      AI developer agents are only as capable as the external tools they can safely invoke. At Block, I engineered evaluation and reliability benchmarks across 300+ Model Context Protocol (MCP) servers for Goose, our open-source agent, and solved context-exhaustion memory drops so engineers can trust AI with production repos.
      <br><br>
      I designed an interactive diagnostic dashboard to identify context-overflow failures across 20+ frontier LLM edge cases, uncovering where agents hallucinated or lost track of execution history.
      <br><br>
      To fix long-context memory degradation, I integrated RAG pipelines with intelligent tiktoken context compression and selective summarization, delivering a 25% performance boost in complex development workflows.
    `,
    metrics: [
      { label: 'MCP Endpoints Scored', val: '300+' },
      { label: 'Agent Interoperability', val: '+18%' },
      { label: 'Long-Context Speed', val: '+25%' }
    ],
    techStack: ['Python', 'Model Context Protocol (MCP)', 'Goose AI Agent', 'RAG Pipelines', 'tiktoken', 'FastAPI', 'Evaluation Benchmarks'],
    thumbnails: [
      { src: 'images/block.PNG', alt: 'Team Deliverable' },
      { src: 'images/block_summary.png', alt: 'Context Management' },
      { src: 'images/block_who.png', alt: 'Berkeley AI Builders' },
      { src: 'images/IMG_1878.JPG', alt: 'Cash App Office' }
    ]
  },
  'cogsci': {
    title: 'UC Berkeley Computational Cognitive Neuroscience Lab',
    subtitle: 'Machine Learning Researcher • August 2024 – May 2025',
    category: 'Cognitive Science & RL',
    heroMedia: {
      type: 'image',
      src: 'images/ccn.png'
    },
    narrative: `
      In Professor Anne Collins' lab at UC Berkeley, I conducted cognitive ML research exploring whether In-Context Learning (ICL) allows large language models to align with human-like decision-making under risk and uncertainty.
      <br><br>
      I ran a PyTorch and Hugging Face fine-tuning pipeline on 1,000+ structured prompts for decision-making and risk analysis, improving model decision accuracy by 50%.
      <br><br>
      Additionally, I reproduced and extended the Centaur cognitive modeling framework to benchmark GPT-4o, Gemma 2b, and LLaMA 3B/8B/405B on multi-armed bandit tasks (Choices13k), achieving a 63% accuracy improvement without parameter retraining.
    `,
    metrics: [
      { label: 'Decision Accuracy', val: '+63%' },
      { label: 'Structured Prompts', val: '1,000+' },
      { label: 'Models Benchmarked', val: 'GPT-4o, LLaMA 405B' }
    ],
    techStack: ['PyTorch', 'Hugging Face', 'Centaur Modeling', 'Choices13k Dataset', 'Multi-Armed Bandits', 'In-Context Learning'],
    thumbnails: [
      { src: 'images/ccn.png', alt: 'AI Symposium Research Poster' }
    ]
  },
  'ireonada': {
    title: 'Ireonada (일어나다) – "Ship It" Most Polished Award Winner',
    subtitle: 'UC Berkeley CS160 Intelligent User Interfaces • Fall 2024',
    category: 'Intelligent UI/UX',
    heroMedia: {
      type: 'video',
      src: 'videos/final-prototype-demo.mp4'
    },
    narrative: `
      Ireonada (일어나다 - Korean for "To Wake Up") is an AI-centered waking experience and intelligent alarm application created to foster mindful morning routines and healthy circadian rhythms.
      <br><br>
      Designed, prototyped, and tested with user studies at UC Berkeley, the project received the prestigious "Ship It" - Most Polished Award for Most Novel Intelligent User Interfaces, awarded to the team whose prototype is solidly built, with pristine interactions, refined visual polish, and production readiness.
    `,
    metrics: [
      { label: 'Course Award', val: '🏆 "Ship It" Winner' },
      { label: 'Focus', val: 'Intelligent UI/UX' },
      { label: 'Prototype', val: 'Interactive Mobile' }
    ],
    techStack: ['Figma', 'React / React Native', 'Motion Design', 'User Research', 'Circadian Algorithms', '3D Prototyping'],
    thumbnails: [
      { src: 'images/cs160.JPG', alt: 'Ship It Trophy Presentation' },
      { src: 'images/IMG_7591.JPG', alt: '3D Printed Airplane Trophy' }
    ]
  },
  'civictrack': {
    title: 'CivicTrack: Food Safety Inspection Data Pipeline',
    subtitle: 'Data Engineering & Systems Project',
    category: 'Data Engineering',
    heroMedia: {
      type: 'image',
      src: 'images/bg.jpg'
    },
    narrative: `
      CivicTrack is a Dockerized ETL data pipeline that ingests real NYC Department of Health restaurant inspection records via the Socrata Open Data API.
      <br><br>
      It cleans noisy data with null grades, resolves multi-format timestamps, and implements idempotent upserts with psycopg2. The storage layer features a normalized PostgreSQL schema (units, test results, violations with 1:N relations, foreign keys, CHECK constraints) and an append-only audit trail. The service is served by high-performance FastAPI endpoints with multi-filter query parameters.
    `,
    metrics: [
      { label: 'Data Source', val: 'NYC Socrata API' },
      { label: 'Schema', val: 'Normalized 3NF' },
      { label: 'Storage', val: 'PostgreSQL + Audit Log' }
    ],
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Pydantic', 'psycopg2', 'REST API'],
    thumbnails: []
  },
  'lifeops': {
    title: 'LifeOps: RL Environment for Personalized AI Scheduling',
    subtitle: 'Reinforcement Learning & LLM Agent System',
    category: 'RL & Autonomous Agents',
    heroMedia: {
      type: 'image',
      src: 'images/bg.jpg'
    },
    narrative: `
      LifeOps is a custom gym-style reinforcement learning environment designed to optimize personalized user calendar scheduling based on evolving weekly goals and personal lifestyle priorities.
      <br><br>
      Utilizing custom reward shaping and simulated agent rollouts, the policy learns to balance cognitive load, meetings, and recovery. In tandem, an interactive LLM scheduling agent powered by Llama 4 Scout and Llama 3.3 70B (via ultra-low latency Groq inference) maintains persistent user preferences and dynamic calendar rescheduling on Hugging Face Spaces.
    `,
    metrics: [
      { label: 'RL Environment', val: 'Custom OpenAI Gym' },
      { label: 'LLM Engine', val: 'Llama 3.3 70B / Groq' },
      { label: 'Deployment', val: 'Hugging Face Spaces' }
    ],
    techStack: ['Python', 'Reinforcement Learning', 'HF TRL', 'Groq API', 'Llama 4 Scout', 'Streamlit / Gradio'],
    thumbnails: []
  }
};

function initCaseStudyModal() {
  const modalOverlay = document.getElementById('caseStudyModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const modalHeroContainer = document.getElementById('modalHeroMedia');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalNarrative = document.getElementById('modalNarrative');
  const modalMetrics = document.getElementById('modalMetrics');
  const modalTechStack = document.getElementById('modalTechStack');
  const modalThumbStrip = document.getElementById('modalThumbStrip');

  const triggerButtons = document.querySelectorAll('[data-open-study]');

  triggerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const studyKey = btn.getAttribute('data-open-study');
      const data = projectModalData[studyKey];
      if (!data) return;

      openModalWithData(data);
    });
  });

  function openModalWithData(data) {
    if (!modalOverlay) return;

    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalNarrative.innerHTML = data.narrative;

    // Render Hero Media
    modalHeroContainer.innerHTML = '';
    if (data.heroMedia.type === 'video') {
      const vid = document.createElement('video');
      vid.src = data.heroMedia.src;
      vid.controls = true;
      vid.autoplay = true;
      vid.muted = true;
      vid.loop = true;
      vid.style.width = '100%';
      vid.style.maxHeight = '420px';
      modalHeroContainer.appendChild(vid);
    } else {
      const img = document.createElement('img');
      img.src = data.heroMedia.src;
      img.alt = data.title;
      img.style.width = '100%';
      img.style.maxHeight = '420px';
      img.style.objectFit = 'contain';
      modalHeroContainer.appendChild(img);
    }

    // Render Metrics
    modalMetrics.innerHTML = '';
    if (data.metrics && data.metrics.length > 0) {
      data.metrics.forEach(m => {
        const mDiv = document.createElement('div');
        mDiv.className = 'metric-card';
        mDiv.innerHTML = `
          <div class="metric-num" style="font-size: 1.4rem;">${m.val}</div>
          <div class="metric-label">${m.label}</div>
        `;
        modalMetrics.appendChild(mDiv);
      });
      modalMetrics.style.display = 'grid';
    } else {
      modalMetrics.style.display = 'none';
    }

    // Render Tech Stack
    modalTechStack.innerHTML = '';
    data.techStack.forEach(t => {
      const pill = document.createElement('span');
      pill.className = 'tech-pill';
      pill.textContent = t;
      modalTechStack.appendChild(pill);
    });

    // Render Thumbnails if any
    modalThumbStrip.innerHTML = '';
    if (data.thumbnails && data.thumbnails.length > 0) {
      data.thumbnails.forEach(thumb => {
        const img = document.createElement('img');
        img.src = thumb.src;
        img.alt = thumb.alt || 'Thumbnail';
        img.className = 'modal-thumb';
        img.addEventListener('click', () => {
          modalHeroContainer.innerHTML = `<img src="${thumb.src}" alt="${thumb.alt}" style="width: 100%; max-height: 420px; object-fit: contain;">`;
          modalThumbStrip.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
          img.classList.add('active');
        });
        modalThumbStrip.appendChild(img);
      });
      modalThumbStrip.style.display = 'flex';
    } else {
      modalThumbStrip.style.display = 'none';
    }

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
    // Pause any playing modal video
    const vid = modalHeroContainer.querySelector('video');
    if (vid) vid.pause();
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* --------------------------------------------------------------------------
   7. Mobile Menu Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileMenuDrawer');
  const links = drawer ? drawer.querySelectorAll('a') : [];

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  });
}

/* --------------------------------------------------------------------------
   8. Scroll Effects & Ambient Orb Movement
   -------------------------------------------------------------------------- */
function initScrollEffects() {
  const orbs = document.querySelectorAll('.ambient-orb');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Gentle parallax on ambient orbs
    if (orbs.length >= 3) {
      orbs[0].style.transform = `translate3d(0, ${scrollY * 0.08}px, 0)`;
      orbs[1].style.transform = `translate3d(0, ${-scrollY * 0.05}px, 0)`;
      orbs[2].style.transform = `translate3d(${scrollY * 0.03}px, ${-scrollY * 0.04}px, 0)`;
    }

    // Scroll spy for active navbar state
    let currentId = '';
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });

    const storyPills = document.querySelectorAll('.story-nav-pill');
    storyPills.forEach(pill => {
      if (pill.getAttribute('href') === `#${currentId}`) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }, { passive: true });

  // Interactive mouse parallax for cosmic ambient orbs
  window.addEventListener('mousemove', (e) => {
    if (orbs.length >= 3) {
      const xFactor = (e.clientX / window.innerWidth - 0.5) * 30;
      const yFactor = (e.clientY / window.innerHeight - 0.5) * 30;
      orbs[0].style.translate = `${xFactor}px ${yFactor}px`;
      orbs[1].style.translate = `${-xFactor * 0.7}px ${-yFactor * 0.7}px`;
      orbs[2].style.translate = `${xFactor * 0.5}px ${-yFactor * 0.5}px`;
    }
  }, { passive: true });
}
