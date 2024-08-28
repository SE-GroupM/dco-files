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

    $('#bg_color').css({
      'background-color': local_content.bgColor.value,
    });

     //Append logo
     $('#logo').css({
      'background-image': 'url('+local_content.logo.value+ ')'
    });

    
    //Click function on slider
    $('#slider').click(onClick)

    // World click source
    var click = local_content.worldClick.value;

    var display_product_price = local_content.display_product_price.value;
    var display_product_description = local_content.display_product_description.value;

    //Product collection from adset
    var products = local_content.product_collection.value;

    //For loop appending products
    for (var i = 0; i < 4; i++){ 

      // Append image to product
      $('#productImage_' + i).css({
          backgroundImage: 'url("' + products[i].productImage.value + '")',
        });

      $('#productDescription_'+i).html(products[i].productDescription.value);
      truncateProductText('#productDescription_'+i, 100)
      // Append name to product
      $('#productName_'+i).html(products[i].productName.value);
      //Truncate product name
      truncateProductText('#productName_'+i, 75)

      //Formatting prices
      var productPrice = products[i].productPriceNumber.value;
      var discountPriceNumber = products[i].productDiscountPriceNumber.value;

      // Append image to product
      $('#productPrice_'+i).html(productPrice + ',-');

      if (discountPriceNumber > 0) {
        $('#productPrice_'+i).html('<span class="salePrice">' + productPrice + ',-</span> <span class="oldPrice">'+ products[i].productAveragePrice.value + '</span>');
      }
      // display description text, yes or no
      if (display_product_description === "yes") {
        document.querySelector('#productDescription_'+i).style.display = 'block';    
      } else if (display_product_price === "no") {
        document.querySelector('#productDescription_'+i).style.display = 'none';     
      }
      // display price elements, yes or no
      if (display_product_price === "yes") {
        document.querySelector('#productPrice_'+i).style.display = 'block';    
      } else if (display_product_price === "no") {
        document.querySelector('#productPrice_'+i).style.display = 'none';     
    }
  
      // Append cta to product
      $('#cta_'+i).html(local_content.ctaText.value); 

    }  // End of loop

  // Get coordinates for click    
  function showCoords(event) {
    var x = event.clientX;
    var coords = x;
    return coords;
    
  }

  function onClick(event) {
    var x = showCoords(event);
  
    if (x >= 515 && x <= 745 && currentSlide === 1) {
      window.dispatchEvent(new CustomEvent('lemonpi.interaction/click', {
        detail: {
          placeholder: ['product_collection', 0, 'click'],
        }
      }));
    }
    else if (x >= 515 && x <= 735 && currentSlide === 2) {
      window.dispatchEvent(new CustomEvent('lemonpi.interaction/click', {
        detail: {
          placeholder: ['product_collection', 1, 'click'],
        }
      }));
    }
    else if (x >= 515 && x <= 735 && currentSlide === 3) {
      window.dispatchEvent(new CustomEvent('lemonpi.interaction/click', {
        detail: {
          placeholder: ['product_collection', 2, 'click'],
        }
      }));
    }
    else if (x >= 515 && x <= 735 && currentSlide === 4) {
      window.dispatchEvent(new CustomEvent('lemonpi.interaction/click', {
        detail: {
          placeholder: ['product_collection', 3, 'click'],
        }
      }));
    }
  }
  

    // Get current slide index
    var currentSlide = 1; // Initialize current slide to slide 1
    // Animation of product boxes
    var t2 = new TimelineMax({
      repeat: -1,
      onUpdate: function() {
          var currentTime = t2.time();
          if (currentTime < 3) {
              if (currentSlide !== 1) {
                  currentSlide = 1;
              }
          } else if (currentTime >= 4 && currentTime < 7) {
              if (currentSlide !== 2) {
                  currentSlide = 2;
              }
          } else if (currentTime >= 8 && currentTime < 11) {
              if (currentSlide !== 3) {
                  currentSlide = 3;
              }
          } else if (currentTime >= 12 && currentTime < 15) { // Adjust this to match the desired duration
              if (currentSlide !== 4) {
                  currentSlide = 4;
              }
          }
      }
  });
  
  // Define slide animations with correct timing
  t2.fromTo('#slide_1', 0.7, {x: -510, ease: Linear.ease}, {x: 0, ease: Linear.ease}, 0)
    .to('#slide_1', 0.7, {x: 500, ease: Linear.ease}, 4)
    .fromTo('#slide_2', 0.7, {x: -510, ease: Linear.ease}, {x: 0, ease: Linear.ease}, 4)
    .to('#slide_2', 0.7, {x: 1200, ease: Linear.ease}, 8)
    .fromTo('#slide_3', 0.7, {x: -510, ease: Linear.ease}, {x: 0, ease: Linear.ease}, 8)
    .to('#slide_3', 0.7, {x: 1200, ease: Linear.ease}, 12)
    .fromTo('#slide_4', 0.7, {x: -510, ease: Linear.ease}, {x: 0, ease: Linear.ease}, 12)
    .to('#slide_4', 0.7, {x: 1200, ease: Linear.ease}, 16); // Adjust end time to 16 to keep consistent intervals
  

    // Truncate function
    function truncateProductText(selector, truncLength) {
      var element = $(selector);
      var truncateLength = truncLength;
      
      var sentence = element[0].innerText;
      var result = sentence;
      var resultArray = result;
      element.css({
          height: 'auto',
      });
      if (sentence.length >= truncateLength){
        result = resultArray.split(" ").splice(0, 5).join(" ");
        
        splitSentence = result.split(" ")
        secondCheck = splitSentence[0] + ' ' + splitSentence[1];
        threeWords = splitSentence[0] + ' ' + splitSentence[1] + ' ' + splitSentence[2];
        fourWords = splitSentence[0] + ' ' + splitSentence[1] + ' ' + splitSentence[2] + ' ' + splitSentence[3];
        
        if (fourWords.length >= truncateLength){
          result = threeWords;
        }
        if (threeWords.length >= truncateLength){
          result = secondCheck;
        }
        if (secondCheck.length >= truncateLength){
          result = splitSentence[0]
        }
        element.text(result + '...');
      } else{
        element.text(result);
      }
      return result;
    }
  
    });
  });

