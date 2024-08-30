window.addEventListener('lemonpi.content/ready', event => {
  const content = event.detail.content

  ////////////////////
  // VARIABLES //
  ///////////////////

  // Local variable for holding all data from adset/feed
  var local_content = content;

  //Append Property title 
  var project_brfName = local_content.projekt.value;
  //Append Cta copy
  var ctaTxt = content.CTA.value;
  //Append images
  var logo_other_src = local_content.logo_other_src.value;
  var bgImage = local_content.bg_image_src.value;
  var logoImg = local_content.logo_src.value;
  // Now proceed with your conditional logic based on the width
  var mainCopy = local_content.rubrik.value;
  var subText = local_content.brodtext.value;
  var houseIcon = "https://assets.lemonpi.io/a/1024/ded0820142b233c423b01bc2620aabef.png";
  //Append Click url
  var clickUrl = local_content.exit_url.value;

  var appendCss = 0;
  var brfNameTop = 341;
  var sublineTop = 440;
  var headlineTop = 374;
  var iconTop = 341;

  var headCopyPlaceholder = $('#headline');
  headCopyPlaceholder.html(mainCopy);
  fitText(headCopyPlaceholder, 65);
  
  var subCopyPlaceholder = $('#subline');
  subCopyPlaceholder.html(subText);
  fitText(subCopyPlaceholder, 47);

  var brfNamePlaceholder = $('#brfName');
  brfNamePlaceholder.html(project_brfName);

  var ctaCopyPlaceholder = $('#ctaTxt');
  ctaCopyPlaceholder.html(ctaTxt);

   // dynamic controls of bg image position
   var dynamic_img_left = local_content.bgImageCssLeftAdjust.value;
   var dynamic_img_top = local_content.bgImageCssTopAdjust.value;

   // Assuming content.useHouseIcon.value is correctly assigned to includeBrf
   var includeBrf = local_content.useHouseIcon.value;
 
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

  $('#icon').css({
    content: 'url('+ houseIcon + ')',
    'background-repeat': 'no-repeat',
    'background-size': 'contain',
    'top': iconTop + appendCss + 'px',
  })

    // Check if logo_other_src exists
    if (logo_other_src) {
      $('#subline').css({
        top: '482px',
      });
      $('#headline').css({
        top: '426px', 'font-size': '17px', 'line-height': '17px',
      });
    } else {
      $('#headline').css({
        top: headlineTop + appendCss + 'px',
      });
      $('#subline').css({
        top: sublineTop + appendCss + 'px',
      });
    }

  $('#brfName').css({
    top: brfNameTop +  appendCss + 'px',
  })

  ////////////////////
  // ANIMATIONS //
  ///////////////////

// Adjust initial CSS based on includeBrf
if (includeBrf === '0') {
  $('#brf').css('opacity', 0); // Ensure brf is initially hidden if includeBrf is '0'
  $('#rectangle_lightblue').css('border-radius', '15px');
}

// Create the GSAP timelines
var introAnimation = gsap.timeline({repeat: -1, repeatDelay: 1});
introAnimation.from('#rectangle_lightblue', 0.5, {x: -300, autoAlpha: 1}, 0.2, 0.8);

// Conditionally add animation for #brf based on includeBrf
if (includeBrf !== '0') {
  introAnimation.from('#brf', 0.5, {x: -300, autoAlpha: 1}, 0.2, 0.8);
}

introAnimation.from('#copy', 0.5, {autoAlpha: 0}, 0.7, 1);
introAnimation.to('#rectangle_lightblue, #copy', 0.2, {autoAlpha: 0}, 6, 0.5);

// Only fade out #brf if it was included initially
if (includeBrf !== '0') {
  introAnimation.to('#brf', 0.2, {autoAlpha: 0}, 6, 0.5);
}

// Animation for CTA button remains unchanged
var ctaAnimation = gsap.timeline({repeat: -1, repeatDelay: 1});
ctaAnimation.fromTo('#ctaBg, #ctaTxt', {scale: 1}, {scale: 0.95, duration: 0.25, yoyo: true, repeat: 1}, 2);

///////////////
// FUNCTIONS //
///////////////

const use_buttons_yes_no = "yes"; // Change this value to "no" to remove the buttons

if (use_buttons_yes_no === "yes") {
  document.getElementById("buttons-container").style.display = "block";
} else {
  document.getElementById("buttons-container").style.display = "none";
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
