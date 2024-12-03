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
    // code here
    // Advanced mapping of dynamic content
    // You can call the content directly once it's collected by lemonpi.subscribe method
    // Example content.[placeholder_name].value
  });
});

window.addEventListener('lemonpi.content/ready', event => {
  const content = event.detail.content
  const source = event.detail.source
  // Do stuff

  var local_content = content;

  //console.log(content)

  $('#prev').css({
    'background-image': 'url('+local_content.left_arrow.value+ ')'
  });

  $('#next').css({
    'background-image': 'url('+local_content.right_arrow.value+ ')'
  });

  $('#logo').css({
    'background-image': 'url('+local_content.logo.value+ ')'
  });

  $('#project-headline').html(local_content.vacant_homes.value[0].project_headline.value);

  $('#project-image').css({
    'background-image': 'url('+local_content.vacant_homes.value[3].project_image.value+ ')'
  });

  $('#vacant-home-image1').css({
    'background-image': 'url('+local_content.vacant_homes.value[0].vacant_home_image.value+ ')'
  });

  $('#vacant-home-image2').css({
    'background-image': 'url('+local_content.vacant_homes.value[1].vacant_home_image.value+ ')'
  });

  $('#vacant-home-image3').css({
    'background-image': 'url('+local_content.vacant_homes.value[2].vacant_home_image.value+ ')'
  });

  $('#vacant-home-image4').css({
    'background-image': 'url('+local_content.vacant_homes.value[3].vacant_home_image.value+ ')'
  });

  $('#vacant-home-info1').html(local_content.vacant_homes.value[0].vacant_home_info.value);
  $('#vacant-home-info2').html(local_content.vacant_homes.value[1].vacant_home_info.value);
  $('#vacant-home-info3').html(local_content.vacant_homes.value[2].vacant_home_info.value);
  $('#vacant-home-info4').html(local_content.vacant_homes.value[3].vacant_home_info.value);

  //Colors Setup
  $('#content').css({
    'background-color': local_content.background_color.value,
    'color': local_content.text_color.value
  });

  $('#cta').css({
    'background-color': local_content.cta_color.value,
    'color': local_content.cta_text_color.value
  });

  

  const Slider = {
    currentSlideIndex: 1,
    create: function(options) {
        const defaults = {
            slider: ".slider",
            slide: ".slide",
            prevBtn: ".next",
            nextBtn: ".prev",
            duration: 0.5,
            setSlideContent: null,
            animation: function(timeline, slidesWrapper, currentSlide, lastSlide, index, target, onComplete) {
                timeline.to(slidesWrapper, {
                    duration: duration,
                    ease: "power2.inOut",
                    x: target,
                    onComplete: onComplete
                });
            }
        };

        const settings = Object.assign({}, defaults, options);

        const slidesContainer = document.querySelector(settings.slider);
        const duration = settings.duration;
        const slideTemplate = slidesContainer.querySelector(settings.slide);
        const slidesWrapper = document.createElement("div");
        const prevBtn = document.querySelector(settings.prevBtn);
        const nextBtn = document.querySelector(settings.nextBtn);
        const slideWidth = slideTemplate.clientWidth;
        const slidesData = options.slidesData;

        let slideIndex = 1;
        let isAnimating = false;

        $('#cta').html(local_content.vacant_homes.value[0].cta_text.value);

        const elements = document.querySelectorAll('.worldClick');
        // Loop through each element and add the click listener
        elements.forEach((element, index) => {
            element.addEventListener('click', function(event) {
                onWorldClick(event, index); // Call the onWorldClick function with event and index
            });
        });

        document.getElementById("cta-holder").addEventListener('click', function(event) {
          console.log("HELLO")
            onWorldClick(event, 0); // Call the onWorldClick function with event and index
          });

        document.getElementById("logo-holder").addEventListener('click', function(event) {
            onWorldClick(event, 0); // Call the onWorldClick function with event and index
        });
        

        const innerDiv = document.querySelectorAll('.inner-div');
            // Loop through each element and add the click listener
        innerDiv.forEach((element, index) => {
            element.addEventListener('click', function(event) {
              onWorldClick(event, index);
            });
        });

        function createSlide(slideData, index) {
            const slideDiv = slideTemplate.cloneNode(true);
            slideTemplate.remove();
            slideDiv.id = 'slide-' + index;
            settings.setSlideContent(slideDiv, slideData, index);
            slidesWrapper.appendChild(slideDiv);

            // Add click event listener for each slide
            slideDiv.addEventListener('click', function(event) {
                onClick(event, index);
            });
            
            

            
            
        }

        function animateSlider(index, previousIndex, onComplete) {
            const currentSlide = slidesWrapper.querySelectorAll(settings.slide)[index];
            const lastSlide = slidesWrapper.querySelectorAll(settings.slide)[previousIndex];
            const target = -slideWidth * index;
            const timeline = gsap.timeline({onComplete: onComplete});
            settings.animation(timeline, slidesWrapper, currentSlide, lastSlide, index, target, onComplete);
           
        }

        function nextSlide() {
          if (isAnimating) return;
          isAnimating = true;
          slideIndex--;
      
          const totalSlides = slidesData.length;
      
          animateSlider(slideIndex, slideIndex + 1, function() {
              // Check if we've moved past the first slide
              if (slideIndex < 0) {
                  slideIndex = totalSlides - 1; // Reset to the last slide
                  // Reposition to the end without animation glitch
                  gsap.set(slidesWrapper, {x: -slideWidth * slideIndex});
              }
              isAnimating = false;
              Slider.currentSlideIndex = slideIndex;
          });
          
          let slideIndexHolder = slideIndex;
          
          if (slideIndexHolder == -1){
            slideIndexHolder = 3;
          }

          if (slideIndexHolder == 0){
            slideIndexHolder = 4;
          }

          console.log("Current Home Next "+slideIndexHolder);
          $('#cta').html(local_content.vacant_homes.value[slideIndexHolder-1].cta_text.value);
          
          setCurrentHome(slideIndexHolder);
      }


        function prevSlide() {
          if (isAnimating) return;
          isAnimating = true;
          slideIndex++;
          
          const totalSlides = slidesData.length;
          animateSlider(slideIndex, slideIndex - 1, function() {
              if (slideIndex >= totalSlides) {
                  slideIndex = 0;
                  // Reposition to the start without animation glitch
                  gsap.set(slidesWrapper, {x: 0});
              }
              
              Slider.currentSlideIndex = slideIndex;
              isAnimating = false;
              

          });
          console.log("Current Home Prev "+slideIndex);
          $('#cta').html(local_content.vacant_homes.value[slideIndex-1].cta_text.value);
          setCurrentHome(slideIndex);
        }

        slidesData.forEach((slideData, index) => createSlide(slideData, index));
        // Clone the last slide and append it to the beginning of the slidesWrapper
        const lastSlide = slidesWrapper.lastChild.cloneNode(true);
        const firstSlide = slidesWrapper.firstChild.cloneNode(true);
        lastSlide.id = "slide-2-clone";
        slidesWrapper.insertBefore(lastSlide, slidesWrapper.firstChild);
        firstSlide.id = "slide-0-clone";
        slidesWrapper.appendChild(firstSlide);

        slidesWrapper.id = "slidesWrapper";
        slidesWrapper.style.width = slideWidth * slidesWrapper.children.length + "px"; // set container width
        slidesWrapper.style.display = "flex"; // set container display
        slidesWrapper.style.transform = `translateX(-${slideWidth}px)`;
        slidesContainer.appendChild(slidesWrapper);
        nextBtn.addEventListener("click", nextSlide);
        prevBtn.addEventListener("click", prevSlide);


        function onClick(event, slideIndex) {
            // Handle the product click event
            event.preventDefault();

            console.log(slideIndex)
            window.dispatchEvent(
              new CustomEvent('lemonpi.interaction/click', {
                  detail: {
                      placeholder: ['vacant_homes', slideIndex, 'vacant_home_url'],
                  }
              })
            );
            
        }

        

      function setCurrentHome(num) {
        switch (num){
          case 1:
            $('#vacant-home-container1').css({
              'border': '1px solid rgba(255, 255, 255, 0.135)'
            });
            $('#vacant-home-container2, #vacant-home-container3, #vacant-home-container4').css({
              'border': '1px solid rgba(255, 255, 255, 0)'
            });
            break;
          case 2:
            $('#vacant-home-container2').css({
              'border': '1px solid rgba(255, 255, 255, 0.135)'
            });
            $('#vacant-home-container1, #vacant-home-container3, #vacant-home-container4').css({
              'border': '1px solid rgba(255, 255, 255, 0)'
            });
            break;
          case 3:
            $('#vacant-home-container3').css({
              'border': '1px solid rgba(255, 255, 255, 0.135)'
            });
            $('#vacant-home-container2, #vacant-home-container1, #vacant-home-container4').css({
              'border': '1px solid rgba(255, 255, 255, 0)'
            });
            break;
          case 4:
            $('#vacant-home-container4').css({
              'border': '1px solid rgba(255, 255, 255, 0.135)'
            });
            $('#vacant-home-container2, #vacant-home-container3, #vacant-home-container1').css({
              'border': '1px solid rgba(255, 255, 255, 0)'
            });
            break;
        }
      }

        // Add hover event listeners to pause and resume animation
        slidesContainer.addEventListener("mouseenter", function() {
            //gsap.globalTimeline.pause();
        });

        slidesContainer.addEventListener("mouseleave", function() {
            //gsap.globalTimeline.resume();
        });
    }
  };

  Slider.create({
    slidesData: local_content.vacant_homes.value,
    width: 320,
    setSlideContent: function(slideDiv, slideData, slideIndex) {
      $(slideDiv).find("#vacant-home-image-big").css("background-image","url("+slideData.vacant_home_image.value+")");

      var videoSrc = slideData.vacant_home_videoSrc.value
      var videoTracker = slideData.vacant_home_videoTracker.value
      
      console.log("Feature Type: "+slideData.vacant_home_feature_type.value)
      //Video player 
      var e = document.createElement('script');
      e.src = 'https://video.seenthis.se/v2/player/74/player.js';
      e.onload = function(){
        var player = new SeenthisPlayer('#player', videoSrc, videoTracker, options); 
      };

      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(e, s);

      //Options for video script
      var options = {
          loop: false,
          autoplay: false,
          muteButton: true,
      };
    }
  });

  //Adjust Font Size based on a set width
  const parentDiv = document.getElementById('vacant-home-image1');
  const innerDivs = document.querySelectorAll('.vacant-home-info');
  
  autoAdjustFontSize(innerDivs, parentDiv);
  
  function autoAdjustFontSize(innerDivs, parentDiv) {
    const updateFontSize = () => {
      const parentWidth = parentDiv.offsetWidth;
  
      innerDivs.forEach(innerDiv => {
        let fontSize = parseFloat(window.getComputedStyle(innerDiv).fontSize);
        innerDiv.style.fontSize = `${fontSize}px`;
  
        // Decrease font size until it fits within the parent width
        while (innerDiv.scrollWidth > parentWidth && fontSize > 1) {
          fontSize -= 1;
          innerDiv.style.fontSize = `${fontSize}px`;
        }
      });
    };
  
    // Add event listener to adjust font size when the window is resized
    window.addEventListener('resize', updateFontSize);
  
    // Initial call to adjust font size
    updateFontSize();
  }

})

//Helpers
function clearDivElements(divId) {
  const div = document.getElementById(divId);
  if (div) {
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
  } else {
    console.error('Div with the specified ID not found');
  }
}
// Clickthrough for anywhere else
function onWorldClick (event) {
  return window.dispatchEvent(
    new CustomEvent('lemonpi.interaction/click', {
      detail: {
        placeholder: ['vacant_homes', 0, 'project_url'],
      }
  }));
}

/*
function onWorldClick(event, slideIndex) {
  // Handle the product click event
  event.preventDefault();
  window.dispatchEvent(
    new CustomEvent('lemonpi.interaction/click', {
        detail: {
            placeholder: ['vacant_homes', 0, 'project_url'],
        }
    })
  );
  
}


function onClick (event) {
  return window.dispatchEvent(
    new CustomEvent('lemonpi.interaction/click', {
      detail: {
        placeholder: ['worldClick'],
      }
  }));
}
  */