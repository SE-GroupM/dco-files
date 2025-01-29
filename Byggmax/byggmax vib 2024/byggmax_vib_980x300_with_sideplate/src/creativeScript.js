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
  $('#copyFrame1').html(content.productName_1.value);
  $('#copyFrame2').html(content.productName_2.value);
  
   // If the tempalte should not use any price from product. Then append larger CSS on copy
   if (local_content.use2FramesCopy.value.toLowerCase() === 'yes') {
     $('#productName_1').addClass('largerCopy');
     $('#productName_2').addClass('largerCopy');
   }

  // Defining mute-button's appearence 
  var mutebutton_on_off = local_content.mutebutton_on_off.value;
  //import content of price currenly from placeholder
  let price_currency_content = local_content.price_currency_content.value;

  // variable holding textcolor from adset
  var setTextColors = local_content.textColor.value;
  // Select multiple elements with differnet classes
  var allElements = document.querySelectorAll('.currentPrice, .productName_1, .productName_2');

  // Loop through the Nodelist and add same css class to each element
  allElements.forEach(function(element) {
    element.classList.add('textColor_css');
  });

  if (setTextColors && setTextColors.trim() !== '') {
    // If setTextColors has a value, apply the CSS color
    $('.textColor_css').css({
      'color': setTextColors,
    });
  }

    // If we need to adjust video placement in wider formats
    if (local_content.video_placement_topPosition.value !== ''){
      
      var videoAdjustmentTop = local_content.video_placement_topPosition.value;
      var playerBgColor = '#FFe632'
      // Using querySelector
      const videoElement = document.querySelector('player');
      if (!isNaN(videoAdjustmentTop)) {
        videoAdjustmentTop += 'px';
      }
      
      $('.player').css({
        'position': 'absolute',
        'top': videoAdjustmentTop,
       'background-color': playerBgColor,
      })
    }

  /////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////// Videon config //////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  // SEENTHIS variables
  // Define the video source and tracker variables
  var videoSrc = content.videoSrc.value;
  var videoTracker = content.videoTracker.value;
  var mutebutton_on_off = local_content.mutebutton_on_off.value;  // Define if to use mute button

  var ccVideo = local_content.video_placeholder.value; // get local video src
 
  var bannerWidth = '600';
  var bannerHeight = '';

  if (ccVideo != '') {
    // Set the BG video source
    var BGvideoSource = '<video id="player" autoplay muted playsinline loop width="'+bannerWidth+'" height="'+bannerHeight+'"><source src="' + ccVideo + '" type="video/mp4"></video>'; 
  
    // Append video locally from CC
    $("#player").html(BGvideoSource);
    // Function to restart videos
    function restartVideo(videoId) {
      var videoElement = document.getElementById(videoId);
      videoElement.currentTime = 0;
      videoElement.play();
    }
    //restartVideo("video_container"); // use if you need to restart video from somewhere
  }else {
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

    // Determine the state of the mute button based on mutebutton_on_off variable
    if (mutebutton_on_off == 'on') {
      options.muteButton = true; // Enable mute if 'on'
    } else if (mutebutton_on_off == 'off') {
      options.muteButton = false; // Disable mute if 'off'
    }
  } // end of if-else

  //////////////////
  /// ANIMATIONS ///
  //////////////////

  // Create a new timeline that repeats indefinitely (-1)
  var tl = new TimelineMax({repeat: -1});

  // Set initial opacity of both frames to 0
  TweenMax.set('#productName_1, #productName_2, #copyFrame1, #copyFrame2',{ opacity: 0 });

  // Animate the first product name
  tl.to('#productName_1, #copyFrame1', 0.3, {opacity: 1, ease: Linear.easeNone}, 0) // Fade in
    .to('#productName_1, #copyFrame1', 0.3, {opacity: 0, ease: Linear.easeNone}, 3.2) // Fade out after 4 seconds

  // Animate the second product name
  .to('#productName_2, #copyFrame2', 0.3, {opacity: 1, ease: Linear.easeNone}, 3.6) // Start fading in slightly after the first fades out
  .to('#productName_2, #copyFrame2', 0.3, {opacity: 0, ease: Linear.easeNone}, 5.7); // Fade out, completing the 6-second cycle

  ////////////////
  /// FUNCTIONS ///
  //////////////////

 // Check if price has sup element and append correct CSS class
if (local_content.currentPrice.value.includes('<sup>')){
  $("#currentPrice").html(local_content.currentPrice.value + "<span class='priceCurrencySup'>" + price_currency_content + "</span>");
} else {
  $("#currentPrice").html(local_content.currentPrice.value + "<span class='priceCurrency'>" + price_currency_content + "</span>");
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
  
