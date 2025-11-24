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
    
    const local_content = content; // holding all data from the adset in Choreograph Create
    //Append background image

    const heroImage = local_content.Hero_Image.value; // background image
    const logo = local_content.Logo.value; // logo image
    const headlineText = local_content.Headline_Text.value; // Headline_Text text
    const subText = local_content.Sub_Text.value; // Sub_Text text
    const ctaText = local_content.CTA_Text.value; // CTA_Text text

    $("#bgImage").css("background-image","url("+heroImage+")");
    //Append logo image
    $("#logo").css("background-image","url("+logo+")");
    //Append copy
    $("#headlineText").html(headlineText);
    $("#subText").html(subText);
    $("#cta").html(ctaText);

    // Optional: Add animations or interactions
   const timeline = gsap.timeline({ repeat: 3, repeatDelay: 3 });
   timeline
     .to("#creative_container", { opacity: 1, ease: "expo.out", duration: 0.7 })
     .fromTo("#headlineText", { opacity: 0, x: -10 }, { opacity: 1, x: 0, ease: "expo.out", duration: 1 })
     .fromTo("#subText", { opacity: 0, x: -10 }, { opacity: 1, x: 0, ease: "expo.out", duration: 1 }, "-=0.7")
     .fromTo("#cta", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, ease: "expo.out", duration: 1 }, "-=0.7");



    //Append exit url to creative container
    document.getElementById('creative_container').onclick = () =>
      window.dispatchEvent(
          new CustomEvent('lemonpi.interaction/click', {
          detail: {
              placeholder: ['URL_Exit'],
          }
      })
    );

  });
});
  