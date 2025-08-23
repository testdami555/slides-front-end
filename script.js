document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentSlide = 0;

    gsap.set(slides, { autoAlpha: 0, xPercent: 100 });
    gsap.set(slides[0], { autoAlpha: 1, xPercent: 0 });

    function showSlide(index, direction = 'forward') {
        if (gsap.isTweening(slides)) return;

        const lastActiveSlide = slides[currentSlide];
        const newActiveSlide = slides[index];

        const lastSlideXPercent = direction === 'forward' ? -100 : 100;
        const newSlideInitialXPercent = direction === 'forward' ? 100 : -100;

        gsap.to(lastActiveSlide, {
            duration: 0.8,
            xPercent: lastSlideXPercent,
            autoAlpha: 0,
            ease: 'power3.inOut'
        });

        gsap.fromTo(newActiveSlide, 
            { xPercent: newSlideInitialXPercent, autoAlpha: 0 },
            {
                duration: 0.8,
                xPercent: 0,
                autoAlpha: 1,
                ease: 'power3.inOut'
            }
        );

        const listItems = newActiveSlide.querySelectorAll('li');
        if (listItems.length > 0) {
            gsap.fromTo(listItems, 
                { y: 30, autoAlpha: 0 },
                { 
                    y: 0, 
                    autoAlpha: 1, 
                    duration: 0.6, 
                    stagger: 0.1, 
                    delay: 0.4 
                }
            );
        }

        currentSlide = index;
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex, 'forward');
    }

    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex, 'backward');
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        }
        if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    const firstListItems = slides[0].querySelectorAll('li');
    if (firstListItems.length > 0) {
        gsap.fromTo(firstListItems, 
            { y: 30, autoAlpha: 0 },
            { 
                y: 0, 
                autoAlpha: 1, 
                duration: 0.6, 
                stagger: 0.1, 
                delay: 0.2 
            }
        );
    }
});
