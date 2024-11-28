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

  //import content of price currenly from placeholder
  let price_currency_content = local_content.price_currency_content.value;

  /////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////// VIDEO PLAYER and FUNCTIONS ///////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  var videoPlaceholder = local_content.video_placeholder.value;
  // Set the BG video source
  var BGvideoSource = '<video id="BG_video" autoplay muted playsinline loop width="250" height="600"><source src="' + videoPlaceholder + '" type="video/mp4"></video>'; 

  if (videoPlaceholder !== "") {
    //Append video
    $("#video_container").html(BGvideoSource);
    // Function to restart videos
    function restartVideo(videoId) {
      var videoElement = document.getElementById(videoId);
      videoElement.currentTime = 0;
      videoElement.play();
    }
    //restartVideo("video_container"); // use if you need to restart video from somewhere
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
  
