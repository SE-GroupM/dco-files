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
  $("#creative_container").css("background-color", (local_content.bg_color.value));

  //Append logo
  var logo='<svg width="135" height="60" viewBox="0 0 135 60" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_6_26)"><path d="M106.679 23.9907C102.802 24.2897 99.7385 27.4159 99.4965 31.2479C99.2105 35.7752 102.811 39.5258 107.294 39.5258C108.913 39.5258 111.105 38.7233 112.09 37.0292V39.3175H115.113L115.12 31.8965C115.12 27.064 111.17 23.6444 106.679 23.9907ZM111.788 31.9839C111.657 34.5376 109.382 36.527 106.721 36.2C104.686 35.9499 103.05 34.2988 102.822 32.2689C102.518 29.561 104.637 27.2677 107.294 27.2677C109.701 27.2677 111.666 29.1508 111.788 31.519V31.9839ZM90.1579 23.9694C86.0518 24.0842 82.5223 27.2696 82.5223 31.8324C82.5223 36.0379 85.94 39.5539 90.3394 39.5542C93.4065 39.5543 96.4038 37.712 97.5896 34.7229L94.5798 33.8284C94.0354 35.0548 92.7205 36.1264 91.202 36.4083C89.0878 36.8008 87.1411 35.5124 86.3773 34.0771L98.0864 30.8981C97.7407 27.9018 95.1027 23.8311 90.1579 23.9694ZM85.7794 31.4309C85.7794 29.8038 86.7322 27.9352 88.848 27.1439C91.2501 26.2455 93.3487 27.4376 94.2326 29.1166L85.7794 31.4309ZM64.3942 27.1315L64.3942 23.9353C61.4749 23.9353 60.4406 25.3686 60.0025 26.1618V24.4459L56.6734 24.4459V39.3175L60.0918 39.3175C60.0889 34.7191 60.0819 34.795 60.0819 32.0211C60.0819 28.585 62.0752 27.248 64.3942 27.1315ZM33.5432 33.3425L23.334 21.3632H19.8486V39.2928H23.4518V27.302L33.7891 39.3175H36.9839L36.9856 21.3632H33.5432V33.3425ZM80.4264 19.7771H77.2077V25.6246C76.443 24.6233 74.0553 23.8251 72.001 23.9907C68.1598 24.3005 65.0603 27.4159 64.8183 31.2479C64.5324 35.7752 68.1331 39.5357 72.6154 39.5357C74.2884 39.5357 76.6172 38.7379 77.4119 37.3293L77.4084 39.3175H80.4264V31.8965C80.4273 31.8483 80.4282 31.8 80.4282 31.7515C80.4282 31.703 80.4273 31.6548 80.4264 31.6063V19.7771ZM77.1096 31.9839C76.9787 34.5376 74.7035 36.527 72.0427 36.2C70.008 35.9499 68.3722 34.2988 68.1442 32.2689C67.84 29.561 69.9589 27.2677 72.6154 27.2677C75.0225 27.2677 76.9881 29.1508 77.1096 31.519V31.9839ZM46.8261 23.9581C42.5061 23.9581 39.004 27.4473 39.004 31.7515C39.004 36.0557 42.5061 39.5449 46.8261 39.5449C51.1462 39.5449 54.6483 36.0557 54.6483 31.7515C54.6483 27.4473 51.1462 23.9581 46.8261 23.9581ZM46.8166 36.2319C44.333 36.2319 42.3197 34.2259 42.3197 31.7515C42.3197 29.277 44.333 27.2711 46.8166 27.2711C49.3002 27.2711 51.3135 29.277 51.3135 31.7515C51.3135 34.2259 49.3002 36.2319 46.8166 36.2319Z" fill="white"/></g><defs><clipPath id="clip0_6_26"><rect width="135" height="59.3312" fill="white"/></clipPath></defs></svg>';
  $("#logo").append(logo);
  $("#logo").css("fill", (local_content.bg_color.value));


  //Append pulse
  var pulse = '<svg width="197" height="194" viewBox="0 0 197 194" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M47.0099 108.405C41.3392 108.405 36.6892 103.786 36.6892 98.0263V66.9476C36.6892 61.245 41.2825 56.569 47.0099 56.569C52.6806 56.569 57.3305 61.188 57.3305 66.9476V98.0263C57.2738 103.729 52.6806 108.405 47.0099 108.405ZM174.771 107.321C171.368 107.321 168.59 104.527 168.59 101.106V92.78C168.59 89.3585 171.368 86.5643 174.771 86.5643C178.173 86.5643 180.952 89.3585 180.952 92.78V101.106C180.952 104.584 178.173 107.321 174.771 107.321ZM22.2289 107.321C18.8265 107.321 16.0479 104.527 16.0479 101.106V92.78C16.0479 89.3585 18.8265 86.5643 22.2289 86.5643C25.6313 86.5643 28.41 89.3585 28.41 92.78V101.106C28.41 104.584 25.6313 107.321 22.2289 107.321ZM150.046 137.374C144.376 137.374 139.726 132.755 139.726 126.995V95.9164C139.726 90.2139 144.319 85.5378 150.046 85.5378C155.717 85.5378 160.367 90.1569 160.367 95.9164V126.995C160.31 132.755 155.717 137.374 150.046 137.374ZM80.467 132.242C73.3786 132.242 67.5945 126.425 67.5945 119.297V29.1398C67.5945 22.0116 73.3786 16.1951 80.467 16.1951C87.5553 16.1951 93.3394 22.0116 93.3394 29.1398V119.297C93.3394 126.425 87.612 132.242 80.467 132.242ZM116.533 177.805C109.444 177.805 103.66 171.988 103.66 164.86V74.703C103.66 67.5748 109.444 61.7583 116.533 61.7583C123.621 61.7583 129.405 67.5748 129.405 74.703V164.86C129.405 171.988 123.678 177.805 116.533 177.805Z" fill="#0000A0"/></svg>';
  $("#left_pulse").append(pulse);
  $("#right_pulse").append(pulse);

 //Append copy frames
  $("#frame_1").html(local_content.frame_1.value);
  $("#frame_2").html(local_content.frame_2.value);
  $("#frame_3").html(local_content.frame_3.value);
  //Append copy disclaimer
  $("#frame_4").html(local_content.frame_4.value);
  //Append cta copy and color
  $("#cta").html(local_content.cta.value);
  $("#cta").css("background-color", (local_content.cta_bg_color.value));
  //Append tagline
  $("#tagline").html(local_content.tagline.value);

  //Animation of content
  var tl = new TimelineMax({repeat:-1});
  TweenMax.set('#frame_2, #frame_3, #frame_4, #cta', { opacity: 0 }) //Opacity on product 2
  tl.fromTo('#frame_1', 0.3, {opacity:0, ease: Linear.ease},{opacity:1, ease: Linear.ease}, 0) //Frame 1 in
    .to('#frame_1', 0.3, {opacity:0, ease: Linear.ease}, 3) //Frame 1 out
    .to('#gradient', 0.3, {opacity:0, ease: Linear.ease}, 3) //Frame 1 gradient out
    .fromTo('#creative_container', 0.3, {backgroundColor:'#D9D9D9', ease: Linear.ease},{backgroundColor: local_content.bg_color.value, ease: Linear.ease}, 3.3) //Frame 2 background color in
    .fromTo('#frame_2', 0.3, {opacity:0, ease: Linear.ease},{opacity:1, ease: Linear.ease}, 3.3) //Frame 2 in
    .fromTo('#cta', 0.3, {opacity:0, ease: Linear.ease},{opacity:1, ease: Linear.ease}, 3.3) //CTA in
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
          placeholder: ['click'],
      }
    })
  );
});