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

  //Append headline text
  $('#headline').html(local_content.headline.value);
  $('#headline').css({
  'color': local_content.headline_color.value,
  'font-size': local_content.headline_fontSize.value + 'px',
  'line-height': local_content.headline_fontSize.value + 'px',
  'top': local_content.headline_top.value + 'px',
  });
  //Append subline text
  $('#subline').html(local_content.subline.value);
  //Append subline color
  $('#subline').css({
    'color': local_content.subline_color.value,
    'font-size': local_content.subline_fontSize.value + 'px',
    'line-height': local_content.subline_fontSize.value + 'px',
    'top': local_content.subline_top.value + 'px',
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
  $('#bgColor, #bgBox1, #bgBox2').css({
  'background-color': local_content.bgColor.value,
  });
  //Append right arrow
  $('#next').css({
  'background-image': 'url('+local_content.next.value+ ')'
  });
  //Append left arrow
  $('#prev').css({
  'background-image': 'url('+local_content.prev.value+ ')'
  });

  $('#slider').click(onClick)

  var text_shadow = local_content.text_shadow.value;

  var mainCopyStyle = local_content.mainCopyStyle.value;

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
            slideIndex--;
            const totalSlides = slidesData.length;
            animateSlider(slideIndex, slideIndex + 1, function() {
                isAnimating = false;
                if (slideIndex < 0) {
                    slideIndex = totalSlides - 1;
                    gsap.set(slidesWrapper, {x: -slideWidth * slideIndex});
                }
                Slider.currentSlideIndex = slideIndex;
            });
        }

        function prevSlide() {
            if (isAnimating) return;
            isAnimating = true;
            slideIndex++;
            const totalSlides = slidesData.length;
            animateSlider(slideIndex, slideIndex - 1, function() {
                isAnimating = false;
                if (slideIndex >= totalSlides) {
                    slideIndex = 0;
                    gsap.set(slidesWrapper, {x: 0});
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

        // Add hover event listeners to pause and resume animation
        slidesContainer.addEventListener("mouseenter", function() {
            gsap.globalTimeline.pause();
        });

        slidesContainer.addEventListener("mouseleave", function() {
            gsap.globalTimeline.resume();
        });
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
    // Append ctaText
    $(slideDiv).find('#ctaText').html(local_content.ctaText.value);
    $(slideDiv).find('#ctaText').css({
    'color': local_content.ctaCopyColor.value,
    'background-color': local_content.ctaButtonBg.value,
    });
    // Find description div and append description
    $(slideDiv).find("#promotion_text").html(slideData.promotion_text.value);
    $(slideDiv).find("#description_text").html(slideData.description_text.value);
    $(slideDiv).find("#product_promotion_type").html(slideData.product_promotion_type.value);
    // Find description div and append description
    $(slideDiv).find("#product_regular_price").html(slideData.product_regular_price.value);
    $(slideDiv).find("#product_old_price").html(slideData.product_old_price.value);
    if (slideData.product_old_price.value) {
      $(slideDiv).find("#product_regular_price").addClass('salePrice').removeClass('#product_regular_price');
    } else {
      $(slideDiv).find("#product_regular_price").removeClass('salePrice').addClass('#product_regular_price');
    if (slideData.promotion_text.value) {
      $(slideDiv).find("#promotion_text").addClass('promotion_text');
    } else {
      $(slideDiv).find("#promotion_text").removeClass('promotion_text');
    }
      }
    }
  }
);
 
function truncate() {
  // Select all elements with class 'description_text' and truncate if necessary
  $('.description_text').each(function() {
    // Check if text length is more than 30 characters and truncate if necessary
    if ($(this).text().length > 15) {
      $(this).text($(this).text().substring(0, 13) + '');
    }
  });
    // Select all elements with class 'promotion_text' and truncate if necessary
    $('.product_name').each(function() {
    // Check if text length is more than 30 characters and truncate if necessary
    if ($(this).text().length > 18) {
      $(this).text($(this).text().substring(0, 16) + '');
    }
  });
  
  // Select all elements with class 'promotion_text' and truncate if necessary
  $('.promotion_text').each(function() {
    // Check if text length is more than 25 characters and truncate if necessary
    if ($(this).text().length > 24) {
      $(this).text($(this).text().substring(0, 22) + '');
    }
  });
}

// Run the function to apply the text truncation
truncate();

var text_shadow = Number(local_content.text_shadow.value);

// Apply text shadow based on the value of text_shadow
if (!isNaN(text_shadow) && text_shadow >= 0 && text_shadow <= 100) {
  // Calculate the alpha value from the percentage
  let alpha = text_shadow / 100;
  // Calculate the intensity factor for a more intense shadow
  let intensity = 6 + (text_shadow / 100) * 24; // This will give a range from 6px to 30px blur radius

  $('#headline, #subline').css({
    'text-shadow': `0px 0px ${intensity * 0.5}px rgba(0, 0, 0, ${alpha * 0.8})`
  });
  
} else {
  $('#headline, #subline').css({
    'text-shadow': 'none'
  });
}
// Check if mainCopyStyle is italic
if (mainCopyStyle === 'italic') {
  $('#headline').css('font-style', 'italic');
} else if (mainCopyStyle === 'clarice') {
  $('#headline').css('font-family', 'clarice regular');
}

const headlineHeight = document.querySelector('#headline').offsetHeight;

if (headlineHeight > 55) {
  document.querySelector('#subline').style.marginTop = '140px';

} else {
  document.querySelector('#subline').style.marginTop = '100px'; // default margin for exactly 25px, adjust as needed
}

       /////////////////////
     //// ANIMATIONS /////
    ////////////////////

    var tl = new TimelineMax();

    // Add animations to the timeline
    tl.to("#headline", 1, { opacity: 1 })
      .to("#subline", 1, { opacity: 1 }, "-=1"); // Fades in subline at the same time as headline
    
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