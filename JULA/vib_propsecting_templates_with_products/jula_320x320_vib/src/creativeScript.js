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
        muteButton: true,
    };

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
        if ($element.height() <= maxHeight || fontSize <= 8) {
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
