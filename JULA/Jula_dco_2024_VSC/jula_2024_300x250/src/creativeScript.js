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
  var bgColor = content.bgColor.value;
  $('#creative_container').css({
    'background-color': bgColor,
  })
  var productUrl = product_collection[0].productUrl.value;
  var productUrl = content.productUrl.value;  
  var ctaCopy = content.ctaCopy.value;
  var mainCopy = content.mainCopy.value; 
  var productName = product_collection[0].productName.value;
  $('#productName').html(productName)
  // Append price to product
  var regularPrice = product_collection[0].regularPrice.value;
  $('#regularPrice').html(regularPrice + ':-');
      // Append image to product
      var productImage =  product_collection[0].productImage.value;
      $('#productImage').css({
      backgroundImage: 'url("' + productImage + '")',
      'background-size': 'contain',
      'background-repeat': 'no-repeat',
      });

      $('#creative_container').click(onClick)

  /////////////////////
//// ANIMATIONS /////
////////////////////

// Animation of product boxes
var t2 = new TimelineMax({ repeat: -1, delay: 0.2 });
t2.fromTo('#productBox', 1, { x: -300 }, { x: 0 }, 0.1)
  .to('#productBox', 0.3, { x: 300 }, "+=1.5")
  .set('#productBox', { x: -300 }); // Reset to start position for seamless looping
    });

      var productUrl = product_collection[0].productUrl.value;
      $('#productUrl').click(onClick)
      $('#productUrl').html(productUrl)

  //$('#regularPrice').html(regularPrice)
  var logo = content.logo.value;
  $('#logo').css({
    'position': 'absolute',
    });

    function onClick (event) {
      return window.dispatchEvent(
        new CustomEvent('lemonpi.interaction/click', {
          detail: {
            placeholder: ['product_collection', 0, 'productUrl'],
          }
      }));
  }

})
