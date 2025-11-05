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
  $('#frame1-headline').html(local_content.Frame_1_Text.value); // Text for the first image
  $('#frame2-headline').html(local_content.Frame_2_Text.value); // NEW Lemonpi field for the second image's main text
  var number_of_loop_repeats = parseInt(local_content.number_of_loops_animation.value);
  

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

  // Set static product image and QR code
  $("#product_image_wrapper img").attr("src", local_content.dynamic_product_img.value); // Assuming a new Lemonpi field for the static product image
  $("#qr-code-img").css("background-image", "url(" + local_content.dynamic_image.value + ")"); // QR code image
  $('#qr-code-img').css({
    'background-repeat': 'no-repeat',
    'background-size': 'contain',
    'background-position': 'center center' // Center the QR code
  });
  
  // Set the background image for the animated QR arrow
  var qrArrowImageUrl = 'https://assets.lemonpi.io/a/k/c27a766a-50c9-4d4b-866a-7c42356aae76/Assets/Lyckan-i-Luckan-Assets/Arrow-15.png';
  $('.animated-qr-arrow').css({
    'background-image': 'url(' + qrArrowImageUrl + ')',
    'background-repeat': 'no-repeat',
    'height': '50px', // Adjusted size for 300x600
    'width': '50px',  // Adjusted size for 300x600
    'background-size': 'contain',
  });

  
  /////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////// Videon config //////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
 
    // SEENTHIS variables
    var videoSrc = content.Video_300x600_src.value;
    var videoTracker = content.Video_300x600_tracker.value;
    var numberOfLoops = parseInt(local_content.number_of_loops.value);
    
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
    const staticVisualsWrapper = $('#static-visuals-wrapper');
    const bringLogo = $('#bring-logo');
    const frame1Headline = $('#frame1-headline');
    const frame2Headline = $('#frame2-headline');
    const qrText = $('#qr-text');
    const animatedQrArrow = $('#animated-qr-arrow');
    const lastFrameLogo = $('#last-frame-logo'); // Get the last frame logo element

    // Set initial states for all elements
    gsap.set([frame1, frame2], { opacity: 0, visibility: 'hidden' });
    gsap.set(staticVisualsWrapper, { scale: 0.9, opacity: 0 }); // Start product/QR slightly smaller and invisible
    gsap.set(bringLogo, { opacity: 1, y: 0 }); // bring-logo is always visible, no animation needed
    gsap.set(frame1Headline, { opacity: 0, y: 20 }); // Frame 1 text pops up
    gsap.set(frame2Headline, { opacity: 0, y: 20 }); // Frame 2 text pops up
    gsap.set(qrText, { opacity: 0, y: 10 }); // QR text pops up
    gsap.set(animatedQrArrow, { opacity: 0, clipPath: 'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)' }); // Arrow hidden (clipped)
    gsap.set(lastFrameLogo, { opacity: 0, y: 20 }); // Last frame logo starts invisible and slightly down

    var masterTimeline = gsap.timeline({
        repeat: number_of_loop_repeats, // Play once, then hold on the final frame (Frame 2)
        onComplete: function() {
            // Ensure frame2 and its elements are fully visible and in final state
            gsap.to(frame2, { opacity: 1, visibility: 'visible', duration: 0 });
            gsap.to(frame2Headline, { opacity: 1, y: 0, duration: 0 });
            gsap.to(qrText, { opacity: 1, y: 0, duration: 0 });
            gsap.to(animatedQrArrow, { opacity: 1, clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)', duration: 0 });
            gsap.to(lastFrameLogo, { opacity: 1, y: 0, duration: 0 });
            gsap.to(staticVisualsWrapper, { scale: 1, opacity: 1, duration: 0 }); // Ensure static visuals are at final scale
            gsap.to(bringLogo, { opacity: 1, y: 0, duration: 0 }); // Ensure logo is visible
        }
    });

    // Initial reveal of static elements (product & QR)
    masterTimeline.to(staticVisualsWrapper, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
    }, 0) // Start at the very beginning of the timeline (0 seconds)

    // --- Frame 1 Animation ---
    // Frame 1 container becomes visible
    .to(frame1, {
        opacity: 1,
        visibility: 'visible',
        duration: fade_transition_duration,
        ease: 'power1.out'
    }, 0) // Start at 0 seconds, same as static visuals
    // Frame 1 headline pops up
    .to(frame1Headline, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
    }, 0.2) // Start 0.2 seconds after the very beginning (0.2s into static visuals/frame1 container)
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
    .to(qrText, { // QR text pops up
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power1.out'
    }, "<0.3") // QR text pops up after headline
    .fromTo(animatedQrArrow,
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
        "<0.3" // Arrow draws in after QR text
    )
    .to({}, { duration: frame2_display_duration }); // Hold on frame2

});
  }

    // World click event caller
    $('#banner-container').click(onClick);
    function onClick (event) {
      return window.dispatchEvent(
        new CustomEvent('lemonpi.interaction/click', {
          detail: {
            placeholder: 'landingpage_300x600'
          }
      }));
    }
   
  });
});
  