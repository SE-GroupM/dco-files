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
  