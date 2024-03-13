/**
  * Template Name
  * @Östling Developer Name 
  * 2024/03/06 - Initial template for Cewe/Japanphoto
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
    
    const local_content = content;

    ////////////////////////////////////////////////
   //        VARIABLES & DECLARATIONS            //
  ////////////////////////////////////////////////

  const mainCopy = local_content.mainText.value;
  const subCopy = local_content.secondText.value;
  const ctaCopy = local_content.ctaText.value;
  const panel_bg_color = local_content.panel_bg_color.value;
  const bg_img = local_content.img.value;
  const fotobok_logo = local_content.fotobok_logo.value;
  
  const cta_text_color = local_content.ctaText_color.value;
  const cta_bg_color = local_content.ctaBg_color.value;

  $('#mainCopy').html(mainCopy); // append main copy to html div
  $('#subCopy').html(subCopy); // append sub copy to html div
  $('#ctaText').html(ctaCopy); // append cta text to html div
  
  $(".mainCopy").css({"font-size": local_content.mainText_fontsize.value, "line-height": local_content.mainText_fontsize.value});
  $(".subCopy").css({"font-size": local_content.secondText_fontsize.value, "line-height": local_content.secondText_fontsize.value + 2});

  $('#ctaText').css({
    'color': cta_text_color,
    'background-color': cta_bg_color,
  })
  // Append panel bg color
  $('#left_panel').css({
    'background': panel_bg_color,
  })
  // Append img 
  $('#img_bg').css({
    content: 'url('+ bg_img + ')',
    'background-repeat': 'no-repeat',
   // 'background-position': 'top right',
    'background-size': 'contain',
  })
   // Append second logo 
   $('#fotobok_logo').css({
    content: 'url('+ fotobok_logo + ')',
    'background-repeat': 'no-repeat',
   // 'background-position': 'top right',
    'background-size': 'contain',
  })
  $('#worldClick').click(onClick);

   /////////////////////
  //// ANIMATIONS /////
 ////////////////////
 
//Animations of copy
var tl = new TimelineMax({repeat:0});

// Set initial opacity for #mainCopy and #subCopy
tl.set('#mainCopy, #subCopy', { opacity: 0 });

// Fade in animations for mainCopy and subCopy
tl.to('.mainCopy', 0.5, {autoAlpha: 1, ease: Power2.easeOut, delay: 0.5})
  .to('.subCopy', 0.5, {autoAlpha: 1, ease: Power2.easeOut, delay: 0.2});

//Animations of copy
var tl2 = new TimelineMax({repeat:-1});

// Animation for ctaText with yoyo effect - Made faster
tl2.fromTo('.ctaText', 0.2, // Reduced duration to 0.25 seconds for a faster bounce
  {scale: 1}, 
  {scale: 1.1, ease: Power1.easeInOut, repeat: 3, // Increased repeat to 4 for more bounces in a similar timeframe
  yoyo: true}, "+=2.5");

    ////////////////////////////////////////////////
   //                FUNCTIONS                   //
  ////////////////////////////////////////////////

  function onClick (event) {
    return window.dispatchEvent(
      new CustomEvent('lemonpi.interaction/click', {
        detail: {
          placeholder: 'click'
        }
    }));
  }

// End of code
  });
});

  
