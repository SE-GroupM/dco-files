window.addEventListener('lemonpi.content/ready', event => {
  const content = event.detail.content

  ////////////////////
  // VARIABLES //
  ///////////////////

  // Local variable for holding all data from adset/feed
  var local_content = content;

  //Append Cta copy
  var ctaTxt = content.CTA.value;
  //Append images
  var partnership_logo = local_content.partnership_logo.value;
  var logo_other_src = local_content.logo_other_src.value;
  var bgImage = local_content.bg_image_src.value;
  var logoImg = local_content.logo_src.value;
  // Now proceed with your conditional logic based on the width
  var mainCopy = local_content.rubrik.value;
  var subText = local_content.brodtext.value;
  //Append Click url
  var clickUrl = local_content.exit_url.value;

  var appendCss = 0;
  var sublineTop = 440;
  var headlineTop = 374;

  var headCopyPlaceholder = $('#headline');
  headCopyPlaceholder.html(mainCopy);
  fitText(headCopyPlaceholder, 65);
  
  var subCopyPlaceholder = $('#subline');
  subCopyPlaceholder.html(subText);
  fitText(subCopyPlaceholder, 47);

  var ctaCopyPlaceholder = $('#ctaTxt');
  ctaCopyPlaceholder.html(ctaTxt);

   // dynamic controls of bg image position
   var dynamic_img_left = local_content.bgImageCssLeftAdjust.value;
   var dynamic_img_top = local_content.bgImageCssTopAdjust.value;

   var use_buttons_yes_no = local_content.use_buttons_yes_no.value;
   var logo_top_yes_no = local_content.logo_top_yes_no.value;
 
   //Color of buttons on the right
   var button_color = local_content.button_color.value;
 
   $('#bgImage').css({
     content: 'url('+ bgImage + ')',
     'background-repeat': 'no-repeat',
     'background-position': 'center center',
     'background-size': '',
     'left': dynamic_img_left + 'px',
     'top': dynamic_img_top + 'px',
     
   })

   $('#button_left, #button_right').css({
    'color': button_color,
    'border': '2px solid' + button_color
   })

  $('#logo_other_src').css({
    content: 'url('+ logo_other_src + ')',
    'background-repeat': 'no-repeat',
    'background-size': 'contain',
  })

  $('#logo').css({
    content: 'url('+ logoImg + ')',
    'background-repeat': 'no-repeat',
    'background-size': 'contain',
  })

  ///////////////
 // FUNCTIONS //
///////////////

 // Check if logo_other_src exists
 if (!logo_other_src) {
 $('#logo_other_src').remove();
}
 
if (partnership_logo !== '') {
  $('#partnership_logo').css({
      content: 'url(' + partnership_logo + ')',
  });
  $('.vertical-line').css({
      display: 'block',
  });
} else {
  $('.vertical-line').css({
      display: 'none',
  });
  $('#logo').css({
      height: '32px',
      right: '5px',
      top: '515px', 
  });
}

if (use_buttons_yes_no === 'no') {
  $('#button_left, #button_right').css({
    display: 'none',
  });
} else {
  $('#button_left, #button_right').css({
    display: 'block',
  });
}

/*logo placements top or bottom*/

if (logo_top_yes_no === "yes") {
  $('.container').css({
    position:'fixed',
    top: '15px', 
    left: '30px',
});
} else {
  $('.container').css({
    top: '535px', 
});
}

// Added fitText function instead of the plugin
// call with example: fitText($('#selector'),10)
function fitText(selector, maxHeight) {
  var $element = $(selector);
  var fontSize = parseInt($element.css('font-size'));
  var lineHeightFactor = parseInt($element.css('line-height')) / fontSize;

  $element.css({
      height: 'auto',
  });

  var resizeText = setInterval(function () {
      if ($element.height() <= maxHeight || fontSize <=8) {
          clearInterval(resizeText);
      }

      $element.css({
          fontSize: fontSize + 'px',
          lineHeight: (fontSize * lineHeightFactor) + 'px',
      });

      fontSize--;
  }, 0);
}

  ////////////////////
  // ANIMATIONS //
  ///////////////////

/*// Create the GSAP timelines
var introAnimation = gsap.timeline({repeat: -1, repeatDelay: 1});
introAnimation.from('#rectangle_lightblue', 0.5, {x: -300, autoAlpha: 1}, 0.2, 0.8);

introAnimation.from('#copyDiv', 0.5, {autoAlpha: 0}, 0.7, 1);
introAnimation.to('#rectangle_lightblue, #copyDiv', 0.2, {autoAlpha: 0}, 6, 0.5);
*/
var introAnimation = gsap.timeline({repeat: -1, repeatDelay: 0.3});

introAnimation.from('#copyDiv', 0.5, {autoAlpha: 0}, 0.2, 1);
introAnimation.to('#copyDiv', 0.2, {autoAlpha: 0}, 6, 0.5);

// Animation for CTA button remains unchanged
var ctaAnimation = gsap.timeline({repeat: -1, repeatDelay: 1});
ctaAnimation.fromTo('#ctaBg, #ctaTxt', {scale: 1}, {scale: 0.95, duration: 0.25, yoyo: true, repeat: 1}, 2);

// Stop repeating animations after 15 seconds, if AppNexus tells us to, and the user hasn't interacted
window.onLoopStop = function () {
  ctaAnimation.stop();
};
// Click event caller for worldClick
$('#worldClick').click(onClick);
// Function for click event
function onClick (event) {
  return window.dispatchEvent(
    new CustomEvent('lemonpi.interaction/click', {
      detail: {
        placeholder: 'exit_url' // Placeholder name for click
      }
  }));
}
})