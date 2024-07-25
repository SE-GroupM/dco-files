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
  var use_one_headline = content.use_one_headline.value;
  var font_color = content.font_color.value;
  var cta_right_or_left = content.cta_right_or_left.value;

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
    'color': font_color
});

// SubCopy frame 1
var subCopy_frame_1 = $('#subCopy1');
subCopy_frame_1.append(content.subCopy_frame_1.value);
setFontSizeAndLineHeight(subCopy_frame_1, subtitle_fontSize);
subCopy_frame_1.css({
    'top': subTitle_topValue,
    'color': font_color
});

// SubCopy frame 2
var subCopy_frame_2 = $('#subCopy2');
subCopy_frame_2.append(content.subCopy_frame_2.value);
setFontSizeAndLineHeight(subCopy_frame_2, subtitle_fontSize);
subCopy_frame_2.css({
    'top': subTitle_topValue,
    'color': font_color
});

  // Frame 1
  var frame_1 = $('#frame_1_copy');
  frame_1.append(content.frame_1_copy.value);
  setFontSizeAndLineHeight(frame_1, mainCopy_fontSize);
  frame_1.css({
    'color': font_color,
});

  // Frame 2
  var frame_2 = $('#frame_2_copy');
  frame_2.append(content.frame_2_copy.value);
  setFontSizeAndLineHeight(frame_2, mainCopy_fontSize);
  frame_2.css({
    'color': font_color,
});

  var use_one_headline_bool = false;
  if (use_one_headline == 1 || use_one_headline == 'yes') {
    use_one_headline_bool = true;
  }

  if (cta_right_or_left == 'left') {
    $('#logo_image').css({
      'left': '150px',
      'top': '196px'
    });
    $('#cta_text').css({
      'right': '193px',
      'min-width': '90px',
      'top': '185px'
    });
  } else {
    // No changes, keep default settings: cta will be placed on the right and the logo to the left
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

  var mt = new TimelineMax({repeat: -1});

  if (use_one_headline_bool) {
    mt.to("#frame_1_copy, #subCopy_static", {opacity: 1, duration: 1.1})
      .to("#frame_1_copy, #subCopy_static", {opacity: 0, duration: 0.5, delay: 1.5})
      .to("#frame_1_copy, #subCopy_static", {opacity: 1, duration: 0.5});
  } else {
    gsap.set("#frame_2_copy", { opacity: 0 });
    mt.to("#frame_1_copy", {opacity: 1, duration: 1.5})
      .to("#frame_1_copy", {opacity: 0, duration: 0.5, delay: 1.5})
      .to("#frame_2_copy", {opacity: 1, duration: 0.5})
      .to("#frame_2_copy", {opacity: 0, duration: 0.5, delay: 1.5})
      .to("#frame_1_copy", {opacity: 1, duration: 0.5});
  }

  gsap.set("#subCopy2", { opacity: 0 });
  gsap.timeline({repeat: -1, repeatDelay: 0}) // Adding repeat: -1 to loop forever, with no delay between repetitions
    .to("#subCopy1", {opacity: 1, duration: 0.5}) // Fade in subCopy1
    .to("#subCopy1", {opacity: 0, duration: 0.5, delay: 1.5}) // Fade out subCopy1
    .to("#subCopy2", {opacity: 1, duration: 0.5}) // Then fade in subCopy2 after subCopy1 fades out
    .to("#subCopy2", {opacity: 0, duration: 0.5, delay: 1.5}); // Finally, fade out subCopy2

});
