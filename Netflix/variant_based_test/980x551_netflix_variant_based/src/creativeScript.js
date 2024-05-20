/**
 * Template Name
 * @Owner Developer Name 
 * @Date
 */

function onLemonpiReady(cb) {
  if (cb) {
      var loadLemonpiTimerId = setInterval(function() {
          if (window.lemonpi) {
              clearInterval(loadLemonpiTimerId);
              cb();
          }
      }, 0);
  }
}

window.addEventListener('lemonpi.content/ready', event => {
  
  const content = event.detail.content
  // Local content declaration
  const local_content = content;
  // Boolean for using video or not
  let useVideo = (local_content.use_video.value.toLowerCase() === 'true');
  // Append main copy
  $('#main_copy').html(local_content.Message.value);
  // Append Cta copy and arrow
  $('#cta_copy').html(local_content.Cta_copy.value);
  //Container size
  var panelSize = parseInt(local_content.panel_size.value);  
  // Logo source from CC assemble
  var logo_source = "https://assets.lemonpi.io/a/1152/5863bb1b98276ea402943702e5f240d5.svg";  
  // Logo append
  $('#logo').css({
    content: 'url('+ logo_source + ')',
  });
  //Variables for video
  var videoSrc = local_content.video_src.value;
  var videoTracker = local_content.video_tracker.value;
  // World click event caller
  $('#worldClick').click(onClick);

    /////////////////////
    //// ANIMATIONS /////
    ////////////////////
    
// Create a new timeline with initial delay
var tl = new TimelineMax({ repeat: 0, delay: 0 });

// Animate #leftImage to zoom in and move upwards
tl.fromTo('#leftImage', 3, { scale: 1, y: 0 }, { scale: 1.1, y: -20, ease: Power2.easeOut }, 0)
  // Smooth and slow fade and zoom in #main_copy, starts 0.2 seconds after #leftImage
  .fromTo('#main_copy', 1.6, { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, ease: Power2.easeOut }, 0.5)
  // Fades in #cta_copy and #logo over 0.6 seconds, starts halfway through the #main_copy animation
  .to('#cta_copy, #logo', 0.6, { autoAlpha: 1 }, "-=1.6");

    // Check if we're going to dislay video or images 
    if (useVideo) {

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
        loopCount: 1,
        muteButton: true,
        autoplay: true,
    };
  } else {
      // Add image of title instead
      $("<div>", {
          'id' : 'title_image',
          'class': "title_image",

          css: {
            content: 'url('+ local_content.image_asset_wide.value + ')',
              'position': 'absolute',
              'width': 'auto',
              'height': '551px',
              'top': '0px',
              'left': '0px',
              'display':'inline-block',
          }
      }).appendTo(leftImage);

    //Append container width based on title image
   $('#panel_container').css({
        'width': panelSize,
    });
  }

function onClick (event) {
    return window.dispatchEvent(
      new CustomEvent('lemonpi.interaction/click', {
        detail: {
          placeholder: 'exit_url'
        }
    }));
  }
});