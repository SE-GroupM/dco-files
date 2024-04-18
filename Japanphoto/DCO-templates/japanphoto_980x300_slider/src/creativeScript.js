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
   
    var local_content= content;

    //Append main copy text
    $('#mainCopy').html(local_content.mainCopy.value);
    //Append main copy color
    $('#mainCopy').css({
      'color': local_content.copyColor.value,
    });

    //Append background image
    $('#bgImage').css({
      'background-image': 'url('+local_content.bgImage.value+ ')'
    });

     //Append logo
     $('#logo').css({
      'background-image': 'url('+local_content.logo.value+ ')'
    });
    

    //Product collection from adset
    var products = local_content.product_collection.value;

    for (var i = 0; i < 4; i++){ 

      // Append image to product
      $('#productImage_' + i).css({
          backgroundImage: 'url("' + products[i].productImage.value + '")',
        });

      // Append image to product
      $('#productName_'+i).html(products[i].productName.value);

      // Append image to product
      $('#productPrice_'+i).html(products[i].productPriceText.value);

      // Append cta to product
      $('#cta_'+i).html(local_content.ctaText.value);
    
    
    }

    //Animation of product boxes
    var t2 = new TimelineMax({repeat: -1});
      t2.fromTo('#slide_1', 0.7, {x: -510} ,{x: 0},0)
      .to('#slide_1', 0.7, {x: 510},4)
      .fromTo('#slide_2', 0.7, {x: -510} ,{x: 0},4)
      .to('#slide_2', 0.7, {x: 510},8)
  });
});
  