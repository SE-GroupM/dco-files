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
   
    var local_content= content;

    //Append main copy text
    $('#mainCopy').html(local_content.mainCopy.value);
    //Append main copy color
    $('#mainCopy').css({
      'color': local_content.copyColor.value,
    });

    //Append background image
    $('#bgImage').css({
      'background-image': 'url('+local_content.bgImage.value+ ')'
    });

     //Append logo
     $('#logo').css({
      'background-image': 'url('+local_content.logo.value+ ')'
    });
    
    $('#slider').click(onClick)

    //Product collection from adset
    var products = local_content.product_collection.value;

    for (var i = 0; i < 4; i++){ 

      // Append image to product
      $('#productImage_' + i).css({
          backgroundImage: 'url("' + products[i].productImage.value + '")',
        });

      // Append image to product
      $('#productName_'+i).html(products[i].productName.value);

      //Formatting prices
      var productPrice = products[i].productPriceNumber.value;
      var discountPriceNumber = products[i].productDiscountPriceNumber.value;

      // Append image to product
      $('#productPrice_'+i).html(productPrice + ',-');

      if (discountPriceNumber > 0) {
        $('#productPrice_'+i).html('<span class="salePrice">' + productPrice + ',-</span> <span class="oldPrice">'+ products[i].productAveragePrice.value + '</span>');
      }

      // Append cta to product
      $('#cta_'+i).html(local_content.ctaText.value);
      
    
    }
      
    function showCoords(event) {
      var x = event.clientX;
      var coords = x;
      return coords;
    }

  function onClick (event) {
    // Check coordinates for which product area is clicked on.
    var x = showCoords(event);
    
      if (x >= 515 && x <= 735 && currentSlide === 1) {
        return window.dispatchEvent(
          new CustomEvent('lemonpi.interaction/click', {
            detail: {
              placeholder: ['product_collection', 0, 'click'],
            }
        }));
      }
      else if (x >= 750 && x <= 970 && currentSlide === 1) {
        return window.dispatchEvent(
          new CustomEvent('lemonpi.interaction/click', {
            detail: {
                placeholder: ['product_collection', 1, 'click'],
            }
        }));
      }
      else if (x >= 515 && x <= 735 && currentSlide === 2) {
        return window.dispatchEvent(
          new CustomEvent('lemonpi.interaction/click', {
            detail: {
                placeholder: ['product_collection', 2, 'click'],
            }
        }));
      }
      else if (x >= 750 && x <= 970 && currentSlide === 2) {
        return window.dispatchEvent(
          new CustomEvent('lemonpi.interaction/click', {
            detail: {
                placeholder: ['product_collection', 3, 'click'],
            }
        }));
      }
    } 

    var currentSlide = 1; // Initialize current slide to slide 1
    // Animation of product boxes
    var t2 = new TimelineMax({
        repeat: -1,
        onUpdate: function() {
            // Check if the animation is currently in the first slide
            if (t2.time() < 4) { // Assuming each slide animation lasts for 4 seconds
                if (currentSlide !== 1) {
                    currentSlide = 1;
                }
            }
            // Check if the animation is currently in the second slide
            else if (t2.time() >= 4 && t2.time() < 8) {
                if (currentSlide !== 2) {
                    currentSlide = 2;
                }
            }
        }
    });

    //Animation of product boxes
    var t2 = new TimelineMax({repeat: -1});
      t2.fromTo('#slide_1', 0.7, {x: -510, ease: Linear.ease} ,{x: 0, ease: Linear.ease},0)
      .to('#slide_1', 0.7, {x: 510, ease: Linear.ease},4)
      .fromTo('#slide_2', 0.7, {x: -510, ease: Linear.ease} ,{x: 0, ease: Linear.ease},4)
      .to('#slide_2', 0.7, {x: 510, ease: Linear.ease},8)

      // World click source
      var click = local_content.worldClick.value;
      // Get the div element by its id
      var worldClickDiv = document.getElementById('creative_container');
      worldClickDiv.href = click;
      // Add a click event listener to the div
      worldClickDiv.addEventListener('click', function() {
        
        window.open(click);
        // Opens the specified URL in a new window or tab
        //window.open('');
      });

  });
});
  