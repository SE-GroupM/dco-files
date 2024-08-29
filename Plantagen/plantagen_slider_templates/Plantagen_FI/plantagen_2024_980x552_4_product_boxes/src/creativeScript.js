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
  var products = local_content.products.value;
  
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
  
  // Defines how long the slider displays each product before a new one displays
  var timeBetweenSlides = 3;
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
            if (index !== 0) {
                slideTemplate.remove();
            }
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
  
        function prevSlide() {
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
  
        function nextSlide() {
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
  
        // Clone the last slide and append it to the end of the slidesWrapper
        const firstSlide = slidesWrapper.firstChild.cloneNode(true);
        const lastSlide = slidesWrapper.lastChild.cloneNode(true);
        firstSlide.id = "slide-0-clone";
        slidesWrapper.appendChild(firstSlide);
        lastSlide.id = "slide-2-clone";
        slidesWrapper.insertBefore(lastSlide, slidesWrapper.firstChild);
  
        slidesWrapper.id = "slidesWrapper";
        slidesWrapper.style.width = slideWidth * slidesWrapper.children.length + "px"; // set container width
        slidesWrapper.style.display = "flex"; // set container display
        slidesWrapper.style.transform = `translateX(-${slideWidth}px)`;
        slidesContainer.appendChild(slidesWrapper);
        nextBtn.addEventListener("click", nextSlide);
        prevBtn.addEventListener("click", prevSlide);
  
        // Assign the functions to the Slider object
        Slider.nextSlide = nextSlide;
        Slider.prevSlide = prevSlide;
    }
  };
  
  
  function onClick(event, slideIndex) {
      // Handle the product click event
      event.preventDefault();
      window.dispatchEvent(
          new CustomEvent('lemonpi.interaction/click', {
              detail: {
                  placeholder: ['products', slideIndex, 'click'],
              }
          })
      );
  }
  
  // Define the truncate function
  function truncateText(text, maxLength) {
      if (text.length > maxLength) {
          return text.substring(0, maxLength) + '...';
      }
      return text;
  }
  
  Slider.create({
    slidesData: chunkArray(local_content.products.value, 4), // Chunk the data into groups of four
    width: 400, // Adjusted width
    setSlideContent: function(slideDiv, slideData, slideIndex) {
        // Function to remove leading comma and space from the description
        function cleanDescription(description) {
            if (description.startsWith(", ")) {
                return description.substring(2); // Remove the comma and the space
            } else if (description.startsWith(",")) {
                return description.substring(1); // Remove the comma
            }
            return description; // Return the original description if no comma is found
        }
  
        // Apply the cleanDescription function to the descriptions
        slideData.forEach(product => {
            product.product_description.value = cleanDescription(product.product_description.value);
        });
  
        // First row, first product
        let firstProduct = slideData[0];
        let firstCard = $(slideDiv).find(".row").eq(0).find(".card").eq(0);
        firstCard.find(".product_image").css("background-image", "url(" + firstProduct.product_image.value + ")");
        firstCard.find(".title").html(truncateText(firstProduct.title.value, 20));
        firstCard.find(".product_description").html(truncateText(firstProduct.product_description.value, 29));
        setPriceContent(firstProduct.priceNormal.value, firstProduct.priceDiscount.value, firstCard.find('.priceNormal'));
        firstCard.find('.cta').html(local_content.ctaText.value);
  
        // First row, second product
        let secondProduct = slideData[1];
        let secondCard = $(slideDiv).find(".row").eq(0).find(".card").eq(1);
        secondCard.find(".product_image").css("background-image", "url(" + secondProduct.product_image.value + ")");
        secondCard.find(".title").html(truncateText(secondProduct.title.value, 20));
        secondCard.find(".product_description").html(truncateText(secondProduct.product_description.value, 29));
        setPriceContent(secondProduct.priceNormal.value, secondProduct.priceDiscount.value, secondCard.find('.priceNormal'));
        secondCard.find('.cta').html(local_content.ctaText.value);
  
        // Second row, first product
        let thirdProduct = slideData[2];
        let thirdCard = $(slideDiv).find(".row").eq(1).find(".card").eq(0);
        thirdCard.find(".product_image").css("background-image", "url(" + thirdProduct.product_image.value + ")");
        thirdCard.find(".title").html(truncateText(thirdProduct.title.value, 20));
        thirdCard.find(".product_description").html(truncateText(thirdProduct.product_description.value, 29));
        setPriceContent(thirdProduct.priceNormal.value, thirdProduct.priceDiscount.value, thirdCard.find('.priceNormal'));
        thirdCard.find('.cta').html(local_content.ctaText.value);
  
        // Second row, second product
        let fourthProduct = slideData[3];
        let fourthCard = $(slideDiv).find(".row").eq(1).find(".card").eq(1);
        fourthCard.find(".product_image").css("background-image", "url(" + fourthProduct.product_image.value + ")");
        fourthCard.find(".title").html(truncateText(fourthProduct.title.value, 20));
        fourthCard.find(".product_description").html(truncateText(fourthProduct.product_description.value, 29));
        setPriceContent(fourthProduct.priceNormal.value, fourthProduct.priceDiscount.value, fourthCard.find('.priceNormal'));
        fourthCard.find('.cta').html(local_content.ctaText.value);
    }
  });
  
  // Helper function to set price content
  function setPriceContent(priceNormal, priceDiscount, priceElement) {
    if (priceNormal) {
        var tempNormal = priceNormal.split(".");
        var tempDiscount = priceDiscount ? priceDiscount.split(".") : null;
  
        if (!priceDiscount || isNaN(priceDiscount)) {
            if (tempNormal[1] > 0) {
                priceElement.html(tempNormal[0] + '<span class="supPlantagen">' + tempNormal[1] + ' </span>');
            } else {
                priceElement.html(tempNormal[0] + ':-');
            }
        } else {
            if (tempDiscount[1] > 0) {
                if (tempNormal[1] > 0) {
                    priceElement.html('<span class="discountColor">' + tempDiscount[0] + '<span class="supPlantagen">' + tempDiscount[1] + '</span></span> (' + tempNormal[0] + '<span class="supPlantagen">' + tempNormal[1] + ' </span>)');
                } else {
                    priceElement.html('<span class="discountColor">' + tempDiscount[0] + '<span class="supPlantagen">' + tempDiscount[1] + '</span></span> (' + tempNormal[0] + ":-)");
                }
            } else {
                if (tempNormal[1] > 0) {
                    priceElement.html('<span class="discountColor">' + tempDiscount[0] + '</span> (' + tempNormal[0] + '<span class="supPlantagen">' + tempNormal[1] + ' </span>)');
                } else {
                    priceElement.html('<span class="discountColor">' + tempDiscount[0] + ':-</span> (' + tempNormal[0] + ":-)");
                }
            }
        }
    } else {
        priceElement.html('');
    }
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

  function chunkArray(array, chunkSize) {
    var result = [];
    for (var i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
  
  
  // Auto swipe every three seconds
  var autoSwipeAnimation = gsap.timeline({ repeat: -1 })
      .add(playAutoSwipeAnimation, 3);
  
  function playAutoSwipeAnimation() {
      Slider.nextSlide();
  }
  
      var tl = new TimelineMax();
  
      // Add animations to the timeline
      tl.to("#mainCopy", 1, { opacity: 1 }); 
      
  //Animation of badge elements
  var t2 = new TimelineMax({repeat:-1});
    t2.fromTo('#badgeElement1', 0.3, {rotationY: 0} ,{rotationY: -90},4)
    .fromTo('#badgeElement2', 0.3, {rotationY: -90} ,{rotationY: 0},4.2)
    .to('#badgeElement2', 0.3, {rotationY: -90}, 7)
    .to('#badgeElement1', 0.3, {rotationY: 0}, 7.2)
  
  
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
          placeholder: ['products', currentProduct, 'click'],
        }
    }));
  }