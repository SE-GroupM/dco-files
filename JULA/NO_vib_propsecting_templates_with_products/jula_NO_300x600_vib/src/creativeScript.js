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
  const content = event.detail.content // get content placeholders from Choreograph Adsets
  const source = event.detail.source
});

// Callback to retrieve the adset data
onLemonpiReady(function () {
  lemonpi.subscribe(function callback(content) {

    //Local content variable
    var local_content = content;

  // World click event caller
  $('#worldClick').click(onClick);

    //Background color of container
    var bgColor = local_content.bgColor.value;
    $('#creative_container').css({
      'background-color': bgColor,
    })

     // CTA placeholders from CC
     var ctaText = local_content.ctaText.value;
     $('#ctaText').html(ctaText);
     $('#ctaText').css({
       'background-color': local_content.ctaBgColor.value,
       'color': local_content.ctaTextColor.value,
     });
    

    //Text color of campaignTrext name
    var campaigntTextColor = local_content.productNameColor.value;

    // Controlls styling and content of campaign text/header text
    var campaignText = local_content.campaignText.value;
    $('#campaignText').html(campaignText)
    $('#campaignText').css({
       'color': campaigntTextColor,
    })
    fitText($('#campaignText'),20)

     /////////////////////////////////////////////////////////////////////////////////////////////
   ///////////////////////////////// Videon config //////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  // SEENTHIS variables
  // Define the video source and tracker variables
  var videoSrc = content.videoSrc.value;
  var videoTracker = content.videoTracker.value;
  var mutebutton_on_off = local_content.mutebutton_on_off.value;  // Define if to use mute button

  var ccVideo = local_content.video_placeholder.value; // get local video src
 
  var bannerWidth = 'auto';
  var bannerHeight = '400';

  // Check if campaignText is empty and adjust bannerHeight and .logo position
if (!content.campaignText.value || content.campaignText.value.trim() === "") {
  bannerHeight = '500'; // Adjust bannerHeight if campaignText is empty

  // Adjust the top value of .logo
  const ctaElement = document.querySelector('#ctaText');
  if (ctaElement) {
    ctaElement.style.top = "550px";
  }
}

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
  } else {
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
        if ($element.height() <= maxHeight || fontSize <= 26) {
            clearInterval(resizeText);
        }

        $element.css({
            fontSize: fontSize + 'px',
            lineHeight: (fontSize * lineHeightFactor) + 'px',
        });

        fontSize--;
    }, 0);
  }

  // Append click to product box
  function onClick (event) {
      return window.dispatchEvent(
        new CustomEvent('lemonpi.interaction/click', {
          detail: {
            placeholder: ['worldClick'],
          }
      }));
    }
  });
});
