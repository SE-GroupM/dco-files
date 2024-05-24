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
  $('#headline').html(local_content.headline.value);
  //Append main copy color
  $('#headline').css({
    'color': local_content.headline_color.value,
  });
  //Append background image
  $('#campaignImg').css({
  'background-image': 'url('+local_content.campaignImg.value+ ')'
  });
  //Append logo
  $('#logoImg').css({
  'background-image': 'url('+local_content.logoImg.value+ ')'
  });
    //Append bg-color
  $('#bgColor').css({
  'background-color': local_content.bgColor.value,
  });

  $('#slider').click(onClick)
  //Append right arrow
  $('#next').css({
  'background-image': 'url('+local_content.next.value+ ')'
  });
  //Append left arrow
  $('#prev').css({
  'background-image': 'url('+local_content.prev.value+ ')'
  });

  var text_shadow = local_content.text_shadow.value;

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
                    x: target,
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

            // Add click event listener for each slide
            slideDiv.addEventListener('click', function(event) {
                onClick(event, index);
            });
        }

        function animateSlider(index, previousIndex, onComplete) {
            const currentSlide = slidesWrapper.querySelectorAll(settings.slide)[index];
            const lastSlide = slidesWrapper.querySelectorAll(settings.slide)[previousIndex];
            const target = -slideWidth * index;
            const timeline = gsap.timeline({onComplete: onComplete});
            settings.animation(timeline, slidesWrapper, currentSlide, lastSlide, index, target, onComplete);
        }

        function nextSlide() {
            if (isAnimating) return;
            isAnimating = true;
            slideIndex++;
            const totalSlides = slidesData.length;
            animateSlider(slideIndex, slideIndex - 1, function() {
                isAnimating = false;
                if (slideIndex === totalSlides + 1) {
                    slideIndex = 1;
                    gsap.set(slidesWrapper, {x: -slideWidth});
                }
                Slider.currentSlideIndex = slideIndex;
            });
        }

        function prevSlide() {
            if (isAnimating) return;
            isAnimating = true;
            slideIndex--;
            const totalSlides = slidesData.length;
            animateSlider(slideIndex, slideIndex + 1, function() {
                isAnimating = false;
                if (slideIndex === 0) {
                    slideIndex = totalSlides;
                    gsap.set(slidesWrapper, {x: -slideWidth * totalSlides});
                }
                Slider.currentSlideIndex = slideIndex;
            });
        }

        slidesData.forEach((slideData, index) => createSlide(slideData, index));
        // Clone the last slide and append it to the beginning of the slidesWrapper
        const lastSlide = slidesWrapper.lastChild.cloneNode(true);
        const firstSlide = slidesWrapper.firstChild.cloneNode(true);
        lastSlide.id = "slide-2-clone";
        slidesWrapper.insertBefore(lastSlide, slidesWrapper.firstChild);
        firstSlide.id = "slide-0-clone";
        slidesWrapper.appendChild(firstSlide);

        slidesWrapper.id = "slidesWrapper";
        slidesWrapper.style.width = slideWidth * slidesWrapper.children.length + "px"; // set container width
        slidesWrapper.style.display = "flex"; // set container display
        slidesWrapper.style.transform = `translateX(-${slideWidth}px)`;
        slidesContainer.appendChild(slidesWrapper);
        nextBtn.addEventListener("click", nextSlide);
        prevBtn.addEventListener("click", prevSlide);

        function onClick(event, slideIndex) {
            // Handle the product click event
            event.preventDefault();
            window.dispatchEvent(
                new CustomEvent('lemonpi.interaction/click', {
                    detail: {
                        placeholder: ['product_collection', slideIndex, 'click'],
                    }
                })
            );
        }
    }
};

Slider.create({
  slidesData: local_content.product_collection.value,
  width: 300,
  setSlideContent: function(slideDiv, slideData, slideIndex) {
    
    // Find product image div and append image
    $(slideDiv).find("#product_image").css("background-image","url("+slideData.product_image.value+")");
    // Find title div and append title
    $(slideDiv).find("#product_name").html(slideData.product_name.value);
    // Find title div and append title
    $(slideDiv).find("#product_new").html(slideData.product_new.value);
    // Find description div and append description
    $(slideDiv).find("#product_regular_price").html(slideData.product_regular_price.value + ',-');
    // Append ctaText
    $(slideDiv).find("#cta_text").html(slideData.cta_text.value);
    // Find description div and append description
    $(slideDiv).find("#promotion_text").html(slideData.promotion_text.value);
    $(slideDiv).find("#description_text").html(slideData.description_text.value);
    $(slideDiv).find("#product_promotion_type").html(slideData.product_promotion_type.value);
      $(slideDiv).find("#product_old_price").html(slideData.product_old_price.value);
  /*if (slideData.productDiscountPriceNumber.value > 0) {
      $(slideDiv).find("#productPrice").html('<span class="salePrice">' + slideData.productPriceNumber.value + ',-</span> <span class="oldPrice">'+ slideData.productAveragePrice.value + '</span>');
      */
    }
  }
);
  

function truncate() {
  // Select all elements with class 'product-name'
  const elements = document.querySelectorAll('.product_name');

  elements.forEach(element => {
    // Check if text length is more than 25 characters and truncate if necessary
    if (element.innerText.length > 40) {
      element.innerText = element.innerText.substring(0, 36) + '...';
    }
  });

  // Additionally, check if there's an element with ID 'product-name'
  const idElement = document.getElementById('product_name');
  if (idElement && idElement.innerText.length > 40) {
    // Apply truncation for the ID element as well
    idElement.innerText = idElement.innerText.substring(0, 36) + '...';
  }
}

// Run the function to apply the text truncation
truncate();


if (text_shadow === 'yes') {
  $('#headline').css({
    'text-shadow': '0px 1px 12px rgba(0, 0, 0, 0.3)'
  });
} else {
  $('#headline').css({
    'text-shadow': 'none'
  });
}

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