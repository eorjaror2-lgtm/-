document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Unobserve after animation if you only want it to run once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // 3. Smooth Scroll for Navigation Links (Handled by CSS scroll-behavior: smooth)
    // but we can add manual logic if needed for Safari/Mobile support
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Sidebar Interactions (Click placeholders)
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            const type = item.classList[1];
            alert(`${type} 서비스는 현재 준비 중입니다.`);
        });
    });

    // 5. Hero Video Delay logic (2 seconds)
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
        setTimeout(() => {
            heroVideo.play().then(() => {
                heroVideo.style.opacity = '1';
            }).catch(error => {
                console.log("Video autoplay blocked or error:", error);
            });
        }, 2000);
    }

    // 6. Media Gallery - Tab & Video Switcher
    const mainIframe = document.getElementById('youtube-iframe');
    const thumbItems = document.querySelectorAll('.thumbnail-item');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Tab Switching
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                
                // Update buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === `${targetTab}-tab`) {
                        content.classList.add('active');
                    }
                });

                // Pause YouTube if switching to blog
                if (targetTab === 'blog' && mainIframe) {
                    const currentSrc = mainIframe.src;
                    mainIframe.src = currentSrc.replace('autoplay=1', 'autoplay=0');
                }
            });
        });
    }

    // YouTube Video Switching
    if (mainIframe && thumbItems.length > 0) {
        thumbItems.forEach(item => {
            item.addEventListener('click', () => {
                const videoId = item.getAttribute('data-video-id');
                
                // Update iframe src
                mainIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                
                // Update active state
                thumbItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                
                // Scroll to main player on mobile
                if (window.innerWidth <= 992) {
                    const gallerySection = document.getElementById('media-gallery');
                    window.scrollTo({
                        top: gallerySection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});
