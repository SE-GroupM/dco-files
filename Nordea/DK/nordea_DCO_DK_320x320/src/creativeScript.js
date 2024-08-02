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

  // Callback to retrieve the adset data
onLemonpiReady(function () {
  lemonpi.subscribe(function callback(content) {
  // Local variable for content
  var local_content = content;
  
  //Append background color
  $("#creative_container").css("background-color", (local_content.BG_Color.value));

  //Append logos
  $("#logo_1").css("background-image","url("+local_content.Logo.value+")");
  $("#logo_2").css("background-image","url("+local_content.Logo_2.value+")");

  //Append pulse if Use pulse is true
  if (local_content.Use_pulse.value = true) {
    $("#left_pulse").css("background-image","url("+local_content.Image_pulse.value+")");
    $("#right_pulse").css("background-image","url("+local_content.Image_pulse.value+")");
  } 

  //Append copy frame 1 and color
  $("#frame_1").html(local_content.Frame_1_Text.value);
  $("#frame_1").css("color", (local_content.Frame_1_Text_Color.value));
  //Append copy frame 2 and color
  $("#frame_2").html(local_content.Frame_2_Text.value);
  $("#frame_2").css("color", (local_content.Frame_2_Text_Color.value));
  //Append copy frame 3 and color
  $("#frame_3").html(local_content.Frame_3_Text.value);
  $("#frame_3").css("color", (local_content.Frame_3_Text_Color.value));

  //Append disclaimer copy and color if Use frame 4 is true
  if (local_content.Use_frame_4.value = true) {
    $("#frame_4").html(local_content.Frame_4_Text_Disclaimer.value);
    $("#frame_4").css("color", (local_content.Disclaimer_Color.value));
  } else {
    $("#frame_4").remove();
  }

  //Append cta copy and color
  $("#cta").html(local_content.Cta_Text.value);
  $("#cta").css("background-color", (local_content.Cta_BG.value));
  $("#cta").css("color", (local_content.Cta_Text_Color.value));

  //Append tagline and color
  $("#tagline").html(local_content.Tagline_Text.value);
  $("#tagline").css("color", (local_content.Frame_1_Text_Color.value));

  // Set the BG video source
  var BGvideoSource = '<video id="BG_video" autoplay width="320" height="320"><source src="' + local_content.Video_320x320.value + '" type="video/mp4"></video>';
  $("#bg_video").html(BGvideoSource);

  // Function to restart the BG video
  function restartBGVideo() {
    var video = document.getElementById('BG_video');
    video.currentTime = 0;
    video.play();
  }

  // Function for animation of content using frame 1
  function firstFrame() {
  var tl = new TimelineMax();
  TweenMax.set('#frame_2, #frame_3, #frame_4, #cta, #logo_2', { opacity: 0 });
  tl.fromTo('#frame_1', 0.3, {opacity: 0, ease: Linear.ease}, {opacity: 1, ease: Linear.ease}, 0) // Frame 1 in
    .to('#frame_1', 0.3, {opacity: 0, ease: Linear.ease}, 3) // Frame 1 out
    .to('#gradient', 0.3, {opacity: 0, ease: Linear.ease}, 3) // Frame 1 gradient out
    .to('#bg_video', 0.3, {opacity: 0, ease: Linear.ease}, 3) // Frame 1 video out
    .to('#logo_1', 0.3, {opacity: 0, ease: Linear.ease}, 3) // Frame 1 logo out
    .to('#left_pulse', 0.3, {opacity: 0, ease: Linear.ease}, 3) // Frame 1 left pulse out
    .to('#right_pulse', 0.3, {opacity: 0, ease: Linear.ease}, 3) // Frame 1 right pulse out
    .add(restartBGVideo, 0); // Reset BG video to start at 0
    return tl;
  }

  //Function for animation of content using frame 2
  function secondFrame() {
    var tl = new TimelineMax();
    tl.fromTo('#frame_2', 0.3, {opacity:0, ease: Linear.ease},{opacity:1, ease: Linear.ease}, 0) //Frame 2 in
    .fromTo('#cta', 0.3, {opacity:0, ease: Linear.ease},{opacity:1, ease: Linear.ease},0) //CTA in
    .fromTo('#logo_2', 0.3, {opacity:0, ease: Linear.ease},{opacity:1, ease: Linear.ease}, 0) //Logo 2 in
    .to('#tagline', 0.3, {color: local_content.Frame_2_Text_Color.value, ease: Linear.ease}, 0) //Frame 2 out
    .to('#frame_2', 0.3, {opacity:0, ease: Linear.ease}, 3.3) //Frame 2 out
    return tl;
  }

  //Function for animation of content using frame 3
  function thirdFrame() {
    var tl = new TimelineMax();
    tl.fromTo('#frame_3', 0.3, {opacity:0, ease: Linear.ease},{opacity:1, ease: Linear.ease}, 0) //Frame 3 in
    .to('#frame_3', 0.3, {opacity:0, ease: Linear.ease}, 3.3) //Frame 3 out
    return tl;
  }

  //Function for animation of content using frame 4 (Disclaimer)
  function lastFrame() {
    var tl = new TimelineMax();
    tl.fromTo('#frame_4', 0.3, {opacity:0, ease: Linear.ease},{opacity:1, ease: Linear.ease}, 0) //Frame 4 in
    .to('#frame_4', 0.3, {opacity:0, ease: Linear.ease}, 3.3) //Frame 4 out
    return tl;
  }

  //If Use frame 4 is true, build timeline with firstFrames and lastFrame, else build timeline using firstFrames
  if (local_content.Use_frame_4 = true) {
    var maintl = new TimelineMax({repeat:-1});
    maintl
      .add(firstFrame(3))
      .add(secondFrame(6))
      .add(thirdFrame(9))
      .add(lastFrame(12));
  } else {
    var maintl = new TimelineMax({repeat:-1});
    maintl
    .add(firstFrame(3))
    .add(secondFrame(6))
    .add(thirdFrame(9))
    }
  });

  //Append exit url to creative container
  document.getElementById('creative_container').onclick = () =>
  window.dispatchEvent(
      new CustomEvent('lemonpi.interaction/click', {
      detail: {
          placeholder: ['Landingpage'],
      }
    })
  );
});