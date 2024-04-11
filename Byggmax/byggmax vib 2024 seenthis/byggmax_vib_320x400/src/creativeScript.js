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
  
    // Defining mute-button's appearence 
    var mutebutton_on_off = local_content.mutebutton_on_off.value;
     
    // Define the video source and tracker variables
    var videoSrc = content.videoSrc.value;
    var videoTracker = content.videoTracker.value;
    
    var currentPrice = local_content.currentPrice.value;
    var productName = local_content.productName.value;
    var logoPlaceholder = local_content.logoPlaceholder.value;
    // Defining mute-button's appearence 
    var mutebutton_on_off = local_content.mutebutton_on_off.value;
    
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

      ////////////////
    /// FUNCTIONS ///
  //////////////////

    //Check if price has sup element and append correct CSS class
  if (local_content.currentPrice.value.includes('<sup>')){
    $("#currentPrice").html(local_content.currentPrice.value + "<span class='priceCurrencySup'>kr/m</span>");
  } else {
    $("#currentPrice").html(local_content.currentPrice.value + "<span class='priceCurrency'>kr/m</span>");
  }

// Determine the state of the mute button based on mutebutton_on_off variable
if (mutebutton_on_off === 'on') {
  options.muteButton = true; // Enable mute if 'on'
} else if (mutebutton_on_off === 'off') {
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
  