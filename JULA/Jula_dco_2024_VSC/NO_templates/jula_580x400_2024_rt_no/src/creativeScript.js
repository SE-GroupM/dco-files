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
    
    //Local content variable
    var local_content = content;

    //Product click funtion
    $('#creative_container').click(onClick);

    //Background color of container
    var bgColor = local_content.bgColor.value;
    $('#creative_container').css({
      'background-color': bgColor,
    })

    //Background color of product box
    var productBgColor = local_content.productBgColor.value;
    $('#productBox').css({
      'background-color': productBgColor,
    })

    //Product collection from adset
    var local_product_collection = local_content.product_collection.value; 

    // Append name to product
    var productName = local_product_collection[0].productName.value;
    $('#productName').html(productName);
    //Text color of product name
    var productNameColor = local_content.productNameColor.value;
    $('#productName').css({
      'color': productNameColor,
    })

    // Append price to product
    var regularPrice = local_product_collection[0].regularPrice.value;
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
      $('#regularPrice').html(tempNormal[0] + '<span style="letter-spacing: -8px; padding-right: 8px;">.-</span>');
    }

    //Check product price type and append css
    if (productPriceType === 'regular') {
      //Text color of product price
      var productPriceColor = local_content.productPriceColor.value;
      $('#regularPrice').css({
        'color': productPriceColor,
      })
    } else if (productPriceType === 'sale') {
      //If product price type is sale
      if (tempNormal[1] > 0o0) {
        //Ex. 88.88
        $('#regularPrice').html(tempNormal[0] + '<span class="priceSup">' + tempNormal[1]  + ' </span>');
      } else {
        //Ex. 88,-
        $('#regularPrice').html(tempNormal[0] + '<span style="letter-spacing: -8px; padding-right: 8px;">.-</span>');
      }
      $('#regularPrice').addClass('salePrice');
    } else if (productPriceType === 'julaclub') {
      //If product price type is Jula club
      if (tempNormal[1] > 0o0) {
        //Ex. 88.88
        $('#regularPrice').html('JulaClub <br><span style="font-size: 60px; line-height: 50px;">' + tempNormal[0] + '<span class="priceSup">' + tempNormal[1]  + '</span></span>');
      } else {
        //Ex. 88,-
        $('#regularPrice').html('JulaClub <br><span style="font-size: 60px; line-height: 50px;">' + tempNormal[0] + '<span style="letter-spacing: -8px; padding-right: 8px;">.-</span>');
      }
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
if (productPriceType.toLowerCase().includes('festprodukt')) {
  $('#regularPrice').addClass('salePrice')
  $('#priceElement').html(productPriceType);
  $('#priceElement').addClass('heroElement');
}

    var OSName="Unknown OS";
    // Specific CSS positioning for Windows browsers
    if (navigator.appVersion.indexOf("Win")!=-1) {
 
      OSName="Windows";
      if (navigator.appVersion.includes('Edg')) {
        
      }
      // WIN
      $('.heroElement').css({
        right: '64px',
      });
    }

    // Append image to product
    var productImage =  local_product_collection[0].productImage.value;
    $('#productImage').css({
    backgroundImage: 'url("' + productImage + '")',
    'background-size': 'contain',
    'background-repeat': 'no-repeat',
    'background-position': 'center center'
    });

    // Append lowest price last 30 days
    var priceInfo = local_product_collection[0].productLatestPrice.value;
    $('#priceInfo').html(priceInfo);

    var widthOnBanner = 580;
    var main_timeline = new TimelineMax({ repeat: -1, delay: 0.2 });
    main_timeline.fromTo('#productBox', 0.3, { x: widthOnBanner}, { x: 0 }, 0.1)
    .from('#productInfo',0.6,{autoAlpha:0},0.2)
    .to('#productBox', 0.3, { x: -widthOnBanner }, "+=2.5")
    .to('#productInfo',0.25,{autoAlpha:0},3.2)
    .set('#productBox', { x: widthOnBanner }); // Reset to start position for seamless

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
