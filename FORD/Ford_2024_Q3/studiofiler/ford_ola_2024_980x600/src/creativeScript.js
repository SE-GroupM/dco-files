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
     TweenMax.fromTo('#cta_text', 0.2, { backgroundColor: '#0471f4', color: '#fff'}, { backgroundColor: '#fff', color: '#0471f4'});
   }
 
   function onUserLeaveCta() {
     TweenMax.fromTo('#cta_text', 0.2, { backgroundColor: '#fff', color: '#0471f4'}, { backgroundColor: '#0471f4', color: '#fff'});
   }
   
// Function for animation of content 
function firstFrame() {
  var tl = new TimelineMax();
  if (use_one_headline_bool) {
    TweenMax.set('#subCopy1, #subCopy2', { opacity: 0 });
    tl.fromTo('#subCopy1', 0.3,  { opacity: 0, ease: Linear.ease }, { opacity: 1, ease: Linear.ease }, 0) // Subcopy 1 in
      .to('#subCopy1', 0.3,  { opacity: 0, ease: Linear.ease }, 2) // Subcopy 1 out
      .to('#subCopy2', 0.3, { opacity: 1, ease: Linear.ease }, 2.3) // Subcopy 2 in
      .to('#subCopy2', 0.3,  { opacity: 0, ease: Linear.ease }, 4.8) // Subcopy 2 out
      .to('#subCopy1', 0.3,  { opacity: 1, ease: Linear.ease }, 5.1) // Subcopy 1 in
      .to('#subCopy1', 0.3,  { opacity: 0, ease: Linear.ease }, 7.6) // Subcopy 1 out
      .to('#subCopy2', 0.3,  { opacity: 1, ease: Linear.ease }, 7.9) // Subcopy 2 in
      .to('#subCopy2', 0.3,  { opacity: 0, ease: Linear.ease }, 9.9) // Subcopy 2 out
  } else {
    TweenMax.set('#subCopy1, #subCopy2, #frame_2_copy', { opacity: 0 });
    tl.fromTo('#frame_1_copy, #subCopy1', 0.3, { opacity: 0, ease: Linear.ease }, { opacity: 1, ease: Linear.ease }, 0) // Frame 1 headline and subcopy in
      .to('#frame_1_copy, #subCopy1', 0.3,  { opacity: 0, ease: Linear.ease }, 2) // Frame 1 headline and subcopy out
      .fromTo('#frame_2_copy, #subCopy2', 0.3,  { opacity: 0, ease: Linear.ease }, { opacity: 1, ease: Linear.ease }, 2.3) // Frame 2 headline and subcopy in
      .to('#frame_2_copy, #subCopy2', 0.3,  { opacity: 0, ease: Linear.ease }, 4) // Frame 2 headline and subcopy out
  }
    // Check if subCopy_static is not empty and animate accordingly
    if (subCopy_static !== "") {
      tl.to('#subCopy_static', 1.5, { opacity: 1, ease: Linear.ease }, 0.4); // subCopy_static fades in after 1 second
    }

  return tl;
}

// Function for background image animation
function bgImageAnimation() {
  var bgTl = new TimelineMax({ repeat: 1 }); // Set repeat to 1 for two cycles in total
  bgTl.to('#bg_image', 5, { scale: 1.3, ease: Linear.easeNone }, 0); // Frame 1 bg image scale
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
