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
  $('#productName_1').html('<p>'+local_content.productName_1.value+'</p>');
  $('#productName_2').html('<p>'+local_content.productName_2.value+'</p>');
  
  var copyContainerTopValue = parseInt(local_content.copyContainter_top.value);
  $('#copyContainer').css({
      'top': copyContainerTopValue + 'px',
  });

  // import content of price currency from placeholder
  let price_currency_content = local_content.price_currency_content.value;
  // If the tempalte should not use any price from product. Then append larger CSS on copy
  if (local_content.use2FramesCopy.value.toLowerCase() === 'yes') {
    //$('#productName_1').addClass('largerCopy');
    //$('#productName_2').addClass('largerCopy');
  }
  // assigning the sideplate the yello "tejp" image
  $("#sideplate").css("background-image","url(https://assets.lemonpi.io/a/k/c9bd7eb5-0224-4fae-9e2f-7005ff8114a9/Assets/Byggmax-2025/gul_tejp_980x600.png)");
  
  // variable holding textcolor from adset
  var setTextColors = local_content.textColor.value;
  // Select multiple elements with differnet classes
  var allElements = document.querySelectorAll('.currentPrice, .productName_1, .productName_2');

  var useVideo = local_content.UseVideo.value;
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
 
 
  var bannerWidth = '320';
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
    if (  == 'on') {
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
          y: -30, 
          ease: Linear.easeNone // Move left smoothly
      })
      .to('#player', 15, { 
          y: 0, 
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

// -------------------------------------------------------------------------------------
    // --------------------------------- Text resize start ---------------------------------
    // -------------------------------------------------------------------------------------
    const elements = [
      {
        id: "productName_1",
        maxContainerWidth: 280,
        maxContainerHeight: 60,
        maxFontSize: 28,
        maxLineHeight: 1.0, 
        textSelector: "p",
      },
      {
        id: "productName_2",
        maxContainerWidth: 280,
        maxContainerHeight: 60,
        maxFontSize: 28,
        maxLineHeight: 1.0, 
        textSelector: "p",
      },
      // Add more elements with their respective properties
    ];
    
    // Modified function to resize a single element with retry limit
    function resizeElement(element, retryCount = 0) {
      const maxRetries = 3; // Maximum number of retry attempts
      const el = document.getElementById(element.id);
      if (!el) {
        console.error(`Element with ID '${element.id}' not found.`);
        return;
      }
    
      const textElement = el.querySelector(element.textSelector);
      if (!textElement || textElement.innerHTML.trim() === "") {
        console.warn(`Text element not found or empty in '${element.id}'.`);
        if (retryCount < maxRetries) {
          setTimeout(() => resizeElement(element, retryCount + 1), 100);
        } else {
          console.error(`Failed to resize '${element.id}' after ${maxRetries} retries.`);
        }
        return;
      }
    
      el.style.maxHeight = `${element.maxContainerHeight}px`;
      el.style.maxWidth = `${element.maxContainerWidth}px`;
    
      let fontSize = element.maxFontSize;
      textElement.style.fontSize = `${fontSize}px`;
      textElement.style.lineHeight = `${element.maxLineHeight}`;
    
      const minFontSize = 4; // Example minimum font size
      while (
        (textElement.scrollHeight > element.maxContainerHeight ||
          textElement.scrollWidth > element.maxContainerWidth) &&
        fontSize > minFontSize
      ) {
        fontSize--;
        textElement.style.fontSize = `${fontSize}px`;
        textElement.style.lineHeight = `${element.maxLineHeight * fontSize}px`;
      }
    
      if (
        fontSize === minFontSize &&
        (textElement.offsetHeight > element.maxContainerHeight ||
          textElement.offsetWidth > element.maxContainerWidth)
      ) {
        console.warn(
          `Text in '${element.id}' cannot fit within the container at min font size.`
        );
      }
    
      //console.log(`Final font size for '${element.id}': ${fontSize}px`);
    }
    
    // Function to resize all elements remains unchanged
    function resizeElements() {
      elements.forEach((element) => {
        resizeElement(element);
      });
    }
    
    document.fonts.ready.then(function() {
      resizeElements();
    });



function onClick (event) {
  return window.dispatchEvent(
    new CustomEvent('lemonpi.interaction/click', {
      detail: {
        placeholder: 'worldClick'
      }
  }));
}

});
  
