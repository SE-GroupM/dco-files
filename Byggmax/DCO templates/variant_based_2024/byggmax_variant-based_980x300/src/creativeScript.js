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

  $('#product_image_top').html(content.product_image_top.value);
  
  //Append background image
  $("#bgImage").css("background-image","url("+local_content.background_asset.value+")");
  //Append overlay image
  $("#productOverlay").css("background-image","url("+local_content.layover_asset.value+")");
  //Append logo image
  $("#logo").css("background-image","url("+local_content.logo_source.value+")");
  //Append overlay image
  $("#productOverlay").css("background-image","url("+local_content.layover_asset.value+")");

  let topValue = parseInt(content.product_image_top.value, 10);

if (topValue) {
    // If topValue is a valid number, apply it to the .productImage element
    $('.productImage').css({
        'top': topValue + 'px',
    });
} else {
    // If topValue is not valid, the CSS from the stylesheet will be used
    $('.productImage').css({}); // No inline top value is applied, so it will fallback to the stylesheet value
}

  //Product box 1
  //Check if price has sup element and append correct CSS class
// Check if product_1_price contains <sup>
// Check if product_1_price contains <sup>
if (local_content.product_1_price.value.includes('<sup>')) {
  // Add the price with sup and currency
  $("#productPrice_1").html(
    `<span class="mainPrice">${local_content.product_1_price.value}</span><span class='priceCurrencySup'>kr</span>`
  );
  
  // Increase margin-left of productContainer_1 to account for sup
  $("#productContainer_1").css("margin-left", "30px"); // Adjust value as needed
  } else {
  // Add the price without sup and currency
  $("#productPrice_1").html(
    `<span class="mainPrice">${local_content.product_1_price.value}</span><span class='priceCurrency'>kr</span>`
  );
  
  // Reset margin-left of productContainer_1
  $("#productContainer_1").css("margin-left", "10px");
  }
  
  // Handle empty price case
  if (local_content.product_1_price.value === '') {
  $("#productPrice_1").html(local_content.product_1_price.value);
  }

  //Append product name
  $("#productName_1").html(local_content.product_1_copy.value);
  //Append product image
  $("#productImage_1").css("background-image","url("+local_content.product_1_image.value+")");
  //Append product container
  $("#productContainer_1").css("background-image","url("+local_content.product_1_container.value+")");

  //Product box 2
 //Check if price has sup element and append correct CSS class
// Check if product_2_price contains <sup>
// Check if product_2_price contains <sup>
if (local_content.product_2_price.value.includes('<sup>')) {
  // Add the price with sup and currency
  $("#productPrice_2").html(
    `<span class="mainPrice">${local_content.product_2_price.value}</span><span class='priceCurrencySup'>kr</span>`
  );
  
  // Increase margin-left of productContainer_2 to account for sup
  $("#productContainer_2").css("margin-left", "30px"); // Adjust value as needed
  } else {
  // Add the price without sup and currency
  $("#productPrice_2").html(
    `<span class="mainPrice">${local_content.product_2_price.value}</span><span class='priceCurrency'>kr</span>`
  );
  
  // Reset margin-left of productContainer_2
  $("#productContainer_2").css("margin-left", "10px");
  }
  
  // Handle empty price case
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

tl.fromTo('#productPrice_1, #product_1_oldPrice, #productName_1, #productContainer_1', 0.3, { opacity: 0, ease: Linear.ease }, { opacity: 1, ease: Linear.ease }, 0) //Product price and product name 1 fade in
  .fromTo('#productImage_1', 0.3, { x: 100, opacity: 0, ease: Linear.ease }, { x: 0, opacity: 1, ease: Linear.ease }, 0) //Product image 1 fade in
  .to('#productPrice_1, #product_1_oldPrice, #productName_1, #productContainer_1', 0.3, { opacity: 0, ease: Linear.ease }, 3) //Product price and product name 1 fade out
  .to('#productImage_1', 0.3, { x: 100, opacity: 0, ease: Linear.ease }, 3) //Product image 1 fade out
  .fromTo('#productPrice_2, #product_2_oldPrice, #product_2_subCopy, #productName_2, #product_2_mainCopy, #productContainer_2', 0.3, { opacity: 0, ease: Linear.ease }, { opacity: 1, ease: Linear.ease }, 3.3) //Product price and product name 2 fade in
  .fromTo('#productImage_2', 0.3, { x: 100, opacity: 0, ease: Linear.ease }, { x: 0, opacity: 1, ease: Linear.ease }, 3.3) //Product image 2 fade in
  .to('#productPrice_2, #product_2_oldPrice, #productName_2, #product_2_mainCopy, #product_2_subCopy, #productContainer_2', 0.3, { opacity: 0, ease: Linear.ease }, 6) //Product price and product name 2 fade out
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