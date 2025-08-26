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
    $('#productName_1').html(local_content.productName_1.value);
    $('#productName_2').html(local_content.productName_2.value);
  
    var productName1_fontSize = local_content.productName1_fontSize.value;
    var productName2_fontSize = local_content.productName2_fontSize.value;
  
    // import content of price currency from placeholder
    let price_currency_content = local_content.price_currency_content.value;
    // If the tempalte should not use any price from product. Then append larger CSS on copy
    if (local_content.use2FramesCopy.value.toLowerCase() === 'yes') {
      $('#productName_1').addClass('largerCopy');
      $('#productName_2').addClass('largerCopy');
    }
  
    // If the text gets too big and needs to be adjusted manually
    if(productName1_fontSize != ''){
      $('#productName_1').remove('largerCopy');
      $('#productName_1').css({
        'font-size': parseInt(productName1_fontSize)+'px',
        'line-height': parseInt(productName1_fontSize)+'px',
      });
    }
    if(productName2_fontSize != ''){
      $('#productName_2').css({
        'font-size': parseInt(productName2_fontSize)+'px',
        'line-height': parseInt(productName2_fontSize)+'px',
      });
    }
    
  // assigning the sideplate the yello "tejp" image
  $("#sideplate").css("background-image","url(https://assets.lemonpi.io/a/k/c9bd7eb5-0224-4fae-9e2f-7005ff8114a9/Assets/Byggmax-2025/gul_tejp_980x600.png)");
  
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
  var useVideo = local_content.UseVideo.value;
  var videoAdjustmentTop = local_content.video_placement_topPosition.value;
  var playerBgColor = '#FFe632';
  // SEENTHIS variables
  // Define the video source and tracker variables
  var videoSrc = content.videoSrc.value;
  var videoTracker = content.videoTracker.value;
  var mutebutton_on_off = local_content.mutebutton_on_off.value;  // Define if to use mute button

  var ccVideo = local_content.video_placeholder.value; // get local video src
  if (useVideo.toLowerCase() === 'no') { // use single image
      // append img as background
      $(".player").css("background-image","url("+local_content.image_placeholder.value+")");
      $('.player').css({
        'position': 'absolute',
        'top': videoAdjustmentTop,
        'height': '100%',
      'background-color': playerBgColor,
      'background-repeat': 'no-repeat',
      'width': '100%',
      })
      

    } else{
      /////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////// Videon config //////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    
    // If we need to adjust video placement in wider formats
    if (local_content.video_placement_topPosition.value !== ''){
    
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
  
  
    var bannerWidth = '980';
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
  }

  //////////////////
  /// ANIMATIONS ///
  //////////////////

// Create a new timeline that repeats indefinitely (-1)
var tl = new TimelineMax({repeat: -1});

// Set initial opacity of both frames to 0
TweenMax.set('#productName_1, #productName_2',{ opacity: 0 });

// Animate the first product name
tl.to('#productName_1', 0.3, {opacity: 1, ease: Linear.easeNone}, 0) // Fade in
  .to('#productName_1', 0.3, {opacity: 0, ease: Linear.easeNone}, 3.2) // Fade out after 4 seconds

// Animate the second product name
  .to('#productName_2', 0.3, {opacity: 1, ease: Linear.easeNone}, 3.6) // Start fading in slightly after the first fades out
  .to('#productName_2', 0.3, {opacity: 0, ease: Linear.easeNone}, 5.7); // Fade out, completing the 6-second cycle

  if (useVideo.toLowerCase() === 'no') { // use single image aniamtion

  const animatePlayer = () => {
        const tl = new TimelineMax({ repeat: -1 }); // Infinite loop

        tl.to('#player', 15, { 
            x: -50, 
            ease: Linear.easeNone // Move left smoothly
        })
        .to('#player', 15, { 
            x: 0, 
            ease: Linear.easeNone // Move back to start smoothly
        });
    };

    // Start the animation
    animatePlayer();
}

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
  
