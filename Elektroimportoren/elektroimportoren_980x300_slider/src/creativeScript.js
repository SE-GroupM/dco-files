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
const content = event.detail.content
const source = event.detail.source

//Local varaible for content
var local_content = content;

const logo = content.logo.value;
const main_copy = content.main_copy.value;
const products = local_content.products.value;

let rotation = 0;
let currentProduct = 0;

// Defines how long the slider displays each product before a new one displays
var timeBetweenSlides = 3;

// Apply logo and main copy
$('#logo').css({
  'background-image': `url(${logo})`,
  'background-repeat': 'no-repeat',
  'background-size': 'contain'
});

$('#main_copy').html(main_copy);

$('#worldClick').click(onClick);

$("#next").click(function(){
  rotate("left")
});

$('#product_click').click(onProductClick);

$("#prev").click(function(){
  rotate("right")
});

  console.log(local_content)
  console.log(products)
  for (i = 0; i < 4; i++) {
    //Find product image div and append image
    $("#product-image-" + i).css("content","url("+products[i].product_image.value+")");
    //Find product name div and append name
    $("#product-name-" + i).html(products[i].product_name.value);
    //Find price div and append price
    $("#product-price-" + i).html(products[i].product_price.value+",-");
    //Find cta div and append cta copy
    $("#cta-text-" + i).html(local_content.cta_text.value); 
  }


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

  