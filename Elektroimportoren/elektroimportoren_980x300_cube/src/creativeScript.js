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

//Local varaible for content
var local_content = content;

const logo = content.logo.value;
const main_copy = content.main_copy.value;
const products = local_content.products.value;
const main_copy_size = content.main_copy_size.value;

let rotation = 0;
let currentProduct = 0;

// Apply logo and main copy
$('#logo').css({
  'background-image': `url(${logo})`,
  'background-repeat': 'no-repeat',
  'background-size': 'contain'
});

$('#main_copy').html(main_copy);

$('#main_copy').css({
  'font-size': main_copy_size + 'px',
  'line-height': main_copy_size + 'px'});

$('#worldClick').click(onClick);

$("#next").click(function(){
  rotate("left")
});

$('#product_click').click(onProductClick);

$("#prev").click(function(){
  rotate("right")
});

// Mouse enter and leave events for next and prev buttons
$("#next, #prev").mouseenter(function() {
  stopAutoRotate(); // Stops the carousel when mouse enters the button area
});

$("#next, #prev").mouseleave(function() {
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
  }
  function updatePricesAndDisplayDiscounts(products) {
    // Assuming products is an array and already defined in your scope
    products.forEach((product, i) => {
        // Find both price elements for each product
        const productPriceElement = $(`#product-price-${i}`);
        const promotionPriceElement = $(`#promotion-price-${i}`);
        
        // Check if both elements exist and the promotion price is not empty
        if (productPriceElement.length && promotionPriceElement.length && product.promotion_price.value) {
            // Parse prices from products to floats
            const productPrice = parseFloat(product.product_price.value);
            const promotionPrice = parseFloat(product.promotion_price.value);
            
            // Calculate discount percentage and round it to remove decimals
            const discountPercentage = Math.round((productPrice - promotionPrice) / productPrice * 100);
            
            // Check if the discount percentage is negative
            if (discountPercentage < 0) {
                // Optionally hide the promotion price element if the discount is negative
                promotionPriceElement.hide();
            } else {
                // If the discount is valid, update the product price and display the discount
                productPriceElement.html(promotionPrice + ",-");
                promotionPriceElement.html("Kampanje - " + discountPercentage + "%");            }
        } else {
        }
    });
}

// Call the function with your products array
updatePricesAndDisplayDiscounts(products);


  function truncate() {
    // Select all elements with class 'product-name'
    const elements = document.querySelectorAll('.product-name');
  
    elements.forEach(element => {
      // Check if text length is more than 25 characters and truncate if necessary
      if (element.innerText.length > 40) {
        element.innerText = element.innerText.substring(0, 36) + '...';
      }
    });
  
    // Additionally, check if there's an element with ID 'product-name'
    const idElement = document.getElementById('product-name');
    if (idElement && idElement.innerText.length > 40) {
      // Apply truncation for the ID element as well
      idElement.innerText = idElement.innerText.substring(0, 36) + '...';
    }
  }
  
  // Run the function to apply the text truncation
  truncate();
  
});

  let rotation = 0; // Assuming you have this variable to track the cube's rotation
let autoRotateInterval;

function startAutoRotate() {
  // Start rotating the cube every 1.2 seconds (to account for the transition time)
  autoRotateInterval = setInterval(() => {
    rotate('left'); // Rotate the cube to the right

    // Pause for 1 second on each face
    setTimeout(() => {
      // This space intentionally left blank to demonstrate the pause effect
    }, 1000); // This matches the 1 second pause requirement
  }, 2200); // 1.2 seconds for rotation transition + 1 second pause
}

function stopAutoRotate() {
  clearInterval(autoRotateInterval); // Stops the automatic rotation
}

// Call startAutoRotate to begin the automatic rotation when desired
startAutoRotate();

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

  