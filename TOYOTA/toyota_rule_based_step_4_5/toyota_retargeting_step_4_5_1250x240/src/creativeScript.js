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

var sub_text = $('#sub_text');
sub_text.append(content.sub_text.value);

var sub_title = $('#sub_title');
sub_title.append(content.sub_title.value);

// image_car left adjust
var img_placement_left = content.img_placement_left.value;
$('#image_car').css({
'left': img_placement_left+'px',
})

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

  });
});
  