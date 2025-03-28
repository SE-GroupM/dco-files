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
    // Variable declaration for mainCopy
    var mainCopy = local_content.rubrik_mindre_format.value;
    // Variable declaration for subText / Brödtext
    var subText = local_content.brodtext_mindre_format.value;
    
  //Append Property title 
  var project_brfName = local_content.projekt.value;
  //Append Cta copy
  var ctaCopy = content.CTA.value;
  //Append images
  var bgImage = local_content.bg_image_source.value;
  var logoImg = local_content.logo_src.value;
  var houseIcon = "https://assets.lemonpi.io/a/k/e1c5a252-3458-4e1d-a780-c7f84af23eda/Assets/other_assets/Kartnal.png";

  // Wait for the content to load, then add the "animate" class to trigger the animation
  const rectangle = document.querySelector('.rectangle_white');
  if (rectangle) {
    // Add the "animate" class to trigger the stroke animation
    rectangle.classList.add('animate');
  }

  //Append Click url
  var exit_url = local_content.exit_url.value;

  var appendCss = 100;
  var brfNameTop = 174;
  var iconTop = 171;
  
  var headCopyPlaceholder = $('#headline');
  headCopyPlaceholder.html(mainCopy);
  fitText(headCopyPlaceholder, 105);
  
  var subCopyPlaceholder = $('#subline');
  subCopyPlaceholder.html(subText);
  fitText(subCopyPlaceholder, 72);

  var brfNamePlaceholder = $('#brfName');
  brfNamePlaceholder.html(project_brfName);

  var ctaCopyPlaceholder = $('#ctaTxt');
  ctaCopyPlaceholder.html(ctaCopy);

   // dynamic controls of bg image position
   var dynamic_img_left = local_content.bgImageCssLeftAdjust.value;
   var dynamic_img_top = local_content.bgImageCssTopAdjust.value;
 
   $('#bgImage').css({
     content: 'url('+ bgImage + ')',
     'background-repeat': 'no-repeat',
     'background-position': 'center center',
     'background-size': '',
     'left': dynamic_img_left + 'px',
     'top': dynamic_img_top + 'px',
     
   })

  $('#logo').css({
    content: 'url('+ logoImg + ')',
    'background-repeat': 'no-repeat',
    'background-size': 'contain',
  })
  $('#icon').css({
    content: 'url('+ houseIcon + ')',
    'background-repeat': 'no-repeat',
    'background-position': 'top right',
    'background-size': 'contain',
    'top': iconTop + appendCss + 'px',
  })

  $('#brfName').css({
    top: brfNameTop +  appendCss + 'px',
  })

    ////////////////////
   /// ANIMATIONS ////
  ///////////////////

// Assuming content.useHouseIcon.value is correctly assigned to includeBrf
var includeBrf = local_content.useHouseIcon.value;

// Adjust initial CSS based on includeBrf
if (includeBrf === '0' || includeBrf === '') {
$('#brf, #brfName').css('opacity', 0); // Ensure brf is initially hidden if includeBrf is '0' or empty
$('#copyDiv').css('top', '50px');    // Set top value for copyDiv
}

var introAnimation = gsap.timeline();

// Conditionally add animation for #brf based on includeBrf
if (includeBrf !== '0' && includeBrf !== '') {
introAnimation.from('#brf, #brfName, #icon', {
  duration: 0.5, // Duration of the fade-in effect
  autoAlpha: 0,  // Start with opacity 0 (hidden)
  delay: 0.5     // Delay before the animation starts
});
}

// Animation for CTA button remains unchanged
var ctaAnimation = gsap.timeline({repeat: -1, repeatDelay: 1});
ctaAnimation.fromTo('#ctaBg, #ctaTxt, #icon', {scale: 1}, {scale: 0.95, duration: 0.25, yoyo: true, repeat: 1}, 2);

///////////////
// FUNCTIONS //
///////////////

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
      if ($element.height() <= maxHeight || fontSize <= 8) {
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
$('#exit_url').click(onClick);
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
  