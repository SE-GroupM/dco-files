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
    // code here
    
  });
});

// Fetch data from adset
window.addEventListener('lemonpi.content/ready', event => {
  // object holding all data from adset
  const content = event.detail.content;
  const source = event.detail.source;

  //Local variable for content
  var local_content = content;

  const logo = content.logo.value;
  const main_copy = content.main_copy.value;
  const products = local_content.products.value;
  const main_copy_font_size = local_content.main_copy_size.value;
  const main_copy_line_height = parseInt(main_copy_font_size) + 3 + 'px';
  const container_color = local_content.container_color.value;
  const container_copy_color = local_content.container_copy_color.value;
  const cta_bg_color = local_content.cta_bg_color.value;
  const cta_text_color = local_content.cta_text_color.value;
  const product_frame_color = local_content.product_frame_color.value;
  const product_price_text_color = local_content.product_price_text_color.value;
  const promotion_text_color = local_content.promotion_text_color.value;
  const promotion_bg_color = local_content.promotion_bg_color.value;

  let rotation = 0;
  let currentProduct = 0;
  let autoRotateInterval;

  // Apply logo and main copy
  $('#logo').css({
    'background-image': `url(${logo})`,
    'background-repeat': 'no-repeat',
    'background-size': 'contain',
  });

  $('#main_copy').html(main_copy);

  $('#main_copy').css({
    'font-size': main_copy_font_size + 'px',
    'line-height': main_copy_line_height,
    'color': container_copy_color,
  });

  $('#right_box').css({
    'background-color': container_color,
  });
  
  $('.cta-text').css({
    'background-color': cta_bg_color,
    'color': cta_text_color,
  });
  
  $('.cube__face').css({
    'border-color': product_frame_color,
  });
  
  $('.product-price').css({
    'color': product_price_text_color,
  });

  $('.promotion_price').css({
    'color': promotion_text_color,
    'background-color': promotion_bg_color,
  });

  $('#worldClick').click(onClick);

  $('#product_click').click(onProductClick);

  $("#next").click(function(){
    rotate("left")
  });

  $("#prev").click(function(){
    rotate("right")
  });

  // Mouse enter and leave events for next and prev buttons
  $("#creative_container").mouseenter(function() {
    stopAutoRotate(); // Stops the carousel when mouse enters the button area
  });

  $("#creative_container").mouseleave(function() {
    startAutoRotate(); // Resumes the carousel when mouse leaves the button area
  });

  for (i = 0; i < 4; i++) {
    //Find product image div and append image
    $("#product-image-" + i).css("content","url("+products[i].product_image.value+")");
    //Find product name div and append name
    $("#product-name-" + i).html(products[i].product_name.value);
    //Find price div and append price
    $("#product-price-" + i).html(products[i].product_price.value+",-");
    //Find cta div and append cta copy
    $("#cta-text-" + i).html(local_content.cta_text.value); 
    //Find discount div and append discount
    $("#promotion-price-" + i).html(products[i].promotion_price.value);
    // Call the function with your products array
    updatePricesAndDisplayDiscounts(products[i]);
  }
  // Run the function to apply the text truncation
  truncateProductName();
  // Call startAutoRotate to begin the automatic rotation when desired
  startAutoRotate();

      ///////////////////
     //// FUNCTIONS ////
    ///////////////////

  function updatePricesAndDisplayDiscounts(product) {
    // Assuming products is an array and already defined in your scope
    // Find both price elements for each product
    const productPriceElement = $("#product-price-" + i);
    const promotionPriceElement = $("#promotion-price-" + i);
    const productPrice = parseFloat(product.product_price.value);
    const promotionPrice = parseFloat(product.promotion_price.value);
    // Calculate discount percentage and round it to remove decimals
    const discountPercentage = Math.round((productPrice - promotionPrice) / productPrice * 100);
    // Check if both elements exist and the promotion price is not empty
    if (productPriceElement.length && promotionPriceElement.length && product.promotion_price.value) {
        // Check if the discount percentage is negative
        if (discountPercentage < 0) {
            // Optionally hide the promotion price element if the discount is negative
            promotionPriceElement.hide();
        } else {
            // If the discount is valid, update the product price and display the discount
        productPriceElement.html(promotionPrice + ",-");
        promotionPriceElement.html(discountPercentage + "% rabatt");            }
    } else {
    }
  }
  function truncateProductName() {
    // Select all elements with class 'product-name'
    const elements = document.querySelectorAll('.product-name');
    elements.forEach(element => {
      // Check if text length is more than 25 characters and truncate if necessary
      if (element.innerText.length > 40) {
        element.innerText = element.innerText.substring(0, 36) + '...';
      }
    });
  }

  function startAutoRotate() {
    // Start rotating the cube every 1.2 seconds (to account for the transition time)
    autoRotateInterval = setInterval(() => {
    rotate('left'); // Rotate the cube to the right
    setTimeout(() => {
    }, 1000); // This matches the 1 second pause requirement
    }, 2200); // 1.2 seconds for rotation transition + 1 second pause
  }
  function stopAutoRotate() {
    clearInterval(autoRotateInterval); // Stops the automatic rotation
  }
   
    // If you ever need to stop the auto-rotation, call stopAutoRotate()
  function rotate(direction) {
    if (direction === 'left') {
      rotation -= 90;
    } else if (direction === 'right') {
      rotation += 90;
    }
    document.getElementById('cube').style.transform = `rotateY(${rotation}deg)`;
  }
  function onClick (event) {
    return window.dispatchEvent(
      new CustomEvent('lemonpi.interaction/click', {
        detail: {
          placeholder: 'worldClick'
        }
    }));
  }
  function onProductClick (event) {
    currentProduct = event.target.id.split("-").pop();
    return window.dispatchEvent(
      new CustomEvent('lemonpi.interaction/click', {
        detail: {
          placeholder: ['products', currentProduct, 'click'],
        }
    }));
  }

});
  