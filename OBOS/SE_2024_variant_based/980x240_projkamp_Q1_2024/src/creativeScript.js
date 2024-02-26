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
  const source = event.detail.source

  ////////////////////
  // VARIABLES //
  ///////////////////

  // Local variable for hodling all daa from adset/feed
  var local_content = content;
  console.log(local_content)
  
  // Variable declaration for city name
  var cityName = local_content.ort.value;
  //Append Event details
  var mainCopy = local_content.rubrik.value;
  var subText = local_content.brodtext_mindre_format.value;
  //Append Property title 
  var project_brfName = local_content.projekt.value;
  //Append Cta copy
  var ctaCopy = content.CTA.value;
  //Append images
  var bgImage = local_content.bg_image_source.value;
  var logoImg = content.logo_src.value;
  var houseIcon = "https://assets.lemonpi.io/a/1024/ded0820142b233c423b01bc2620aabef.png";

  // Append villkors copy
  var villkorCopy = "";

  //Append Click url
  var clickUrl = local_content.exit_url.value;

  var appendCss = -30;
  var ctaTop = 125;
  var brfNameTop = 40;
  var sublineTop = 117;
  var headlineTop = 64;
  var iconTop = 90;

  var leftCssController = 390;

  var headCopyPlaceholder = $('#headline');
  headCopyPlaceholder.append(mainCopy);
  fitText(headCopyPlaceholder, 74);

  var subCopyPlaceholder = $('#subline');
  subCopyPlaceholder.append(subText);
  fitText(subCopyPlaceholder, 49);

  var brfNamePlaceholder = $('#brfName');
  brfNamePlaceholder.append(project_brfName);

  var ctaCopyPlaceholder = $('#ctaTxt');
  ctaCopyPlaceholder.append(ctaCopy);

  var villkorPlaceholder = $('#villkor');
  villkorPlaceholder.append(villkorCopy);

  // dynamic controls of bg image position
  var dynamic_img_left = content.bgImageCssLeftAdjust.value;
  var dynamic_img_top = content.bgImageCssTopAdjust.value;

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
    'background-position': 'top right',
    'background-size': 'contain',
  })
  $('#icon').css({
    content: 'url('+ houseIcon + ')',
    'background-repeat': 'no-repeat',
    'background-position': 'top right',
    'background-size': 'contain',
    'top': iconTop + appendCss + 'px',
  })

  $('#headline').css({
    'top': headlineTop + appendCss + 'px',
    'left': leftCssController+'px',
  })
  $('#subline').css({
    'top': sublineTop + appendCss + 'px',
    'left': leftCssController+'px',
  })
  $('#brfName').css({
    'top': brfNameTop +  appendCss + 'px',
    'left': leftCssController+30+'px',
  })
  $('#ctaBg, #ctaTxt').css({
    'top': ctaTop + appendCss + 'px',
  })

  ////////////////////
  // ANIMATIONS //
  ///////////////////

// Assuming content.includeBrf.value is correctly set
var includeBrf = "0";

// Adjust initial CSS based on includeBrf
if (includeBrf === '0') {
  $('#brf').css('opacity', 0); // Ensure brf is initially hidden if includeBrf is '0'
  $('#rectangle_lightblue').css('border-radius', '15px');
}

// Create the GSAP timelines with conditional logic for #brf
var introAnimation = gsap.timeline({repeat: -1, repeatDelay:1});
introAnimation.from('#rectangle_lightblue', 0.5, {y: -300, autoAlpha: 1}, 0.2, 0.8);

// Conditionally add animation for #brf based on includeBrf
if (includeBrf !== '0') {
  introAnimation.from('#brf', 0.5, {y: -300, autoAlpha: 1}, 0.2, 0.8);
}

introAnimation.from('#copy', 0.5, {autoAlpha: 0}, 0.7, 1);
introAnimation.to('#rectangle_lightblue, #copy', 0.2, {autoAlpha: 0}, 6, 0.5);

// Only fade out #brf if it was included initially
if (includeBrf !== '0') {
  introAnimation.to('#brf', 0.2, {autoAlpha: 0}, 6, 0.5);
}

// Animation for CTA button remains unchanged
var ctaAnimation = gsap.timeline({repeat:-1, repeatDelay:1});
ctaAnimation.fromTo('#ctaBg, #ctaTxt', {scale: 1}, {scale: 0.95, duration: 0.25, yoyo: true, repeat: 1}, 2);

// Main timeline logic
var mainTimeLine = gsap.timeline();
mainTimeLine.add(function(){
  introAnimation.play();
});
mainTimeLine.add(function(){
  ctaAnimation.play();
}, 6);

// fitText function remains unchanged
function fitText(selector, maxHeight) {
  var $element = $(selector);
  var fontSize = parseInt($element.css('font-size'));
  var lineHeightFactor = parseInt($element.css('line-height')) / fontSize;

  $element.css({
      height: 'auto',
  });
  // Additional logic to adjust the font size based on maxHeight might be needed here
}

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