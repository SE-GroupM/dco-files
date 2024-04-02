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
    var logo_source = local_content.logo_source.value;
    var background_image = local_content.background_asset.value;
    console.log(local_content)


    $('#background_image').css({
      content: 'url('+ background_image + ')',
    });
    $('#logo').css({
      content: 'url('+ logo_source + ')',
    });



  });
});
  