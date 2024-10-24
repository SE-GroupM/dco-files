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

  // Define the video source and tracker variables
  var videoSrc = content.videoSrc.value;
  var videoTracker = content.videoTracker.value;

  // Defining mute-button's appearence 
  var mutebutton_on_off = local_content.mutebutton_on_off.value;
  //import content of price currenly from placeholder
  let price_currency_content = local_content.price_currency_content.value;


  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  var videoPlaceholder = local_content.video_placeholder.value;

  if (videoPlaceholder !== ''){

      // Select the player element where the video will be loaded
      var playerElement = document.querySelector('.player');

      // Check if the playerElement exists
      if (!playerElement) {
        console.error('Player element not found!');
        return;
      }

      // Create a video element dynamically
      var videoElement = document.createElement('video');
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('autoplay', '');
      videoElement.setAttribute('muted', '');
      videoElement.setAttribute('loop', '');
      videoElement.src = videoPlaceholder; // Set the video source

      var setVideoElement = document.querySelector("#creative_container > div.player > video");
      if (setVideoElement) {
        setVideoElement.style.width = "100%";
      }
      // Optionally, add controls to the video (if desired)
      //videoElement.setAttribute('controls', ''); // Uncomment if you want controls

      // Append the video element to the player container
      playerElement.appendChild(videoElement);

      //console.log('Video element created and appended. Source set to:', videoElement.src);

      // Add error handling for the video
      videoElement.addEventListener('error', function(event) {
        console.error('Error occurred while trying to play the video:', event);
      });

      // Check when the metadata is loaded
      videoElement.addEventListener('loadedmetadata', function() {
        
        videoElement.play(); // Automatically play once metadata is loaded (optional)
      });

      // Function to make the video fullscreen
      function openFullscreen() {
        if (videoElement.requestFullscreen) {
          videoElement.requestFullscreen();
        } else if (videoElement.mozRequestFullScreen) { // Firefox
          videoElement.mozRequestFullScreen();
        } else if (videoElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
          videoElement.webkitRequestFullscreen();
        } else if (videoElement.msRequestFullscreen) { // IE/Edge
          videoElement.msRequestFullscreen();
        }
      }

      // Play video and enter fullscreen on user interaction
      videoElement.addEventListener('play', function() {
        //openFullscreen();
      });

      // Add a play button to trigger video play and fullscreen (if needed)
      var playButton = document.createElement('button');
      playButton.innerHTML = 'Play Video';
      playButton.addEventListener('click', function() {
        if (videoElement.paused) {
          console.log('videon verkar vara pausad...')
          videoElement.play();
          openFullscreen();
        } else {
          videoElement.pause();
        }
      });
      //playerElement.appendChild(playButton); // Append play button (optional)

      // Log when the video is supposed to start playing
      videoElement.addEventListener('playing', function() {
        //console.log('Video is playing...');
      });

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
  } // end of else-statement

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
  
