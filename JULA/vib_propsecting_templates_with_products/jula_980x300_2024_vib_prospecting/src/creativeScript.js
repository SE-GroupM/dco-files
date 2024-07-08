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
  const content = event.detail.content; 
  const source = event.detail.source;
});

onLemonpiReady(function () {
  lemonpi.subscribe(function callback(content) {
    var local_content = content;

    var videoSrc = local_content.videoSrc.value;
    var videoTracker = local_content.videoTracker.value;
    
    var e = document.createElement('script');
    e.src = 'https://video.seenthis.se/v2/player/74/player.js';
    e.onload = function() {
      var player = new SeenthisPlayer('.player', videoSrc, videoTracker, options);
    };
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(e, s);

    var options = {
      loop: true,
      loopCount: 3,
      autoplay: true,
      muteButton: true,
    };

    var bgColor = local_content.bgColor.value;
    $('#creative_container').css('background-color', bgColor);

    var ctaText = local_content.ctaText.value;
    $('#ctaText').html(ctaText);
    $('#ctaText').css({
      'background-color': local_content.ctaBgColor.value,
      'color': local_content.ctaTextColor.value,
    });

    var productBgColor = local_content.productBgColor.value;
    $('#productBox').css('background-color', productBgColor);

    var productNameColor = local_content.productNameColor.value;
    $('#productName').css('color', productNameColor);

    var campaignText = local_content.campaignText.value;
    $('#campaignText').html(campaignText).css('color', productNameColor);

    var local_product_collection = local_content.product_collection.value;

    function updateProductDisplay(index) {
      var product = local_product_collection[index];

      function numberWithSpaces(x) {
        var parts = parseFloat(x).toFixed(2).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
      }

      var regularPrice = product.regularPrice.value;
      var productPriceType = product.productPriceType.value;

      var formattedRegularPrice = numberWithSpaces(regularPrice);

      var tempNormal = formattedRegularPrice.split(".");
      
      if (parseInt(tempNormal[1]) > 0) {
        $('#regularPrice').html(tempNormal[0] + '<span class="priceSup">' + tempNormal[1] + ' </span>');
      } else {
        $('#regularPrice').html(tempNormal[0] + '<span style="letter-spacing: -6px; padding-right: 8px;">.-</span>');
      }

      var formattedProductPriceType = numberWithSpaces(productPriceType);

      $('#productPriceType').html(formattedProductPriceType);
      
      if (productPriceType === 'regular') {
        var productPriceColor = local_content.productPriceColor.value;
        $('#regularPrice').css('color', productPriceColor);
      } else if (productPriceType === 'sale') {
        if (tempNormal[1] > 0) {
          $('#regularPrice').html(tempNormal[0] + '<span class="priceSup">' + tempNormal[1] + ' </span>');
        } else {
          $('#regularPrice').html(tempNormal[0] + '<span style="letter-spacing: -6px; padding-right: 8px;">.-</span>');
        }
        $('#regularPrice').addClass('salePrice');
      } else if (productPriceType === 'julaclub') {
        if (tempNormal[1] > 0) {
          $('#regularPrice').html('JulaClub <br><span style="font-size: 52px; line-height: 58px;">' + tempNormal[0] + '<span class="priceSup">' + tempNormal[1] + '</span></span>');
        } else {
          $('#regularPrice').html('JulaClub <br><span style="font-size: 52px; line-height: 58px;">' + tempNormal[0] + '<span style="letter-spacing: -7px; padding-right: 8px;">.-</span>');
        }
        $('#regularPrice').addClass('clubPrice');
      }

      var productSaving = product.productPriceSaving.value;
      productSaving = productSaving.replace(".-", "");
      if (productSaving !== "0") {
        $('#priceElement').html('Spara ' + productSaving + '<span style="letter-spacing: -1px; padding-right: 2px;">.-</span>');
        $('#priceElement').addClass('saleElement');
      }

      if (productPriceType.toLowerCase().includes('kalasprodukt')) {
        $('#regularPrice').addClass('salePrice');
        $('#priceElement').html(productPriceType);
        $('#priceElement').addClass('heroElement');
      }

      var productImage = product.productImage.value;
      $('#productImage').css({
        'background-image': 'url("' + productImage + '")',
        'background-size': 'contain',
        'background-repeat': 'no-repeat',
        'background-position': 'center'
      });

      var priceInfo = product.productLatestPrice.value;
      $('#priceInfo').html(priceInfo);

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

    var widthOnBanner = 250;
    var currentProductIndex = 0;
    var main_timeline = new TimelineMax({ repeat: -1, delay: 0.2, onRepeat: function () {
      currentProductIndex = (currentProductIndex + 1) % 3;
      updateProductDisplay(currentProductIndex);
    } });

    main_timeline
    .fromTo('#productBox', 0.2, { opacity: 0, x: widthOnBanner }, { opacity: 1, x: 0, ease: "power2.out" }, 0.1)
    .fromTo('#productInfo', 0.5, { opacity: 0 }, { opacity: 1, ease: "power2.out" }, 0.1)
    .to('#productBox', 0.5, { x: 0, ease: "power1.out" }, "+=0.2")
    .to('#productBox', 0.3, { x: widthOnBanner, opacity: 0 }, "+=3.5")
    .to('#productInfo', 0.5, { opacity: 0, ease: "power1.out" }, "-=0.3")
    .set('#productBox', { x: widthOnBanner });

    updateProductDisplay(currentProductIndex);
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Function to detect if the user is on Windows and using Edge/Chrome/similar
  function isWindowsAndModernBrowser() {
    const userAgent = navigator.userAgent;

    const isWindows = userAgent.indexOf('Windows') > -1;
    const isEdge = userAgent.indexOf('Edg') > -1;
    const isChrome = userAgent.indexOf('Chrome') > -1 && !isEdge;

    return isWindows && (isEdge || isChrome);
  }

  // If the condition is met, inject additional CSS
  if (isWindowsAndModernBrowser()) {
    const style = document.createElement('style');
    style.innerHTML = `
      .saleElement {
        top: 114px !important;
      }
      .heroElement {
        top: 114px !important;
      }
    `;
    document.head.appendChild(style);
  }
});
