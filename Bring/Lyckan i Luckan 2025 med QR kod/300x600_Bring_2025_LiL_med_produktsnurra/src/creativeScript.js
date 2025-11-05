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
    
    $('#qr-text').html(local_content.Tagline_Text.value);
    $('#footer-text').html(local_content.Text_Disclaimer.value);

    // NEW: Populate the new dynamic text fields
  $('#textfield_1_display').html(local_content.Frame_1_Text.value); // Assuming Lemonpi field name is TextField_1
  $('#textfield_2_display').html(local_content.Frame_2_Text.value); // Assuming Lemonpi field name is TextField_2


    var headLine_top = parseInt(local_content.top_position_headline.value);
    $('.main-headline').css({
      'top': headLine_top + 'px',
    });

    var retailerName1 = 'Boozt';
    var retailerName2 = 'Elgiganten';
    var retailerName3 = 'XXL';

  // Product data for dynamic frame 1
    const products = [
        { retailerName: retailerName1, imageUrl: local_content.dynamic_retailer_1_img.value },
        { retailerName: retailerName2, imageUrl: local_content.dynamic_retailer_2_img.value },
        { retailerName: retailerName3, imageUrl: local_content.dynamic_retailer_3_img.value },
        // Add more products if needed, ensuring corresponding Lemonpi fields exist
    ];

    var product_image_1 = local_content.dynamic_retailer_1_img.value;
    var product_image_2 = local_content.dynamic_retailer_2_img.value;
    var product_image_3 = local_content.dynamic_retailer_3_img.value;


    // In your JS, inside the onLemonpiReady callback:
    $("#bring-logo").css("background-image", "url(" + local_content.Logo_bring_green.value + ")");
    $('#bring-logo').css({
      'display': 'flex',
      'height': '40px', // <--- ADD THIS LINE (or adjust to your logo's actual height)
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
      'height': '30px',
      'background-size': 'contain',
    });

    
    /////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////// Videon config //////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
   
      // SEENTHIS variables
      // Define the video source and tracker variables
      var videoSrc = content.Video_300x600_src.value;
      var videoTracker = content.Video_300x600_tracker.value;
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

  // --- General Timing Variables ---
  let fade_transition_duration = parseFloat(local_content.fade_transition_duration.value) || 0.4; // For frame fade in/out
  let frame3_final_display_duration = 4; // User-defined duration for the final frame (4 seconds)

  // --- Textfield Specific Durations ---
  const tf_fade_duration = 0.1; // User requested fade out in 0.1s
  const tf1_show_duration = 2.0; // User requested show for 2 seconds
  const textField_fadeOut_duration = 0.3;

  // --- Product Image Specifics ---
  const N = products.length; // Number of products
  // User's preferred product image timing parameters
  let product_swipe_duration = parseFloat(local_content.product_swipe_duration.value) || 0.8; // Duration for product image swipe
  const productImageAnimationTime = 0.5; // How long each product is fully displayed

  // --- GSAP Animation Logic ---
  const dynamicProductImage = document.querySelector('.dynamic-product-image');
  const frame1 = document.getElementById('frame1');
  const frame3 = document.getElementById('frame3');
  const textfield1 = document.getElementById('textfield_1_display');
  const textfield2 = document.getElementById('textfield_2_display');
  const lowerHeadline = document.getElementById('lower_part_headline_text');
  const bringLogo = document.getElementById('bring-logo'); // Get the logo element

  // Set initial state for all frames (hidden)
  gsap.set('.frame', { opacity: 0, visibility: 'hidden' });
  // Set initial states for elements within frame3
  gsap.set('#frame3-top-logo', { opacity: 0, y: 20 });
  gsap.set('#qr-code-img', { opacity: 0, scale: 0.8 });
  gsap.set('#qr-text', { opacity: 0, y: 10 });
  gsap.set('#animated-qr-arrow', { opacity: 0, clipPath: 'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)' });
  // Set initial state for dynamic product image (off-screen right, invisible)
  gsap.set(dynamicProductImage, { x: '100%', opacity: 0 });
  // NEW: Set initial state for the new headlines and other frame1 elements
  gsap.set([textfield1, textfield2, lowerHeadline, bringLogo], { opacity: 0, y: -10 }); // Start slightly above and invisible

  // --- INITIAL CONTENT FOR FRAME 1 (BEFORE ANY ANIMATION STARTS) ---
  if (products.length > 0) {
      dynamicProductImage.src = products[0].imageUrl;
  }

  // --- Build Product Cycle Timeline ---
  // This timeline defines the product image animation.
  const productCycleTimeline = gsap.timeline({ repeat: 0 });

  products.forEach((product, index) => {
      productCycleTimeline.add(() => {
          dynamicProductImage.src = product.imageUrl;
      }, `+=${index === 0 ? 0 : product_swipe_duration}`); // First product starts immediately, subsequent after previous swipe

      productCycleTimeline.to(dynamicProductImage, {
          x: '0%',
          opacity: 1,
          duration: product_swipe_duration,
          ease: 'power2.out'
      }, "<"); // Start at the same time as content update

      productCycleTimeline.to(dynamicProductImage, {
          x: '-100%',
          opacity: 0,
          duration: product_swipe_duration,
          ease: 'power2.in'
      }, `+=${productImageAnimationTime}`); // Start sliding out after its hold duration
  });

  // Get the actual total duration of the productCycleTimeline after it's built.
  // This will be our master duration for all active content in Frame 1.
  const total_frame1_active_content_duration = productCycleTimeline.duration();

  // --- Calculate tf2_hold_duration to make the textfield sequence fit total_frame1_active_content_duration ---
  // Total textfield sequence duration = (tf1 fade in) + (tf1 show) + (tf1 fade out / tf2 fade in) + (tf2 hold)
  // We want this total to equal `total_frame1_active_content_duration`
  // tf2_hold_duration = total_frame1_active_content_duration - (tf_fade_duration + tf1_show_duration + tf_fade_duration)
  const tf2_hold_duration_calc = total_frame1_active_content_duration - (tf_fade_duration + tf1_show_duration + tf_fade_duration);
  const actual_tf2_hold_duration = Math.max(0.1, tf2_hold_duration_calc); // Ensure a minimum hold time

  // --- Create the main timeline for sequencing frames ---
  var masterTimeline = gsap.timeline({
      repeat: 1, // Repeat the entire sequence (Frame 1 -> Frame 3) twice
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
          // Ensure frame1 elements are hidden and reset
          gsap.set([textfield1, textfield2, lowerHeadline, bringLogo], { opacity: 0, y: -10 });
          gsap.set(dynamicProductImage, { x: '100%', opacity: 0 });
      },
      // --- NEW: onRepeat callback to reset Frame 1 content ---
      onRepeat: function() {
          if (products.length > 0) {
              dynamicProductImage.src = products[0].imageUrl;
              gsap.set(dynamicProductImage, { x: '100%', opacity: 0 });
          }
          gsap.set(frame1, { opacity: 0, visibility: 'hidden' });
          gsap.set(frame3, { opacity: 0, visibility: 'hidden' });
          // Reset frame1 elements for the next loop
          gsap.set([textfield1, textfield2, lowerHeadline, bringLogo], { opacity: 0, y: -10 });
      }
  });

  // --- Frame 1 Animation (Orchestration) ---
  masterTimeline.to(frame1, {
      opacity: 1,
      visibility: 'visible',
      duration: fade_transition_duration,
      ease: 'power1.out'
  });

  // Fade in bring-logo and lower_part_headline_text concurrently with frame1 fade-in
  masterTimeline.to([bringLogo, lowerHeadline], {
      opacity: 1,
      y: 0,
      duration: tf_fade_duration, // Use textfield fade duration for these as well for consistency
      ease: 'power1.out'
  }, "<"); // Start at the same time as frame1 fade in

  // Add the product image cycling timeline. It will run for its calculated duration.
  masterTimeline.add(productCycleTimeline, "<"); // Start at the same time as the previous .to()

  // --- Textfield Animation Timeline (separate for clarity and control) ---
  const textfieldTimeline = gsap.timeline();

  // 1. Fade in textfield_1_display
  textfieldTimeline.to(textfield1, {
      opacity: 1,
      visibility: 'visible',
      y: 0,
      duration: tf_fade_duration,
      ease: 'power1.out'
  });

  // 3. Fade out textfield_1_display AND Fade in textfield_2_display concurrently
  textfieldTimeline.to(textfield1, {
      opacity: 0,
      visibility: 'hidden',
      duration: 0.3,
      delay: 2,
      ease: 'power1.in'
  }); // This will naturally follow the previous animation

  textfieldTimeline.to(textfield2, {
      opacity: 1,
      visibility: 'visible',
      duration: 0.5,
      ease: 'power1.out'
  }, "<"); // Start at the same time as the previous animation (tf1 fade out)

  // 4. Hold textfield_2_display (explicitly animate to same state for duration)
  // This ensures textfield2 stays visible for actual_tf2_hold_duration
  textfieldTimeline.to(textfield2, {
      opacity: 1, // Keep it visible
      visibility: 'visible',
      duration: 2,
      ease: 'none' // No easing needed for a hold
  });

  // Add the textfield timeline to the master timeline, starting at the same time as productCycleTimeline
  masterTimeline.add(textfieldTimeline, "<"); // Start at the same time as productCycleTimeline

  // --- End of Frame 1 ---
  // Fade out frame1 and its contents
  masterTimeline.to(frame1, {
      opacity: 0,
      visibility: 'hidden',
      duration: fade_transition_duration,
      ease: 'power1.in'
  });
  masterTimeline.to([textfield2, lowerHeadline, bringLogo], { // Fade out textfield2, lowerHeadline, bringLogo
      opacity: 0,
      y: -10,
      duration: tf_fade_duration, // Use textfield fade duration
      ease: 'power1.in'
  }, "<"); // Start at the same time as frame1 fade out

  masterTimeline.to({}, {duration: 0.5}); // This creates a 1-second gap in the timeline

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
  