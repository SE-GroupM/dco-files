/**
  * Template Name
  * @Owner Name Developer
  * @Date
*/

window.addEventListener('lemonpi.content/ready', event => {
  console.clear();
  const content = event.detail.content;
  const source = event.detail.source;

  var mainCopy_fontSize = content.mainCopy_fontSize.value;
  var subtitle_fontSize = content.subtitle_fontSize.value;
  var subTitle_topValue = content.subTitle_topValue.value;
  var font_color = content.font_color.value;

  // Helper function to set font-size and line-height with an additional 2px for line-height
  function setFontSizeAndLineHeight(element, fontSize) {
    var defaultFontSize = parseFloat(element.css('font-size'));
    if (!fontSize) {
        fontSize = defaultFontSize + 'px';
    }
    var lineHeight = (parseFloat(fontSize) + 3) + 'px';
    element.css({
        'line-height': lineHeight,
        'font-size': fontSize
    });
  }


// SubCopy static
var subCopy = $('#subCopy_static');
subCopy.append(content.subCopy_static.value);
setFontSizeAndLineHeight(subCopy, subtitle_fontSize);
subCopy.css({
    'top': subTitle_topValue,
    'color': font_color,
    'font-size': subtitle_fontSize
});

// SubCopy frame 1
var subCopy_frame_1 = $('#subCopy1');
subCopy_frame_1.append(content.subCopy_frame_1.value);
setFontSizeAndLineHeight(subCopy_frame_1, subtitle_fontSize);
subCopy_frame_1.css({
    'top': subTitle_topValue,
    'color': font_color,
    'font-size': subtitle_fontSize
});

// SubCopy frame 2
var subCopy_frame_2 = $('#subCopy2');
subCopy_frame_2.append(content.subCopy_frame_2.value);
setFontSizeAndLineHeight(subCopy_frame_2, subtitle_fontSize);
subCopy_frame_2.css({
    'top': subTitle_topValue,
    'color': font_color,
    'font-size': subtitle_fontSize
});

  // Frame 1
  var frame_1 = $('#frame_1_copy');
  frame_1.append(content.frame_1_copy.value);
  setFontSizeAndLineHeight(frame_1, mainCopy_fontSize);
  frame_1.css({
    'color': font_color,
    'font-size': mainCopy_fontSize
});

  // Frame 2
  var frame_2 = $('#frame_2_copy');
  frame_2.append(content.frame_2_copy.value);
  setFontSizeAndLineHeight(frame_2, mainCopy_fontSize);
  frame_2.css({
    'color': font_color,
    'font-size': mainCopy_fontSize
});

  var use_one_headline = content.use_one_headline.value;
  var use_one_headline_bool = false;
  if (use_one_headline == 1 || use_one_headline == 'yes') {
    use_one_headline_bool = true;
  }

  TweenMax.set('#legal_bg', {autoAlpha:0});

  $('#legal_btn')
    .on('mouseenter touchstart', onUserEnter)
    .on('mouseleave touchend', onUserLeave);

  function onUserEnter() {
    TweenMax.fromTo('#legal_bg', 0.2, { autoAlpha: 0}, { autoAlpha: 1});
  }

  function onUserLeave() {
    TweenMax.fromTo('#legal_bg', 0.2, { autoAlpha: 1}, { autoAlpha: 0});
  }

   //Hover function on CTA to change colors
   $('#creative_container')
   .on('mouseenter touchstart', onUserEnterCta)
   .on('mouseleave touchend', onUserLeaveCta);
 
   function onUserEnterCta() {
     TweenMax.fromTo('#cta_text', 0.2, { backgroundColor: '#0471f4', color: '#fff'}, { backgroundColor: '#fff', color: '#0471f4', zIndex: 10});
   }
 
   function onUserLeaveCta() {
     TweenMax.fromTo('#cta_text', 0.2, { backgroundColor: '#fff', color: '#0471f4'}, { backgroundColor: '#0471f4', color: '#fff', zIndex: 10});
   }

   function firstFrame() {
    const tl = new TimelineMax({ repeat: 5 });
    const frame1Image = document.getElementById("bg_image_frame_1");
    const frame2Image = document.getElementById("bg_image_frame_2");

    TweenMax.set(["#logo_squared", "#logo_wide"], { opacity: 1, display: "block", zIndex: 10 });

    // Initial state: Frame 1 visible, Frame 2 hidden. Text is hidden.
    TweenMax.set(frame1Image, { opacity: 1, display: "block", scale: 1 });
    TweenMax.set(frame2Image, { opacity: 0, display: "block", scale: 1 });
    
    // Initial states for text
    TweenMax.set(['#subCopy1', '#subCopy2'], { opacity: 1, display: "block", zIndex: 10 });
    TweenMax.set('#subCopy2', { opacity: 0});

    if (use_one_headline_bool) {
        const fadeDuration = 1.2;
        const zoomDuration = fadeDuration; // Zoom matches fade duration
        const textDuration = 0.7;
        const textHoldDuration = 2; // Duration to hold text visible

          // Initial states (without zooming out when fading out)
          TweenMax.set(frame1Image, { opacity: 1, scale: 1.1, zIndex: 2 }); // Start with zoomed-in frame
          TweenMax.set(frame2Image, { opacity: 0, scale: 1, zIndex: 1 }); // Start with no zoom
          TweenMax.set(['#frame_1_copy', '#subCopy1'], {zIndex: 10});
          TweenMax.set(['#frame_2_copy', '#subCopy2'], { zIndex: 10 });
          TweenMax.set('#legal_btn', { opacity: 1 });
          
        // Timeline setup
        tl.to(frame1Image, fadeDuration, { opacity: 0, scale: 1, ease: Power2.easeInOut }, 0) // Fade out and reset scale
            .to('#subCopy1', textDuration, { opacity: 0 }, fadeDuration - textDuration)
            .to(frame2Image, fadeDuration, { opacity: 1, ease: Power2.easeInOut }, 0) // Fade in frame 2
            .to(frame2Image, zoomDuration, { scale: 1.1, ease: Power2.easeInOut }, 0) // Zoom in frame 2 at the same time as fade-in
            .to('#subCopy2', textDuration, { opacity: 1 }, fadeDuration)
            .to(frame2Image, textHoldDuration, {}, fadeDuration + textDuration); // Hold Frame 2

        // Frame 2 -> Frame 1 (smooth transition)
        let frame2EndTime = 2 * fadeDuration + textHoldDuration; // End time of Frame 2
        tl.to(frame2Image, fadeDuration, { opacity: 0, scale: 1, ease: Power2.easeInOut }, frame2EndTime) // Fade out frame 2
            .to('#subCopy2', textDuration, { opacity: 0 }, frame2EndTime)
            .to(frame1Image, fadeDuration, { opacity: 1, ease: Power2.easeInOut }, frame2EndTime) // Fade in frame 1
            .to(frame1Image, zoomDuration, { scale: 1.1, ease: Power2.easeInOut }, frame2EndTime) // Zoom in frame 1 at the same time as fade-in
            .to('#subCopy1', textDuration, { opacity: 1 }, frame2EndTime + fadeDuration)
            .to(frame1Image, textHoldDuration, {}, frame2EndTime + fadeDuration + textDuration); // Hold Frame 1

        // Repeating loop to keep animation smooth
        tl.to(frame1Image, fadeDuration, { opacity: 0, scale: 1, ease: Power2.easeInOut }, 0) // Fade out and reset scale
            .to('#subCopy1', textDuration, { opacity: 0 }, fadeDuration - textDuration)
            .to(frame2Image, fadeDuration, { opacity: 1, ease: Power2.easeInOut }, 0) // Fade in frame 2
            .to(frame2Image, zoomDuration, { scale: 1.1, ease: Power2.easeInOut }, 0) // Zoom in frame 2 at the same time as fade-in
            .to('#subCopy2', textDuration, { opacity: 1 }, fadeDuration)
            .to(frame1Image, textHoldDuration, {}, frame2EndTime + fadeDuration + textDuration); // Hold Frame 1 at zoomed-in state
    
        } else {
          let tl = new TimelineMax({ repeat: -1, delay: 1.3 });

          const fadeDuration = 1.2;
          const zoomDuration = fadeDuration; // Zoom matches fade duration
          const textDuration = 0.7;
          const textHoldDuration = 2; // Hold time for each frame
          
          // Initial states (without zooming out when fading out)
          TweenMax.set(frame1Image, { opacity: 1, scale: 1.1, zIndex: 2 }); // Start with zoomed-in frame
          TweenMax.set(frame2Image, { opacity: 0, scale: 1, zIndex: 1 }); // Start with no zoom
          TweenMax.set(['#frame_1_copy', '#subCopy1'], { opacity: 1, zIndex: 10 });
          TweenMax.set(['#frame_2_copy', '#subCopy2'], { opacity: 0, zIndex: 10 });
          TweenMax.set('#legal_btn', { opacity: 1 });
          
          // Frame 1 -> Frame 2
          tl.to(frame1Image, fadeDuration, { opacity: 0, scale: 1, ease: Power2.easeInOut }, 0) // Fade out (zoom out when disappearing)
            .to(['#frame_1_copy', '#subCopy1'], textDuration, { opacity: 0 }, fadeDuration - textDuration)
            .to(frame2Image, fadeDuration, { opacity: 1, ease: Power2.easeInOut }, 0) // Fade in
            .to(frame2Image, zoomDuration, { scale: 1.1, ease: Power2.easeInOut }, 0) // Zoom in at the same time as fade-in
            .to(['#frame_2_copy', '#subCopy2'], textDuration, { opacity: 1 }, fadeDuration)
            .to(frame2Image, textHoldDuration, {}, fadeDuration + textDuration); // Hold Frame 2 at zoomed-in state
          
          // Frame 2 -> Frame 1
          let frame2EndTime = 2 * fadeDuration + textHoldDuration;
          
          tl.to(frame2Image, fadeDuration, { opacity: 0, scale: 1, ease: Power2.easeInOut }, frame2EndTime) // Fade out (zoom out when disappearing)
            .to(['#frame_2_copy', '#subCopy2'], textDuration, { opacity: 0 }, frame2EndTime)
            .to(frame1Image, fadeDuration, { opacity: 1, ease: Power2.easeInOut }, frame2EndTime) // Fade in
            .to(frame1Image, zoomDuration, { scale: 1.1, ease: Power2.easeInOut }, frame2EndTime) // Zoom in at the same time as fade-in
            .to(['#frame_1_copy', '#subCopy1'], textDuration, { opacity: 1 }, frame2EndTime + fadeDuration)
            .to(frame1Image, textHoldDuration, {}, frame2EndTime + fadeDuration + textDuration); // Hold Frame 1 at zoomed-in state
                                        
          if (subCopy_static !== "") {
            tl.to('#subCopy_static', 0.3, { opacity: 1, visibility: 'visible' }, 0.4);
          }
          return tl;
          }
        }   

// Function for background image animation
function bgImageAnimation() {
  var bgTl = new TimelineMax({ repeat: 1 }); // Set repeat to 1 for two cycles in total
  bgTl.to('#bg_image', 5, { scale: 1.15, ease: Linear.easeNone }, 0); // Frame 1 bg image scale
  return bgTl;
}

// Create end frame
var maintl = new TimelineMax({
  repeat: 4,
  onComplete: function() {
    // On complete, ensure the first frame is visible and the video is stopped at the first frame
    TweenMax.set('#frame_1_copy, #subCopy1', { opacity: 1 });
    TweenMax.set('#bg_image', { scale: 1 });
  }
});

// Add frames to the main timeline
maintl.add(firstFrame(), 0)
       .add(bgImageAnimation(), 0); // Add background animation at the same time as the main content
});

