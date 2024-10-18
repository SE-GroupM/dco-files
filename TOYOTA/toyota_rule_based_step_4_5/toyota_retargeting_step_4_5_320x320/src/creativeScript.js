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

var local_content = content;

var version_step = content.version_step.value;

var sub_text = $('#sub_text');
sub_text.append(content.sub_text.value);

var sub_title = $('#sub_title');
sub_title.append(content.sub_title.value);

var title = $('#title');
title.append(content.title.value);

var cta_text = $('#cta_text');
cta_text.append(content.cta_text.value);

if (version_step == '4') {
  sub_title.remove(); 
  legal_text.remove(); 
  legal_btn.remove(); 
  legal_bg.remove(); 
  $('#title').css({
    'padding-bottom': '0px' 
  });
} else {

}

TweenMax.set('#legal_bg', {autoAlpha:0});

$('#legal_btn')
  .on('mouseenter touchstart', onUserEnter)
  .on('mouseleave touchend', onUserLeave);

function onUserEnter() {
  TweenMax.fromTo('#legal_bg', 0.2, { autoAlpha: 0}, { autoAlpha: 1});
}

function onUserLeave() {
  TweenMax.fromTo('#legal_bg', 0.2, { autoAlpha: 1}, { autoAlpha: 0});
}

// Assuming TweenMax is already included in your project

// Fade in #image_car over 1 second
TweenMax.to("#image_car", 1.5, { opacity: 1 });

// After 2 seconds, fade in copy1, copy2, and cta
TweenMax.to(["#copy1", "#copy2", "#cta"], 1, { opacity: 1, delay: 0.5 });


  });
});
  