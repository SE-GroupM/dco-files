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

  //Animations of copy
 var tl = new TimelineMax({repeat:-1});
 TweenMax.set('#copy_frame_1, #copy_frame_2', { opacity: 0 }) //Opacity on copy elements
  tl.fromTo('#copy_frame_1', 0.3, {lineHeight: '0px', y: 48, opacity:0, ease: Linear.ease},{lineHeight: local_content.copy_fontsize.value, y: 0, opacity:1, ease: Linear.ease}, 0) //Copy frame 1 fade in
    .to('#copy_frame_1', 0.3, {lineHeight: '0px', y: 48, opacity:0, ease: Linear.ease}, 3) //Copy frame 1 fade out
    .fromTo('#copy_frame_2', 0.3, {lineHeight: '0px', y: 48, opacity:0, ease: Linear.ease},{lineHeight: local_content.copy_fontsize.value, y: 0, opacity:1, ease: Linear.ease}, 3.3) //Copy frame 2 fade in
    .to('#copy_frame_2', 0.3, {lineHeight: '0px', y: 48, opacity:0, ease: Linear.ease}, 6) //Copy frame 2 fade out
  

  //Append exit url to creative container
  document.getElementById('creative_container').onclick = () =>
  window.dispatchEvent(
      new CustomEvent('lemonpi.interaction/click', {
      detail: {
          placeholder: ['exit_url'],
      }
    })
  );
})