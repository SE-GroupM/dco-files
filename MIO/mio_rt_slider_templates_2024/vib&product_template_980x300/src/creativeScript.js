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

  // SEENTHIS variables
  // Define the video source and tracker variables
  var videoSrc = content.videoSrc.value;
  var videoTracker = content.videoTracker.value;

  //Video player 
  var e = document.createElement('script');
  e.src = 'https://video.seenthis.se/v2/player/74/player.js';
  e.onload = function(){
  var player = new SeenthisPlayer('.campaignImg', videoSrc, videoTracker, options); 
  };
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(e, s);

  //Options for video script
  var options = {
      loop: true,
      autoplay: true,
      muteButton: false,
  };
  
  $('#slider').click(onClick)

  var text_shadow = local_content.text_shadow.value;
  var mainCopyStyle = local_content.mainCopyStyle.value;

  const Slider = {
  currentSlideIndex: 0,
  create: function(options) {
    const slidesContainer = document.querySelector(options.slider);
    const slideTemplate = slidesContainer.querySelector(options.slide);
    const slidesWrapper = document.createElement("div");
    slidesWrapper.id = "slidesWrapper";
    slidesWrapper.style.display = "flex";
    slidesWrapper.style.flexDirection = "column";
    slidesWrapper.style.gap = "20px"; // space between slides for peek
    slidesWrapper.style.position = "relative";

    const slidesData = options.slidesData;
    const slideHeight = slideTemplate.clientHeight + 20; // card height + gap
    let slideIndex = 0;
    let isAnimating = false;

    // Create slides
    slidesData.forEach((data, index) => {
      const slideDiv = slideTemplate.cloneNode(true);
      slideDiv.id = `slide-${index}`;
      slideTemplate.remove();
      options.setSlideContent(slideDiv, data, index);
      slidesWrapper.appendChild(slideDiv);

      // Click event for individual slide
      slideDiv.addEventListener("click", (e) => {
        e.preventDefault();
        window.dispatchEvent(
          new CustomEvent("lemonpi.interaction/click", {
            detail: { placeholder: ["product_collection", index, "click"] },
          })
        );
      });
    });

    // Clone first and last slides for seamless looping
    const firstClone = slidesWrapper.firstElementChild.cloneNode(true);
    const lastClone = slidesWrapper.lastElementChild.cloneNode(true);
    slidesWrapper.appendChild(firstClone);
    slidesWrapper.insertBefore(lastClone, slidesWrapper.firstElementChild);

    slidesContainer.appendChild(slidesWrapper);

    // Initial position (skip the first clone)
    gsap.set(slidesWrapper, { y: -slideHeight });

    // Animation
    function goToSlide(index, onComplete) {
      isAnimating = true;
      gsap.to(slidesWrapper, {
        y: -slideHeight * (index + 1), // +1 to account for clone
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          // Loop logic
          if (index < 0) {
            slideIndex = slidesData.length - 1;
            gsap.set(slidesWrapper, { y: -slideHeight * (slidesData.length) });
          } else if (index >= slidesData.length) {
            slideIndex = 0;
            gsap.set(slidesWrapper, { y: -slideHeight });
          }
          isAnimating = false;
          if (onComplete) onComplete();
          Slider.currentSlideIndex = slideIndex;
        },
      });
    }

    // Next/Prev functions
    function nextSlide() {
      if (isAnimating) return;
      slideIndex--;
      goToSlide(slideIndex);
    }

    function prevSlide() {
      if (isAnimating) return;
      slideIndex++;
      goToSlide(slideIndex);
    }

    // Attach button events
    document.querySelector(options.nextBtn).addEventListener("click", nextSlide);
    document.querySelector(options.prevBtn).addEventListener("click", prevSlide);

    // Auto-scroll
    setInterval(nextSlide, 3000);

    // Pause on hover
    slidesContainer.addEventListener("mouseenter", () => gsap.globalTimeline.pause());
    slidesContainer.addEventListener("mouseleave", () => gsap.globalTimeline.resume());
  },
};

// Initialize slider
Slider.create({
  slidesData: local_content.product_collection.value,
  slider: "#slider",
  slide: ".slide",
  prevBtn: ".prev",
  nextBtn: ".next",
  setSlideContent: function(slideDiv, slideData, slideIndex) {
    // Fill slide content
    $(slideDiv).find("#product_image").css("background-image", "url(" + slideData.product_image.value + ")");
    $(slideDiv).find("#product_name").html(slideData.product_name.value);
    $(slideDiv).find("#description_text").html(slideData.description_text.value);
    $(slideDiv).find("#product_regular_price").html(slideData.product_regular_price.value);
    $(slideDiv).find("#product_old_price").html(slideData.product_old_price.value);
    $(slideDiv).find("#promotion_text").html(slideData.promotion_text.value);
    // $(slideDiv).find("#ctaText").html(local_content.ctaText.value);
  },
});
 
function truncate() {
  // Select all elements with class 'description_text' and truncate if necessary
  $('.description_text').each(function() {
    // Check if text length is more than 13 characters and truncate if necessary
    if ($(this).text().length > 13) {
      $(this).text($(this).text().substring(0, 12) + '');
    }
  });
    // Select all elements with class 'promotion_text' and truncate if necessary
    $('.product_name').each(function() {
    // Check if text length is more than 30 characters and truncate if necessary
    if ($(this).text().length > 14) {
      $(this).text($(this).text().substring(0, 13) + '');
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

const headlineHeight = document.querySelector('#headline').offsetHeight;

if (headlineHeight > 100) { // Assuming 70px corresponds to 3 rows
  document.querySelector('#subline').style.marginTop = '195px'; // Increase margin for 3 rows

} else if (headlineHeight > 85) { // Assuming 35px corresponds to 2 rows
  document.querySelector('#subline').style.marginTop = '160px'; // Margin for 2 rows

} else {
  document.querySelector('#subline').style.marginTop = '130px'; // Default margin for 1 row
}

// Check if mainCopyStyle is italic
if (mainCopyStyle === 'italic') {
  $('#headline').css('font-style', 'italic');
} else if (mainCopyStyle === 'clarice') {
  $('#headline').css('font-family', 'clarice regular');
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
 //.add(playAutoSwipeAnimation, timeBetweenSlides);

 // Function to auto swipe
function playAutoSwipeAnimation () {
  // $('#prev').click();
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