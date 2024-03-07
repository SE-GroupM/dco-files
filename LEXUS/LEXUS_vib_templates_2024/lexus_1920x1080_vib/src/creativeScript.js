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
  //Append copy to frame 2
  $("#main_copy").html(local_content.main_copy.value);
  //Append font size and line height to main_copy
  $(".main_copy").css({"font-size": local_content.maincopy_fontsize.value, "line-height": local_content.maincopy_fontsize.value});
  //Append copy to frame 2
  $("#sub_copy").html(local_content.sub_copy.value);
  //Append font size and line height to main_copy
  $(".sub_copy").css({"font-size": local_content.subcopy_fontsize.value, "line-height": local_content.subcopy_fontsize.value});
  //Append sub_copy 
  $("#cta").html(local_content.cta_copy.value);
  //Append exit_url 
  $("#exit_url").html(local_content.exit_url.value);
  //Append font size for cta
  $("#cta").css("font-size", local_content.cta_fontsize.value);
  //Append copy to frame 2
  $("#bg_color").css(local_content.bg_color.value);
  //"Details" appended 
  $("#details").html(local_content.details.value);
  //"Details_content" appended 
  $("#details_content").html(local_content.details_content.value);
 
  //Append logo image to logo div    
   var bg_color = local_content.bg_color.value;
   //Append container width based on title image
    $('#bg_color').css({
    'background-color': bg_color,
    });
    //Append logo image to logo div    
    $("#logo_source").css("background-image","url("+local_content.logo_source.value+")");

    var mutebutton_on_off = local_content.mutebutton_on_off.value;
    // Define the video source and tracker variables
    var videoSrc = local_content.videoSrc.value;
    var videoTracker = local_content.videoTracker.value;
  // World click event caller
  $('#worldClick').click(onClick);
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

      ////////////////
    /// FUNCTIONS ///
  //////////////////

// Determine the state of the mute button based on mutebutton_on_off variable
if (mutebutton_on_off === 'on') {
  options.muteButton = true; // Enable mute if 'on'
} else if (mutebutton_on_off === 'off') {
  options.muteButton = false; // Disable mute if 'off'
}
});

TweenMax.set('#details_bg', {autoAlpha:0});

$('#details')
.on('mouseenter touchstart', onUserEnter)
.on('mouseleave touchend', onUserLeave);

function onUserEnter() {
  TweenMax.fromTo('#details_bg', 0.2, { autoAlpha: 0}, { autoAlpha: 0.85})  
}

function onUserLeave() {
  TweenMax.fromTo('#details_bg', 0.2, { autoAlpha: 1}, { autoAlpha: 0})
}
var mt = new TimelineMax({repeat: -1});

function onClick (event) {
  return window.dispatchEvent(
    new CustomEvent('lemonpi.interaction/click', {
      detail: {
        placeholder: 'exit_url'
      }
  }));
}