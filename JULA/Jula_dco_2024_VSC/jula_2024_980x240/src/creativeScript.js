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
    // code here
    // Advanced mapping of dynamic content
    // You can call the content directly once it's collected by lemonpi.subscribe method
    // Example content.[placeholder_name].value

var product_collection = content.product_collection.value; 
console.log(content)
  var bgColor = content.bgColor.value;
  $('#creative_container').css({
    'background-color': bgColor,
  })
  var ctaCopy = content.ctaCopy.value;
  var mainCopy = content.mainCopy.value; 
  var productName = product_collection[0].productName.value;
  $('#productName').html(productName)
  var regularPrice = product_collection[0].regularPrice.value; 
  
      // Append image to product
      var productImage =  product_collection[0].productImage.value;
      $('#productImage').css({
      backgroundImage: 'url("' + productImage + '")',
      'background-size': 'contain',
      'background-repeat': 'no-repeat',
      });
    
  //$('#regularPrice').html(regularPrice)
  var logo = content.logo.value;
  $('#logo').css({
    'position': 'absolute',
    'top': '20px',
    });
    });

// Get the div element by its id
 // Get the div element by its id
 var worldClickDiv = document.getElementById('worldClick');
  
 // Add a click event listener to the div
 worldClickDiv.addEventListener('click', function() {
   // Opens the specified URL in a new window or tab
   // window.open('');
 });
 /////////////////////
//// ANIMATIONS /////
////////////////////
var imgProduct_leftvalue = '-194px';

var animateOnce = new TimelineMax({ repeat: 0, delay: 0.2 }) // starts the entire timeline after a 1.5-second delay
.from('#subCopy, #mainCopy', 0.2, { autoAlpha: 0 }) // fades in #imgCopy over 1.5 seconds
.from('#imgCopy', 0.4, { autoAlpha: 0 }) // fades in #imgCopy over 1.5 seconds
.from('#imgProduct', 0.7, { autoAlpha: 0, left: imgProduct_leftvalue }) // fades in #img and moves it from left -94px to its current position
.fromTo('#subCopy', 0.2, { scale: 1 }, { scale: 1.2, repeat: 1, yoyo: true, ease: Power1.easeInOut }); // "inflates" and "deflates" #subCopy
});