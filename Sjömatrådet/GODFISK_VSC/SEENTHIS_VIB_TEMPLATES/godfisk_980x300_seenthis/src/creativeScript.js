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

  function fitTextToContainer() {
    var container = $('#headline_text');  // The text container
    var headlineText = local_content.headline_text.value;  // Dynamic text input from your feed
    var minFontSize = 38;  // Minimum font size
    var maxFontSize = 50;  // Maximum font size
    var baseFontSize = 46;  // Base font size for an average-length text
    var characterLimit = 48;  // The character length at which to start reducing font size
    
    // Calculate the dynamic font size based on the length of the headline text
    var textLength = headlineText.length;
    var fontSize;

    if (textLength <= characterLimit) {
        // If the text is shorter than the limit, use the base size or a larger size
        fontSize = Math.min(maxFontSize, baseFontSize + (characterLimit - textLength) * 0.5);
    } else {
        // If the text is longer, scale down the font size based on text length
        fontSize = Math.max(minFontSize, baseFontSize - (textLength - characterLimit) * 0.5);
    }

    // Apply the calculated font size and the headline text
    container.text(headlineText);
    container.css({
        'font-size': fontSize + 'px',
        'color': headline_color,  // Dynamically set the color
        'text-align': 'left'  // Center-align the text (optional)
    });
}

// Call the function after the DOM is ready or after content changes
$(document).ready(function() {
    fitTextToContainer();
});

// Determine the state of the mute button based on mutebutton_on_off variable
if (mutebutton_on_off === 'on') {
  options.muteButton = true; // Enable mute if 'on'
} else if (mutebutton_on_off === 'off') {
  options.muteButton = false; // Disable mute if 'off'
}
});

