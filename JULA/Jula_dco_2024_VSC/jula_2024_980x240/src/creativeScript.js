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
    
    //Background color of container
    var bgColor = content.bgColor.value;
    $('#creative_container').css({
      'background-color': bgColor,
    })

    //Product collection from adset
    var product_collection = content.product_collection.value; 
    console.log(product_collection)
    // Append name to product
    var productName = product_collection[0].productName.value;
    $('#productName').html(productName);
    // Append price to product
    var regularPrice = product_collection[0].regularPrice.value;
    var productSaving = product_collection[0].productPriceSaving.value;
    var productPriceType = 'julaclub';//product_collection[0].productPriceType.value;

    $('#regularPrice').html(regularPrice + ',-');

    if (productPriceType === 'regular') {
      $('#regularPrice').addClass('regularPrice');
    } else if (productPriceType === 'sale') {
      $('#regularPrice').addClass('salePrice')
    } else if (productPriceType === 'julaclub') {
      $('#regularPrice').html('JulaClub <br><span style="font-size: 55px;">' + regularPrice + ',-</span>')
      $('#regularPrice').addClass('clubPrice');
    }
    
    console.log(regularPrice)
    console.log(productSaving)
    console.log(productPriceType)

    // Append image to product
    var productImage =  product_collection[0].productImage.value;
    $('#productImage').css({
    backgroundImage: 'url("' + productImage + '")',
    'background-size': 'contain',
    'background-repeat': 'no-repeat',
    'background-position': 'center'
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
});
