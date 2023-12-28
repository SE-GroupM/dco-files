/**
  * Template Name
  * @Owner Name Developer
  * @Date
*/
function onLemonpiReady(cb) {
  if (cb) {
      var loadLemonpiTimerId = setInterval(function() {
          if (window.lemonpi) {
              clearInterval(loadLemonpiTimerId);
              cb();
          }
      }, 0);
  }
}

window.addEventListener('lemonpi.content/ready', event => {
console.clear();
  const content = event.detail.content
  const source = event.detail.source

  
  let product_container = document.getElementById("product_carousel");
  let creative = document.getElementById("creative_container");

  let image_1 = content.product_image_1.value;
  let image_2 = content.product_image_2.value;
  let image_3 = content.product_image_3.value;

  const images = [ image_1, image_2, image_3 ]
  let currentImageIndex = 1;

  let url_1 = content.url_destination.value;
  let url_2 = content.url_destination_2.value;
  let url_3 = content.url_destination_3.value;

  //use_slide_3_text: declairing if slide_3_text is used or not
  let use_slide_3_text = JSON.parse(content.use_slide_3_text.value);
  // holding bg image src
  const bg_img = content.bg_img.value;
  let use_bg_img = false;
  
  if (bg_img.includes('https:')) {
    use_bg_img = true;
  }else{
    use_bg_img = false;
  }
  // if we are gonna use a asset image as bg
  if (use_bg_img) {
    $('#bg_div').css({
      content: 'url('+ bg_img + ')',
      'background-position': 'center center',
      'position' : 'absolute',
      'background-size': 'contain',
    });
  }else {
    $('#bg_div').css({
      'background-color': bg_img,
      'width': '100%',
    });
  }

  const urls = [url_1, url_2, url_3]

  var leftDirectionVar = 580; // Controlls the slider value, on how much it should move the images.

  $('#copy_1_text').html(content.copy_1_text.value)  
  $('#copy_2_text').html(content.copy_2_text.value)
  $('#copy_3_text').html(content.copy_3_text.value)   

  $('#logo_image').css({
      content: 'url('+ content.logo_image.value + ')',
  });

  $('#arrow_left, #arrow_right').click(onArrowClick)

  // skapar en variabel/boolean för use_slide_3_text
  // om den är 1 eller true så ska slide_3_text användas,
  // annars ska image_3 användas.

  for (let i = 1; i < 4; i++) {
    if (i == 3) {
      if(use_slide_3_text) {
        // Create a div with text content when use_slide_3_text is true
        $("<div>", {
          'html': content.slide_3_text.value,
          'class': "product_" + i + ' product_image',
          css: {
        'font-family': 'CEWE',
        'font-size':'27px',
        'line-height':'38px',
        'color':'white',
        'text-align':'center',
        'top':'82px',
        'left': 44 + (i-1)* (leftDirectionVar) + 'px',
        'width': '350px',
      },
    }).appendTo(product_container);
  }else {
    $("<div>", {
      'class': "product_" + i + ' product_image' ,
      css: {
        content: 'url('+ images[i-1] + ')',
        'background-repeat': 'no-repeat',
        'background-position': 'center center',
        'position' : 'absolute',
        'left': 30 + (i-1)* (leftDirectionVar) + 'px',
        'width': '350px',
        'height': 'auto',
        'top':'60px'
      },
    }).appendTo(product_container);
  }
  } else if (i == 1) {
    // slide 1
    $("<div>", {
      
      'class': "product_" + i + ' product_image' ,
      css: {
          content: 'url('+ images[i-1] + ')',
          'background-repeat': 'no-repeat',
          'background-position': 'center center',
          'position' : 'absolute',
          'left': 30 + (i-1)* (leftDirectionVar) + 'px',
          'width': '350px',
          'height': 'auto',
          'top':'60px'
      },
    }).appendTo(product_container);
  } else {
    // slide 2
    $("<div>", {
      'class': "product_" + i + ' product_image' ,
      css: {
          content: 'url('+ images[i-1] + ')',
          'background-repeat': 'no-repeat',
          'background-position': 'center center',
          'position' : 'absolute',
          'left': 30 + (i-1)* (leftDirectionVar) + 'px',
          'width': '350px',
          'height': 'auto',
          'top':'60px'
      },
    }).appendTo(product_container);
  }
}

function onArrowClick(event) {
  var direction = event.currentTarget.id === 'arrow_left' ? '+=' : '-=';
  var goAhead = false;
  
  if (direction == "+=" && currentImageIndex > 1) {
    currentImageIndex--;
    goAhead = true;
  } else if (direction == "-=" && currentImageIndex < 3) {
    currentImageIndex++;
    goAhead = true;
  }
  if (goAhead) {
    
    function goBackTostart (currentIndex, direction) {
      if (currentIndex === 3 && direction =='-='){
        var tl = new TimelineMax();
        tl.to(".product_image", 0.7, { left: direction + -(leftDirectionVar*2), ease: Power1.easeInOut, delay: 2.2}, 0)
      }else{
  
      }
    }

    var tl = new TimelineMax({});

    tl.to(".product_image", 0.7, { left: direction + leftDirectionVar, ease: Power1.easeInOut}, 0)
    .call(goBackTostart,[currentImageIndex, direction], null,tl.duration())
    tl.to(".product_image", 0.7, { left: direction + leftDirectionVar, ease: Power1.easeInOut}, 9)
    .call(goBackTostart,[currentImageIndex, direction], null,tl.duration())
    tl.to(".product_image", 0.7, { left: direction + leftDirectionVar, ease: Power1.easeInOut}, 18)
    .call(goBackTostart,[currentImageIndex, direction], null,tl.duration())
    tl.to(".product_image", 0.7, { left: direction + leftDirectionVar, ease: Power1.easeInOut}, 27)
  }
  
}
 // Click event handler for the "world_click" div
//  document.getElementById('world_click').onclick = function (event) {

//   // Retrieve the URL from the data attribute of the currently displayed product image
//   var currentURL = document.querySelector('div.product_'+currentImageIndex+'.product_image').getAttribute('data-url');

//   var carousel_element = event.srcElement.nextElementSibling;
//   var slider_element_1_left_value = carousel_element.querySelector(".product_1").style.left;

// // URL 1 - if slider_element_1_left_value is greater than 10 and less than 100
// if (parseInt(slider_element_1_left_value) > 10 && parseInt(slider_element_1_left_value) < 100) {
//   currentURL = url_1;
// }
// // URL 2 - if slider_element_1_left_value is greater than -300 and less than -200
//   else if (parseInt(slider_element_1_left_value) > -300 && parseInt(slider_element_1_left_value) < -200) {
//     currentURL = url_2;
//   } 
//  // URL 3 - if slider_element_1_left_value is greater than -650 and less than -500
//  else if (parseInt(slider_element_1_left_value) > -650 && parseInt(slider_element_1_left_value) < -500) {
//   currentURL = url_3;
//   }

//   // Open the URL
//  //window.open(currentURL, '_blank');
// };

document.getElementById('world_click').onclick = () =>
window.dispatchEvent(
    new CustomEvent('lemonpi.interaction/click', {
    detail: {
        placeholder: ['url_destination'],
    }
})
);

    $('#content')
    .on('mouseenter touchstart', onUserEnter)
    .on('mouseleave touchend', onUserLeave)
    
    function onUserEnter(event) {
      autoSwipeAnimation.stop();
    }
    function onUserLeave(event) {
      autoSwipeAnimation.restart();
    }
      
    function playAutoSwipeAnimation() {
      $("#arrow_right").click();
    }
    
    TweenMax.set('#copy_2_text', { autoAlpha:0 });
    TweenMax.set('#copy_3_text', { autoAlpha:0 });
    
    var autoSwipeAnimation = new TimelineMax({ repeat: -1 })
    .add(playAutoSwipeAnimation, 3)
    
var textAnimation = new TimelineMax({repeat:-1})
  .fromTo('#copy_1_text', 0.7, { autoAlpha:0 }, { autoAlpha: 1 }) 
  .to('#copy_1_text', 0.7, { autoAlpha:0, delay: 2}) 
  .to('#copy_2_text', 0.7, { autoAlpha:1}) 
  .to('#copy_2_text', 0.7, { autoAlpha:0, delay:1.5})
  .to('#copy_3_text', 0.7, { autoAlpha:1}) 
  .to('#copy_3_text', 0.7, { autoAlpha:0, delay:1.5}) 
  
  })
