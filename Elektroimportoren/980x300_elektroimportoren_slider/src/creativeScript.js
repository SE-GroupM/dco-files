/**
 * Template Name
 * @Owner Developer Name
 * @Date
 */

function onLemonpiReady(cb) {
  if (cb) {
    const loadLemonpiTimerId = setInterval(function () {
      if (window.lemonpi) {
        clearInterval(loadLemonpiTimerId);
        cb();
      }
    }, 0); // Changed from 0 to 100 to reduce CPU usage, but can be adjusted as needed.
  }
}

// Callback to retrieve the adset data
onLemonpiReady(function () {
  lemonpi.subscribe(function callback(content) {
    // Additional code can be placed here if needed.
  });
});

// Fetch data from adset
window.addEventListener('lemonpi.content/ready', event => {
  const content = event.detail.content;

  // Defines how long the slider displays each product before a new one displays
  var timeBetweenSlides = 3;
 

  const logo = content.logo.value;
  const main_copy = content.main_copy.value;

  // Apply logo and main copy
  $('#logo').css({
    'background-image': `url(${logo})`,
    'background-repeat': 'no-repeat',
    'background-size': 'contain'
  });

  $('#main_copy').html(main_copy);

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
    
          const clickSlider = document.querySelector('#slider');
          clickSlider.addEventListener("click",onClick);
  
        function onClick(event, slideIndex) {
          var x = showCoords(event);
            // Slide 1 clicks
              return window.dispatchEvent(
                new CustomEvent('lemonpi.interaction/click', {
                  detail: {
                    placeholder: ['products', slideIndex, 'click'],
                  }
              }));
          }
        }
      };
    
    Slider.create({
    slidesData: content.products.value, // Assuming this is the correct path to your products data
    setSlideContent: function(slideDiv, slideData, slideIndex) {
      // Now properly setting content using jQuery
      $(slideDiv).find("#product_image").css("background-image","url("+slideData.product_image.value+")");
      $(slideDiv).find("#product_name").html(slideData.product_name.value);
      $(slideDiv).find("#product_price").html(slideData.product_price.value+",-");
      $(slideDiv).find("#cta_text").html(content.cta_text.value);

    }
  });
});

function startAutoSwipe() {
  setInterval(() => {
      nextSlide(); // Assuming nextSlide is accessible in this context
  }, timeBetweenSlides * 3); // Convert to milliseconds
}

 // Function to auto swipe
function playAutoSwipeAnimation () {
  $('#prev').click();
}
// Get coordinates for product boxes
function showCoords(event) {
  var x = event.clientX;
  var coords = x;
  return coords;
}

