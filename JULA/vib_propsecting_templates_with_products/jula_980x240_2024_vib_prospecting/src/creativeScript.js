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
  const content = event.detail.content; // get content placeholders from Choreograph Adsets
  const source = event.detail.source;
});

// Callback to retrieve the adset data
onLemonpiReady(function () {
  lemonpi.subscribe(function callback(content) {
    
    // Local content variable
    var local_content = content;

     //////////////////////////////////////////////////////////////////////////////
    /////////////////////////// VIDEO CONTAINER //////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

     // Define the video source and tracker variables
     var videoSrc = local_content.videoSrc.value;
     var videoTracker = local_content.videoTracker.value;
 
     //Video player
     var e = document.createElement('script');
     e.src = 'https://video.seenthis.se/v2/player/74/player.js';
     e.onload = function(){
     var player = new SeenthisPlayer('.player', videoSrc, videoTracker, options);
     };
     var s = document.getElementsByTagName('script')[0];
     s.parentNode.insertBefore(e, s);
 
       //Options for video script
     var options = {
         loop: true,
         loopCount: 3,
         autoplay: true,
         muteButton: true,
     };

    // Background color of container
    var bgColor = local_content.bgColor.value;
    $('#creative_container').css({
      'background-color': bgColor,
    });

    // CTA placeholders from CC
    var ctaText = local_content.ctaText.value;
    $('#ctaText').html(ctaText);
    $('#ctaText').css({
      'background-color': local_content.ctaBgColor.value,
      'color': local_content.ctaTextColor.value,
    });

    // Background color of product box
    var productBgColor = local_content.productBgColor.value;
    $('#productBox').css({
      'background-color': productBgColor,
    });

    //Text color of product name
    var productNameColor = local_content.productNameColor.value;
    $('#productName').css({
      'color': productNameColor,
    });
    
    // Controlls styling and content of campaign text/header text
    var campaignText = local_content.campaignText.value;
    $('#campaignText').html(campaignText)
    $('#campaignText').css({
       'color': productNameColor,
    })

    // Product collection from adset
    var local_product_collection = local_content.product_collection.value;

    // Function to update the product display
    function updateProductDisplay(index) {
      var product = local_product_collection[index];

      // Append name to product
      //$('#productName').html(product.productName.value);

      // Append price to product
      var regularPrice = product.regularPrice.value;
      var productPriceType = product.productPriceType.value;

      // Split regular price to find decimals 
      var normalPrice = parseFloat(regularPrice);
      normalPrice = normalPrice.toFixed(2);
      var tempNormal = normalPrice.split(".");

      // Append sup class on decimals
      if (tempNormal[1] > 0) {
        // Ex. 88.88
        $('#regularPrice').html(tempNormal[0] + '<span class="priceSup">' + tempNormal[1] + ' </span>');
      } else {
        // Ex. 88,-
        $('#regularPrice').html(tempNormal[0] + '<span style="letter-spacing: -8px; padding-right: 8px;">.-</span>');
      }

      // Check product price type and append css
      if (productPriceType === 'regular') {
        // Text color of product price
        var productPriceColor = local_content.productPriceColor.value;
        $('#regularPrice').css({
          'color': productPriceColor,
        });
      } else if (productPriceType === 'sale') {
        // If product price type is sale
        if (tempNormal[1] > 0) {
          // Ex. 88.88
          $('#regularPrice').html(tempNormal[0] + '<span class="priceSup">' + tempNormal[1] + ' </span>');
        } else {
          // Ex. 88,-
          $('#regularPrice').html(tempNormal[0] + '<span style="letter-spacing: -8px; padding-right: 8px;">.-</span>');
        }
        $('#regularPrice').addClass('salePrice');
      } else if (productPriceType === 'julaclub') {
        // If product price type is Jula club
        if (tempNormal[1] > 0) {
          // Ex. 88.88
          $('#regularPrice').html('JulaClub <br><span style="font-size: 72px; line-height: 62px;">' + tempNormal[0] + '<span class="priceSup">' + tempNormal[1] + '</span></span>');
        } else {
          // Ex. 88,-
          $('#regularPrice').html('JulaClub <br><span style="font-size: 72px; line-height: 62px;">' + tempNormal[0] + '<span style="letter-spacing: -8px; padding-right: 8px;">.-</span>');
        }
        $('#regularPrice').addClass('clubPrice');
      }

      // Saving element ex. '60.-'
      var productSaving = product.productPriceSaving.value;
      // Slice '.-' to style it according to guidelines
      productSaving = productSaving.replace(".-", "");
      // Check if product saving is > 0 and append saleElement class
      if (productSaving !== "0") {
        $('#priceElement').html('Spara ' + productSaving + '<span style="letter-spacing: -1px; padding-right: 2px;">.-</span>');
        $('#priceElement').addClass('saleElement');
      }

      // Check if price type is 'Tokbilligt' or kalasproduct (update since week 11 on site) and append heroElement class and salePrice class
      if (productPriceType.toLowerCase().includes('kalasprodukt')) {
        $('#regularPrice').addClass('salePrice');
        $('#priceElement').html(productPriceType);
        $('#priceElement').addClass('heroElement');
      }

      // Append image to product
      var productImage = product.productImage.value;
      $('#productImage').css({
        backgroundImage: 'url("' + productImage + '")',
        'background-size': 'contain',
        'background-repeat': 'no-repeat',
        'background-position': 'center'
      });

      // Append lowest price last 30 days
      var priceInfo = product.productLatestPrice.value;
      $('#priceInfo').html(priceInfo);

      // Update click URL
      $('#worldClick').off('click').on('click', function () {
        window.dispatchEvent(
          new CustomEvent('lemonpi.interaction/click', {
            detail: {
              placeholder: ['product_collection', index, 'productUrl'],
            }
          })
        );
      });
    }

    // Animation to loop through products
    var widthOnBanner = 250;
    var currentProductIndex = 0;
    var main_timeline = new TimelineMax({ repeat: -1, delay: 0.2, onRepeat: function () {
      currentProductIndex = (currentProductIndex + 1) % 3;
      updateProductDisplay(currentProductIndex);
    } });

    main_timeline
    .fromTo('#productBox', 0.2, { opacity: 0, x: widthOnBanner }, { opacity: 1, x: 0, ease: "power2.out" }, 0.1) // Fast fade in
    .fromTo('#productInfo', 0.5, { opacity: 0 }, { opacity: 1, ease: "power2.out" }, 0.1) // Fade in product info
    .to('#productBox', 0.5, { x: 0, ease: "power1.out" }, "+=0.2") // Slow down and stay for a bit
    .to('#productBox', 0.3, { x: widthOnBanner, opacity: 0 }, "+=3.5") // Stay for 3.5 seconds and fade out
    .to('#productInfo', 0.5, { opacity: 0, ease: "power1.out" }, "-=0.3") // Fade out product info
    .set('#productBox', { x: widthOnBanner }); // Reset to start position for seamless looping

    // Initialize display with the first product
    updateProductDisplay(currentProductIndex);

  });
});
