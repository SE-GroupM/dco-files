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

// Assuming you're using TimelineMax from GSAP (versions prior to 3)
var t1 = new TimelineMax({
  repeat: 5, // Adjust repeat count accordingly
  onComplete: function() {
    t1.seek("#row1_frame1"); // Attempting to seek to a label, ensure it's correctly named
  }
});

// label to identify the start of copy_frame_1 animation
t1.addLabel("row1_frame1") // Labels should not include the hash symbol

// fade in animation
.fromTo('#row1_frame1', 1.25, { lineHeight: 100, opacity: 0, ease: Linear.ease },{ lineHeight: 0, opacity: 1, ease: Linear.ease } ,1) // Corrected duration placement
.fromTo('#row2_frame1', 1.25, { top: 0, opacity: 0, ease: Linear.ease },{ top: 100, opacity: 1, ease: Linear.ease } ,1) // Corrected duration placement

// // fade in animation
// .fromTo('#row1_frame1', 1.25, { lineHeight: 100, opacity: 0, ease: Linear.ease },{ lineHeight: 0, opacity: 1, ease: Linear.ease } ,1) // Corrected duration placement
// .fromTo('#row2_frame1', 1.25, { lineHeight: -100, opacity: 0, ease: Linear.ease },{ lineHeight: 0, opacity: 1, ease: Linear.ease } ,1) // Corrected duration placement
// hold frame for 4 seconds - You might need another approach to hold, like setting a delay for the next animation
.to('#row1_frame1', 2, { y: 17, opacity: 1, ease: Linear.easeNone, delay: 0.5 }) // This will not "hold" but will immediately animate to this state over 2 seconds
// fade out animation over 1 second
.to('#row1_frame1', 0.3, { y: -17, opacity: 0, ease: Linear.easeNone }); // Correct usage of duration


  // Get the div element by its id
 var worldClickDiv = document.getElementById('creative_container');
  
 // Add a click event listener to the div
 worldClickDiv.addEventListener('click', function() {
   // Opens the specified URL in a new window or tab
   // window.open('');
 });
})
/*
 // Create a new TimelineMax instance
var tl = new TimelineMax();

// Initially set the opacity of the targets to 0
tl.set('#row1_frame1, #row2_frame1', { opacity:0 })

  // Animate #row1_frame1 to y: -7 and opacity: 1
  .to('#row1_frame1', 1.25, { y: -17, opacity:1, ease: "linear" })
  
  // Animate #row2_frame1 with the same duration and ease, starting at the same time as the previous animation
  .to('#row2_frame1', 1.25, { y: 17, opacity:1, ease: "linear" }, "-=1.25")
  
  // Animate #row1_frame2, also starting simultaneously
  .to('#row1_frame1', 1.25, { y: -17, opacity:0, ease: "linear" }, "-=1.25")
  
  // Finally, animate #row2_frame2, with the same settings
  .to('#row2_frame1', 1.25, { y: 17, opacity:0, ease: "linear" }, "-=1.25");

// Note: Adjust the y values as needed to match the desired separation distance
*/


