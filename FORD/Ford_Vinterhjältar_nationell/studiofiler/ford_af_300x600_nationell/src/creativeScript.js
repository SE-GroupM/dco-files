/**
  * Template Name
  * @Owner Name Developer
  * @Date
*/

window.addEventListener('lemonpi.content/ready', event => {
  const content = event.detail.content
  const source = event.detail.source


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


 // Get the div element by its id
 var worldClickDiv = document.getElementById('worldClick');
  
 // Add a click event listener to the div
 worldClickDiv.addEventListener('click', function() {
   // Opens the specified URL in a new window or tab
   //window.open('');
 });