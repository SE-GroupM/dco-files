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

var bgColor= content.content_creative_background_color.value; // Background color source
  // Append background color to container
  $('#creative_container').css({
    'background-color': bgColor
  })
  
  //Append logo and color
  var logoColor= local_content.logoColor.value; // Logo color source
  var logo_shadow = local_content.logo_shadow.value;
  var svgLogo = '<svg id="Lager_1" data-name="Lager 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.17 89.41"><defs><style>.cls-1{fill:'+logoColor+';}</style></defs><path class="cls-1" d="M197.21,247.85h-20.9v86.94h16.93V302.6h4.09c9.27,0,15.79-3.14,19.92-9.59,3.26-5,3.9-10.33,3.9-17.78,0-10.81-1.64-16.28-6.26-20.93C210.44,249.84,205,247.85,197.21,247.85ZM197,287h-3.72V263.47h4.21c7.21,0,7.5,3.42,7.5,11.87C205,284.19,204.59,287,197,287Z" transform="translate(-176.31 -246.72)"/><polygon class="cls-1" points="67.29 1.13 50.36 1.13 50.36 88.07 88.54 88.07 88.54 71.14 67.29 71.14 67.29 1.13"/><polygon class="cls-1" points="251.8 1.13 203.85 1.13 203.85 17.12 219.36 17.12 219.36 88.07 236.29 88.07 236.29 17.12 251.8 17.12 251.8 1.13"/><polygon class="cls-1" points="354.65 88.07 396.2 88.07 396.2 71.14 371.58 71.14 371.58 52.06 392.83 52.06 392.83 36.45 371.58 36.45 371.58 17.12 396.2 17.12 396.2 1.13 354.65 1.13 354.65 88.07"/><path class="cls-1" d="M287,247.85l-20.44,86.94H283.3l3.53-17.34h17.52L308,334.79h16.73l-20.44-86.94Zm2.73,55.28,5.69-27.9h.36l5.7,27.9Z" transform="translate(-176.31 -246.72)"/><polygon class="cls-1" points="181.91 44.08 181.57 44.08 165.81 1.13 150.96 1.13 150.96 88.07 167.89 88.07 167.89 45.05 168.23 45.05 184.07 88.07 198.85 88.07 198.85 1.13 181.92 1.13 181.91 44.08"/><path class="cls-1" d="M441.08,247.85l-20.43,86.94h16.73l3.52-17.34h17.52l3.67,17.34h16.73l-20.44-86.94Zm2.73,55.28,5.69-27.9h.36l5.7,27.9Z" transform="translate(-176.31 -246.72)"/><path class="cls-1" d="M524.21,276.2v-6.7c0-15-11.29-22.78-22.43-22.78s-22.44,7.82-22.44,22.78v43.84c0,15,11.28,22.79,22.44,22.79s22.43-7.83,22.43-22.79V285.73h-21.9V300h6.08v13.32c0,5.55-4.11,5.9-6.08,5.9s-6.08-.58-6.08-5.9V269.5c0-5.31,3.88-5.89,5.55-5.89s5.54.58,5.54,5.89v6.7Z" transform="translate(-176.31 -246.72)"/><path class="cls-1" d="M642.81,336.13a9.67,9.67,0,1,1,9.67-9.67A9.68,9.68,0,0,1,642.81,336.13Zm0-17.69a8,8,0,1,0,8,8A8,8,0,0,0,642.81,318.44Z" transform="translate(-176.31 -246.72)"/><path class="cls-1" d="M639.36,331.2v-9.92h4c2.25,0,3.16,1.3,3.17,2.94a2.46,2.46,0,0,1-1.81,2.56l2.19,4.42h-2.11l-1.87-4h-1.63v4Zm1.9-5.58h1.4c1.48,0,1.94-.47,1.94-1.4s-.56-1.4-1.61-1.4h-1.73Z" transform="translate(-176.31 -246.72)"/><polygon class="cls-1" points="433.59 44.08 433.25 44.08 417.49 1.13 402.64 1.13 402.64 88.07 419.57 88.07 419.57 45.05 419.91 45.05 435.75 88.07 450.53 88.07 450.53 1.13 433.6 1.13 433.59 44.08"/></svg>'
  $("#logo").css({
  'background': 'rgba(0,0,0,0)'
  }).append(svgLogo);
  
  var overlayColor= local_content.overlay_color.value; // Image color overlay source
  var overlayOpacity= local_content.overlay_opacity.value; // Image color overlay source
  // Append overlay color to container
  $('#overlay').css({
    'background-color': overlayColor,
    'opacity': overlayOpacity
  })

  //Aooend mainCopy to creative
  var mainCopy = local_content.mainCopy.value;
  //Define mainCopy as a html object
  $('#mainCopy').html(mainCopy);

  var mainCopyShadow = local_content.mainCopy_shadow_yes_no.value;
  var copyColor = local_content.mainCopy_color.value; //Color of main copy
  var copyFontSize = local_content.mainCopy_fontsize.value; //Font size of main copy
  // Append main copy
  $('#mainCopy').css({
    'color': copyColor,
    'font-size': copyFontSize,
    'text-shadow': mainCopyShadow,
    'line-height': parseInt(copyFontSize) + 2 + 'px',
  })
  
  var ctaCopyColor = local_content.cta_copy_color.value; //Color of cta copy
  var ctaBgcolor = local_content.cta_color.value; //Color of cta background
  // Append cta color
  $('.cta').css({
    'color': ctaCopyColor,
    'background-color': ctaBgcolor,
  })
  
  var copyColor = local_content.mainCopy_color.value; //Color of main copy
  var copyFontSize = local_content.mainCopy_fontsize.value; //Font size of main copy
  // Append main copy
  $('#mainCopy').css({
    'color': copyColor,
    'font-size': copyFontSize,
  })
  
    //Append right arrow
    $('#next').css({
      'background-image': 'url('+local_content.next.value});
      //Append left arrow
      $('#prev').css({
      'background-image': 'url('+local_content.prev.value});


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
          return;
      } else if (!settings.setSlideContent) {
          console.warn('Slider.create has failed. createSlide is empty');
          return;
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
          const target = -slideWidth * index;
          const timeline = gsap.timeline({onComplete: onComplete});
          settings.animation(timeline, slidesWrapper, currentSlide, lastSlide, index, target, onComplete);
      }

      function nextSlide() {
          if (isAnimating) return;
          isAnimating = true;
          slideIndex--;
          const totalSlides = slidesData.length;
          if (slideIndex < 1) {
              slideIndex = totalSlides;
              gsap.set(slidesWrapper, {x: slideWidth*(totalSlides+1)});
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
        
      function prevSlide() {
          if (isAnimating) return;
          isAnimating = true;
          slideIndex++;
          
          const totalSlides = slidesData.length;
          if (slideIndex === totalSlides + 1) {
              slideIndex = 1;
              gsap.set(slidesWrapper, {x: -slideWidth});
              animateSlider(slideIndex, slideIndex-1, function() {
                  isAnimating = false;
              });
          } else {
              animateSlider(slideIndex, slideIndex-1, function() {
                  isAnimating = false;
              });
          }
          Slider.currentSlideIndex = slideIndex;
      }

      slidesData.forEach((slideData, index) => createSlide(slideData, index));
      const lastSlide = slidesWrapper.lastChild.cloneNode(true);
      const firstSlide = slidesWrapper.firstChild.cloneNode(true);
      lastSlide.id = "slide-2-clone";
      slidesWrapper.insertBefore(lastSlide, slidesWrapper.firstChild);
      firstSlide.id = "slide-0-clone";
      slidesWrapper.appendChild(firstSlide);

      slidesWrapper.id = "slidesWrapper";
      slidesWrapper.style.width = slideWidth * slidesWrapper.children.length + "px";
      slidesWrapper.style.display = "flex";
      slidesWrapper.style.transform = `translateX(-${slideWidth}px)`;
      slidesContainer.appendChild(slidesWrapper);
      nextBtn.addEventListener("click", nextSlide);
      prevBtn.addEventListener("click", prevSlide);

      const clickSlider = document.querySelector('#slider');
      clickSlider.addEventListener("click", onClick);

      function onClick (slideIndex) {
        var x = showCoords(event);
        return window.dispatchEvent(
          new CustomEvent('lemonpi.interaction/click', {
            detail: {
              placeholder: ['products', slideIndex, 'click'],
            }
          })
        );
      }
  }
};

Slider.create({
  slidesData: local_content.products.value,
  width: 160,
  setSlideContent: function(slideDiv, slideData, slideIndex) {
    $(slideDiv).find("#product_img").css("background-image","url("+slideData.product_image.value+")");
    $(slideDiv).find("#title").html(slideData.title.value);
    $(slideDiv).find("#description").html(slideData.product_description.value);
    $(slideDiv).find("#cta").html(local_content.ctaText.value);
    
    var priceNormal = slideData.priceNormal.value;
    var priceDiscount = slideData.priceDiscount.value;
    
    var normalPrice = parseFloat(priceNormal);
    normalPrice = normalPrice.toFixed(2);
    var tempNormal = normalPrice.split(".");
    
    var discountPrice = parseFloat(priceDiscount);
    discountPrice = discountPrice.toFixed(2);
    var tempDiscount = discountPrice.split(".");

    if (isNaN(discountPrice)) {
      if (tempNormal[1] > 0o0) {
        $(slideDiv).find('#price_elements').html(tempNormal[0] + '<span class="supPlantagen">' + tempNormal[1]  + ' </span>');
      } else {
        $(slideDiv).find('#price_elements').html(tempNormal[0] + ':-');
      }
    } else {
      if (tempDiscount[1] > 0o0) {
        if (tempNormal[1] > 0o0) {
          $(slideDiv).find('#price_elements').html('<span class="discountColor">' + tempDiscount[0] + '<span class="supPlantagen">' + tempDiscount[1] + '</span></span> (' + tempNormal[0] + '<span class="supPlantagen">' + tempNormal[1] + ' </span>)');
        } else {
          $(slideDiv).find('#price_elements').html('<span class="discountColor">' + tempDiscount[0] + '<span class="supPlantagen">' + tempDiscount[1] + '</span></span> (' + tempNormal[0] + ":-)");
        }
      } else {
        if (tempNormal[1] > 0o0) {
          $(slideDiv).find('#price_elements').html('<span class="discountColor">' + tempDiscount[0] + '</span> (' + tempNormal[0] + '<span class="supPlantagen">' + tempNormal[1] + ' </span>)');
        } else {
          $(slideDiv).find('#price_elements').html('<span class="discountColor">' + tempDiscount[0] + ':-</span> (' + tempNormal[0] + ":-)");
        }
      }
    }
  }
});

var autoSwipeAnimation = new TimelineMax({ repeat: -1 })
 .add(playAutoSwipeAnimation, timeBetweenSlides);

function playAutoSwipeAnimation () {
  $('#prev').click();
}

function showCoords(event) {
  var x = event.clientX;
  var coords = x;
  return coords;
}

 // Apply the condition to remove text-shadow if the value is 'no'
 if (mainCopyShadow === 'no') {
  $('#mainCopy').css('text-shadow', 'none');
}
  
 // Apply or remove the drop-shadow based on the value of logoShadow
 if (logo_shadow === 'yes') {
  $('#logo').css('filter', 'drop-shadow(1px 1px 1px rgba(83, 83, 83, 0.4))');
} else {
  $('#logo').css('filter', 'none');
}



//Animation of badge elements
var t1 = new TimelineMax({repeat:-1});
  t1.fromTo('#badgeElement1', 0.3, {rotationY: 0} ,{rotationY: -90},4)
  .fromTo('#badgeElement2', 0.3, {rotationY: -90} ,{rotationY: 0},4.2)
  .to('#badgeElement2', 0.3, {rotationY: -90}, 7)
  .to('#badgeElement1', 0.3, {rotationY: 0}, 7.2)

})


 function onClick (event) {
  return window.dispatchEvent(
    new CustomEvent('lemonpi.interaction/click', {
      detail: {
        placeholder: ['products', currentProduct, 'click'],
      }
  }));
}