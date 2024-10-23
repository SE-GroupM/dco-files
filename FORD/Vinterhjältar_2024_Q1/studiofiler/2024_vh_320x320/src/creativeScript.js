/**
  * Template Name
  * @Owner Name Developer
  * @Date
*/

window.addEventListener('lemonpi.content/ready', event => {
  console.clear();
  const content = event.detail.content
  const source = event.detail.source

  var subCopy = $('#subCopy_static');
  subCopy.append(content.subCopy_static.value)

   //subtitle_top defined
   var subtitle_top = $('#subtitle_top');
   subtitle_top.append(content.subtitle_top.value)

  var subCopy_frame_1 = $('#subCopy1');
  subCopy_frame_1.append(content.subCopy_frame_1.value)
  
  var subCopy_frame_2 = $('#subCopy2');
  subCopy_frame_2.append(content.subCopy_frame_2.value)
  
  var frame_1 = $('#frame_1_copy');
  frame_1.append(content.frame_1_copy.value)
  
  var frame_2 = $('#frame_2_copy');
  frame_2.append(content.frame_2_copy.value)
  
  var use_one_headline = content.use_one_headline.value;
  var use_one_headline_bool = false;
  if (use_one_headline == 1 || use_one_headline == 'yes'){
    use_one_headline_bool = true;
  }

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

var mt = new TimelineMax({repeat: -1});

var includeSplash = content.includeSplash.value;

// Adjust initial CSS based on includeSplash
if (includeSplash === '0') {
  // Ensure splash is initially hidden if includeSplash is '0'
  $('#splash').css({
    'opacity': 0,
    'display': 'none' // This line is added to ensure that the element does not take up space and is not interactable
  });
} else {
  // If includeSplash is not '0', show the splash content and set up the image
  $('#splash_text').html(content.splash_text.value);

  $('#splash').css({
    'opacity': 1,
    'display': 'block' // Ensure the splash is visible and takes up space
  });

  $('#splash_img').css({
    'background-repeat': 'no-repeat',
    'background-image': 'url(' + content.splash.value + ')', // Changed from content to background-image
    'background-position': 'center center',
    'position': 'absolute',
    'background-size': 'contain'
  });
}

if (use_one_headline_bool){
  mt.to("#frame_1_copy, #subCopy_static, #subtitle_top", {opacity: 1, duration: 1.1})

 .to("#splash", {scale: 1, duration: 0.2, ease: Power2.easeInOut})
 .to("#splash", {
     scale: 1.2,
     left: 207,
     duration: 0.2,
     repeat: 1,
     yoyo: true,
     ease: Power2.easeInOut
 })
  .to("#frame_1_copy,#subCopy_static, #subtitle_top", {opacity: 0, duration: 0.5, delay: 1.5})
  
  .to("#frame_1_copy,#subCopy_static, #subtitle_top", {opacity: 1, duration: 0.5})
  
} else {
  gsap.set("#frame_2_copy", { opacity: 0 });

  mt.to("#frame_1_copy", {opacity: 1, duration: 1.5})
    .to("#frame_1_copy", {opacity: 0, duration: 0.5, delay: 1.5})
    .to("#frame_2_copy", {opacity: 1, duration: 0.5})
    .to("#frame_2_copy", {opacity: 0, duration: 0.5, delay: 1.5})
    .to("#frame_1_copy", {opacity: 1, duration: 0.5});
}
gsap.set("#subCopy2", { opacity: 0 });
gsap.timeline({repeat: -1, repeatDelay: 0}) // Adding repeat: -1 to loop forever, with no delay between repetitions
  .to("#subCopy1", {opacity: 1, duration: 0.5}) // Fade in subCopy1
  .to("#subCopy1", {opacity: 0, duration: 0.5, delay: 1.5}) // Fade out subCopy1
  .to("#subCopy2", {opacity: 1, duration: 0.5}) // Then fade in subCopy2 after subCopy1 fades out
  .to("#subCopy2", {opacity: 0, duration: 0.5, delay: 1.5}); // Finally, fade out subCopy2

});