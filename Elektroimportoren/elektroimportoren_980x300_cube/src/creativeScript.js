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

window.addEventListener('lemonpi.content/ready', event => {
  const content = event.detail.content // get content placeholders from Choreograph Adsets
  const source = event.detail.source
  
});

// Callback to retrieve the adset data
onLemonpiReady(function () {
  lemonpi.subscribe(function callback(content) {

    //importing product collection from Elon//Choreograph
  var products = content.products.value;

//Local varaible for content
var local_content = content;

const logo = content.logo.value;
const main_copy = content.main_copy.value;
var cta_text = content.cta_text.value;

$('#logo').css({
  'background-image': `url(${logo})`,
  'background-repeat': 'no-repeat',
  'background-size': 'contain'
});

  //Product click funtion - set to "creative_contatiner" to make it work
$('#click').click(onClick);

$('#main_copy').html(main_copy);

$('#worldClick').click(onClick);

  // Append product_name to cube
  var product_price =  products[0].product_price.value;
  $('#product_price').html(product_price+",-");

    // Append product_name to cube
  var product_name =  products[0].product_name.value;
  $('#product_name').html(product_name);

   // Append product_name to cube
   var product_image =  products[0].product_image.value;
   $('#product_image').css({
    'background-image': `url(${product_image})`,
    'background-repeat': 'no-repeat',
    'background-size': 'contain'
  });

  // Assuming products is an array of product objects
for (var i = 0; i < products.length; i++) {
  var product_name = products[i].product_name.value;
  var product_price = products[i].product_price.value;
  var product_image = products[i].product_image.value;
  var cta_text = local_content.cta_text.value;
  var click = products[i].click.value;

  // Do something with product_name, for example, logging it to the console
  console.log("Product " + (i + 1) + ": " + product_name);
}

  ////////////////
 ///FUNCTIONS////
////////////////

// JavaScript Code for Rotating the Cube

(function() {
  let currentFaceIndex = 0; // Initialize the current face index
  const rotationStep = 90; // Each face rotation in degrees
  const cube = document.querySelector('.cube'); // Get the cube

  // Function to update cube rotation
  function updateCubeRotation() {
      const angle = currentFaceIndex * -rotationStep;
      cube.style.transform = `rotateY(${angle}deg)`;
  }

  // Function to handle "next" button click
  document.getElementById('next').addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent the event from bubbling up
      currentFaceIndex = (currentFaceIndex + 1) % 4; // Increment index, loop back to 0 after 3
      updateCubeRotation(); // Update the cube's rotation
  });

  // Function to handle "prev" button click
  document.getElementById('prev').addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent the event from bubbling up
      currentFaceIndex = (currentFaceIndex - 1 + 4) % 4; // Decrement index, loop back to 3 if at 0
      updateCubeRotation(); // Update the cube's rotation
  });
})();

var currentIndex = 0;

function updateProductInfo() {
  var sides = document.querySelectorAll('.side');
  sides.forEach(function(side, index) {
    var productIndex = (currentIndex + index) % products.length;
    var product = products[productIndex];
    side.innerHTML = `
      <div class="product_info" id="product_info_${index}">
        <div id="product_image_${index}" class="product_image" style="background-image: url('${product.product_image.value}')"></div>
        <div id="product_name_${index}" class="product_name">${product.product_name.value}</div>
        <div id="product_price_${index}" class="product_price">${(product.product_price.value+",-")}</div>
        <div id="cta_text" class="cta_text">${local_content.cta_text.value}</div>
        </div>
    `;
  });

  currentIndex++;
  if (currentIndex >= products.length) currentIndex = 0;
}

let angle = 0;
const cube = document.getElementById('cube');

function rotateCube() {
  angle += 0.5; // Speed of the rotation
  cube.style.transform = `rotateY(${angle}deg)`;
  requestAnimationFrame(rotateCube);
}

rotateCube(); // Start the rotation

// Update product info every 6 seconds to match the cube rotation and pause
setInterval(updateProductInfo, 6000);
  
  // Append click to product box
  function onClick (event) {
    return window.dispatchEvent(
      new CustomEvent('lemonpi.interaction/click', {
        detail: {
          placeholder: ['products', 0, 'click'],
        }
    }));

// Initial state
let currentFaceIndex = 0; // 0: front, 1: right, 2: back, 3: left
const rotationStep = 90; // Each face rotation step in degrees

  } 
});

// Get the div element by its id
var worldClickDiv = document.getElementById('worldClick');

// Add a click event listener to the div
worldClickDiv.addEventListener('click', function() {
 // Opens the specified URL in a new window or tab
 // window.open('');
});
});
