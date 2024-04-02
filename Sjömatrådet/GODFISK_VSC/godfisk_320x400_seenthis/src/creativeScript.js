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

     //////////////////
    /// VARIABLES ///
  //////////////////
      
  // Local variable for hodling all daa from adset/feed
  var local_content = content;
        
  var headline_text = local_content.headline_text.value;
  var cta_text = local_content.cta_text.value;
  var logoImg = content.logo.value;
  var mutebutton_on_off = local_content.mutebutton_on_off.value;
  var headline_color = local_content.headline_color.value;
  var cta_background = local_content.cta_background.value;
  var background_color = local_content.background_color.value;

// Define the video source and tracker variables
var videoSrc = local_content.videoSrc.value;
var videoTracker = local_content.videoTracker.value;

    //Video player 
    var e = document.createElement('script');
    e.src = 'https://video.seenthis.se/v2/player/74/player.js';
    e.onload = function(){
    var player = new SeenthisPlayer('.player', videoSrc, videoTracker, options); 
    };
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(e, s);

     //Options for video script
    var options = {
        loop: true,
        loopCount: 3,
        autoplay: true,
        muteButton: false,
    };

           //Append container width based on title image
   $('#headline_text').css({
    'color': headline_color,
    });

    $('#cta').css({
      'background-color': cta_background,
    });

    $('#panel_container').css({
      'background-color': background_color,
    });

      /////////////////
    /// FUNCTIONS ///
  //////////////////

// Determine the state of the mute button based on mutebutton_on_off variable
if (mutebutton_on_off === 'on') {
  options.muteButton = true; // Enable mute if 'on'
} else if (mutebutton_on_off === 'off') {
  options.muteButton = false; // Disable mute if 'off'
}
});

