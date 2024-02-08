const Slider = {
    currentSlideIndex: 1,
    create: function(options) {
        const defaults = {
            slider: ".slider",
            slide: ".slide",
            prevBtn: ".prev",
            nextBtn: ".next",
            duration: 0.5,
            setSlideContent: null,
            animation: function(timeline, slidesWrapper, currentSlide, lastSlide, index, target, onComplete) {
                timeline.to(slidesWrapper, {
                    duration: duration,
                    ease: "power2.inOut",
                    x: -target,
                    onComplete: onComplete
                });
            }
        };

        const settings = Object.assign({}, defaults, options);

        const slidesContainer = document.querySelector(settings.slider);
        const duration = settings.duration;
        const slideTemplate = slidesContainer.querySelector(settings.slide);
        const slidesWrapper = document.createElement("div");
        const prevBtn = document.querySelector(settings.prevBtn);
        const nextBtn = document.querySelector(settings.nextBtn);
        const slideWidth = slideTemplate.clientWidth;
        const slidesData = options.slidesData;

        let slideIndex = 1;
        let isAnimating = false;

        if (!slidesData) {
            console.warn('Slider.create has failed. No slidesData was found.')
            return
        } else if (!settings.setSlideContent) {
            console.warn('Slider.create has failed. createSlide is empty');
            return
        }

        function createSlide(slideData, index) {
            const slideDiv = slideTemplate.cloneNode(true);
            slideTemplate.remove();
            slideDiv.id = 'slide-' + index;
            settings.setSlideContent(slideDiv, slideData, index);
            slidesWrapper.appendChild(slideDiv);
        }

        function animateSlider(index, previousIndex, onComplete) {
            const currentSlide = slidesWrapper.querySelectorAll(settings.slide)[index];
            const lastSlide = slidesWrapper.querySelectorAll(settings.slide)[previousIndex];
            const target = slideWidth * index;
            const timeline = gsap.timeline({onComplete: onComplete})
            settings.animation(timeline, slidesWrapper, currentSlide, lastSlide, index, target, onComplete);
        }

        function nextSlide() {
            if (isAnimating) return;
            isAnimating = true;
            slideIndex++;
            const totalSlides = slidesData.length;
            if (slideIndex === totalSlides+1) {
                slideIndex = 1;
                gsap.set(slidesWrapper, {x: 0})
                animateSlider(slideIndex, slideIndex-1, function() {
                    isAnimating = false;
                  });;
            } else {
                animateSlider(slideIndex, slideIndex-1, function() {
                    isAnimating = false;
                  });
            }
            Slider.currentSlideIndex = slideIndex;
          }
          
          function prevSlide() {
            if (isAnimating) return;
            isAnimating = true;
            slideIndex--;
            
            const totalSlides = slidesData.length;
            if (slideIndex < 1) {
                slideIndex = totalSlides;
                gsap.set(slidesWrapper, {x: -slideWidth*(totalSlides+1)});
                animateSlider(slideIndex, slideIndex+1, function() {
                    isAnimating = false;
                  });
            } else {
                animateSlider(slideIndex, slideIndex+1, function() {
                    isAnimating = false;
                  });
            }
            Slider.currentSlideIndex = slideIndex;
          }


        slidesData.forEach((slideData, index) => createSlide(slideData, index));
        // Clone the last slide and append it to the beginning of the slidesWrapper
        const lastSlide = slidesWrapper.lastChild.cloneNode(true);
        const firstSlide = slidesWrapper.firstChild.cloneNode(true);
        lastSlide.id = "slide-2-clone";
        slidesWrapper.insertBefore(lastSlide, slidesWrapper.firstChild);
        firstSlide.id = "slide-0-clone";
        slidesWrapper.appendChild(firstSlide);

        slidesWrapper.id = "slidesWrapper"
        slidesWrapper.style.width = slideWidth * slidesWrapper.children.length + "px"; // set container width
        slidesWrapper.style.display = "flex"; // set container display
        slidesWrapper.style.transform = `translateX(-${slideWidth}px)`;
        slidesContainer.appendChild(slidesWrapper);
        nextBtn.addEventListener("click", nextSlide);
        prevBtn.addEventListener("click", prevSlide);

    }
};