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
  
  //Append background image
  $("#bgImage").css("background-image","url("+local_content.background_asset.value+")");
  //Append overlay image
  $("#productOverlay").css("background-image","url("+local_content.layover_asset.value+")");
  //Append logo image
  $("#logo").css("background-image","url("+local_content.logo_source.value+")");
  //Append overlay image
  $("#productOverlay").css("background-image","url("+local_content.layover_asset.value+")");

  //Product box 1
  //Check if price has sup element and append correct CSS class
  if (local_content.product_1_price.value.includes('<sup>')){
    $("#productPrice_1").html(local_content.product_1_price.value + "<span class='priceCurrencySup'>kr</span>");
  } else {
    $("#productPrice_1").html(local_content.product_1_price.value + "<span class='priceCurrency'>kr</span>");
  }
  //Append product name
  $("#productName_1").html(local_content.product_1_copy.value);
  //Append product image
  $("#productImage_1").css("background-image","url("+local_content.product_1_image.value+")");
  //Append product container
  $("#productContainer_1").css("background-image","url("+local_content.product_1_container.value+")");

  //Product box 2
 //Check if price has sup element and append correct CSS class
 if (local_content.product_2_price.value.includes('<sup>')){
  $("#productPrice_2").html(local_content.product_2_price.value + "<span class='priceCurrencySup'>kr</span>");
  } else {
    $("#productPrice_2").html(local_content.product_2_price.value + "<span class='priceCurrency'>kr</span>");
  }
  //Append product name
  $("#productName_2").html(local_content.product_2_copy.value);
  //Append product image
  $("#productImage_2").css("background-image","url("+local_content.product_2_image.value+")");
  //Append product container
  $("#productContainer_2").css("background-image","url("+local_content.product_2_container.value+")");

  //Animation of content
  var tl = new TimelineMax({repeat:-1});
  TweenMax.set('#productPrice_2, #productName_2, #productImage_2, #productContainer_2', { opacity: 0 }) //Opacity on product 2
  tl.fromTo('#productPrice_1, #productName_1, #productContainer_1', 0.3, {opacity:0, ease: Linear.ease},{opacity:1, ease: Linear.ease}, 0) //Product price and product name 1 fade in
    .fromTo('#productImage_1', 0.3, {x: 100, opacity:0, ease: Linear.ease},{x: 0, opacity:1, ease: Linear.ease}, 0) //Product image 1 fade in
    .to('#productPrice_1, #productName_1, #productContainer_1', 0.3, {opacity:0, ease: Linear.ease}, 3) //Product price and product name 1 fade out
    .to('#productImage_1', 0.3, {x: 100, opacity:0, ease: Linear.ease}, 3) //Product image 1 fade out
    .fromTo('#productPrice_2, #productName_2, #productContainer_2', 0.3, {opacity:0, ease: Linear.ease},{opacity:1, ease: Linear.ease}, 3.3) //Product price and product name 2 fade in
    .fromTo('#productImage_2', 0.3, {x: 100, opacity:0, ease: Linear.ease},{x: 0, opacity:1, ease: Linear.ease}, 3.3) //Product image 2 fade in
    .to('#productPrice_2, #productName_2, #productContainer_2', 0.3, {opacity:0, ease: Linear.ease}, 6) //Product price and product name 2 fade out
    .to('#productImage_2', 0.3, {x: 100, opacity:0, ease: Linear.ease}, 6) //Product image 2 fade ou
  });

  //Append exit url to creative container
  document.getElementById('creative_container').onclick = () =>
  window.dispatchEvent(
      new CustomEvent('lemonpi.interaction/click', {
      detail: {
          placeholder: ['exit_url'],
      }
    })
  );

});
  