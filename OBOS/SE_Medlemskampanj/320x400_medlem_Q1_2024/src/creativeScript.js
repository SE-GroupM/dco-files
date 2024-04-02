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
  const content = event.detail.content

  // Local variable for hodling all daa from adset/feed
  var local_content = content;

  $('#mainCopy').html(local_content.mainCopy.value); //Append main copy
  $('#subLines').html('<ul class="item-1"><li>'+ local_content.subLine1.value + '</li></ul><ul class="item-2"><li>' + local_content.subLine2.value + '</li></ul><ul class="item-3"><li>'+ local_content.subLine3.value + '</li></ul>'); //Append sub line copy
  $('#cta').html(local_content.ctaCopy.value); //Append cta copy

  //Append background image
  $('#bgImage').css({
    content: 'url('+ local_content.bgImage.value + ')',
    'background-repeat': 'no-repeat',
    'background-position': 'center center',
    'background-size': 'cover',
  })
  //Append logo image
  $('#logo').css({
    content: 'url('+ local_content.logo.value + ')',
    'background-repeat': 'no-repeat',
    'background-position': 'top right',
    'background-size': 'contain',
  })
  //Append icon 1 in ul list
  $('#subLines ul.item-1').css({
    'list-style-image': 'url("'+ local_content.subLine1Icon.value + '")',
  })
   //Append icon 2 in ul list
   $('#subLines ul.item-2').css({
    'list-style-image': 'url("'+ local_content.subLine2Icon.value + '")',
  })
   //Append icon 3 in ul list
   $('#subLines ul.item-3').css({
    'list-style-image': 'url("'+ local_content.subLine3Icon.value + '")',
  })

  // Animation for CTA button
  var ctaAnimation = gsap.timeline({repeat:-1, repeatDelay:1});
  ctaAnimation.fromTo('#cta', {scale: 1}, {scale: 0.95, duration: 0.25, yoyo: true, repeat: 1}, 2);

  // Animation for background image
  var bgImgAnimation = gsap.timeline({repeat:-1, repeatDelay:1});
  bgImgAnimation.fromTo('#bgImage', 8, {scale: 1}, {scale: 1.05,}, 1);


   //Append exit url to creative container
   document.getElementById('creative_container').onclick = () =>
   window.dispatchEvent(
       new CustomEvent('lemonpi.interaction/click', {
       detail: {
           placeholder: ['worldClick'],
       }
     })
   );
 })
  