/**
  * Template Name
  * @Owner Alexander Ayon @ WPP Media Sweden 
  * @Date 2025 August
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
    // code here
    // Advanced mapping of dynamic content
    // You can call the content directly once it's collected by lemonpi.subscribe method
    // Example content.[placeholder_name].value
  });
});

window.addEventListener('lemonpi.content/ready', event => {

  const content = event.detail.content
  const source = event.detail.source
  // Do stuff

  var local_content = content;

  console.log(content);

  //Customization

  $("#frame1_text").html(local_content.frame1_text.value);
  $("#frame2_text").html(local_content.frame2_text.value);
  $("#frame3_text").html(local_content.frame3_text.value);
  $("#frame4_text").html(local_content.frame4_text.value);
  $(".cta").html(local_content.cta_text.value);

  $(".logo").css("background-image","url("+local_content.logo.value+")");

  $("#creative_container, body").css({
    ...(local_content.main_bgColor.value  && { "background-color":  local_content.main_bgColor.value }),
  });

  $("#border").css({
    ...(local_content.main_borderColor.value  && { "border-color":  local_content.main_borderColor.value }),
  });

  $("#logo").css({
    ...(local_content.logo1_width.value  && { width:  local_content.logo1_width.value }),
    ...(local_content.logo1_height.value && { height: local_content.logo1_height.value }),
    ...(local_content.logo1_left.value   && { left:   local_content.logo1_left.value }),
    ...(local_content.logo1_top.value    && { top:    local_content.logo1_top.value }),
    ...(local_content.logo1_filter.value    && { filter:    local_content.logo1_filter.value }),
  });

  $("#frame4_logo").css({
    ...(local_content.logo2_width.value  && { width:  local_content.logo2_width.value }),
    ...(local_content.logo2_height.value && { height: local_content.logo2_height.value }),
    ...(local_content.logo2_left.value   && { left:   local_content.logo2_left.value }),
    ...(local_content.logo2_top.value    && { top:    local_content.logo2_top.value }),
    ...(local_content.logo2_filter.value    && { filter:    local_content.logo2_filter.value }),
  });

  $("#frame1").css({
    ...(local_content.frame1_bgColor.value && { background: local_content.frame1_bgColor.value }),
    ...(local_content.frame1_bg.value      && { "background-image": `url(${local_content.frame1_bg.value})` }),
    ...(local_content.frame1_textColor.value && { color: local_content.frame1_textColor.value }),
    ...(local_content.frame1_fontSize.value  && { "font-size": local_content.frame1_fontSize.value }),
  });

  $("#frame1_text").css({
    ...(local_content.frame1_textWidth.value  && { width:  local_content.frame1_textWidth.value }),
    ...(local_content.frame1_textHeight.value && { height: local_content.frame1_textHeight.value }),
    ...(local_content.frame1_textLeft.value   && { left:   local_content.frame1_textLeft.value }),
    ...(local_content.frame1_textTop.value    && { top:    local_content.frame1_textTop.value }),
  });

  $("#frame2").css({
    ...(local_content.frame2_bgColor.value && { background: local_content.frame2_bgColor.value }),
    ...(local_content.frame2_bg.value      && { "background-image": `url(${local_content.frame2_bg.value})` }),
    ...(local_content.frame2_textColor.value && { color: local_content.frame2_textColor.value }),
    ...(local_content.frame2_fontSize.value  && { "font-size": local_content.frame2_fontSize.value }),
  });

  $("#frame2_text").css({
    ...(local_content.frame2_textWidth.value  && { width:  local_content.frame2_textWidth.value }),
    ...(local_content.frame2_textHeight.value && { height: local_content.frame2_textHeight.value }),
    ...(local_content.frame2_textLeft.value   && { left:   local_content.frame2_textLeft.value }),
    ...(local_content.frame2_textTop.value    && { top:    local_content.frame2_textTop.value }),
  });

  $("#frame3").css({
    ...(local_content.frame3_bgColor.value && { background: local_content.frame3_bgColor.value }),
    ...(local_content.frame3_bg.value      && { "background-image": `url(${local_content.frame3_bg.value})` }),
    ...(local_content.frame3_textColor.value && { color: local_content.frame3_textColor.value }),
    ...(local_content.frame3_fontSize.value  && { "font-size": local_content.frame3_fontSize.value }),
  });

  $("#frame3_text").css({
    ...(local_content.frame3_textWidth.value  && { width:  local_content.frame3_textWidth.value }),
    ...(local_content.frame3_textHeight.value && { height: local_content.frame3_textHeight.value }),
    ...(local_content.frame3_textLeft.value   && { left:   local_content.frame3_textLeft.value }),
    ...(local_content.frame3_textTop.value    && { top:    local_content.frame3_textTop.value }),
  });

  $("#frame4").css({
    ...(local_content.frame4_bgColor.value && { background: local_content.frame4_bgColor.value }),
    ...(local_content.frame4_bg.value      && { "background-image": `url(${local_content.frame4_bg.value})` }),
    ...(local_content.frame4_textColor.value && { color: local_content.frame4_textColor.value }),
    ...(local_content.frame4_fontSize.value  && { "font-size": local_content.frame4_fontSize.value }),
  });

  $("#frame4_text").css({
    ...(local_content.frame4_textWidth.value  && { width:  local_content.frame4_textWidth.value }),
    ...(local_content.frame4_textHeight.value && { height: local_content.frame4_textHeight.value }),
    ...(local_content.frame4_textLeft.value   && { left:   local_content.frame4_textLeft.value }),
    ...(local_content.frame4_textTop.value    && { top:    local_content.frame4_textTop.value }),
  });

  $(".cta").css({
    ...(local_content.cta_fontSize.value  && { "font-size":  local_content.cta_fontSize.value }),
    ...(local_content.cta_textColor.value && { "text-color": local_content.cta_textColor.value }),
    ...(local_content.cta_bgColor.value && { "background-color": local_content.cta_bgColor.value }),
  });

  $("#cta").css({
    ...(local_content.cta_left.value   && { left:   local_content.cta_left.value }),
    ...(local_content.cta_top.value    && { top:    local_content.cta_top.value }),
  });

  $("#frame4_cta").css({
    ...(local_content.frame4_ctaLeft.value   && { left:   local_content.frame4_ctaLeft.value }),
    ...(local_content.frame4_ctaTop.value    && { top:    local_content.frame4_ctaTop.value }),
  });


  //Mouse Listener
  $('#creative_container').mouseenter(onMouseEnter);
  $('#creative_container').mouseleave(onMouseLeave);

  //Animation
  const timeline = gsap.timeline({
    repeat: 1
  });
  
  gsap.to("#creative_container", {opacity:1, duration:0.5, ease:"power2.out"})

  timeline.add([
    gsap.to("#frame1", {left:"-100%", duration:1, ease:"expo.inOut"}),
    gsap.to("#frame2", {left:"0%", duration:1, ease:"expo.inOut"})
  ], '+=2');
  timeline.add([
    gsap.to("#frame2", {top:"100%", duration:1, ease:"expo.inOut"}),
    gsap.to("#frame3", {top:"0%", duration:1, ease:"expo.inOut"}),
    gsap.to("#frame1", {left:"100%", duration:0.5, ease:"expo.inOut"})
  ], '+=2');
  timeline.add([
    gsap.to("#cta, #logo", {opacity:0, duration:0.5, ease:"expo.inOut"})
  ], '+=2');
  timeline.add([
    gsap.to("#frame3", {left:"-100%", duration:1, ease:"expo.inOut"}),
    gsap.to("#frame4", {left:"0%", duration:1, ease:"expo.inOut"}),
    gsap.to("#cta", {marginLeft:"100%", duration:1, ease:"expo.inOut"})
  ], '-=0.2');
  timeline.add([
    gsap.to("#cta", {opacity:1, duration:0.5, ease:"power2.out"})
  ]);
  timeline.add([
    gsap.to("#frame4_cta", {opacity:0, duration:0.5, ease:"power2.out"})
  ], '+=3');
  timeline.add([
    gsap.to("#cta", {marginLeft:"0%", duration:1, ease:"expo.inOut"}),
    gsap.to("#frame1", {left:"0%", duration:1, ease:"expo.inOut"}),
    gsap.to("#frame4", {left:"-100%", duration:1, ease:"expo.inOut"})
  ], '-=0.2');
  timeline.add([
    gsap.to("#logo", {opacity:1, duration:0.5, ease:"power2.out"})
  ]);

  console.log(timeline.duration());  

  //Mouse Listeners
  function onMouseEnter(e){

    if(local_content.cta_hoverColor.value != "" || local_content.cta_hoverTextColor.value != ""){
      gsap.to(".cta", { backgroundColor:local_content.cta_hoverColor.value, color:local_content.cta_hoverTextColor.value, ease: "expo.out", duration: 0.5});
    }else{
      gsap.to(".cta", { backgroundColor:"#0f0f0f", color:"#fff", ease: "expo.out", duration: 0.5});
    }
    
  }

  function onMouseLeave(e){

    if(local_content.cta_bgColor.value != "" || local_content.cta_textColor.value != ""){
      gsap.to(".cta", { backgroundColor:local_content.cta_bgColor.value, color:local_content.cta_textColor.value, ease: "expo.out", duration: 0.5});
    }else{
      gsap.to(".cta", { backgroundColor:"#fff", color:"#0f0f0f", ease: "expo.out", duration: 0.5});
    }
    
  }

  //Append exit url to creative container
  document.getElementById('creative_container').onclick = () =>
    window.dispatchEvent(
        new CustomEvent('lemonpi.interaction/click', {
        detail: {
            placeholder: ['clickthrough'],
        }
    })
  );
  
})