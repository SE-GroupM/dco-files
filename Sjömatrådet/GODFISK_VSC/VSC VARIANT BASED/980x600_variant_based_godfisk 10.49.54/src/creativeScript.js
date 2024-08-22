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
  const source = event.detail.source;

  var local_content = content;
      
  var headline_text = local_content.Headline_Text?.value;
  var cta_text = local_content.CTA_Text?.value;
  var headline_color = local_content.Headline_Color?.value;
  var CTA_Background = local_content.CTA_Background?.value;
  var Background_Color = local_content.Background_Color?.value;
  var hero_image = local_content.Hero_Image?.value;
  var logo = content.logo.value;
  
  $('#cta_copy').html(local_content.Cta_copy?.value);

  $('#headline_text').css({
    'color': headline_color || '#000000', // Default to black if undefined
  });

  $('#cta').css({
    'background-color': CTA_Background || '#ffffff', // Default to white if undefined
  });

  $('#panel_container').css({
    'background-color': Background_Color || '#cccccc', // Default to light gray if undefined
  });

       ////////////////////
      //// ANIMATIONS ////
     ////////////////////

       // Use '#hero_image' to select the image element directly
       var hero_image = '#hero_image';

       // Ensure the image starts with the correct scale
       TweenMax.set(hero_image, { scale: 1, transformOrigin: "center" });

       // Create the animation timeline
       var tl = new TimelineMax({repeat:-1}); // Infinite loop for animation

       tl.fromTo(hero_image, 5, 
           { scale: 1, ease: Linear.easeNone },  // Start with the original size
           { scale: 1.6, ease: Linear.easeNone } // Zoom in to 1.6 times the original size
       );
});
