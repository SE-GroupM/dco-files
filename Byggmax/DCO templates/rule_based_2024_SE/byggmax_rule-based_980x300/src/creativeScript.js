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
  
//Append bg_image image
$("#bg_image").css("background-image","url("+content.bg_image.value+")");
//Append logo image
$("#logo").css("background-image","url("+content.logo.value+")");

//Append mainCopy
$("#product_1_mainCopy").html(content.product_1_mainCopy.value);
//Append product image
$("#product_1_image").css("background-image","url("+content.product_1_image.value+")");
//Append product container
$("#product_1_badge").css("background-image","url("+content.product_1_badge.value+")");
//Append price currency
$("#priceCurrencySup").html(content.product_1_price_currency.value);
//Append product sub copy
$("#product_1_subcopy").html(content.product_1_subcopy.value);

//Append mainCopy
$("#product_2_mainCopy").html(content.product_2_mainCopy.value);
//Append product image
$("#product_2_image").css("background-image","url("+content.product_2_image.value+")");
//Append product container
$("#product_2_badge").css("background-image","url("+content.product_2_badge.value+")");
//Append price currency
$("#priceCurrencySup").html(content.product_2_price_currency.value);
//Append product sub copy
$("#product_2_subcopy").html(content.product_2_subcopy.value);

   //////////////////
  //// FUNCTIONS ///
 //////////////////

 // Check if <sup> is included in the product price currency

if (content.product_1_price.value.includes('<sup>')) {
    
  // Wrap the currency in a span and apply the .priceCurrencySup class
  $("#productPrice_1").html(
      content.product_1_price.value + 
      '<span class="priceCurrencySup">' + content.product_1_price_currency.value + '</span>'
  );
  // If we don't have any sup element, add CSS class on priceCurrency 
  } else {
  // Wrap the currency in a span and apply the .priceCurrency class
  $("#productPrice_1").html(
      content.product_1_price.value + 
      '<span class="priceCurrency">' + content.product_1_price_currency.value + '</span>'
  );

  }
  // If product_1_price is empty, only show the price (without currency)
  if (content.product_1_price.value === '') {
  $("#productPrice_1").html(content.product_1_price.value);
  }
console.log(content)
// Check if <sup> is included in the product price currency
if (content.product_2_price.value.includes('<sup>')) {
// Wrap the currency in a span and apply the .priceCurrencySup class
$("#productPrice_2").html(
    content.product_2_price.value + 
    '<span class="priceCurrencySup">' + content.product_2_price_currency.value + '</span>'
);
} else {
// Wrap the currency in a span and apply the .priceCurrency class
$("#productPrice_2").html(
    content.product_2_price.value + 
    '<span class="priceCurrency">' + content.product_2_price_currency.value + '</span>'
);
}

// If product_1_price is empty, only show the price (without currency)
if (content.product_2_price.value === '') {
$("#productPrice_2").html(content.product_2_price.value);
}

// Function to check and update product copy
function updateCopy(elementId, productCopy) {
  var numberRegex = /\d+/;

  // Check if product copy contains numbers and append " kr" if not already present
  if (numberRegex.test(productCopy)) {
    if (!productCopy.endsWith(" kr")) {
      productCopy += " kr";
    }
    $("#" + elementId).html(productCopy).addClass('oldPrice').removeClass('product_top_copy');
  } else {
    $("#" + elementId).html(productCopy).addClass('product_top_copy').removeClass('oldPrice');
  }
}

// Function to update both product copies
function updateProductCopy() {
  // Update product 1 and product 2 by calling the helper function
  updateCopy("product_1_top_copy", content.product_1_top_copy.value);
  updateCopy("product_2_top_copy", content.product_2_top_copy.value);
}

// Call the function to update the content
updateProductCopy();

   ///////////////////
  //// ANIMATIONS ///
 ///////////////////

// Animation of content
var tl = new TimelineMax({ repeat: -1 });
TweenMax.set('#productPrice_2, #product_2_mainCopy, product_2_subcopy, #product_2_image, #product_2_badge', { opacity: 0 }) //Opacity on product 2

tl.fromTo('#productPrice_1, #product_1_top_copy, #product_1_mainCopy, #product_1_subcopy, #product_1_badge', 0.3, { opacity: 0, ease: Linear.ease }, { opacity: 1, ease: Linear.ease }, 0) //Product price and product name 1 fade in
.fromTo('#product_1_image', 0.3, { x: 100, opacity: 0, ease: Linear.ease }, { x: 0, opacity: 1, ease: Linear.ease }, 0) //Product image 1 fade in
.to('#productPrice_1,  #product_1_top_copy, #product_1_subcopy, #product_1_mainCopy, #product_1_badge', 0.3, { opacity: 0, ease: Linear.ease }, 3) //Product price and product name 1 fade out
.to('#product_1_image', 0.3, { x: 100, opacity: 0, ease: Linear.ease }, 3) //Product image 1 fade out
.fromTo('#productPrice_2,  #product_2_top_copy, #product_2_subcopy, #product_2_mainCopy, #product_2_badge', 0.3, { opacity: 0, ease: Linear.ease }, { opacity: 1, ease: Linear.ease }, 3.3) //Product price and product name 2 fade in
.fromTo('#product_2_image', 0.3, { x: 100, opacity: 0, ease: Linear.ease }, { x: 0, opacity: 1, ease: Linear.ease }, 3.3) //Product image 2 fade in
.to('#productPrice_2,  #product_2_top_copy, #product_2_subcopy, #product_2_mainCopy, #product_2_badge', 0.3, { opacity: 0, ease: Linear.ease }, 6) //Product price and product name 2 fade out
.to('#product_1_image', 0.3, { x: 100, opacity: 0, ease: Linear.ease }, 6) //Product image 2 fade out
.add(function () {
  showExitUrl2(); // Call function to show exit_url_2
}, 3.3) // Add function call when _2 placeholders are displayed
.add(function () {
  hideExitUrl2(); // Call function to hide exit_url_2 when _2 placeholders fade out
}, 6.3); // Hide function call slightly after _2 placeholders fade out

// Function to set exit_url based on a provided URL
function setExitUrl(url) {
  document.getElementById('creative_container').onclick = () =>
    window.dispatchEvent(
      new CustomEvent('lemonpi.interaction/click', {
        detail: {
          placeholder: [url],
        }
      })
    );
}

// Initial click event
setExitUrl('exit_url');

// Function to show exit_url_2
function showExitUrl2() {
  setExitUrl('exit_url_2');
}

// Function to hide exit_url_2 and revert to default
function hideExitUrl2() {
  setExitUrl('exit_url');
}
})
});
