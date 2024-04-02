
/**
  * Template Name
  * @Owner A-S Larsson
  * @Date 13-11-2023
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
  const content = event.detail.content
  const source = event.detail.source
  /////////////////////
  //// VARIABLES /////
 ///////////////////
 //Main copy
 var mainCopy = content.mainCopy.value;
$('#mainCopy').html(mainCopy);
//Cta copy
var ctaCopy = content.ctaCopy.value;
$('#cta').html(ctaCopy);
//Panel color from adset
 var bgColor= content.bgColor.value;
 $('#bgPanel').css({
  'background-color': bgColor,
});
//Seenthis video script
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
  
 //Values for video content
 var videoSrc = content.videoSrc.value; 
 var videoTracker = content.videoTracker.value; 
 //Values for looping video
 var loopCount = parseInt(content.loopCount.value);
 var loopValue = checkBool(content.loop_true_false.value);
 //Video controls
 var muteBtn = checkBool(content.muteBtn_true_false.value);
 var bigPlayBtn = checkBool(content.bigPlayBtn_true_false.value);


  ////////////////////
 //// FUNCTIONS /////
////////////////////  
  //Function to check bool variables
  function checkBool(a){
  comparisonVar = a;
  if(String(comparisonVar).toLowerCase() == 'true'){
    comparisonVar = true;
  } else {
    comparisonVar = false;
  }
  return comparisonVar;
  }
})  
  ////////////////////
 //// ANIMATIONS /////
////////////////////  
TweenMax.fromTo("#bgPanel", { autoAlpha: 0 }, { autoAlpha: 1, delay: 3 });
  