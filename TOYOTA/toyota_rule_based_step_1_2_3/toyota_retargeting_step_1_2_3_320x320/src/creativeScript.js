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

var title = $('#title');
title.append(content.title.value);

var cta_text = $('#cta_text');
cta_text.append(content.cta_text.value);

// image_car left adjust
var img_placement_left = content.img_placement_left.value;
if (version_step == '3') {
  $('#arrow').css({
  });
} else {
arrow.remove();
}

var tl = new TimelineMax({ repeat: -1, repeatDelay: 0.5 }); // Loop infinitely with a delay between cycles
var tl = new TimelineMax({ repeat: -1, repeatDelay: 0.5 }); // Loop infinitely with a delay between cycles

// Fade in #image_car over 1.5 seconds
tl.to("#image_car", 1.5, { opacity: 1 })
  // After 0.5 seconds, fade in #copy
  .to("#copy", 1.5, { opacity: 1 }, "-=0.5") // Sync 1 second before #image_car finishes
  // After 1.5 seconds, fade in #cta
  .to("#cta", 1, { opacity: 1 }, "-=0.5") // Sync 0.5 seconds before #copy finishes
  // Pause for 3 seconds before fading out
  .to(["#image_car", "#copy", "#cta"], 1, { opacity: 0, delay: 3 });
  });
});
  