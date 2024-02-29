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
  //Append font size and line height on copy frames
  $(".copy_frames").css({"font-size": local_content.copy_fontsize.value, "line-height": local_content.copy_fontsize.value});
 //Append copy to frame 1
  $("#copy_frame_1").html(local_content.frame_1_copy.value);
  //Append copy to frame 2
  $("#copy_frame_2").html(local_content.frame_2_copy.value);
  //Append copy to cta
  $("#cta").html(local_content.cta_copy.value);
  //Append font size for cta
  $("#cta").css("font-size", local_content.cta_fontsize.value);
  //Append background image to image div    
  $("#bg_image").css("background-image","url("+local_content.image_source.value+")");
  //Append logo image to logo div    
  $("#logo").css("background-image","url("+local_content.logo_source.value+")");

  /////////////////////
//// ANIMATIONS /////
////////////////////

// Animation loop timeline setup
var t1 = new TimelineMax({
  repeat: 5,  // Adjust repeat count accordingly
  onComplete: function() {
      t1.seek("#copy_frame_1");  // This will make the timeline stop at #copy_frame_1 animation
  }
  });

  // label to identify the start of copy_frame_1 animation
  t1.addLabel("#copy_frame_1")

  // Start animation by setting initial lineHeight to 0
  .set('#copy_frame_1, #copy_frame_2', { lineHeight: "7px" })

  // fade in animation 
  .to('#copy_frame_1', 0.3, { x:0 , opacity:1 , lineHeight: local_content.copy_fontsize.value, duration: 1.25, ease: Linear.ease })
  // hold frame for 4 seconds
  .to('#copy_frame_1', 2, { opacity:1, lineHeight: local_content.copy_fontsize.value, ease: Linear.easeNone , delay:0.5 })
  // fade out animation over 1 second
  .to('#copy_frame_1', 0.3, { opacity:0 , lineHeight: "9px", ease: Linear.easeNone })

  // fade in animation - main copy over 1 second
  .to('#copy_frame_2', 0.3, { x:0 , opacity:1 , lineHeight: local_content.copy_fontsize.value, ease: Linear.easeNone })
  // hold frame for 4 seconds
  .to('#copy_frame_2', 2, { opacity:1, lineHeight: local_content.copy_fontsize.value, ease: Linear.easeNone , delay:0.5 })
  // fade out animation over 1 second
  .to('#copy_frame_2', 0.3, { opacity:0 , lineHeight: "9px", ease: Linear.easeNone })

  // Get the div element by its id
 var worldClickDiv = document.getElementById('creative_container');
  
 // Add a click event listener to the div
 worldClickDiv.addEventListener('click', function() {
   // Opens the specified URL in a new window or tab
   // window.open('');
 });
})
  