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
    
    $('#main-headline').html(local_content.Frame_1_Text_panorama.value);
    $('#frame2-headline').html(local_content.Frame_2_Text_panorama.value);
    $('#qr-text').html(local_content.Tagline_Text.value);
    $('#footer-text').html(local_content.Text_Disclaimer.value);

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
      'height': '60px',
      'background-size': 'contain',
    });

    
    /////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////// Videon config //////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
   
       // SEENTHIS variables
      // Define the video source and tracker variables
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
  // Use parseFloat() to ensure they are numbers, and || to provide a default value if not set
  let frame1_display_duration = parseFloat(local_content.Frame_1_Display_Duration.value) || 2; // Default 3 seconds
  let frame2_display_duration = parseFloat(local_content.Frame_2_Display_Duration.value) || 2; // Default 3 seconds
  let frame3_display_duration = parseFloat(local_content.Frame_3_Display_Duration.value) || 4; // Default 4 seconds
  let fade_transition_duration = parseFloat(local_content.fade_transition_duration.value) || 0.3; // Duration for fade in/out transitions


  // Set initial state for all frames (hidden)
  gsap.set('.frame', { opacity: 0, visibility: 'hidden' });
  // Set initial states for elements within frame3
  gsap.set('#frame3-top-logo', { opacity: 0, y: 20 });
  gsap.set('#qr-code-img', { opacity: 0, scale: 0.8 });
  gsap.set('#qr-text', { opacity: 0, y: 10 });
  gsap.set('#animated-qr-arrow', { opacity: 0, clipPath: 'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)' });

  // Create the main timeline for sequencing frames
  // Plays the sequence once, then repeats it one more time (total 2 plays)
  var masterTimeline = gsap.timeline({
      repeat: 2,
      onComplete: function() {
          // After the masterTimeline has completed its initial run and its repeats,
          // we want to ensure frame3 is visible and stays visible with all its elements.
          gsap.to('#frame3', {
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
          gsap.set(['#frame1', '#frame2'], { opacity: 0, visibility: 'hidden' });
      }
  });

  // --- Frame 1 Animation ---
  masterTimeline.to('#frame1', {
      opacity: 1,
      visibility: 'visible',
      duration: fade_transition_duration,
      ease: 'power1.out'
  })
  .to('#frame1', {
      opacity: 0,
      visibility: 'hidden',
      duration: fade_transition_duration,
      delay: frame1_display_duration, // Dynamic duration
      ease: 'power1.in'
  });

  // --- Frame 2 Animation ---
  masterTimeline.to('#frame2', {
      opacity: 1,
      visibility: 'visible',
      duration: fade_transition_duration,
      ease: 'power1.out'
  })
  .to('#frame2', {
      opacity: 0,
      visibility: 'hidden',
      duration: fade_transition_duration,
      delay: frame2_display_duration, // Dynamic duration
      ease: 'power1.in'
  });

  // --- Frame 3 Animation (for the looping part) ---
  // Frame 3 starts after Frame 2 fades out.
  masterTimeline.to('#frame3', {
      opacity: 1,
      visibility: 'visible',
      duration: fade_transition_duration,
      ease: 'power1.out'
  })
  // Add a label for when all F3 elements are fully animated in
  // Calculation: F3_fade_in_duration + logo/qr_offset + logo/qr_duration + qr_text_offset + qr_text_duration + arrow_offset + arrow_duration
  .addLabel("frame3_content_fully_in", `+=${fade_transition_duration}`)

  // Animate logo and QR code in simultaneously
  .to(['#frame3-top-logo', '#qr-code-img'], {
      opacity: 1,
      y: 0, // Reset y for logo
      scale: 1, // Reset scale for QR code
      duration: 0.6,
      ease: 'back.out(1.7)'
  }, `+=${0.2}`) // Start 0.2 seconds after frame3 becomes visible

  // Animate qr-text in
  .to('#qr-text', {
      opacity: 1,
      y: 0, // Reset y for qr-text
      duration: 0.5,
      ease: 'power1.out'
  }, `+=${0.3}`) // Start 0.3 seconds after logo/QR animation finishes

  // Animate the QR arrow (drawing effect)
  .fromTo('#animated-qr-arrow',
      {
          opacity: 0,
          clipPath: 'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)' // Start hidden at tail
      },
      {
          opacity: 1,
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)', // Reveal full arrow
          duration: 0.8, // Duration of the drawing animation
          ease: 'power2.out'
      },
      `+=${0.3}` // Start 0.3 seconds after qr-text animation finishes
  )
  // Now, fade out frame3 and its elements AFTER frame3_display_duration from when content was fully in
  .to('#frame3', {
      opacity: 0,
      visibility: 'hidden',
      duration: fade_transition_duration,
      ease: 'power1.in'
  }, `frame3_content_fully_in+=${frame3_display_duration}`) // Fade out after display duration from content_fully_in label
  // Also fade out and hide the arrow with frame3
  .to('#animated-qr-arrow', {
      opacity: 0,
      clipPath: 'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)', // Clip back to hidden
      duration: fade_transition_duration,
      ease: 'power1.in'
  }, "<") // Start fading out arrow at the same time as frame3
  // Also fade out other elements in frame3
  .to(['#frame3-top-logo', '#qr-code-img', '#qr-text'], {
      opacity: 0,
      duration: fade_transition_duration,
      ease: 'power1.in'
  }, "<"); // Start fading out at the same time as frame3

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
  