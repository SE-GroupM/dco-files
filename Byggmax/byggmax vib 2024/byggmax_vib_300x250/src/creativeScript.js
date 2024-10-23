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

window.addEventListener('lemonpi.content/ready', event => {
  const content = event.detail.content;
  //Variable for local content
  var local_content = content;

    // World click event caller
    $('#worldClick').click(onClick);
    $('#copyFrame1').html(content.copyFrame1.value);
    $('#copyFrame2').html(content.copyFrame2.value);
    $('#asteriskText').html(content.asteriskText.value);
     
    // Define the video source and tracker variables
    var videoSrc = content.videoSrc.value;
    var videoTracker = content.videoTracker.value;
  
    // Defining mute-button's appearence 
    var mutebutton_on_off = local_content.mutebutton_on_off.value;
    //import content of price currenly from placeholder
    let price_currency_content = local_content.price_currency_content.value;

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
        autoplay: true,
        muteButton: false,
    };

     //////////////////
    /// ANIMATIONS ///
   //////////////////

// Create a new timeline that repeats indefinitely (-1)
var tl = new TimelineMax({repeat: -1});

// Set initial opacity of both frames to 0
TweenMax.set('#productName_1, #productName_2', { opacity: 0 });

// Animate the first product name
tl.to('#productName_1', 0.3, {opacity: 1, ease: Linear.easeNone}, 0) // Fade in
  .to('#productName_1', 0.3, {opacity: 0, ease: Linear.easeNone}, 3.2) // Fade out after 4 seconds

// Animate the second product name
  .to('#productName_2', 0.3, {opacity: 1, ease: Linear.easeNone}, 3.6) // Start fading in slightly after the first fades out
  .to('#productName_2', 0.3, {opacity: 0, ease: Linear.easeNone}, 5.7); // Fade out, completing the 6-second cycle

      ////////////////
    /// FUNCTIONS ///
  //////////////////

// Check if price has sup element and append correct CSS class
if (local_content.currentPrice.value.includes('<sup>')){
  $("#currentPrice").html(local_content.currentPrice.value + "<span class='priceCurrencySup'>" + price_currency_content + "</span>");
} else {
  $("#currentPrice").html(local_content.currentPrice.value + "<span class='priceCurrency'>" + price_currency_content + "</span>");
}

// Determine the state of the mute button based on mutebutton_on_off variable
if (mutebutton_on_off == 'on') {
  options.muteButton = true; // Enable mute if 'on'
} else if (mutebutton_on_off == 'off') {
  options.muteButton = false; // Disable mute if 'off'
}

function onClick (event) {
  return window.dispatchEvent(
    new CustomEvent('lemonpi.interaction/click', {
      detail: {
        placeholder: 'worldClick'
      }
  }));
}

});
  
