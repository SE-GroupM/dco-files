/**
  * Template Name
  * @Owner Name Developer
  * @Date
*/

window.addEventListener('lemonpi.content/ready', event => {
  const content = event.detail.content
  const source = event.detail.source


  //console.log(content)

  var subCopy = $('#subCopy_static');
  subCopy.append(content.subCopy_static.value)
  
  var frame_1 = $('#frame_1_copy');
  frame_1.append(content.frame_1_copy.value)
  
  var frame_2 = $('#frame_2_copy');
  frame_2.append(content.frame_2_copy.value)
  
  
TweenMax.set('#legal_bg', {autoAlpha:0});

$('#legal_btn')
.on('mouseenter touchstart', onUserEnter)
.on('mouseleave touchend', onUserLeave);

var clickEvent = 'exit_url';

// Click event
document.body.onclick = () =>
  window.dispatchEvent(
    new CustomEvent('lemonpi.interaction/click', {
      detail: {
        placeholder: clickEvent,
        query: {}
      }
    })
  );

function onUserEnter() {
  TweenMax.fromTo('#legal_bg', 0.2, { autoAlpha: 0}, { autoAlpha: 1})
}

function onUserLeave() {
  TweenMax.fromTo('#legal_bg', 0.2, { autoAlpha: 1}, { autoAlpha: 0})
}


gsap.set("#frame_2_copy", { opacity: 0 });
var mt = new TimelineMax({repeat: -1});

mt.to("#frame_1_copy", {opacity: 1, duration: 1.5})
  .to("#frame_1_copy", {opacity: 0, duration: 0.5, delay: 1.5})
  .to("#frame_2_copy", {opacity: 1, duration: 0.5})
  .to("#frame_2_copy", {opacity: 0, duration: 0.5, delay: 1.5})
  .to("#frame_1_copy", {opacity: 1, duration: 0.5});

})
  // Do stuff
/*

// Callback to retrieve the adset data
lemonpi.subscribe(function callback(content) {
  //code here
});
  */