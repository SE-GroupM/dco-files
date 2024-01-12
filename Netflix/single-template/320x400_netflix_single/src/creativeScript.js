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
  const content = event.detail.content
  // Local content declaration
  const local_content = content;
  // Collection variable for titles
  let titles = local_content.titles.value;
  // Boolean for using video or not
  let useVideo = JSON.parse(local_content.useVideo.value);   

  // Append main copy
  $('#main_copy').html(local_content.main_copy.value)
  // Append Cta copy and arrow
  $('#cta_copy').html(local_content.cta_copy.value)
 //Container size
 var panelSize = parseInt(local_content.panel_size.value);
  

  /////////////////////
  //// ANIMATIONS /////
  ////////////////////

  new TimelineMax({ repeat: 0, delay: 0.2 }) // starts the entire timeline after a 1.5-second delay
  .to('#main_copy', 0.3, { autoAlpha: 1 }) // fades in #imgCopy over 1.5 seconds
  .to('#cta_copy', 0.3, { autoAlpha: 1 }) // fades in #imgCopy over 1.5 seconds
  .fromTo('#main_copy', 0.2, { scale: 1 }, { scale: 1.1, repeat: 1, yoyo: true, ease: Power1.easeInOut },2); // "inflates" and "deflates" #subCopy
  
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

  //Variables for video
  var videoSrc = titles[0].video_src.value;
  var videoTracker = titles[0].video_tracker.value;

} else {
  // Add image of title instead
  $("<div>", {
      'id' : 'leftImage',
      'class': "leftImage",

      css: {
          content: 'url('+ titles[0].title_cover_2.value + ')',
          'position': 'absolute',
          'width': '320px',
          'height': 'auto',
          'top': '0px',
          'left': '0px',
          'display':'inline-block',
      }
  }).appendTo('#leftImage');


  //Append container width based on title image
  $('#panel_container').css({
    'height': panelSize,
 });

// select the first slot in array from the beginning
currentTitleObject = titles[0];
currentIndexClick = 0;
}
});