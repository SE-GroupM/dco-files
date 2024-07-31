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

  //Append pulse
  $("#left_pulse").css("background-image","url("+local_content.Image_pulse.value+")");
  $("#right_pulse").css("background-image","url("+local_content.Image_pulse.value+")");

 //Append copy frames and colors
  $("#frame_1").html(local_content.Frame_1_Text.value);
  $("#frame_1").css("color", (local_content.Frame_1_Text_Color.value));
  $("#frame_2").html(local_content.Frame_2_Text.value);
  $("#frame_2").css("color", (local_content.Frame_2_Text_Color.value));
  $("#frame_3").html(local_content.Frame_3_Text.value);
  $("#frame_3").css("color", (local_content.Frame_3_Text_Color.value));
  //Append copy disclaimer and color
  $("#frame_4").html(local_content.Frame_4_Text_Disclaimer.value);
  $("#frame_4").css("color", (local_content.Disclaimer_Color.value));
  //Append cta copy and color
  $("#cta").html(local_content.Cta_Text.value);
  $("#cta").css("background-color", (local_content.Cta_BG.value));
  $("#cta").css("color", (local_content.Cta_Text_Color.value));
  //Append tagline and color
  $("#tagline").html(local_content.Tagline_Text.value);
  $("#tagline").css("color", (local_content.Frame_1_Text_Color.value));

  var videoSrc = local_content.Video_320x320.value;

  //Seenthis video script
  var e = document.createElement('script');
  e.src = 'https://video.seenthis.se/v2/player/74/player.js';
  e.onload = function(){
    var player = new SeenthisPlayer('.player', videoSrc, options); 
  };
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(e, s);

  //Options for video script
  var options = {
    loop: true,
    autoplay: true,
    loopCount: 30,
  };



  //Animation of content
  var tl = new TimelineMax({repeat:-1});
  TweenMax.set('#frame_2, #frame_3, #frame_4, #cta, #logo_2', { opacity: 0 }) //Opacity on product 2
  tl.fromTo('#frame_1', 0.3, {opacity:0, ease: Linear.ease},{opacity:1, ease: Linear.ease}, 0) //Frame 1 in
    .to('#frame_1', 0.3, {opacity:0, ease: Linear.ease}, 3) //Frame 1 out
    .to('#gradient', 0.3, {opacity:0, ease: Linear.ease}, 3) //Frame 1 gradient out
    .to('#player', 0.3, {opacity:0, ease: Linear.ease}, 3) //Frame 1 video out
    .to('#logo_1', 0.3, {opacity:0, ease: Linear.ease}, 3) //Frame 1 logo out
    .to('#left_pulse', 0.3, {opacity:0, ease: Linear.ease}, 3) //Frame 1 left pulse out
    .to('#right_pulse', 0.3, {opacity:0, ease: Linear.ease}, 3) //Frame 1 left pulse out
    .fromTo('#frame_2', 0.3, {opacity:0, ease: Linear.ease},{opacity:1, ease: Linear.ease}, 3.3) //Frame 2 in
    .fromTo('#cta', 0.3, {opacity:0, ease: Linear.ease},{opacity:1, ease: Linear.ease}, 3.3) //CTA in
    .fromTo('#logo_2', 0.3, {opacity:0, ease: Linear.ease},{opacity:1, ease: Linear.ease}, 3.3) //Logo 2 in
    .to('#tagline', 0.3, {color: local_content.Frame_2_Text_Color.value, ease: Linear.ease}, 3.3) //Frame 2 out
    .to('#frame_2', 0.3, {opacity:0, ease: Linear.ease}, 6) //Frame 2 out
    .fromTo('#frame_3', 0.3, {opacity:0, ease: Linear.ease},{opacity:1, ease: Linear.ease}, 6.3) //Frame 3 in
    .to('#frame_3', 0.3, {opacity:0, ease: Linear.ease}, 9) //Frame 3 out
    .fromTo('#frame_4', 0.3, {opacity:0, ease: Linear.ease},{opacity:1, ease: Linear.ease}, 9.3) //Frame 4 in
    .to('#frame_4', 0.3, {opacity:0, ease: Linear.ease}, 12) //Frame 4 out
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