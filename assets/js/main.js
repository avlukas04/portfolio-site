// Modern Portfolio JavaScript with GSAP Animations
// Inspired by Andrea Lukass Site

// Initialize GSAP
if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    if (typeof TextPlugin !== 'undefined') {
        gsap.registerPlugin(TextPlugin);
    }
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if GSAP is available
    if (typeof gsap !== 'undefined') {
        // Initialize all animations
        initAnimations();
        initScrollEffects();
        initFloatingElements();
    }
    
    // Initialize smooth scrolling (doesn't require GSAP)
    initSmoothScrolling();
    
    // Add scroll event listener for header
    window.addEventListener('scroll', handleScroll);
});

// Initialize all GSAP animations
function initAnimations() {
    try {
        // Hero section animations
        const heroTitle = document.querySelector('.hero-title .title-line');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroCta = document.querySelector('.hero-cta');
        const floatingElements = document.querySelectorAll('.floating-elements .floating-element');
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        console.log('Animation elements found:', {
            heroTitle: !!heroTitle,
            heroSubtitle: !!heroSubtitle,
            heroCta: !!heroCta,
            floatingElements: floatingElements.length,
            scrollIndicator: !!scrollIndicator
        });
        
        if (heroTitle) {
            const heroTimeline = gsap.timeline();
            
            heroTimeline
                .from('.hero-title .title-line', {
                    duration: 1,
                    y: 100,
                    opacity: 0,
                    stagger: 0.2,
                    ease: 'power3.out'
                });
            
            if (heroSubtitle) {
                heroTimeline.from('.hero-subtitle', {
                    duration: 0.8,
                    y: 30,
                    opacity: 0,
                    ease: 'power2.out'
                }, '-=0.5');
            }
            
            if (heroCta) {
                heroTimeline.from('.hero-cta', {
                    duration: 0.8,
                    y: 30,
                    opacity: 0,
                    ease: 'power2.out'
                }, '-=0.3');
            }
            
            if (floatingElements.length > 0) {
                heroTimeline.from('.floating-elements .floating-element', {
                    duration: 1.2,
                    scale: 0,
                    rotation: 180,
                    opacity: 0,
                    stagger: 0.2,
                    ease: 'back.out(1.7)'
                }, '-=0.5');
            }
        }
        
        // Scroll indicator animation
        if (scrollIndicator) {
            gsap.to('.scroll-indicator', {
                y: 10,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut'
            });
        }
    } catch (error) {
        console.error('Error in initAnimations:', error);
    }
}

// Initialize scroll-triggered animations
function initScrollEffects() {
    try {
        // Section headers animation
        const sectionHeaders = document.querySelectorAll('.section-header');
        if (sectionHeaders.length > 0) {
            gsap.utils.toArray('.section-header').forEach(header => {
                gsap.from(header, {
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    },
                    duration: 1,
                    y: 50,
                    opacity: 0,
                    ease: 'power2.out'
                });
            });
        }
        
        // Work items animation
        const workItems = document.querySelectorAll('.work-item');
        if (workItems.length > 0) {
            gsap.utils.toArray('.work-item').forEach((item, index) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                        end: 'bottom 15%',
                        toggleActions: 'play none none reverse'
                    },
                    duration: 0.8,
                    y: 60,
                    opacity: 0,
                    delay: index * 0.1,
                    ease: 'power2.out'
                });
            });
        }
        
        // Skills grid animation
        const skillCategories = document.querySelectorAll('.skill-category');
        if (skillCategories.length > 0) {
            gsap.utils.toArray('.skill-category').forEach((category, index) => {
                gsap.from(category, {
                    scrollTrigger: {
                        trigger: category,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    },
                    duration: 0.8,
                    x: index % 2 === 0 ? -50 : 50,
                    opacity: 0,
                    ease: 'power2.out'
                });
            });
        }
        
        // About image animation
        const aboutImage = document.querySelector('.about-image');
        if (aboutImage) {
            gsap.from('.about-image', {
                scrollTrigger: {
                    trigger: '.about-image',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                duration: 1,
                scale: 0.8,
                opacity: 0,
                ease: 'power2.out'
            });
        }
        
        // Contact form animation
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            gsap.from('.contact-form', {
                scrollTrigger: {
                    trigger: '.contact-form',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power2.out'
            });
        }
    } catch (error) {
        console.error('Error in initScrollEffects:', error);
    }
}

// Initialize smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const header = document.querySelector('#header');
            
            if (targetSection && header) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // Use standard scrollTo instead of GSAP scrollTo plugin
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize floating elements parallax effect
function initFloatingElements() {
    try {
        const floatingElements = document.querySelectorAll('.floating-element');
        const heroSection = document.querySelector('.hero-section');
        
        if (floatingElements.length > 0 && heroSection) {
            floatingElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                
                gsap.to(element, {
                    scrollTrigger: {
                        trigger: '.hero-section',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true
                    },
                    y: (i, target) => -ScrollTrigger.maxScroll(window) * speed,
                    ease: 'none'
                });
            });
        }
    } catch (error) {
        console.error('Error in initFloatingElements:', error);
    }
}

// Handle scroll events for header styling
function handleScroll() {
    const header = document.querySelector('#header');
    if (!header) return;
    
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
}

// Add hover effects for work items
function initWorkItemHovers() {
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach(item => {
        const image = item.querySelector('.work-image img');
        const overlay = item.querySelector('.work-overlay');
        
        item.addEventListener('mouseenter', () => {
            gsap.to(image, {
                duration: 0.6,
                scale: 1.1,
                ease: 'power2.out'
            });
            
            gsap.to(overlay, {
                duration: 0.4,
                opacity: 1,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(image, {
                duration: 0.6,
                scale: 1,
                ease: 'power2.out'
            });
            
            gsap.to(overlay, {
                duration: 0.4,
                opacity: 0,
                ease: 'power2.out'
            });
        });
    });
}

// Initialize work item hovers after DOM loads
document.addEventListener('DOMContentLoaded', initWorkItemHovers);

// Initialize rotating prism functionality
function initRotatingPrism() {
    const prism = document.getElementById('imagePrism');
    const autoRotateBtn = document.getElementById('autoRotate');
    const pauseBtn = document.getElementById('pauseRotation');
    const speedSlider = document.getElementById('speedSlider');
    
    if (!prism) return;
    
    let isRotating = true;
    let rotationSpeed = 1;
    
    // Auto rotate button
    if (autoRotateBtn) {
        autoRotateBtn.addEventListener('click', () => {
            isRotating = true;
            prism.style.animationPlayState = 'running';
            autoRotateBtn.classList.add('active');
            pauseBtn.classList.remove('active');
        });
    }
    
    // Pause button
    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            isRotating = false;
            prism.style.animationPlayState = 'paused';
            pauseBtn.classList.add('active');
            autoRotateBtn.classList.remove('active');
        });
    }
    
    // Speed control
    if (speedSlider) {
        speedSlider.addEventListener('input', (e) => {
            rotationSpeed = parseFloat(e.target.value);
            prism.style.animationDuration = `${20 / rotationSpeed}s`;
        });
    }
    
    // Initialize auto-rotate as active
    if (autoRotateBtn) {
        autoRotateBtn.classList.add('active');
    }
    
    // Add hover pause functionality
    prism.addEventListener('mouseenter', () => {
        if (isRotating) {
            prism.style.animationPlayState = 'paused';
        }
    });
    
    prism.addEventListener('mouseleave', () => {
        if (isRotating) {
            prism.style.animationPlayState = 'running';
        }
    });
    
    // Add click to pause/resume
    prism.addEventListener('click', () => {
        if (isRotating) {
            isRotating = false;
            prism.style.animationPlayState = 'paused';
            pauseBtn.classList.add('active');
            autoRotateBtn.classList.remove('active');
        } else {
            isRotating = true;
            prism.style.animationPlayState = 'running';
            autoRotateBtn.classList.add('active');
            pauseBtn.classList.remove('active');
        }
    });
}

// Initialize rotating prism
document.addEventListener('DOMContentLoaded', initRotatingPrism);

// Add text reveal effect for section titles
function initTextReveals() {
    const titles = document.querySelectorAll('.section-title');
    
    titles.forEach(title => {
        const text = title.textContent;
        title.innerHTML = '';
        
        // Split text into characters
        const chars = text.split('').map(char => 
            char === ' ' ? '<span>&nbsp;</span>' : `<span>${char}</span>`
        ).join('');
        
        title.innerHTML = chars;
        
        // Animate characters on scroll
        gsap.from(title.querySelectorAll('span'), {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.03,
            ease: 'power2.out'
        });
    });
}

// Initialize text reveals
document.addEventListener('DOMContentLoaded', initTextReveals);

// Add smooth reveal for contact form fields
function initFormAnimations() {
    const formFields = document.querySelectorAll('.form-group');
    
    formFields.forEach((field, index) => {
        gsap.from(field, {
            scrollTrigger: {
                trigger: field,
                start: 'top 90%',
                end: 'bottom 10%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.6,
            y: 30,
            opacity: 0,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });
}

// Initialize form animations
document.addEventListener('DOMContentLoaded', initFormAnimations);

// Add cursor trail effect (optional enhancement)
function initCursorTrail() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(99, 102, 241, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
}

// Uncomment to enable cursor trail effect
// initCursorTrail();

// Add loading animation
window.addEventListener('load', () => {
    gsap.to('.fade-in', {
        duration: 1,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: 'power2.out'
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll handler
window.addEventListener('scroll', throttle(handleScroll, 16)); // 60fps

// Initialize project modals
function initProjectModals() {
    console.log('Initializing project modals...');
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.btn-view[data-project]');
    
    console.log('Modal element:', modal);
    console.log('Close button:', closeBtn);
    console.log('View buttons found:', viewButtons.length);
    
    if (!modal) {
        console.error('Modal not found!');
        return;
    }
    
    // Project data
    const projectData = {
        '3d-code': {
            title: '3D Code Compliance Engine',
            description: 'AI-Driven Engine for 3D Building Code Compliance. This project leverages machine learning algorithms to automatically analyze 3D building models and ensure they meet regulatory standards. Features include real-time validation, detailed compliance reports, and integration with existing CAD software.',
            image: 'images/block.png',
            images: ['images/block.png', 'images/diagram-export-8-9-2025-10_44_11-AM.png'],
            video: 'videos/FINAL SHIBUSA DEMO.mov',
            videoThumbnail: 'images/block.png',
            techStack: ['Python', 'TensorFlow', 'OpenCV', 'Three.js', 'React', 'Node.js'],
            links: [
                { text: 'Live Demo', url: '#', primary: true },
                { text: 'GitHub', url: '#', primary: false },
                { text: 'Documentation', url: '#', primary: false }
            ]
        },
        'ai-agents': {
            title: 'AI-Agents',
            description: 'MCP (Model Context Protocol) + Increase Context Window. Advanced AI agent system that implements the Model Context Protocol for enhanced context management. Features include dynamic context expansion, intelligent memory management, and seamless integration with multiple AI models.',
            image: 'images/ccn.png',
            techStack: ['Python', 'LangChain', 'OpenAI API', 'FastAPI', 'PostgreSQL', 'Redis'],
            links: [
                { text: 'Live Demo', url: '#', primary: true },
                { text: 'GitHub', url: '#', primary: false },
                { text: 'API Docs', url: '#', primary: false }
            ]
        },
        'voice-text': {
            title: 'Voice to Text Transcription',
            description: 'Automated Transcription of Audio Files, Exploring Entity Recognition. High-accuracy speech-to-text system with advanced entity recognition capabilities. Processes audio in real-time, supports multiple languages, and provides detailed analytics on extracted entities.',
            image: 'images/cs160.JPG',
            techStack: ['Python', 'SpeechRecognition', 'NLTK', 'spaCy', 'Flask', 'MongoDB'],
            links: [
                { text: 'Try Demo', url: '#', primary: true },
                { text: 'GitHub', url: '#', primary: false },
                { text: 'API', url: '#', primary: false }
            ]
        },
        'mobile-app': {
            title: 'Mobile App',
            description: 'UI/UX Design & Prototyping. Modern mobile application featuring intuitive user interface design and seamless user experience. Built with a focus on accessibility, performance, and cross-platform compatibility.',
            image: 'images/abba.JPG',
            techStack: ['React Native', 'TypeScript', 'Redux', 'Firebase', 'Figma', 'Adobe XD'],
            links: [
                { text: 'App Store', url: '#', primary: true },
                { text: 'Google Play', url: '#', primary: true },
                { text: 'Case Study', url: '#', primary: false }
            ]
        }
    };
    
    // Gallery functionality
    let currentImageIndex = 0;
    let currentProject = null;
    
    function updateGallery(project) {
        const modalImage = document.getElementById('modalImage');
        if (!modalImage) {
            console.error('Modal image element not found in updateGallery');
            return;
        }
        
        const mainContainer = modalImage.parentElement;
        if (!mainContainer) {
            console.error('Main container not found in updateGallery');
            return;
        }
        
        const thumbnailsContainer = document.getElementById('galleryThumbnails');
        const prevBtn = document.getElementById('galleryPrev');
        const nextBtn = document.getElementById('galleryNext');
        
        console.log('Gallery elements found:', {
            modalImage: !!modalImage,
            mainContainer: !!mainContainer,
            thumbnailsContainer: !!thumbnailsContainer,
            prevBtn: !!prevBtn,
            nextBtn: !!nextBtn
        });
        
        // Create media array (images + video if available)
        const mediaItems = [];
        if (project.video) {
            mediaItems.push({ type: 'video', src: project.video, thumbnail: project.videoThumbnail || project.image });
        }
        if (project.images) {
            project.images.forEach(img => {
                mediaItems.push({ type: 'image', src: img, thumbnail: img });
            });
        }
        
        console.log('Media items created:', mediaItems);
        
        if (mediaItems.length > 1) {
            // Show gallery navigation
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
            
            // Create thumbnails
            thumbnailsContainer.innerHTML = mediaItems.map((item, index) => 
                `<div class="thumbnail-container ${index === 0 ? 'active' : ''}" data-index="${index}" data-type="${item.type}">
                    <img src="${item.thumbnail}" alt="Thumbnail ${index + 1}" class="thumbnail">
                    ${item.type === 'video' ? '<div class="video-indicator">▶</div>' : ''}
                </div>`
            ).join('');
            
            // Add thumbnail click events
            const thumbnails = thumbnailsContainer.querySelectorAll('.thumbnail-container');
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', () => {
                    const index = parseInt(thumb.getAttribute('data-index'));
                    showMedia(index);
                });
            });
            
            // Navigation button events
            prevBtn.addEventListener('click', () => {
                const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : mediaItems.length - 1;
                showMedia(newIndex);
            });
            
            nextBtn.addEventListener('click', () => {
                const newIndex = currentImageIndex < mediaItems.length - 1 ? currentImageIndex + 1 : 0;
                showMedia(newIndex);
            });
            
        } else {
            // Hide gallery navigation for single item
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            thumbnailsContainer.innerHTML = '';
        }
    }
    
    function showMedia(index) {
        console.log('showMedia called with index:', index);
        if (!currentProject) {
            console.error('No current project!');
            return;
        }
        
        currentImageIndex = index;
        const modalImage = document.getElementById('modalImage');
        if (!modalImage) {
            console.error('Modal image element not found in showMedia');
            return;
        }
        
        const mainContainer = modalImage.parentElement;
        if (!mainContainer) {
            console.error('Main container not found!');
            return;
        }
        
        const thumbnails = document.querySelectorAll('.thumbnail-container');
        
        // Create media array (images + video if available)
        const mediaItems = [];
        if (currentProject.video) {
            console.log('Adding video to media items:', currentProject.video);
            mediaItems.push({ type: 'video', src: currentProject.video, thumbnail: currentProject.videoThumbnail || currentProject.image });
        }
        if (currentProject.images) {
            currentProject.images.forEach(img => {
                console.log('Adding image to media items:', img);
                mediaItems.push({ type: 'image', src: img, thumbnail: img });
            });
        }
        
        console.log('Total media items:', mediaItems);
        console.log('Showing media at index:', index);
        
        if (index >= mediaItems.length) {
            console.error('Index out of range:', index, '>=', mediaItems.length);
            return;
        }
        
        const mediaItem = mediaItems[index];
        console.log('Current media item:', mediaItem);
        
        // Clear main container
        mainContainer.innerHTML = '';
        
        if (mediaItem.type === 'video') {
            console.log('Creating video element for:', mediaItem.src);
            // Create video element
            const video = document.createElement('video');
            video.src = mediaItem.src;
            video.controls = true;
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            video.preload = 'auto';
            video.style.maxWidth = '100%';
            video.style.maxHeight = '400px';
            video.style.borderRadius = '16px';
            video.style.boxShadow = '0 8px 32px var(--shadow-medium)';
            
            console.log('Video element created with src:', video.src);
            console.log('Video element properties:', {
                autoplay: video.autoplay,
                muted: video.muted,
                loop: video.loop,
                preload: video.preload
            });
            
            // Add error handling for video loading
            video.onerror = function(e) {
                console.error('Error loading video:', mediaItem.src);
                console.error('Error details:', e);
                // Fallback to thumbnail image
                const img = document.createElement('img');
                img.src = mediaItem.thumbnail;
                img.alt = `${currentProject.title} - Video thumbnail`;
                img.style.maxWidth = '100%';
                img.style.maxHeight = '400px';
                img.style.borderRadius = '16px';
                img.style.boxShadow = '0 8px 32px var(--shadow-medium)';
                mainContainer.innerHTML = '';
                mainContainer.appendChild(img);
            };
            
            // Ensure video plays when loaded
            video.onloadeddata = function() {
                console.log('Video loaded successfully, attempting to play');
                video.play().catch(function(error) {
                    console.log('Autoplay failed:', error);
                    // Video will still be visible with controls
                });
            };
            
            // Additional event listeners for debugging
            video.onloadstart = () => console.log('Video loading started');
            video.oncanplay = () => console.log('Video can start playing');
            video.onplay = () => console.log('Video started playing');
            video.onloadedmetadata = () => console.log('Video metadata loaded');
            video.oncanplaythrough = () => console.log('Video can play through');
            
            console.log('Appending video to container');
            mainContainer.appendChild(video);
            console.log('Video appended successfully');
        } else {
            // Create image element
            const img = document.createElement('img');
            img.src = mediaItem.src;
            img.alt = `${currentProject.title} - Image ${index + 1}`;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '400px';
            img.style.borderRadius = '16px';
            img.style.boxShadow = '0 8px 32px var(--shadow-medium)';
            mainContainer.appendChild(img);
        }
        
        // Update thumbnail states
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }
    
    // Open modal
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Button clicked!');
            const projectId = button.getAttribute('data-project');
            console.log('Project ID:', projectId);
            const project = projectData[projectId];
            console.log('Project found:', project);
            
            if (project) {
                currentProject = project;
                currentImageIndex = 0;
                
                // Populate basic info
                document.getElementById('modalTitle').textContent = project.title;
                document.getElementById('modalSubtitle').textContent = project.subtitle || '';
                document.getElementById('modalDescription').textContent = project.description;
                document.getElementById('modalLongDescription').textContent = project.longDescription || '';
                
                // Populate meta information
                document.getElementById('modalStatus').textContent = project.status || '';
                document.getElementById('modalTimeline').textContent = project.timeline || '';
                document.getElementById('modalTeam').textContent = project.team || '';
                
                // Populate features
                const featuresContainer = document.getElementById('modalFeatures');
                if (project.features && project.features.length > 0) {
                    featuresContainer.innerHTML = project.features.map(feature => 
                        `<li>${feature}</li>`
                    ).join('');
                } else {
                    featuresContainer.innerHTML = '<li>Features coming soon...</li>';
                }
                
                // Populate challenges and solutions
                document.getElementById('modalChallenge').textContent = project.challenges || 'Challenges information coming soon...';
                document.getElementById('modalSolution').textContent = project.solutions || 'Solutions information coming soon...';
                
                // Populate tech stack
                const techStackContainer = document.getElementById('modalTechStack');
                techStackContainer.innerHTML = project.techStack.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('');
                
                // Populate project links
                const linksContainer = document.getElementById('modalLinks');
                linksContainer.innerHTML = project.links.map(link => 
                    `<a href="${link.url}" class="link-btn ${link.primary ? '' : 'secondary'}">${link.text}</a>`
                ).join('');
                
                // Create a simple working modal for this project
                console.log('Creating simple modal for:', project.title);
                
                // Create modal overlay
                const modalOverlay = document.createElement('div');
                modalOverlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;
                
                // Create modal content
                const modalContent = document.createElement('div');
                modalContent.style.cssText = `
                    background: white;
                    padding: 30px;
                    border-radius: 15px;
                    max-width: 1000px;
                    width: 90%;
                    max-height: 90vh;
                    overflow-y: auto;
                `;
                
                // Add title
                const title = document.createElement('h2');
                title.textContent = project.title;
                title.style.marginBottom = '20px';
                title.style.color = '#333';
                modalContent.appendChild(title);
                
                // Add description
                if (project.description) {
                    const desc = document.createElement('p');
                    desc.textContent = project.description;
                    desc.style.marginBottom = '20px';
                    desc.style.color = '#666';
                    modalContent.appendChild(desc);
                }
                
                // Add video if available
                if (project.video) {
                    const video = document.createElement('video');
                    video.src = project.video;
                    video.controls = true;
                    video.autoplay = true;
                    video.muted = true;
                    video.style.cssText = `
                        width: 100%;
                        max-height: 400px;
                        border-radius: 10px;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                        margin-bottom: 20px;
                    `;
                    modalContent.appendChild(video);
                }
                
                // Add tech stack
                if (project.techStack) {
                    const techTitle = document.createElement('h3');
                    techTitle.textContent = 'Tech Stack';
                    techTitle.style.marginBottom = '10px';
                    techTitle.style.color = '#333';
                    modalContent.appendChild(techTitle);
                    
                    const techList = document.createElement('div');
                    techList.style.cssText = `
                        display: flex;
                        flex-wrap: wrap;
                        gap: 8px;
                        margin-bottom: 20px;
                    `;
                    
                    project.techStack.forEach(tech => {
                        const techTag = document.createElement('span');
                        techTag.textContent = tech;
                        techTag.style.cssText = `
                            background: #007bff;
                            color: white;
                            padding: 4px 12px;
                            border-radius: 20px;
                            font-size: 12px;
                            font-weight: 500;
                        `;
                        techList.appendChild(techTag);
                    });
                    modalContent.appendChild(techList);
                }
                
                // Add close button
                const closeBtn = document.createElement('button');
                closeBtn.textContent = 'Close';
                closeBtn.onclick = () => document.body.removeChild(modalOverlay);
                closeBtn.style.cssText = `
                    padding: 10px 20px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                `;
                modalContent.appendChild(closeBtn);
                
                // Add to page
                modalOverlay.appendChild(modalContent);
                document.body.appendChild(modalOverlay);
                
                console.log('Simple project modal created and displayed');
            }
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', closeModal);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}



// Initialize project modals
document.addEventListener('DOMContentLoaded', initProjectModals);