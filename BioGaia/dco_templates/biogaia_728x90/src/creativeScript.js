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
  
  //Variables for copy
  var preCopy = local_content.copy_frame_1.value;
  var store = local_content.department_store.value;
    
  //Append copy to div
  $("#copy").html(preCopy + '<br>' + store + '<br><small>Subject to availability</small>');

  //Variables for video
  var videoSrc = local_content.video_id.value;
  var videoTracker = local_content.video_tracker.value;

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


  //Append exit url to creative container
  document.getElementById('creative_container').onclick = () =>
  window.dispatchEvent(
      new CustomEvent('lemonpi.interaction/click', {
      detail: {
          placeholder: ['exit_url'],
      }
    })
  );

});
  
  