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
    //Local content variable
    var local_content= content;

    //Append copy
    $('#copyFrame_1').html(local_content.headline_frame_1.value);
    $('#copyFrame_2').html(local_content.headline_frame_2.value);
    $('#copyFrame_3').html(local_content.headline_frame_3.value);

    //Append background image
    $("#bgImage").css("background-image","url("+local_content.img_src.value+")");
    //Append background color
    $("#bgPanel").css("background-color",local_content.bg_color.value);

    //Append logos
    $("#logo_1").css("background-image","url("+local_content.logo_src_1.value+")");
    $("#logo_2").css("background-image","url("+local_content.logo_src_2.value+")");
    $("#logo_3").css("background-image","url("+local_content.logo_src_3.value+")");

    $("#logo_x").css("background-image","url(https://assets.lemonpi.io/a/k/e58bb9a7-86c0-4f6d-849f-2ed092ded49d/Assets/Assets/X_100px.png");


    // //Animation of content
    // var tl = new TimelineMax({repeat: -1, repeatDelay: 3});
    // TweenMax.set('#copyFrame_1, #copyFrame_2, #copyFrame_3, #logo_3', { x: 980 }) //Position of elements not used from start
    // tl.fromTo('#bgPanel', 0.3, {x:485},{x:0}, 1) 
    //   .fromTo('#bgImage', 0.3, {width:980},{width:495}, 1) 
    //   .fromTo('#copyFrame_1', 0.3, {x:980},{x:0}, 1) 
    //   .to('#copyFrame_1', 0.3, {x:-980}, 3) 
    //   .to('#bgPanel', 0.3, {x: -495}, 3) 
    //   .fromTo('#copyFrame_2', 0.3, {x:980},{x:0}, 3) 
    //   .fromTo('#logo_1', 0.3, {x:815},{x:0}, 3) 
    //   .fromTo('#logo_2', 0.3, {x:30},{x:325}, 3) 
    //   .fromTo('#logo_x', 0.3, {opacity:0},{opacity: 1, rotation: "+=360", repeat:1, ease: Linear.easeNone, transformOrigin:"50% 50%" }, 3)
    //   .fromTo('#location_1', 0.3, {opacity:0, x:50},{opacity: 1, x:30}, 4) 
    //   .to('#copyFrame_2', 0.3, {x:-980}, 7) 
    //   .fromTo('#copyFrame_3', 0.3, {x:980},{x:0}, 7) 
    //   .fromTo('#logo_3', 0.3, {x:980},{x:0}, 7)

    //Append exit url to creative container
    document.getElementById('creative_container').onclick = () =>
    window.dispatchEvent(
        new CustomEvent('lemonpi.interaction/click', {
        detail: {
            placeholder: ['click_url'],
        }
      })
    );
  });
});
  