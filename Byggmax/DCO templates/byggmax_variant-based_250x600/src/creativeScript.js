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

// Check if <sup> is included in the product price currency
if (local_content.product_1_price_currency.value.includes('<sup>')) {
  // Wrap the currency in a span and apply the .priceCurrencySup class
  $("#productPrice_1").html(
      local_content.product_1_price.value + 
      '<span class="priceCurrencySup">' + local_content.product_1_price_currency.value + '</span>'
  );
} else {
  // Wrap the currency in a span and apply the .priceCurrency class
  $("#productPrice_1").html(
      local_content.product_1_price.value + 
      '<span class="priceCurrency">' + local_content.product_1_price_currency.value + '</span>'
  );
}

// If product_1_price is empty, only show the price (without currency)
if (local_content.product_1_price.value === '') {
  $("#productPrice_1").html(local_content.product_1_price.value);
}

  //Append product name
  $("#productName_1").html(local_content.product_1_copy.value);
  //Append product image
  $("#productImage_1").css("background-image","url("+local_content.product_1_image.value+")");
  //Append product container
  $("#productContainer_1").css("background-image","url("+local_content.product_1_container.value+")");
  //Append price currency
  $("#priceCurrencySup").html(local_content.product_1_price_currency.value);
  //Append price currency
  $("#priceCurrencySup").html(local_content.product_2_price_currency.value);
  //Append product price headline
  $("#priceHeadline1").html(local_content.product_1_price_headline.value);
  //Append product price headline
  $("#priceHeadline2").html(local_content.product_2_price_headline.value);

// Check if <sup> is included in the product price currency
if (local_content.product_2_price_currency.value.includes('<sup>')) {
  // Wrap the currency in a span and apply the .priceCurrencySup class
  $("#productPrice_2").html(
      local_content.product_2_price.value + 
      '<span class="priceCurrencySup">' + local_content.product_2_price_currency.value + '</span>'
  );
} else {
  // Wrap the currency in a span and apply the .priceCurrency class
  $("#productPrice_2").html(
      local_content.product_2_price.value + 
      '<span class="priceCurrency">' + local_content.product_2_price_currency.value + '</span>'
  );
}

// If product_1_price is empty, only show the price (without currency)
if (local_content.product_2_price.value === '') {
  $("#productPrice_2").html(local_content.product_2_price.value);
}

  //Append oldPrice 1
  $("#product_1_oldPrice").html(local_content.product_1_oldPrice.value + " kr");
  if (local_content.product_1_oldPrice.value === ''){
    $("#product_1_oldPrice").html(local_content.product_1_oldPrice.value);
  }
  //Append oldPrice 2
  $("#product_2_oldPrice").html(local_content.product_2_oldPrice.value + " kr");
  if (local_content.product_2_oldPrice.value === ''){
    $("#product_2_oldPrice").html(local_content.product_2_oldPrice.value);
  }
  //Append mainCopy
  $("#product_2_mainCopy").html(local_content.product_2_mainCopy.value);
  //Append subCopy
  $("#product_2_subCopy").html(local_content.product_2_subCopy.value);
  //Append product name
  $("#productName_2").html(local_content.product_2_copy.value);
  //Append product image
  $("#productImage_2").css("background-image","url("+local_content.product_2_image.value+")");
  //Append product container
  $("#productContainer_2").css("background-image","url("+local_content.product_2_container.value+")");

  document.getElementById('creative_container').onclick = () =>
    window.dispatchEvent(
      new CustomEvent('lemonpi.interaction/click', {
        detail: {
          placeholder: ['exit_url'],
        }
      })
    );

 // Animation of content
var tl = new TimelineMax({ repeat: -1 });
TweenMax.set('#productPrice_2, #product_2_subCopy, #productName_2, #product_2_mainCopy, #productImage_2, #productContainer_2', { opacity: 0 }) //Opacity on product 2

tl.fromTo('#productPrice_1, #priceHeadline1, #product_1_oldPrice, #productName_1, #productContainer_1', 0.3, { opacity: 0, ease: Linear.ease }, { opacity: 1, ease: Linear.ease }, 0) //Product price and product name 1 fade in
  .fromTo('#productImage_1', 0.3, { x: 100, opacity: 0, ease: Linear.ease }, { x: 0, opacity: 1, ease: Linear.ease }, 0) //Product image 1 fade in
  .to('#productPrice_1,  #priceHeadline1, #product_1_oldPrice, #productName_1, #productContainer_1', 0.3, { opacity: 0, ease: Linear.ease }, 3) //Product price and product name 1 fade out
  .to('#productImage_1', 0.3, { x: 100, opacity: 0, ease: Linear.ease }, 3) //Product image 1 fade out
  .fromTo('#productPrice_2,  #priceHeadline2, #product_2_oldPrice, #product_2_subCopy, #productName_2, #product_2_mainCopy, #productContainer_2', 0.3, { opacity: 0, ease: Linear.ease }, { opacity: 1, ease: Linear.ease }, 3.3) //Product price and product name 2 fade in
  .fromTo('#productImage_2', 0.3, { x: 100, opacity: 0, ease: Linear.ease }, { x: 0, opacity: 1, ease: Linear.ease }, 3.3) //Product image 2 fade in
  .to('#productPrice_2,  #priceHeadline2, #product_2_oldPrice, #productName_2, #product_2_mainCopy, #product_2_subCopy, #productContainer_2', 0.3, { opacity: 0, ease: Linear.ease }, 6) //Product price and product name 2 fade out
  .to('#productImage_2', 0.3, { x: 100, opacity: 0, ease: Linear.ease }, 6) //Product image 2 fade out
  .add(function () {
    showExitUrl2(); // Call function to show exit_url_2
  }, 3.3) // Add function call when _2 placeholders are displayed
  .add(function () {
    hideExitUrl2(); // Call function to hide exit_url_2 when _2 placeholders fade out
  }, 6.3); // Hide function call slightly after _2 placeholders fade out

// Function to show exit_url_2
function showExitUrl2() {
  document.getElementById('creative_container').onclick = () =>
    window.dispatchEvent(
      new CustomEvent('lemonpi.interaction/click', {
        detail: {
          placeholder: ['exit_url_2'],
        }
      })
    );
}

// Function to hide exit_url_2 and revert to default
function hideExitUrl2() {
  document.getElementById('creative_container').onclick = () =>
    window.dispatchEvent(
      new CustomEvent('lemonpi.interaction/click', {
        detail: {
          placeholder: ['exit_url'],
          }
        })
      );
    }
    });
    });