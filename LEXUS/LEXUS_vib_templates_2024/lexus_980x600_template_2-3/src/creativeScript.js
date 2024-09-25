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
  const content = event.detail.content;
  //Variable for local content
  var local_content = content;

  //Append copy color
  $('#copy_container').css("color", (local_content.copyColor.value));

  //Append content for main copy
  $('#main_copy').html(local_content.headlineCopy.value);
  //If no main copy
  if(!local_content.headlineCopy.value){
  $('#main_copy').remove();
  }

  //Append content for sub copy
  $('#sub_copy').html(local_content.sublineCopy.value);
  //If no main copy
  if(!local_content.sublineCopy.value){
    $('#sub_copy').remove();
  }

  //Append content for interest copy
  $('#interest_copy').html(local_content.interestCopy.value);
  //If no interest copy
  if(!local_content.interestCopy.value){
    $('#interest_copy').remove();
  }

  //Append content for monthly price copy
  $('#monthly_price_copy').html(local_content.monthlyPriceCopy.value);
  //If no monthly price copy
  if(!local_content.monthlyPriceCopy.value){
    $('#monthly_price_copy').remove();
  }

   //Append content for sub copy
   $('#second_sub_copy').html(local_content.secondSublineCopy.value);
   //If no main copy
   if(!local_content.secondSublineCopy.value){
     $('#second_sub_copy').remove();
   }

  //Append content for discliamer copy
  $('#disclaimer_copy').html(local_content.disclaimerCopy.value);
  //If no main copy
  if(!local_content.disclaimerCopy.value){
    $('#disclaimer_copy').remove();
  }


  //Append content for discliamer copy
  $('#disclaimer_short').html(local_content.disclaimerCopyShort.value);
  //If no main copy
  if(!local_content.disclaimerCopyShort.value){
    $('#disclaimer_short').remove();
  }
  
  //Append content for image copy
  $('#deco_text').html(local_content.imageCopy.value);

  //Append content for logo
  $("#bg_image").css("background-image","url("+local_content.bgImage.value+")");

  //Append content for logo
  $("#logo").css("background-image","url("+local_content.logo.value+")");

  //Append cta copy and color
  $("#cta").html(local_content.ctaCopy.value + ' <i class="arrow"></i>');
  $("#cta").css("background-color", (local_content.ctaBgColor.value));
  $("#cta").css("color", (local_content.ctaCopyColor.value));

  //Append click to creative
  $('#creative_container').click(onClick);

  // Use video or not
  var useVideo = local_content.useVideo.value;
  // Define the video source and tracker variables
  var videoSrc = local_content.videoSrc.value;
  var videoTracker = local_content.videoTracker.value;
 
  //Video player 
  if(useVideo === 'yes') {
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
        muteButton: false,
    };
  } else {
    $('#player').remove();
  }

    ////////////////
  /// FUNCTIONS ///
//////////////////

 //Append click
  function onClick (event) {
    return window.dispatchEvent(
      new CustomEvent('lemonpi.interaction/click', {
        detail: {
          placeholder: 'worldClick'
        }
    }));
  }
});




