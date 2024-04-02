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

 // Get the div element by its id
 var worldClickDiv = document.getElementById('worldClick');
  
 // Add a click event listener to the div
 worldClickDiv.addEventListener('click', function() {
   // Opens the specified URL in a new window or tab
   // window.open('');
 });

window.addEventListener('lemonpi.content/ready', event => {
  const content = event.detail.content // get content placeholders from Choreograph Adsets
  const source = event.detail.source
 
   /////////////////////
  //// VARIABLES /////
 ///////////////////

  var ctaTop = content.ctaTopValue.value // hämtar placeholder data cta top värde
  var ctaLeft = content.ctaLeftValue.value // hämtar placeholder data cta top värde
  
  var frame1fontSize = content.frame_1_size.value // hämtar placeholder data cta top värde

  var frameTxtTest = $('#frame1Txt1');
  frameTxtTest.append(content.frame1Txt1.value)

  //frame2_mainCopy font size
  var frame2_mainCopy_size = content.frame_2_size.value // hämtar placeholder data cta top värde

  var frame2CopyTest = $('#frame2_mainCopy');
  frame2CopyTest.append(content.frame2_mainCopy.value)

  var frame2Txt1Test = $('#frame2Txt1');
  frame2Txt1Test.append(content.frame2Txt1.value)

  var frame2Txt2Test = $('#frame2Txt2');
  frame2Txt2Test.append(content.frame2Txt2.value)

  var frame2Txt3Test = $('#frame2Txt3');
  frame2Txt3Test.append(content.frame2Txt3.value)

  var frame2Txt4Test = $('#frame2Txt4');
  frame2Txt4Test.append(content.frame2Txt4.value)

  var checklistSize = parseInt(content.checklist_size.value); // hämtar placeholder data cta top värdeb
 
  $('#ctaButton').css({
    'top': ctaTop + 'px',
  });

  $('#ctaButton').css({
   'left': ctaLeft + 'px',
 });

//frame1Txt1 font size + line-height
    $('#frame1Txt1').css({
    'font-size': frame1fontSize + 'px',
    'line-height': frame1fontSize - 0.05 + 'px',
    });

//frame2_mainCopy font size + line-height
    $('#frame2_mainCopy').css({
    'font-size': frame2_mainCopy_size + 'px',
    'line-height': frame2_mainCopy_size - 0.05 + 'px',
   });

   // frame1Txt1 alignment
    var frame1Txt1Align = content.frame1Txt1_align.value 
   $('#frame1Txt1').css({
    'text-align': frame1Txt1Align,
  });

    //frame2_mainCopy alignment
    var frame2MainAlign = content.frame2_main_copy_align.value 
    $('#frame2_mainCopy').css({
    'text-align': frame2MainAlign,
  });

   //checklist font size
     $('#frame2 ul').css({
        'font-size': checklistSize + 'px',
        'line-height': checklistSize + 5 + 'px',
        });    
   
   /////////////////////
  //// ANIMATIONS /////
 ////////////////////

// animation loop timeline setup
var t1 = new TimelineMax({
  repeat: 5,  // Adjust repeat count accordingly
  onComplete: function() {
      t1.seek("frame1Show");  // This will make the timeline stop at #frame1Txt1 animation
  }
 });
 
 // label to identify the start of frame1Txt1 animation
 t1.addLabel("frame1Show")
 
 // fade in animation 
 .to('#frame1', 1, { x:0 , opacity:1 , ease: Linear.ease, delay:0 })
 // hold frame for 4 seconds
 .to('#frame1', 2, { opacity:1, ease: Linear.easeNone })
 // fade out animation over 1 second
 .to('#frame1', 1, { opacity:0 , ease: Linear.easeNone })
 
 // fade in animation - main copy over 1 second
 .to('#frame2', 1, { x:0 , opacity:1 , ease: Linear.easeNone })
 // hold frame for 4 seconds
 .to('#frame2', 2, { opacity:1, ease: Linear.easeNone })
 // fade out animation over 1 second
 .to('#frame2', 1, { opacity:0 , ease: Linear.easeNone })
 
 // fade in animation - pause over 1 second
 .to('#pause', 0, { x:0 , opacity:1 , ease: Linear.easeNone })
 
});

   // code here
   // Advanced mapping of dynamic content
   // You can call the content directly once it's collected by lemonpi.subscribe method
   // Example content.[placeholder_name].value

   ////////////////////
  //// FUNCTIONS /////
 ////////////////////   


function updateImageWidth() {
  const listItemCount = document.querySelectorAll("#frame2 li").length;
  const imageWidth = 28 + 20 * listItemCount; // Adjust the width based on your desired spacing
  
  const imageElement = document.querySelector("#frame2 li::before");
  //imageElement.style.width = `${imageWidth}px`;
}

// Call the function initially and whenever the list changes
updateImageWidth();

