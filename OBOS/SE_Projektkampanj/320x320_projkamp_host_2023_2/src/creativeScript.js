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


  // Variable holding collection values
  var propertyCollection = content.property.value;
  var cityName = propertyCollection[0].property_name.value;
  //Append Event details
  var eventDetail = propertyCollection[0].property_event_details.value;
  var subText = content.subCopy.value
  //Append Property title
  var propertyTitle = propertyCollection[0].property_title.value;
  //Append Cta copy
  var ctaCopy = content.ctaCopy.value;
  //Append images
  var bgImage = propertyCollection[0].property_image.value;
  var logoImg = content.logo.value;
  var houseIcon = content.houseImg.value;

  // Append villkors copy
  var villkorCopy = content.villkor.value;

  //Append Click url
  var clickUrl = propertyCollection[0].click.value;

  var appendCss = 30;
  var ctaTop = 240;
  var brfNameTop = 154;
  var sublineTop = 200;
  var headlineTop = 176;
  var iconTop = 151;

  var headCopyPlaceholder = $('#headline');
  headCopyPlaceholder.append(cityName);
  fitText(headCopyPlaceholder, 40);

  var subCopyPlaceholder = $('#subline');
  subCopyPlaceholder.append(subText);

  var brfNamePlaceholder = $('#brfName');
  brfNamePlaceholder.append(propertyTitle);

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
    top: headlineTop + appendCss + 'px',
  })
  $('#subline').css({
    top: sublineTop + appendCss + 'px',
  })
  $('#brfName').css({
    top: brfNameTop +  appendCss + 'px',
  })
  $('#ctaBg, #ctaTxt').css({
    top: ctaTop + appendCss + 'px',
  })

  ////////////////////
  // ANIMATIONS //
  ///////////////////

  //Animation on rectangle and text
var introAnimation = gsap.timeline({repeat: -1, repeatDelay:1})
introAnimation.from('#rectangle_darkblue', 0.5, { y:100, autoAlpha: 1}, 0.2 , 0.5)
introAnimation.from('#rectangle_lightblue', 0.5, { x:-300, autoAlpha: 1}, 0.2 , 0.8)
introAnimation.from('#copy', 0.5, {autoAlpha: 0 }, 0.2 , 1)
introAnimation.to('#rectangle_darkblue,#rectangle_lightblue, #copy', 0.2, {autoAlpha: 0 }, 6 , 0.5)
//introAnimation.from('#rectangle_lightblue', 0.5, { x:-300, autoAlpha: 1}, 0.2 , 0.5)
//introAnimation.from('#copy', 0.5, {autoAlpha: 1 }, 0.2 , 1)


//Animation on background image
//new TimelineMax({ repeat:-1, yoyo:true })
//.fromTo('#bgImage', 8, {scale: 1}, {scale: 1.06}, 1); 

// Animation on cta button
var ctaAnimation = gsap.timeline({repeat:-1, repeatDelay:1})
ctaAnimation.fromTo('#ctaBg, #ctaTxt', {scale: 1}, {scale: 0.95, duration: 0.25, yoyo: true, repeat: 1},2);

var mainTimeLine = gsap.timeline()
mainTimeLine.add(function(){
    introAnimation.play();
  })
  mainTimeLine.add(function(){
  ctaAnimation.play();
  }, 6)

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
})


 // Get the div element by its id
 var worldClickDiv = document.getElementById('worldClick');
  
 // Add a click event listener to the div
 worldClickDiv.addEventListener('click', function() {
   // Opens the specified URL in a new window or tab
   //window.open('');
 });
  