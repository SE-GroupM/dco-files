/**
  * Template Name
  * @Owner Developer Name 
  * @Date
*/

function onLemonpiReady(cb) {
  if (cb) {
    var loadLemonpiTimerId = setInterval(function () {
      if (window.lemonpi) {
        clearInterval(loadLemonpiTimerId);
        cb();
      }
    }, 0);
  }
}

// Callback to retrieve the adset data
onLemonpiReady(function () {
  lemonpi.subscribe(function callback(content) {
    // code here
    
  });
});

// Fetch data from adset
window.addEventListener('lemonpi.content/ready', event => {
  // object holding all data from adset
  const content = event.detail.content
  const source = event.detail.source

//Local varaible for content
var local_content = content;

// Defines how long the slider displays each product before a new one displays
var timeBetweenSlides = 3;

    //Append main copy text
    $('#mainCopy').html(local_content.mainCopy.value);
    //Append main copy color
    $('#mainCopy').css({
      'color': local_content.copyColor.value,
    });

    //Append background image
    $('#bgImage').css({
      'background-image': 'url('+local_content.bgImage.value+ ')'
    });

     //Append logo
     $('#logo').css({
      'background-image': 'url('+local_content.logo.value+ ')'
    });

    $('#logoBg').css({
      'background-color': local_content.logo_bg_color.value,
    });

    $('#bg_color').css({
      'background-color': local_content.bgColor.value,
    });

    $('#slider').click(onClick)

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

      function onClick (slideIndex) {
        // Check coordinates for which product area is clicked on.
        var x = showCoords(event);
        // Slide 1 clicks
          return window.dispatchEvent(
            new CustomEvent('lemonpi.interaction/click', {
              detail: {
                placeholder: ['product_collection', slideIndex, 'click'],
              }
          }));
      }
  }
};


Slider.create({
  slidesData: local_content.product_collection.value,
  width: 300,
  setSlideContent: function(slideDiv, slideData, slideIndex) {
    
    //Find product image div and append image
    $(slideDiv).find("#productImage").css("productImage","url("+slideData.productImage.value+")");
    //Find title div and append title
    $(slideDiv).find("#productDescription").html(slideData.productDescription.value);
    //Find description div and append description
    $(slideDiv).find("#productPrice").html(slideData.productPriceNumber.value);
    //Find cta div and append cta copy
    $(slideDiv).find("#ctaText").html(local_content.ctaText.value);
  }
});

// Auto swipe every three seconds
var autoSwipeAnimation = new TimelineMax({ repeat: -1 })
 .add(playAutoSwipeAnimation, timeBetweenSlides);

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

})

function onClick (event) {
  return window.dispatchEvent(
    new CustomEvent('lemonpi.interaction/click', {
      detail: {
        placeholder: ['product_collection', currentProduct, 'click'],
      }
  }));
}


