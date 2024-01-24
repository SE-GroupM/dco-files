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
    
    //Append main copy
    var mainCopy = content.mainCopy.value;
    $('#mainCopy').html(mainCopy);

    //Append main copy
    var ctaCopy = content.ctaCopy.value;
    $('#ctaCopy').html(ctaCopy);

    //Background color of container
    var bgColor = content.bgColor.value;
    $('#creative_container').css({
      'background-color': bgColor,
    })

    //Product click funtion
    $('#creative_container').click(onClick);

    //Product collection from adset
    var product_collection = content.product_collection.value; 

    // Append name to product
    var productName = product_collection[0].productName.value;
    $('#productName').html(productName);

    // Append price to product
    var regularPrice = product_collection[0].regularPrice.value;
    var productSaving = product_collection[0].productPriceSaving.value;
    var productPriceType = product_collection[0].productPriceType.value;

    //Split regular price to find decimals 
    var normalPrice = parseFloat(regularPrice);
    normalPrice = normalPrice.toFixed(2);
    var tempNormal = normalPrice.split(".")

    //Append sup class on decimals
    if (tempNormal[1] > 0o0) {
      //Ex. 88.88
      $('#regularPrice').html(tempNormal[0] + '<span class="priceSup">' + tempNormal[1]  + ' </span>');
    } else {
      //Ex. 88,-
      $('#regularPrice').html(tempNormal[0] + '.-');
    }

    //Check product price type and append css
    if (productPriceType === 'regular') {
      $('#regularPrice').addClass('regularPrice');
    } else if (productPriceType === 'sale') {
      $('#regularPrice').addClass('salePrice')
    } else if (productPriceType === 'julaclub') {
      $('#regularPrice').html('JulaClub <br><span style="font-size: 75px; line-height: 70px;">' + regularPrice + '.-</span>')
      $('#regularPrice').addClass('clubPrice');
    }

    //Check if product saving is !=0 and append saleElement class
    if (productSaving !== '0') {
      $('#priceElement').html('Spara ' + productSaving);
      $('#priceElement').addClass('saleElement');
    }

    //Check if price type is 'tokbilligt' and append heroElement class and salePrice class
    if (productPriceType === 'tokbilligt') {
      $('#regularPrice').addClass('salePrice')
      $('#priceElement').html('Tokbilligt!');
      $('#priceElement').addClass('heroElement');
    }

    // Append image to product
    var productImage =  product_collection[0].productImage.value;
    $('#productImage').css({
    backgroundImage: 'url("' + productImage + '")',
    'background-size': 'contain',
    'background-repeat': 'no-repeat',
    'background-position': 'center'
    });

    //Animation of product boxes
    var t2 = new TimelineMax();
    t2.fromTo('#productBox', 0.7, {y: -240, opacity: 0} ,{y: 0, opacity: 1},0.2)

  // Append click to product box
  function onClick (event) {
      return window.dispatchEvent(
        new CustomEvent('lemonpi.interaction/click', {
          detail: {
            placeholder: ['product_collection', 0, 'productUrl'],
          }
      }));
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