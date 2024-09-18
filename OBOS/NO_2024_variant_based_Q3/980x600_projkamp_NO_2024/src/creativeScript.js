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
    // code here
    // Advanced mapping of dynamic content
    // You can call the content directly once it's collected by lemonpi.subscribe method
    // Example content.[placeholder_name].value
  });
});

window.addEventListener('lemonpi.content/ready', event => {
  const content = event.detail.content

  ////////////////////
  // VARIABLES //
  ///////////////////

  // Local variable for hodling all daa from adset/feed
  var local_content = content;
 
  //Append Cta copy
  var ctaTxt = content.CTA.value;
  //Append sub copy and main copy
  var mainCopy = local_content.rubrik.value;
  var subText = local_content.brodtext.value;

  //Append Right and Left buttons
  var buttonRight = local_content.button_right.value;
  var buttonLeft = local_content.button_left.value;
  
  //Append images
  var partnership_logo = local_content.partnership_logo.value;
  var logo_other_src = local_content.logo_other_src.value;
  var bgImage = local_content.bg_image_src.value;
  var logoImg = local_content.logo_src.value;
  //Append Click url
  var clickUrl = local_content.exit_url.value;

  var appendCss = -30;
  var sublineTop = 190;
  var headlineTop = 74;

  var leftCssController = 390;

  var headCopyPlaceholder = $('#headline');
  headCopyPlaceholder.html(mainCopy);
  
  var subCopyPlaceholder = $('#subline');
  subCopyPlaceholder.html(subText);
  fitText(subCopyPlaceholder, 79);

  var ctaCopyPlaceholder = $('#ctaTxt');
  ctaCopyPlaceholder.html(ctaTxt);

  var rightButtonPlaceholder = $('#button_right');
  rightButtonPlaceholder.html(buttonRight);

  var leftButtonPlaceholder = $('#button_left');
  leftButtonPlaceholder.html(buttonLeft);

   // dynamic controls of bg image position
   var dynamic_img_left = local_content.bgImageCssLeftAdjust.value;
   var dynamic_img_top = local_content.bgImageCssTopAdjust.value;
 
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

   $('#logo_other_src').css({
    content: 'url('+ logo_other_src + ')',
    'background-repeat': 'no-repeat',
    'background-size': 'contain',
  })

  $('#button_left, #button_right').css({
    'color': button_color,
    'border': '3px solid' + button_color
   })


  $('#logo').css({
    content: 'url('+ logoImg + ')',
    'background-repeat': 'no-repeat',
    'background-size': 'contain',
  })

  // Check if logo_other_src exists
  if (!logo_other_src) {
    $('#logo_other_src').remove();
  }

///////////////
// FUNCTIONS //
///////////////

if (partnership_logo !== '') {
  $('#partnership_logo').css({
      content: 'url(' + partnership_logo + ')',
  });
  $('.vertical-line').css({
      display: 'block',
  });
  $('.logo').css({
    height: '53',
});
} else {
  $('.vertical-line').css({
      display: 'none',
  });
  $('#logo').css({
      height: '52px',
      right: '10px',
      top: '507px', 
  });
}

  /* Add styles to buttons if they contain content */
  if (local_content.button_right.value.trim() == "") {
    $('#button_right').css({
      'display': 'none',
    });
  } else {
    $('#button_right').css({
    });
  }
  
  if (local_content.button_left.value.trim() == "") {
    $('#button_left').css({
      'display': 'none',
    });
  } else {
    $('#button_left').css({
    });
  }

// Added fitText function instead of the plugin
// call with examaple: fitText($('#selector'),10)
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

// Defer animation to idle time to prevent blocking
requestIdleCallback(() => {
  TweenMax.to('#bgImage', 5, {
    scale: 1.1,
    transformOrigin: "center",
    repeat: -1,
    repeatDelay: 1,  // Add delay before restarting
    ease: Power1.easeInOut
  });
});

// Create the GSAP timelines
var introAnimation = gsap.timeline({repeat: 0, repeatDelay: 0.3});

introAnimation.from('#copyDiv', 0.5, {autoAlpha: 0}, 0.2, 1);

// Animation for CTA button remains unchanged
var ctaAnimation = gsap.timeline({repeat: -1, repeatDelay: 1});
ctaAnimation.fromTo('#ctaTxt', {scale: 1}, {scale: 0.95, duration: 0.25, yoyo: true, repeat: 1}, 2);

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
