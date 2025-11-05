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
    // Assign text content to the new elements
  $('#frame1-headline').html(local_content.Frame_1_Text_320_format.value); // Text for the first image
  $('#frame2-headline').html(local_content.Frame_2_Text.value); // NEW Lemonpi field for the second image's main text
  var number_of_loop_repeats = parseInt(local_content.number_of_loops_animation_mobile.value);

  $('#mobile-cta-button').html(local_content.Cta_Text_mobile.value);

  // Removed headLine_top as it's not relevant for this layout
  // var headLine_top = parseInt(local_content.top_position_headline.value);
  // $('.main-text-area').css({'top': headLine_top + 'px'});

  // Set static logo
  $("#bring-logo").css("background-image", "url(" + local_content.Logo_bring_green.value + ")");
  $('#bring-logo').css({
    'display': 'flex',
    'height': '40px',
    'justify-content': 'flex-start',
    'align-items': 'flex-end',
    'background-repeat': 'no-repeat',
    'background-size': 'contain',
    'background-position': 'left top'
  });

    // Do the same for frame3-top-logo if needed
  $("#last-frame-logo").css("background-image", "url(" + local_content.Logo_2.value + ")");
  $('#last-frame-logo').css({
    'display': 'flex',
    'justify-content': 'flex-start',
    'align-items': 'flex-end',
    'background-repeat': 'no-repeat',
    'background-size': 'contain',
    'background-position': 'center top'
  });

  // Set static product image (QR code removed)
$("#product_image_wrapper img").attr("src", local_content.dynamic_product_img.value); // Assuming a new Lemonpi field for the static product image

  
  /////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////// Videon config //////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

    
    // SEENTHIS variables
    var videoSrc = content.Video_320x320_src.value;
    var videoTracker = content.Video_320x320_tracker.value;
    var numberOfLoops = parseInt(local_content.number_of_video_loops_mobile.value);

    var e = document.createElement('script');
    e.src = 'https://video.seenthis.se/v2/player/74/player.js';
    e.onload = function(){
    var player = new SeenthisPlayer('.player', videoSrc, videoTracker, options); 
    };
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(e, s);

    var options = {
        loop: true,
        loopCount: numberOfLoops,
        autoplay: true,
        muteButton: false,
    };

  if (local_content.Use_default.value == 'TRUE'){
    // No animation at all
  }else{
        // Ensure GSAP and jQuery are loaded before this script runs
    $(document).ready(function() {

       // Define dynamic variables for frame durations
      let frame1_display_duration = parseFloat(local_content.Frame_1_Display_Duration.value) || 3; // Default 3 seconds
      let frame2_display_duration = parseFloat(local_content.Frame_2_Display_Duration.value) || 4; // Default 4 seconds
      let fade_transition_duration = parseFloat(local_content.fade_transition_duration.value) || 0.4;

      // --- GSAP Animation Logic ---
      const frame1 = $('#frame1');
      const frame2 = $('#frame2');
      // Removed staticVisualsWrapper as its content is now in frame1
      const bringLogo = $('#bring-logo');
      const frame1Headline = $('#frame1-headline');
      const frame2Headline = $('#frame2-headline');
      const lastFrameLogo = $('#last-frame-logo');
      const mobileCtaButton = $('#mobile-cta-button');
      const productImageWrapper = $('#product_image_wrapper'); // NEW: Reference to the product image wrapper

      // Set initial states for all elements
      gsap.set([frame1, frame2], { opacity: 0, visibility: 'hidden' });
      // Removed gsap.set(staticVisualsWrapper, ...)
      gsap.set(bringLogo, { opacity: 1, y: 0 });
      gsap.set(frame1Headline, { opacity: 0, y: 20 });
      gsap.set(frame2Headline, { opacity: 0, y: 20 });
      gsap.set(lastFrameLogo, { opacity: 0, y: 20 });
      gsap.set(mobileCtaButton, { opacity: 0, y: 20 });
      gsap.set(productImageWrapper, { scale: 0.9, opacity: 0 }); // NEW: Initial state for product image wrapper

      var masterTimeline = gsap.timeline({
          repeat: number_of_loop_repeats,
          onComplete: function() {
              // Ensure frame2 and its elements are fully visible and in final state
              gsap.to(frame2, { opacity: 1, visibility: 'visible', duration: 0 });
              gsap.to(frame2Headline, { opacity: 1, y: 0, duration: 0 });
              gsap.to(lastFrameLogo, { opacity: 1, y: 0, duration: 0 });
              gsap.to(mobileCtaButton, { opacity: 1, y: 0, duration: 0 });
              gsap.to(bringLogo, { opacity: 1, y: 0, duration: 0 });
          }
      });

      // --- Frame 1 Animation ---
      // Frame 1 container becomes visible
      masterTimeline.to(frame1, {
          opacity: 1,
          visibility: 'visible',
          duration: fade_transition_duration,
          ease: 'power1.out'
      }, 0) // Start at 0 seconds
      // Frame 1 headline pops up
      .to(frame1Headline, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.7)'
      }, 0.2) // Start 0.2 seconds after frame1 starts fading in
      // Product image pops up
      .to(productImageWrapper, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)'
      }, 0.2) // Start at the same time as headline, or slightly after
      .to(frame1, {
          opacity: 0,
          visibility: 'hidden',
          duration: fade_transition_duration,
          delay: frame1_display_duration, // Hold duration for frame1
          ease: 'power1.in'
      })
      .to(frame1Headline, { // Fade out text with frame1
          opacity: 0,
          y: -20, // Slide up slightly on fade out
          duration: fade_transition_duration,
          ease: 'power1.in'
      }, "<")
      .to(productImageWrapper, { // NEW: Fade out product image with frame1
          opacity: 0,
          scale: 0.9, // Shrink slightly on fade out
          duration: fade_transition_duration,
          ease: 'power1.in'
      }, "<") // Start at the same time as frame1Headline fades out

      // --- Frame 2 Animation ---
      .to(frame2, {
          opacity: 1,
          visibility: 'visible',
          duration: fade_transition_duration,
          ease: 'power1.out'
      }, ">") // Start after frame1 fades out
      .to(lastFrameLogo, { // Last frame logo fades in
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.7)'
      }, "<0.1") // Start slightly before frame2Headline
      .to(frame2Headline, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.7)'
      }, "<0.2") // Frame 2 headline pops up
      .to(mobileCtaButton, { // CTA button pops up
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power1.out'
      }, "<0.3") // CTA button pops up after headline
      .to({}, { duration: frame2_display_duration }); // Hold on frame2

});
  }

    // World click event caller
    $('#banner-container').click(onClick);
    function onClick (event) {
      return window.dispatchEvent(
        new CustomEvent('lemonpi.interaction/click', {
          detail: {
            placeholder: 'landingpage_320x320'
          }
      }));
    }
   
  });
});
  