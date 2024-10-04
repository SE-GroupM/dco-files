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

  $('#project-logo').css({
    'background-image': 'url('+local_content.vacant_homes.value[0].project_logo.value+ ')'
  });

  $('#project-headline').html(local_content.vacant_homes.value[0].project_headline.value);
  $('#cta').html(local_content.cta_text.value);

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
            
            const elements = document.querySelectorAll('.worldClick');
            // Loop through each element and add the click listener
            elements.forEach((element, index) => {
                element.addEventListener('click', function(event) {
                    onWorldClick(event, index); // Call the onWorldClick function with event and index
                });
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

          //console.log("Current Home Next "+slideIndexHolder);
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

          //console.log("Current Home Prev "+slideIndex);
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
            window.dispatchEvent(
              new CustomEvent('lemonpi.interaction/click', {
                  detail: {
                      placeholder: ['vacant_homes', slideIndex, 'vacant_home_url'],
                  }
              })
            );
            
        }

        function onWorldClick(event, slideIndex) {
          // Handle the product click event
          event.preventDefault();
          window.dispatchEvent(
            new CustomEvent('lemonpi.interaction/click', {
                detail: {
                    placeholder: ['vacant_homes', slideIndex, 'project_url'],
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
    }
  });

  // World click event caller
  //$('.worldClick').click(onClick);
  /*
  //Image Setup
  $('#cta').html(local_content.cta_text.value);
  
  $('#logo').css({
    'background-image': 'url('+local_content.logo.value+ ')'
  });

  $('#prev').css({
    'background-image': 'url('+local_content.left_arrow.value+ ')'
  });

  $('#next').css({
    'background-image': 'url('+local_content.right_arrow.value+ ')'
  });

  $('#project-image').css({
    'background-image': 'url('+local_content.vacant_homes.value[2].vacant_home_image.value+ ')'
  });

  $('#project-logo').css({
    'background-image': 'url('+local_content.vacant_homes.value[0].project_logo.value+ ')'
  });

  

  const Slider = {
    currentSlideIndex: 1,
    create: function(options) {
        const defaults = {
            slider: ".slider",
            slide: ".slide",
            prevBtn: ".prev",
            nextBtn: ".next",
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
            
            const elements = document.querySelectorAll('.worldClick');
            // Loop through each element and add the click listener
            elements.forEach((element, index) => {
                element.addEventListener('click', function(event) {
                    onWorldClick(event, index); // Call the onWorldClick function with event and index
                });
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
      
          //console.log("Next " + Slider.currentSlideIndex + " " + slidesData.length);
          $('#project-image').css({
              'background-image': 'url(' + local_content.vacant_homes.value[Slider.currentSlideIndex].vacant_home_image.value + ')'
          });
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
        
        // Update the background image after the animation
        $('#project-image').css({
            'background-image': 'url(' + local_content.vacant_homes.value[Slider.currentSlideIndex].vacant_home_image.value + ')'
        });
    });
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
            window.dispatchEvent(
              new CustomEvent('lemonpi.interaction/click', {
                  detail: {
                      placeholder: ['vacant_homes', slideIndex, 'vacant_home_url'],
                  }
              })
            );
            
        }

        function onWorldClick(event, slideIndex) {
          // Handle the product click event
          event.preventDefault();
          window.dispatchEvent(
            new CustomEvent('lemonpi.interaction/click', {
                detail: {
                    placeholder: ['vacant_homes', slideIndex, 'vacant_home_url'],
                }
            })
          );
          
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
      $(slideDiv).find("#vacant-home-image").css("background-image","url("+slideData.vacant_home_image.value+")");
      $(slideDiv).find("#vacant-home-info").html(slideData.vacant_home_info.value); 
    }
  });

*/
})


// Clickthrough for anywhere else

/*
function onClick (event) {
  return window.dispatchEvent(
    new CustomEvent('lemonpi.interaction/click', {
      detail: {
        placeholder: ['worldClick'],
      }
  }));
}
  */