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

window.addEventListener('lemonpi.content/ready', event => {
  const content = event.detail.content;
  //Variable for local content
  var local_content = content;
  
  // World click event caller
  $('#worldClick').click(onClick);
  $('#productName_1').html("<p>"+local_content.productName_1.value+"</p>");
  $('#productName_2').html("<p>"+local_content.productName_2.value+"</p>");

  var productName1_fontSize = local_content.productName1_fontSize.value;
  var productName2_fontSize = local_content.productName2_fontSize.value;
  var useAnimation = local_content.use_animation.value.toLowerCase();
  var videoAdjustmentTop = local_content.video_placement_topPosition.value.value;
  var use2subCopy = local_content.use2subCopy.value.toLowerCase();
  
 // import content of price currency from placeholder
 let price_currency_content = local_content.price_currency_content.value;
 // If the tempalte should not use any price from product. Then append larger CSS on copy
 if (local_content.use2FramesCopy.value.toLowerCase() === 'yes') {
      $('#productName_1').addClass('largerCopy');
      $('#productName_2').addClass('largerCopy');
    
      if (local_content.subCopy.value != ''){
        $('#productName_2').remove('largerCopy');
        $('#subCopy').html(local_content.subCopy.value); // sub Copy
        $('#subCopy_2').html(local_content.subCopy_2.value); // sub Copy

        // Dynamically position subCopy 30px below productName_1
        const productName1Height = $('#productName_1').outerHeight(true); // Get height including margins
        const productName1Top = parseInt($('#productName_1').css('top')); // Get top position of productName_1
        const subCopyTop = productName1Top + productName1Height - 40; // Calculate new top for subCopy

        $('#subCopy').css('top', `${subCopyTop}px`); // Apply new top position to subCopy
        $('#subCopy_2').css('top', `${subCopyTop}px`); // Apply new top position to subCopy
      }
    }

 // If the text gets too big and needs to be adjusted manually
 if(productName1_fontSize != ''){
   $('#productName_1').remove('largerCopy');
   $('#productName_1').css({
     'font-size': parseInt(productName1_fontSize)+'px',
     'line-height': parseInt(productName1_fontSize)+'px',
   });
 }
 if(productName2_fontSize != ''){
   $('#productName_2').css({
     'font-size': parseInt(productName2_fontSize)+'px',
     'line-height': parseInt(productName2_fontSize)+'px',
   });
 }
  // assigning the sideplate the yello "tejp" image
  $("#sideplate").css("background-image","url(https://assets.lemonpi.io/a/k/71e6f490-17f1-46fb-acdf-4135d1bc1c2f/Assets/Byggmax-2025/gul_tejp.png)");
  
  // variable holding textcolor from adset
  var setTextColors = local_content.textColor.value;
  // Select multiple elements with differnet classes
  var allElements = document.querySelectorAll('.currentPrice, .productName_1, .productName_2');

  // Loop through the Nodelist and add same css class to each element
  allElements.forEach(function(element) {
    element.classList.add('textColor_css');
  });

  if (setTextColors && setTextColors.trim() !== '') {
    // If setTextColors has a value, apply the CSS color
    $('.textColor_css').css({
      'color': setTextColors,
    });
  }
  
  // append img as background
  $(".imgBg").css("background-image","url("+local_content.image_placeholder.value+")");
  $('.imgBg').css({
    'position': 'absolute',
    'top': videoAdjustmentTop,
    'height': '100%',
    'background-color': '#FFe632',
    'background-repeat': 'no-repeat',
    'width': '100%',
  })
  // position of badge dynamic elements
  var topPercentage = local_content.badge_top_value.value; // top in %
  var leftPercentage = local_content.badge_left_value.value; // left in %

  // append badge as background
  $("#badge").css("background-image","url("+local_content.badge.value+")");
  $('#badge').css({
      'position': 'absolute',
      'top': topPercentage+'%',
      'left': leftPercentage+'%',
      'transform': 'translate(-50%, -50%)',
      'width': '180px',
      'height': '180px',
      'display': 'flex',
      'background-repeat': 'no-repeat',
      'background-size': 'contain',
  })

  // Append logoPlaceholder as background
  $("#logoPlaceholder").css("background-image", "url(" + local_content.logoPlaceholder.value + ")");
  $('#logoPlaceholder').css({
    'display': 'flex',
    'justify-content': 'flex-start', // Align content to the left inside the div
    'align-items': 'flex-end',       // Align content to the bottom inside the div
    'background-repeat': 'no-repeat',
    'background-size': 'contain',   // Ensure the image fits within the div without cropping
    'background-position': 'left bottom' // Align the image to the bottom-left corner
  });

  //////////////////
  /// ANIMATIONS ///
  //////////////////


  if (useAnimation === 'no') {
    // No animation on background image, only on badge
   
    // Select elements
    const badge = document.querySelector('#badge');
    const productName1 = document.querySelector('#productName_1');
    const subCopy = document.querySelector('#subCopy');
    const subCopy2 = document.querySelector('#subCopy_2'); // New element for alternating text
   
    // Define the badge pulsating animation
    function animateBadge() {
        gsap.to(badge, { 
            scale: 1.1, 
            duration: 0.5, 
            ease: "power1.inOut", 
            repeat: 1, // Pulsates once per cycle
            yoyo: true 
        });
    }
   
    // Initial animations
    const timeline = gsap.timeline();
   
    // Set initial states for all elements
    timeline
        .set(badge, { opacity: 0, scale: 0 }) // Badge starts invisible and scaled down
        .set(productName1, { x: '-100%', opacity: 0 }) // ProductName_1 starts off-screen and hidden
        .set(subCopy, { x: '-100%', opacity: 0 }); // SubCopy starts off-screen and hidden
   
    if (use2subCopy === 'yes') {
        // Add subCopy2 to the animation if use2subCopy is enabled
        timeline.set(subCopy2, { x: '-100%', opacity: 0 }); // SubCopy_2 starts off-screen and hidden
    }
   
    // Badge initial pop-up animation
    timeline
        .to(badge, { opacity: 1, scale: 1.5, duration: 0.3, ease: "power1.out" }) // Pop up effect
        .to(badge, { scale: 1, duration: 0.3, ease: "power1.in" }) // Return to normal size
        .call(() => {
            // Start pulsating effect every 3 seconds after the initial animation
            setInterval(animateBadge, 3000);
        });
   
    // ProductName_1 slide-in animation
    timeline.to(productName1, { x: '0%', opacity: 1, duration: 1, ease: "power2.out" }, "+=0.5"); // Slide in smoothly
   
    if (use2subCopy === 'yes') {
        // Animation for subCopy and subCopy_2 if use2subCopy is enabled
        timeline
            .to(subCopy, { x: '0%', opacity: 1, duration: 1, ease: "power2.out" }, "-=0.8") // Slide in slightly overlapping with productName_1
            .call(() => {
                // Start looping animation for subCopy and subCopy_2
                const subCopyTimeline = gsap.timeline({ repeat: -1 }); // Infinite loop
                subCopyTimeline
                    .to(subCopy, { opacity: 0, duration: 0.5, ease: "power2.inOut", delay: 3 }) // Fade out to the left
                    .to(subCopy2, { x: '0%', opacity: 1, duration: 0.5, ease: "power2.inOut" }) // SubCopy_2 fades in
                    .to(subCopy2, { opacity: 0, duration: 0.5, ease: "power2.inOut", delay: 4 }) // Fade out to the left
                    .to(subCopy, { x: '0%', opacity: 1, duration: 0.5, ease: "power2.inOut"}); // Fade in from the left
            });
    } else {
      TweenMax.set('#subCopy_2', { opacity: 0 });
        // Original animation for subCopy only
        timeline.to(subCopy, { x: '0%', opacity: 1, duration: 1, ease: "power2.out" }, "-=0.8"); // Slide in slightly overlapping with productName_1
    }
   } else {
    // Create a new timeline that repeats indefinitely (-1)
    var tl = new TimelineMax({ repeat: -1 });
   
    // Set initial opacity of both frames to 0
    TweenMax.set('#productName_1, #productName_2', { opacity: 0 });
   
    // Animate the first product name
    tl.to('#productName_1', 0.3, { opacity: 1, ease: Linear.easeNone }, 0) // Fade in
        .to('#productName_1', 0.3, { opacity: 0, ease: Linear.easeNone }, 3.2) // Fade out after 4 seconds
   
        // Animate the second product name
        .to('#productName_2', 0.3, { opacity: 1, ease: Linear.easeNone }, 3.6) // Start fading in slightly after the first fades out
        .to('#productName_2', 0.3, { opacity: 0, ease: Linear.easeNone }, 5.7); // Fade out, completing the 6-second cycle
   
   }
   
   // Hide or remove subCopy if useAnimation === 'yes'
   if (useAnimation === 'yes') {
    $('#subCopy').remove(); // Completely removes the subCopy element from the DOM
    $('#subCopy_2').remove(); // Completely removes the subCopy element from the DOM
    // Alternatively, you can hide it instead:
    // $('#subCopy').css('display', 'none');
   }


      ////////////////
    /// FUNCTIONS ///
  //////////////////

 // Check if price has sup element and append correct CSS class
if (local_content.currentPrice.value.includes('<sup>')){
  $("#currentPrice").html(local_content.currentPrice.value + "<span class='priceCurrencySup'>" + price_currency_content + "</span>");
} else {
  $("#currentPrice").html(local_content.currentPrice.value + "<span class='priceCurrency'>" + price_currency_content + "</span>");
}

function onClick (event) {
  return window.dispatchEvent(
    new CustomEvent('lemonpi.interaction/click', {
      detail: {
        placeholder: 'worldClick'
      }
  }));
}

});
  
