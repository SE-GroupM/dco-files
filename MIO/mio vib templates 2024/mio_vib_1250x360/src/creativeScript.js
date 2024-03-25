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
   //Append color image to copy's and sub-copy
   $(".copy_frames, #sub_copy").css({"color": local_content.copy_color.value});
   //Append copy to frame 1
   $("#copy_frame_1").html(local_content.copy_frame_1.value);
   //Append copy to frame 2
   $("#copy_frame_2").html(local_content.copy_frame_2.value);
   //Append static copy to copy frames
   $("#copy_static").html(local_content.copy_static.value);
    //Append copy to cta
   $("#cta").html(local_content.cta_copy.value);
   //Append font size for cta
   $("#cta").css("font-size", local_content.cta_fontsize.value);
   //Append copy color for cta
   $("#cta").css("color", local_content.cta_copy_color.value);
   //Append copy color for cta
   $("#cta").css("background-color", local_content.cta_bg_color.value);
   //Append background image to image div    
   $("#bg_image").css("background-image","url("+local_content.image_source.value+")");
   //Append logo image to logo div    
   $("#logo").css("background-image","url("+local_content.logo_source.value+")");
     //Append sub_copy to logo div    
   $("#sub_copy").html(local_content.sub_copy.value);
   //Append font size and line height on copy frames
   $(".cta").css({"opacity": local_content.cta_bg_opacity.value});
    //Append font size and line height on copy frames
    $(".copy_frames").css({"top": local_content.copy_top_value.value});
    //Append font size and line height on cta frames
    $(".cta").css({"top": local_content.cta_top_value.value});
    // World click event caller
    $('#worldClick').click(onClick);
    // Defining mute-button's appearence 
    var mutebutton_on_off = local_content.mutebutton_on_off.value;
     // Defining variable for if copy-shadow is on or off
    var copy_shadow_on_off = local_content.copy_shadow_on_off.value;
    // Defining color of cta copy
    var cta_copy_color = local_content.cta_copy_color.value;
    // Defining color of cta button
    var cta_bg_color = local_content.cta_bg_color.value;
    // Define the video source and tracker variables
    var videoSrc = local_content.videoSrc.value;
    var videoTracker = local_content.videoTracker.value;
    // Define the function of video vs img to be displayed
    var use_video = local_content.use_video.value;
    // Defining top value for copy frames
    var copy_top_value = local_content.copy_top_value.value;
    // Defining top value for cta 
    var cta_top_value = local_content.cta_top_value.value;

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

       /////////////////////
     //// ANIMATIONS /////
    ////////////////////

    //Animations of copy
    var tl = new TimelineMax({repeat:-1});
    TweenMax.set('#copy_frame_1, #copy_frame_2', { opacity: 0 }) //Opacity on copy elements
    tl.fromTo('#copy_frame_1', 0.3, {opacity:0, ease: Linear.ease},{lineHeight: local_content.copy_fontsize.value, opacity:1, ease: Linear.ease}, 0) //Copy frame 1 fade in
   .to('#copy_frame_1', 0.3, {opacity:0, ease: Linear.ease}, 3) //Copy frame 1 fade out
   .fromTo('#copy_frame_2', 0.3, {opacity:0, ease: Linear.ease},{lineHeight: local_content.copy_fontsize.value, opacity:1, ease: Linear.ease}, 3.3) //Copy frame 2 fade in
   .to('#copy_frame_2', 0.3, {opacity:0, ease: Linear.ease}, 6) //Copy frame 2 fade out
 
      ////////////////
    /// FUNCTIONS ///
  //////////////////

  if (use_video === "yes") {
    // Function for video to be used or not. Else = image will be displayed
    document.querySelector('.player').style.display = 'block'; // This shows the video player
    document.querySelector('.bg_image').style.display = 'none'; // This hides the background image
} else {
    document.querySelector('.player').style.display = 'none'; // This hides the video player
    document.querySelector('.bg_image').style.display = 'block'; // This shows the background image
}  

// Determine the state of the mute button based on mutebutton_on_off variable
if (mutebutton_on_off === 'on') {
  options.muteButton = true; // Enable mute if 'on'
} else if (mutebutton_on_off === 'off') {
  options.muteButton = false; // Disable mute if 'off'
}

// Determine the state of the mute button based on mutebutton_on_off variable
if (copy_shadow_on_off === 'on') {
  $("#sub_copy, .copy_frames").css({"text-shadow": "0px 0px 5px rgba(0,0,0,0.5)"});
} else if (copy_shadow_on_off === 'off') {
  $("#sub_copy, .copy_frames").css({"text-shadow": "none"});
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
  