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
    //Local content variable
    var local_content= content;
    const svg = document.getElementById('dots');
    const numberOfDots = 40;

    //Append copy
    $('#copyFrame_1').html(local_content.headline_frame_1.value);
    $('#copyFrame_2').html(local_content.headline_frame_2.value);
    $('#copyFrame_3').html(local_content.headline_frame_3.value);

    //Append background image
    $("#bgImage").css("background-image","url("+local_content.img_src.value+")");
    //Append background color
    $("#bgPanel").css("background-color",local_content.bg_color.value);

    //Append logos
    $("#logo_1").css("background-image","url("+local_content.logo_src_1.value+")");
    $("#logo_2").css("background-image","url("+local_content.logo_src_2.value+")");
    $("#logo_3").css("background-image","url("+local_content.logo_src_3.value+")");
    $("#logo_x").css("background-image","url(https://assets.lemonpi.io/a/k/e58bb9a7-86c0-4f6d-849f-2ed092ded49d/Assets/Assets/X_100px.png");

   // Loop through a specified number of dots
    for (let i = 0; i < numberOfDots; i++) {
      // Create a new SVG circle element
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');      
      // Set the class of the circle element to 'dot'
      dot.setAttribute('class', 'dot');      
      // Set the x-coordinate of the circle's center
      dot.setAttribute('cx', (i * 2) + 5);       
      // Set the y-coordinate of the circle's center
      dot.setAttribute('cy', 3);      
      // Set the radius of the circle
      dot.setAttribute('r', 0.2);      
      // Append the circle element to the SVG element
      svg.appendChild(dot);
    }

    //Animation of content
    var tl = new TimelineMax({repeat: -1, repeatDelay: 3});
    
    TweenMax.set('#copyFrame_1, #copyFrame_2, #copyFrame_3, #logo_3, #dots, #lines', { x: 980 }) //Position of elements not used from start
    tl.fromTo('#bgPanel', 0.5, {x:485,ease: Linear.ease},{x:0, ease: Linear.ease}, 0) //Background panel slides in
      .fromTo('#bgImage', 0.5, {width:980, ease: Linear.ease},{width:495, ease: Linear.ease}, 0) //Background image changes width
      .fromTo('#copyFrame_1', 0.3, {x:980, ease: Linear.ease},{x:0, ease: Linear.ease}, ) //Copy frame 1 in
      .to('#copyFrame_1', 0.3, {x:-980, ease: Linear.ease}, 2.5) //Copy frame 1 out

      .to('#bgPanel', 0.3, {x: -495, ease: Linear.ease}, 2.5) //Background panel covers creative
      .fromTo('#copyFrame_2', 0.3, {x:980, ease: Linear.ease},{x:0, ease: Linear.ease}, 2.5) //Copy frame 2 in
      .fromTo('#dots, #lines', 0.3, {x:980, ease: Linear.ease},{x:0, ease: Linear.ease}, 2.5)  //Dots and lines move from right to left
      .fromTo('#logo_1', 0.3, {x:815, ease: Linear.ease},{x:0, ease: Linear.ease}, 2.5) //Logo 1 to center
      .fromTo('#logo_2', 0.3, {x:30, ease: Linear.ease},{x:325, ease: Linear.ease}, 2.5) //Logo 2 to center
      .fromTo('#logo_x', 0.3, {opacity:0},{opacity: 1, rotation: "+=360", repeat:1, ease: Linear.ease, transformOrigin:"50% 50%" }, 2.5) //Logo x in

      .fromTo('#location_1', 0.2, {opacity:1, y: 0, ease: Linear.ease},{opacity:0, y: 20, ease: Linear.ease}, 3.7) //Location 1 out
      .fromTo('#location_2', 0.2, {opacity:0, y:-20, ease: Linear.ease},{opacity:1, y:0, ease: Linear.ease}, 3.8) //Location 2 in
      .to('#location_2', 0.2, {opacity:0, y:10, ease: Linear.ease}, 4.7) //Location 2 out
      .fromTo('#location_3', 0.2, {opacity:0, y:-20, ease: Linear.ease},{opacity:1, y: 0, ease: Linear.ease}, 4.8) //Location 3 in

      .to('#dots, #lines', 0.1, {x:-980, ease: Linear.ease}, 6.5) // Dots  and lines move left with text
      .to('#copyFrame_2', 0.1, {x:-980, ease: Linear.ease}, 6.5) //Copy frame 2 out
      .fromTo('#copyFrame_3', 0.3, {x:980, ease: Linear.ease},{x:0, ease: Linear.ease}, 6.5) //Copy frame 3 in
      .fromTo('#logo_3', 0.3, {x:980},{x:0, ease: Linear.ease}, 6.5) //Logo 3 in

    //Append exit url to creative container
    document.getElementById('creative_container').onclick = () =>
    window.dispatchEvent(
        new CustomEvent('lemonpi.interaction/click', {
        detail: {
            placeholder: ['click_url'],
        }
      })
    );
  });
});
  