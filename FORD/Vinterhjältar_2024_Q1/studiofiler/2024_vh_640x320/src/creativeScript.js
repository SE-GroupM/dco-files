/**
  * Template Name
  * @Owner Name Developer
  * @Date
*/

window.addEventListener('lemonpi.content/ready', event => {
  console.clear();
  const content = event.detail.content
  const source = event.detail.source


  //console.log(content)

  var subCopy = $('#subCopy_static');
  subCopy.append(content.subCopy_static.value)
  
  var frame_1 = $('#frame_1_copy');
  frame_1.append(content.frame_1_copy.value)
  
  var frame_2 = $('#frame_2_copy');
  frame_2.append(content.frame_2_copy.value)
  
  var use_one_headline = content.use_one_headline.value;
  var use_one_headline_bool = false;
  if (use_one_headline == 1 || use_one_headline == 'yes'){
    use_one_headline_bool = true;
  }

  $('#splash_text').html(content.splash_text.value);

  $('#splash_img').css({
    content: 'url('+ content.splash.value + ')',
    'background-position': 'center center',
    'position' : 'absolute',
    'background-size': 'contain',
  });

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
//gsap.set("#splash", { opacity: 0 });

if (use_one_headline_bool){
  mt.to("#frame_1_copy, #subCopy_static", {opacity: 1, duration: 1.1})
 // .to("#subCopy_static", {opacity: 1, duration: 1.5})
   .to("#splash", {scale: 1, duration: 0.1})
   .to("#splash", {scale: 0.4, left: 16, duration: 0.2, scale: 1.2, repeat: 1, yoyo: true, ease: Power1.easeInOut})
  
  .to("#frame_1_copy,#subCopy_static", {opacity: 0, duration: 0.5, delay: 1.5})
  
  .to("#frame_1_copy,#subCopy_static", {opacity: 1, duration: 0.5})
  
} else {
  gsap.set("#frame_2_copy", { opacity: 0 });

  mt.to("#frame_1_copy", {opacity: 1, duration: 1.5})
    .to("#frame_1_copy", {opacity: 0, duration: 0.5, delay: 1.5})
    .to("#frame_2_copy", {opacity: 1, duration: 0.5})
    .to("#frame_2_copy", {opacity: 0, duration: 0.5, delay: 1.5})
    .to("#frame_1_copy", {opacity: 1, duration: 0.5});
}



// end of code
})
  // Do stuff
/*

// Callback to retrieve the adset data
lemonpi.subscribe(function callback(content) {
  //code here
});
  */