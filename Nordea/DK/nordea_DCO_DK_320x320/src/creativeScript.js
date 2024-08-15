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
  // Local variable for content
  var local_content = content;
  
  //Append background color
  $("#creative_container").css("background-color", (local_content.BG_Color.value));

  //Append logos
  $("#logo_1").css("background-image","url("+local_content.Logo.value+")");
  $("#logo_2").css("background-image","url("+local_content.Logo_2.value+")");

  //Append copy frame 1 and color
  $("#frame_1").html('<p>'+local_content.Frame_1_Text.value+'</p>');
  $("#frame_1").css("color", (local_content.Frame_1_Text_Color.value));
  //Append copy frame 2 and color
  $("#frame_2").html('<p>'+local_content.Frame_2_Text.value+'</p>');
  $("#frame_2").css("color", (local_content.Frame_2_Text_Color.value));
  //Append copy frame 3 and color
  $("#frame_3").html('<p>'+local_content.Frame_3_Text.value+'</p>');
  $("#frame_3").css("color", (local_content.Frame_3_Text_Color.value));

  //Append disclaimer copy and color if Use frame 4 is true
  if (local_content.Use_frame_4.value.toUpperCase() === "TRUE") {
    $("#frame_4").html('<p>'+local_content.Frame_4_Text_Disclaimer.value+'</p>');
    $("#frame_4").css("color", (local_content.Disclaimer_Color.value));
  } else {
    $("#frame_4").remove();
  }

  //Append cta copy and color
  $("#cta").html(local_content.Cta_Text.value);
  $("#cta").css("background-color", (local_content.Cta_BG.value));
  $("#cta").css("color", (local_content.Cta_Text_Color.value));

  //Append tagline and color
  $("#tagline").html(local_content.Tagline_Text.value);
  $("#tagline").css("color", (local_content.Frame_1_Text_Color.value));

  // Set the BG video source
  var BGvideoSource = '<video id="BG_video" autoplay muted playsinline loop width="320" height="320"><source src="' + local_content.Video_320x320.value + '" type="video/mp4"></video>'; 

  // Set the BG image source from feed and apply if Use image is true
  if (local_content.Use_image.value.toUpperCase() === "TRUE") {
    $("#bg_image").css("background-image","url("+local_content.Image_320x320.value+")");
  }
 
  //If use pulse left ise true, apply pulse to div
  if (local_content.Use_pulse_left.value.toUpperCase() === "TRUE") {
     $("#pulse_video_left").css("background-image","url(https://assets.lemonpi.io/a/k/75e5a9fd-644b-4756-9247-b454071c91d2/Assets/Nordea-DCO-2024/Images/320x320_pulse_left_large_new.gif)");
  }

  //If use pulse right is true, apply pulse to div
  if (local_content.Use_pulse_right.value.toUpperCase() === "TRUE") {
      $("#pulse_video_right").css("background-image","url(https://assets.lemonpi.io/a/k/d61d8fa5-a09f-4273-b9b8-3120a41b053d/Assets/Nordea-DCO-2024/Images/320x320_pulse_right_large_new.gif)");
  }

  var useVideo = local_content.Use_video.value.toUpperCase();

  if (useVideo === "TRUE") {
    //Append video
    $("#bg_video").html(BGvideoSource);
    // Function to restart videos
    function restartVideo(videoId) {
      var videoElement = document.getElementById(videoId);
      videoElement.currentTime = 0;
      videoElement.play();
    }

    // Function to stop video and set it to the first frame
    function stopVideoAtFirstFrame(videoId) {
      var videoElement = document.getElementById(videoId);
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  }

// Function for animation of content using frame 1
function firstFrame() {
  var tl = new TimelineMax();
  
  // Initial setup for opacity and display properties
  TweenMax.set('#frame_2, #frame_3, #frame_4, #logo_2,  #pulse_img_right, #pulse_img_left', { opacity: 0 });
  TweenMax.set('#pulse_video_left, #pulse_video_right', { opacity: 1, display: 'block' });

  // Timeline animations
  tl.fromTo('#frame_1', 0, {opacity: 0, ease: Linear.ease}, {opacity: 1, ease: Linear.ease}, 0) // Frame 1 in
    .to('#frame_1', 0.4, {opacity: 0, ease: Linear.ease}, 3) // Frame 1 out
    .to('#gradient', 0.3, {opacity: 0, ease: Linear.ease}, 3) // Frame 1 gradient out
    .to('#bg_video', 0.2, {opacity: 0, ease: Linear.ease}, 3) // Frame 1 video out
    .to('#bg_image', 0.3, {opacity: 0, ease: Linear.ease}, 3) // Frame 1 image out
    .to('#logo_1', 0.3, {opacity: 0, ease: Power2.easeInOut}, 3) // Frame 1 logo out
    .to('#logo_2', 0.1, {opacity: 1, ease: Power2.easeInOut}, 2.7) // Logo 2 in

  // Reset GIFs by re-triggering the src attribute
  .add(function() {
    var pulseLeft = document.getElementById('pulse_video_left');
    var pulseRight = document.getElementById('pulse_video_right');

    // Temporarily remove src and reassign it to force a reload
    var tempSrcLeft = pulseLeft.src;
    var tempSrcRight = pulseRight.src;

    pulseLeft.src = '';
    pulseRight.src = '';

    pulseLeft.src = tempSrcLeft;
    pulseRight.src = tempSrcRight;
  }, "resetGIFs") // Add label "resetGIFs" where you want to reset the GIFs in the timeline

  .to('#pulse_video_left, #pulse_video_right', 0.3, { opacity: 0 }, 3) // Example fade out of GIFs
  .set('#pulse_video_left, #pulse_video_right', { display: 'none' }, 3.3); // Example remove from display


    // Restart the background video if needed
    if (useVideo === "TRUE") {
      tl.add(function() { restartVideo('BG_video'); }, 0); // Reset BG video to start at 0
    }

  return tl;
}

// Function for animation of content using frame 2
function secondFrame() {
  var tl = new TimelineMax();
  tl.fromTo('#frame_2', 0.4, {opacity:0, ease: Linear.ease},{opacity:1, ease: Linear.ease}, 0) // Frame 2 in
    .fromTo('#cta', 0.4, {scale: 0}, {scale: 1, ease: Power1.easeOut}, 0) // CTA in
    .to('#tagline', 0.4, {color: local_content.Frame_2_Text_Color.value, ease: Linear.ease}, 0) // Frame 2 text color change
    .to('#frame_2', 0.4, {opacity:0, ease: Linear.ease}, 3.3) // Frame 2 out
  return tl;
}

// Function for animation of content using frame 3
function thirdFrame() {
  var tl = new TimelineMax();
  tl.fromTo('#frame_3', 0.4, {opacity:0, ease: Linear.ease},{opacity:1, ease: Linear.ease}, 0) // Frame 3 in
    .to('#frame_3', 0.4, {opacity:0, ease: Linear.ease}, 3.3) // Frame 3 out
  return tl;
}

// Function for animation of content using frame 4 (Disclaimer)
function lastFrame() {
  var tl = new TimelineMax();
  tl.fromTo('#frame_4', 0.4, {opacity:0, ease: Linear.ease},{opacity:1, ease: Linear.ease}, 0) // Frame 4 in
    .to('#frame_4', 0.4, {opacity:0, ease: Linear.ease}, 3.3) // Frame 4 out
  return tl;
}

// If Use frame 4 is true, build timeline with firstFrames and lastFrame, else build timeline using firstFrames
var maintl = new TimelineMax({
  repeat: 3,
  onComplete: function() {
      // On complete, ensure the first frame is visible and the video is stopped at the first frame
      TweenMax.set('#frame_1, #bg_video, #bg_image, #gradient, #logo_1, #pulse_img_right, #pulse_img_left', {opacity: 1});
      TweenMax.set('#tagline', {color: local_content.Frame_1_Text_Color.value});
      TweenMax.set('#cta, #logo_2', {opacity: 0});
      
      if (useVideo === "TRUE") {
        stopVideoAtFirstFrame('BG_video');
      }
      if (local_content.Use_pulse_right.value.toUpperCase() === "TRUE") {
        $("#pulse_img_right").attr("src", "https://assets.lemonpi.io/a/k/fd22da7a-8227-48a7-a4b4-c60e9887135b/Assets/Nordea-DCO-2024/Images/nordea-pulse.png");
      } else {
        $("#pulse_img_right").css("opacity", 0);
      }
    
      //If use pulse right is true, apply pulse to div
      if (local_content.Use_pulse_left.value.toUpperCase() === "TRUE") {
        $("#pulse_img_left").attr("src", "https://assets.lemonpi.io/a/k/fd22da7a-8227-48a7-a4b4-c60e9887135b/Assets/Nordea-DCO-2024/Images/nordea-pulse.png");
      } else {
        $("#pulse_img_left").css("opacity", 0);
      }
    }
});

  if (local_content.Use_frame_4.value.toUpperCase() === "TRUE") {
    maintl
      .add(firstFrame(0))
      .add(secondFrame(3))
      .add(thirdFrame(6))
      .add(lastFrame(9));
  } else {
    maintl
      .add(firstFrame(0))
      .add(secondFrame(3))
      .add(thirdFrame(6));
  }


    // -------------------------------------------------------------------------------------
    // --------------------------------- Text resize start ---------------------------------
    // -------------------------------------------------------------------------------------
    const elements = [
      {
        id: "frame_1",
        maxContainerWidth: 280,
        maxContainerHeight: 80,
        maxFontSize: 25,
        maxLineHeight: 1.2, 
        textSelector: "p",
      },
      {
        id: "frame_2",
        maxContainerWidth: 240,
        maxContainerHeight: 100,
        maxFontSize: 25,
        maxLineHeight: 1.2, 
        textSelector: "p",
      },
      {
        id: "frame_3",
        maxContainerWidth: 240,
        maxContainerHeight: 100,
        maxFontSize: 25,
        maxLineHeight: 1.2, 
        textSelector: "p",
      },
      {
        id: "frame_4",
        maxContainerWidth: 240,
        maxContainerHeight: 100,
        maxFontSize: 15,
        maxLineHeight: 1.2, 
        textSelector: "p",
      },
      // Add more elements with their respective properties
    ];
    
    // Modified function to resize a single element with retry limit
    function resizeElement(element, retryCount = 0) {
      const maxRetries = 3; // Maximum number of retry attempts
      const el = document.getElementById(element.id);
      if (!el) {
        console.error(`Element with ID '${element.id}' not found.`);
        return;
      }
    
      const textElement = el.querySelector(element.textSelector);
      if (!textElement || textElement.innerHTML.trim() === "") {
        console.warn(`Text element not found or empty in '${element.id}'.`);
        if (retryCount < maxRetries) {
          setTimeout(() => resizeElement(element, retryCount + 1), 100);
        } else {
          console.error(`Failed to resize '${element.id}' after ${maxRetries} retries.`);
        }
        return;
      }
    
      el.style.maxHeight = `${element.maxContainerHeight}px`;
      el.style.maxWidth = `${element.maxContainerWidth}px`;
    
      let fontSize = element.maxFontSize;
      textElement.style.fontSize = `${fontSize}px`;
      textElement.style.lineHeight = `${element.maxLineHeight}`;
    
      const minFontSize = 4; // Example minimum font size
      while (
        (textElement.scrollHeight > element.maxContainerHeight ||
          textElement.scrollWidth > element.maxContainerWidth) &&
        fontSize > minFontSize
      ) {
        fontSize--;
        textElement.style.fontSize = `${fontSize}px`;
        textElement.style.lineHeight = `${element.maxLineHeight * fontSize}px`;
      }
    
      if (
        fontSize === minFontSize &&
        (textElement.offsetHeight > element.maxContainerHeight ||
          textElement.offsetWidth > element.maxContainerWidth)
      ) {
        console.warn(
          `Text in '${element.id}' cannot fit within the container at min font size.`
        );
      }
    
      console.log(`Final font size for '${element.id}': ${fontSize}px`);
    }
    
    // Function to resize all elements remains unchanged
    function resizeElements() {
      elements.forEach((element) => {
        resizeElement(element);
      });
    }
    
    document.fonts.ready.then(function() {
      resizeElements();
    });

  });

  //Append exit url to creative container
  document.getElementById('creative_container').onclick = () =>
  window.dispatchEvent(
      new CustomEvent('lemonpi.interaction/click', {
      detail: {
          placeholder: ['Landingpage'],
      }
    })
  );
});