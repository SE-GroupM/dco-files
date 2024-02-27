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
    // code here
    // Advanced mapping of dynamic content
    // You can call the content directly once it's collected by lemonpi.subscribe method
    // Example content.[placeholder_name].value
  });
});

window.addEventListener('lemonpi.content/ready', event => {
  const content = event.detail.content;
  //Variable for local content
  var local_content = content;
  console.log(local_content)
 //Append copy to frame 1
  $("#copy_frame_1").html(local_content.frame_1_copy.value);
  //Append copy to frame 2
  $("#copy_frame_2").html(local_content.frame_2_copy.value);
  //Append copy to cta
  $("#cta").html(local_content.cta_copy.value);
  //Append background image to image div    
  $("#bg_image").css("background-image","url("+local_content.image_source.value+")");
  //Append logo image to logo div    
  $("#logo").css("background-image","url("+local_content.logo_source.value+")");
})
  