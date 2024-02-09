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
    
    //Local variable from adset
    var local_content = content;

    //Append main copy
    var mainCopy = local_content.mainCopy.value;
    $('#mainCopy').html(mainCopy);

    //Append cta copy
    var ctaCopy = local_content.ctaCopy.value;
    $('#ctaCopy').html(ctaCopy);

    //Background color of container
    var bgColor = local_content.bgColor.value;
    $('#creative_container').css({
      'background-color': bgColor,
    })

    //Product click funtion
    $('#creative_container').click(onClick);

    //Product collection from adset
    var local_product_collection = local_content.product_collection.value; 

    // Append name to product
    var productName = local_product_collection[0].productName.value;
    $('#productName').html(productName);

    // Append price to product
    var regularPrice = local_product_collection[0].regularPrice.value;
    var productSaving = local_product_collection[0].productPriceSaving.value;
    var productPriceType = local_product_collection[0].productPriceType.value;

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
      $('#regularPrice').html(tempNormal[0] + '<span style="letter-spacing: -10px; padding-right: 8px;">.-</span>');
    }
    
    //Check product price type and append css
    if (productPriceType === 'regular') {
      $('#regularPrice').addClass('regularPrice');
    } else if (productPriceType === 'sale') {
      $('#regularPrice').addClass('salePrice');
      $('#priceElement').html('Spara ' + productSaving + '<span style="letter-spacing: -1px; padding-right: 2px;">.-</span>');
      $('#priceElement').addClass('saleElement');
    } else if (productPriceType === 'julaclub') {
      $('#regularPrice').html('JulaClub <br><span style="font-size: 72px; line-height: 72px;">' + regularPrice + '<span style="letter-spacing: -8px; padding-right: 8px;">.-</span></span>')
      $('#regularPrice').addClass('clubPrice');
    }

    // Saving element ex. '60.-'
    var productSaving = local_product_collection[0].productPriceSaving.value;
    // Slice '.-' to style it according to guidelines
    productSaving = productSaving.replace(".-","");
    //Check if product saving is > 0 and append saleElement class
    if (productSaving !== "0") {
      $('#priceElement').html('Spara ' + productSaving + '<span style="letter-spacing: -1px; padding-right: 2px;">.-</span>');
      $('#priceElement').addClass('saleElement');
    }

    //Check if price type is 'tokbilligt' and append heroElement class and salePrice class
    if (productPriceType === 'tokbilligt') {
      $('#regularPrice').addClass('salePrice')
      $('#priceElement').html('Tokbilligt!');
      $('#priceElement').addClass('heroElement');
    }

    // Append image to product
    var productImage =  local_product_collection[0].productImage.value;
    $('#productImage').css({
    backgroundImage: 'url("' + productImage + '")',
    'background-size': 'contain',
    'background-repeat': 'no-repeat',
    'background-position': 'center'
    });

    //Animation of product boxes
    var main_timeline = new TimelineMax({ repeat: -1, delay: 0.2 });
    main_timeline.fromTo('#productBox', 1, { x: -640 }, { x: 0 }, 0.1)
    .to('#productBox', 0.3, { x: 640 }, "+=1.5")
    .set('#productBox', { x: -640 }); // Reset to start position for seamless looping

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
});