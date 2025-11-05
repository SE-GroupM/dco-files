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
  var local_content = content;
  
  // Removed direct application of headLine_top to .main-text-area's 'top'
  // as .main-text-area is now flex-positioned.
  // If you still need to control vertical offset, consider using margin-top
  // and adjusting the Lemonpi field to output a margin value.
  // var headLine_top = parseInt(local_content.top_position_headline.value);
  // $('.main-text-area').css({
  //   'top': headLine_top + 'px',
  // });

  $('#qr-text').html(local_content.Tagline_Text.value);
  $('#footer-text').html(local_content.Text_Disclaimer.value);

  var retailerName1 = local_content.dynamic_retailer_1.value;
  var retailerName2 = local_content.dynamic_retailer_2.value;
  var retailerName3 = local_content.dynamic_retailer_3.value;

 // NEW: Retrieve individual Frame_1_Text values
  var frame1Text1 = local_content.Frame_1_Text_1_panorama.value;
  var frame1Text2 = local_content.Frame_1_Text_2_panorama.value;
  var frame1Text3 = local_content.Frame_1_Text_3_panorama.value;

  // Product data for dynamic frame 1
  const products = [
      {
          headlinePrefix: frame1Text1, // NEW: Specific headline prefix for product 1
          retailerName: retailerName1,
          imageUrl: local_content.dynamic_retailer_1_img.value
      },
      {
          headlinePrefix: frame1Text2, // NEW: Specific headline prefix for product 2
          retailerName: retailerName2,
          imageUrl: local_content.dynamic_retailer_2_img.value
      },
      {
          headlinePrefix: frame1Text3, // NEW: Specific headline prefix for product 3
          retailerName: retailerName3,
          imageUrl: local_content.dynamic_retailer_3_img.value
      },
      // Add more products if needed, ensuring corresponding Lemonpi fields exist
  ];
  // In your JS, inside the onLemonpiReady callback:
  $("#bring-logo").css("background-image", "url(" + local_content.Logo_bring_green.value + ")");
  $('#bring-logo').css({
    'display': 'flex',
    'height': '50px', // NEW: Adjust to new logo height
    'justify-content': 'flex-start',
    'align-items': 'flex-end',
    'background-repeat': 'no-repeat',
    'background-size': 'contain',
    'background-position': 'left top'
  });

  // Do the same for frame3-top-logo if needed
  $("#frame3-top-logo").css("background-image", "url(" + local_content.Logo_2.value + ")");
  $('#frame3-top-logo').css({
    'display': 'flex',
    'justify-content': 'flex-start',
    'align-items': 'flex-end',
    'background-repeat': 'no-repeat',
    'background-size': 'contain',
    'background-position': 'center top'
  });

    // Append QR code
  $("#qr-code-img").css("background-image", "url(" + local_content.dynamic_image.value + ")");
  $('#qr-code-img').css({
    'display': 'flex',
    'justify-content': 'flex-start', // Align content to the left inside the div
    'align-items': 'flex-end',       // Align content to the bottom inside the div
    'background-repeat': 'no-repeat',
    'background-size': 'contain',   // Ensure the image fits within the div without cropping
    'background-position': 'center top' // Align the image to the bottom-left corner
  });
  
  // NEW: Set the background image for the animated QR arrow using the provided URL
  var qrArrowImageUrl = 'https://assets.lemonpi.io/a/k/c27a766a-50c9-4d4b-866a-7c42356aae76/Assets/Lyckan-i-Luckan-Assets/Arrow-15.png';
  $('.animated-qr-arrow').css({
    'background-image': 'url(' + qrArrowImageUrl + ')',
    'background-repeat': 'no-repeat',
    'height': '50px', // NEW: Adjust height for new banner size
    'width': '50px', // NEW: Adjust width for new banner size
    'background-size': 'contain',
  });

  
  /////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////// Videon config //////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
 
    // SEENTHIS variables
    // Define the video source and tracker variables
    // NEW: Update video source and tracker for 980x300 format
    var videoSrc = content.Video_980x240_src.value; 
    var videoTracker = content.Video_980x240_tracker.value;
    var numberOfLoops = parseInt(local_content.number_of_loops.value);
    
   //Video player 
    var e = document.createElement('script');
    e.src = 'https://video.seenthis.se/v2/player/74/player.js';
    e.onload = function(){
    var player = new SeenthisPlayer('.player', videoSrc, videoTracker, options); 
    };
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(e, s);

    //Options for video script
    var options = {
        loop: true,
        loopCount: numberOfLoops,
        autoplay: true,
        muteButton: false,
    };

// Ensure GSAP and jQuery are loaded before this script runs
$(document).ready(function() {

  // Define dynamic variables for frame durations
const total_frame1_product_animation_time = 5; // User-defined total time for all products to cycle in Frame 1
let product_swipe_duration = parseFloat(local_content.product_swipe_duration.value) || 0.5; // Duration for product image swipe
let frame3_final_display_duration = parseFloat(local_content.Frame_2_Display_Duration.value) || 4; // Duration for the final frame
let fade_transition_duration = parseFloat(local_content.fade_transition_duration.value) || 0.4;

// --- Calculate frame1_product_display_duration dynamically ---
const N = products.length;
let frame1_product_display_duration;

if (N > 0) {
    frame1_product_display_duration = (total_frame1_product_animation_time / N) - (2 * product_swipe_duration);

    if (frame1_product_display_duration < 0.1) {
        console.warn(`Calculated frame1_product_display_duration (${frame1_product_display_duration.toFixed(2)}s) is too short or negative. Adjusting to 0.1s. The total product cycle time might exceed ${total_frame1_product_animation_time}s slightly.`);
        frame1_product_display_duration = 0.1;
    }
} else {
    frame1_product_display_duration = 0; // No products, no display duration
}

// --- GSAP Animation Logic ---
const dynamicHeadlinePrefixSpan = document.querySelector('.dynamic-headline-prefix');
const dynamicRetailerNameSpan = document.querySelector('.dynamic-retailer-name');
const dynamicProductImage = document.querySelector('.dynamic-product-image');
const frame1 = document.getElementById('frame1');
const frame3 = document.getElementById('frame3');

// baseHeadlineText is no longer needed as each product has its own headlinePrefix
// const baseHeadlineText = local_content.Frame_1_Text.value;

// Set initial state for all frames (hidden)
gsap.set('.frame', { opacity: 0, visibility: 'hidden' });
// Set initial states for elements within frame3
gsap.set('#frame3-top-logo', { opacity: 0, y: 20 });
gsap.set('#qr-code-img', { opacity: 0, scale: 0.8 });
gsap.set('#qr-text', { opacity: 0, y: 10 });
gsap.set('#animated-qr-arrow', { opacity: 0, clipPath: 'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)' });
// Set initial state for dynamic product image (off-screen right, invisible)
gsap.set(dynamicProductImage, { x: '100%', opacity: 0 });

// --- INITIAL CONTENT FOR FRAME 1 (BEFORE ANY ANIMATION STARTS) ---
// This ensures the first product is ready to display when frame1 fades in for the very first time.
if (products.length > 0) {
    dynamicHeadlinePrefixSpan.innerHTML = products[0].headlinePrefix; // NEW: Use specific headline
    dynamicRetailerNameSpan.textContent = products[0].retailerName;
    dynamicProductImage.src = products[0].imageUrl;
}

// Timeline for cycling through products in Frame 1 (plays once through all products)
const productCycleTimeline = gsap.timeline({ repeat: 0 });

products.forEach((product, index) => {
    // If it's not the first product, slide out the previous one first
    if (index > 0) {
        productCycleTimeline.to(dynamicProductImage, {
            x: '-100%',
            opacity: 0,
            duration: product_swipe_duration,
            ease: 'power2.in'
        });
    }

    // Instantly reset position, update content, then slide in
    // This call happens immediately after the previous tween (either slide-out or start of timeline)
    productCycleTimeline.call(() => {
        gsap.set(dynamicProductImage, { x: '100%', opacity: 0 }); // Crucial for preventing flash
        dynamicHeadlinePrefixSpan.innerHTML = product.headlinePrefix; // NEW: Use specific headline
        dynamicRetailerNameSpan.textContent = product.retailerName;
        dynamicProductImage.src = product.imageUrl;
    });

    // Animate the current product IN
    productCycleTimeline.to(dynamicProductImage, {
        x: '0%',
        opacity: 1,
        duration: product_swipe_duration,
        ease: 'power2.out'
    }, "<"); // Start at the same time as the content update (the `call` above)

    // Hold the product for its display duration
    productCycleTimeline.to({}, { duration: frame1_product_display_duration });

    // Slide out the current product. This ensures the image is off-screen
    // before the next product's cycle begins, or before frame1 fades out.
    // Only slide out if it's not the very last product in the entire sequence.
    if (index < products.length - 1) {
        productCycleTimeline.to(dynamicProductImage, {
            x: '-100%',
            opacity: 0,
            duration: product_swipe_duration,
            ease: 'power2.in'
        });
    }
});

// Create the main timeline for sequencing frames
var masterTimeline = gsap.timeline({
    repeat: 2, // Repeat the entire sequence (Frame 1 -> Frame 3) twice
    onComplete: function() {
        // After the masterTimeline has completed its initial run and its repeats,
        // we want to ensure frame3 is visible and stays visible with all its elements.
        gsap.to(frame3, {
            opacity: 1,
            visibility: 'visible',
            duration: fade_transition_duration,
            ease: 'power1.out'
        });
        // Ensure all elements within frame3 are visible and in their final state
        gsap.to('#frame3-top-logo', { opacity: 1, y: 0, duration: fade_transition_duration, ease: 'power1.out' });
        gsap.to('#qr-code-img', { opacity: 1, scale: 1, duration: fade_transition_duration, ease: 'power1.out' });
        gsap.to('#qr-text', { opacity: 1, y: 0, duration: fade_transition_duration, ease: 'power1.out' });
        gsap.to('#animated-qr-arrow', {
            opacity: 1,
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)', // Full rectangle
            duration: fade_transition_duration,
            ease: 'power1.out'
        });
        // Ensure other frames are hidden
        gsap.set(frame1, { opacity: 0, visibility: 'hidden' });
    },
    // --- NEW: onRepeat callback to reset Frame 1 content ---
    onRepeat: function() {
        if (products.length > 0) {
            // Reset content to the first product for the new loop
            dynamicHeadlinePrefixSpan.innerHTML = products[0].headlinePrefix; // NEW: Use specific headline
            dynamicRetailerNameSpan.textContent = products[0].retailerName;
            dynamicProductImage.src = products[0].imageUrl;
            // Also reset the image's position and opacity so it's ready to slide in again
            gsap.set(dynamicProductImage, { x: '100%', opacity: 0 });
        }
        // Ensure frame1 is hidden before it starts fading in again
        gsap.set(frame1, { opacity: 0, visibility: 'hidden' });
        // Ensure frame3 is hidden if it was visible from the previous loop
        gsap.set(frame3, { opacity: 0, visibility: 'hidden' });
    }
});

// --- Frame 1 Animation (Product Cycle) ---
masterTimeline.to(frame1, {
    opacity: 1,
    visibility: 'visible',
    duration: fade_transition_duration,
    ease: 'power1.out'
})
.add(productCycleTimeline) // Add the product cycling timeline here
.to(frame1, {
    opacity: 0,
    visibility: 'hidden',
    duration: fade_transition_duration,
    ease: 'power1.in'
})
.to({}, {duration: 1}); // This creates a 1-second gap in the timeline

// --- Frame 3 (Final Frame) Animation ---
masterTimeline.to(frame3, {
    opacity: 1,
    visibility: 'visible',
    duration: fade_transition_duration,
    ease: 'power1.out'
})
// Add a label for when all F3 elements are fully animated in
.addLabel("frame3_content_fully_in", `+=${fade_transition_duration}`)

// Animate logo and QR code in simultaneously
.to(['#frame3-top-logo', '#qr-code-img'], {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.6,
    ease: 'back.out(1.7)'
}, `+=${0.2}`)

// Animate qr-text in
.to('#qr-text', {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'power1.out'
}, `+=${0.3}`)

// Animate the QR arrow (drawing effect)
.fromTo('#animated-qr-arrow',
    {
        opacity: 0,
        clipPath: 'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)'
    },
    {
        opacity: 1,
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
        duration: 0.8,
        ease: 'power2.out'
    },
    `+=${0.3}`
)
// Now, fade out frame3 and its elements AFTER frame3_final_display_duration from when content was fully in
.to(frame3, {
    opacity: 0,
    visibility: 'hidden',
    duration: fade_transition_duration,
    ease: 'power1.in'
}, `frame3_content_fully_in+=${frame3_final_display_duration}`)
// Also fade out and hide the arrow with frame3
.to('#animated-qr-arrow', {
    opacity: 0,
    clipPath: 'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)',
    duration: fade_transition_duration,
    ease: 'power1.in'
}, "<")
// Also fade out other elements in frame3
.to(['#frame3-top-logo', '#qr-code-img', '#qr-text'], {
    opacity: 0,
    duration: fade_transition_duration,
    ease: 'power1.in'
}, "<");

});

  // World click event caller
  $('#banner-container').click(onClick);
  function onClick (event) {
    return window.dispatchEvent(
      new CustomEvent('lemonpi.interaction/click', {
        detail: {
          placeholder: 'Landingpage'
        }
    }));
  }
 
});
});