/**
 * Template Name
 * @Owner Developer Name 
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
  // Called when lemonpi.content/ready is dispatched or has previously been
  // dispatched. It doesn't matter when you setup this event listener.
  onLemonpiReady(function () {
    lemonpi.subscribe(function callback(content) {
    // Do stuff
  
  
    console.clear();
    // Variables
  
    // Local content declaration
    const local_content = content;
    // Collection variable for titles
    let titles = local_content.titles.value;
    // Counter for amount of titles
    let amountOfTitles = parseInt(local_content.amountOfVisibleTitles.value);
    // add temporary list of all titles we should add to the template
    let listOftitles = [];
   
    for ( i=0; i < amountOfTitles; i++) {
      listOftitles[i] = titles[i].title_cover_1.value;
    }
  // list of all covers
    var listOfAllCovers = createObjectList(listOftitles);
    console.log(listOfAllCovers)
  
    // Boolean for using video or not
    let useVideo = parseInt(local_content.useVideo.value);
    
    // Local variable for body
    let leftImageContainer = document.getElementsByClassName("leftImgContainer");
    // Local variable for panel container
    let coverContainer = document.getElementById("covers");
    // Start position for title covers (should be able to change this dynamically)
    let startPositionForCovers = parseInt(local_content.leftPositionsOfCovers.value);    
    // Margin between title covers
    let titleMargins = parseInt(local_content.leftMarginsOfCovers.value);
    console.log(titleMargins);
    // logo from adset
    const logoBig = local_content.logo_big.value;
    // Width title cover (should also be able to change this dynamically)
    let widthCover = 66;
    // Height title cover (should also be able to change this dynamically)
    let heigthCover = 107;
    // Middle position of panel, should be dynamic as well
    let middleOfPanelContainer = parseInt($("#panel_container").css("width"))
    middleOfPanelContainer = (middleOfPanelContainer / 2) - titleMargins;
    // Current title object
    let currentTitleObject;
    // Integer for current exit click
    let currentIndexClick;
  
    // Append main copy
    $('#main_copy').html(local_content.main_copy.value)
    // Append Cta copy
    $('#cta_copy').html(local_content.cta_copy.value)
  
    $('#logo_big').css({
      content: 'url(' + logoBig + ')',
      'background-repeat': 'no-repeat',
      'background-position': 'center center',
    });
  
    $('.title_cover').css({
      'background-repeat': 'no-repeat',
      'background-position': 'center center',
      'position' : 'absolute',
      'width': widthCover + 'px',
      'height': heigthCover + 'px',
    });
  
    /////////////////////////////////
    ///////// FUNCTIONS ///////////
    ///////////////////////////////
  
    // cariable to make sure the function adding covers only runns one time.
    let done = false;
  
    // Control that we only run some functions once.
    function mainFunction () {
      // Call the function to add images when the page loads
    addImageCoversToContainer(listOfAllCovers);
    addImageCoversToContainer(listOfAllCovers); 
    }
  
    function createObjectList(dataList) {
      const objectList = [];
  
      dataList.forEach((url, index) => {
        const obj = {
          id: `title_${index}`,
          src: url,
          class: `title_cover_${index + 1} title_cover`
        };
  
        objectList.push(obj)
      });
      return objectList;
    }
  
      // Function to add images to the HTML div
  function addImageCoversToContainerOld(coverObjects) {
    console.log('HUR MÅNGA GÅNGER SKA DEN HÄR KÖRAS EGENTLIGEN!!!!!');
    
    // Get the reference to the image container div
    const imageContainer = coverContainer;
    const imageList = coverObjects;
    // Loop through the imageList and create img elements
     // Left value calculation
     let leftValueForTitles = (startPositionForCovers + (widthCover + titleMargins));
     coverContainer.style.left = leftValueForTitles +'px'; // Adjust the spacing as needed
     console.log(leftValueForTitles);
  
    imageList.forEach((image, index) => {
      const imgElement = document.createElement('img');
      imgElement.src = image.src;
      imgElement.id = image.id;
      imgElement.class = image.class;
     
      // Set left value to create a horizontal row
      //coverContainer.style.left = leftValueForTitles +'px'; // Adjust the spacing as needed
      imgElement.style.width = widthCover+'px';
      imgElement.style.height =heigthCover+'px';
      imgElement.style.paddingRight='8px';
  
      // Append the img element to the image container
      imageContainer.appendChild(imgElement);
    });
  }
  let addImageCoversToContainer = (function () {
    return function (coverObjects) {
        if (!done) {
          done = true;
          // Add function functionality
    
          // Get the reference to the image container div
          const imageContainer = coverContainer;
          const imageList = coverObjects;
          // Loop through the imageList and create img elements
          // Left value calculation
          let leftValueForTitles = (startPositionForCovers + (widthCover + titleMargins));
          coverContainer.style.left = leftValueForTitles +'px'; // Adjust the spacing as needed
  
          imageList.forEach((image, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.id = image.id;
            imgElement.class = image.class;
          
            // Set left value to create a horizontal row
            //coverContainer.style.left = leftValueForTitles +'px'; // Adjust the spacing as needed
            imgElement.style.width = widthCover+'px';
            imgElement.style.height =heigthCover+'px';
            imgElement.style.paddingRight='8px';
  
            // Append the img element to the image container
            imageContainer.appendChild(imgElement);
          });
          console.log(`Function Called one time with parameter: ${imageList}`);
  
                  // Check if we're going to dislay video or images 
          if (useVideo) {
            //Test variables for video
            var videoSrc = titles[0].video_src.value;
            var videoTracker = titles[0].video_tracker.value;
            
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
                loopCount: 1,
            };
        } else {
            // Add image of title instead
            $("<div>", {
                'id' : 'title_image',
                'class': "title_image_click",
                css: {
                    content: 'url('+ titles[0].title_cover_2.value + ')',
                    'position': 'absolute',
                    'width': '451px',
                    'height': '240px',
                    'top': '0px',
                    'left': '0px',
                    'position': 'absolute',
                    'display': 'block',
                }
            }).appendTo(leftImageContainer);
            // select the first slot in array from the beginning
            currentTitleObject = titles[0];
            currentIndexClick = 0;
        }
  
        }
    };
  })();
  
  
    // Function to reload the new video source on click
    function changeTitleContent(newTitleContent, currentIndex) {
      if (useVideo) {
          const videoPlayer = document.querySelector('.player > div > video');
          
          // If we have a playing video
          if (videoPlayer) {
              // remove the old player
              var oldPlayerDiv = document.querySelector("#creative_container > div > div.player > div.seenthis-player");
              oldPlayerDiv.remove();
  
              // build a new video player with the new CURRENT videoSrc
              var player = new SeenthisPlayer('.player', newTitleContent.video_src.value, videoTracker, options); 
  
              // BEST PRACTISE is to use this code below and load the new src on input and play it. //JOOS
              //videoPlayer.src = newTitleContent;
              //videoPlayer.load(); // Needed to load the new source
              //videoPlayer.play();
          } else {
              console.error("Video player not found");
          }
      } else {
          // Add image of title instead
          
          var oldTitleImage = document.querySelector(".title_image_click");
          oldTitleImage.remove();
          $("<div>", {
              'id' : 'title_image',
              'class': 'title_image_click',
              css: {
                  content: 'url('+ newTitleContent.title_cover_2.value + ')',
                  'position': 'absolute',
                  'width': '451px',
                  'height': '240px',
                  'top': '0px',
                  'left': '0px',
                  'position': 'absolute',
                  'display': 'block',
              }
          }).appendTo(leftImageContainer);
        
      }
  }
  
    /////////////////////////////////
    ///////// EVENT HANDLERS ///////
    ///////////////////////////////
  
      // Add event listener to your click area
      document.getElementById('covers').addEventListener('click', function(event) {
        let divName = event.target.getAttribute('id');
        if (divName.includes("title")) {
            // Fetch the selected title integer from HTML
            currentIndexClick = event.target.getAttribute('id').replace("title_", "");
            // Append new title object as current
            currentTitleObject = titles[currentIndexClick];
            // Change content
            changeTitleContent(currentTitleObject, currentIndexClick);
        }
    });
    // exit url handler based on collection "products"
    document.getElementById('worldClick').onclick = () =>
        window.dispatchEvent(
            new CustomEvent('lemonpi.interaction/click', {
            detail: {
                placeholder: ['titles', parseInt(currentIndexClick), 'title_click'],
            }
        })
    );
    // exit url handler based on collection "products"
    document.querySelectorAll('.clickArea').onclick = () =>
        window.dispatchEvent(
            new CustomEvent('lemonpi.interaction/click', {
            detail: {
                placeholder: ['titles', parseInt(currentIndexClick), 'title_click'],
            }
        })
    );
  
  // Pause the timeline on mouseover
  const container = document.getElementById('covers'); // You can change this to the specific container if needed
  
  // Stop the attention animation on user interaction / leave the are and restart it
  container.addEventListener("mouseover", () => {
    attentionAnimation.kill();
  
  });
  
  // Restart the attention animation
  container.addEventListener("mouseout", () => {
    attentionAnimation.restart();
  });
  
  mainFunction();
  
    /////////////////////////////////
    ///////// ANIMATIONS ///////////
    ///////////////////////////////
  
    // timeline holding animation of covers
    var attentionAnimation = gsap.timeline({ repeat: -1 })
    .add(animateCovers, 1);
  
    // main timleline
    var mt = gsap.timeline({ repeat: 0, delay: 1 })
    .from('.covers', 1, { left: 470,scale: 0, ease: Power1.easeOut, },) 
    .to('#main_copy', 0.3, { autoAlpha: 1 }) // fades in #imgCopy over 1.5 seconds
    .to('#cta_copy', 0.3, { autoAlpha: 1 }) // fades in #imgCopy over 1.5 seconds
    .call(animateCovers) // call function to animate covers
    .fromTo('#main_copy', 0.2, { scale: 1 }, { scale: 1.1, repeat: 1, yoyo: true, ease: Power1.easeInOut },2); // "inflates" and "deflates" #subCopy
      
    // function controlling the animation of the covers bumping
    function animateCovers(){
      // Select all images with the class '.title_cover'
      const coverImages = document.querySelectorAll('.covers img');
      // Create a timeline
      // Add aniamtion to each image in the list using forEach
      coverImages.forEach((image, index) => {
        attentionAnimation.to(image, { duration:0.3, scale: 1.125, delay: 1 })
        .to(image, {duration: 0.3, scale: 1})
    });
  }
  
    // end of code
  
  })
  });