/**
  * Template Name
  * @Owner Name Developer
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
     
  //Variable for local content
  var local_content = content;
  
  var colorPlate = local_content.bg_color.value;
  $('#bg').css({
    // Align content to top inside div
      'background-color': colorPlate,
  });

  // World click event caller
  // $('#worldClick').click(onClick);

  $('#headline').html(local_content.title.value);
  $('#subline').html(local_content.sub_text.value);

  var headLine_fontSize = parseInt(local_content.headline_fontSize.value);
  $('#headline').css({
    'font-size':headLine_fontSize +'px',
    'line-height':headLine_fontSize + 2 + 'px',
  });

  // Inject dynamic CTA text into the new span
  $('.ctaText').html(local_content.ctaText.value); // Assuming cta_text is the variable name

  var img_dynamic_position_left = parseInt(local_content.image_dynamic_position_left.value);
  var img_dynamic_position_top = parseInt(local_content.image_dynamic_position_top.value);

  var img_width = local_content.img_width.value;
  var img_height = local_content.img_height.value;

// Append car image
$("#imgCar").css("background-image", "url(" + local_content.image_car.value + ")");
$('#imgCar').css({
// Align content to top inside div
  'background-repeat': 'no-repeat',
  'background-size': 'contain',   // Ensure the image fits within the div without cropping
  'left': img_dynamic_position_left + 'px',
  'top': img_dynamic_position_top + 'px',
  // 'background-position': 'left top' // Align the image to the bottom-left corner
});
 
if (img_width){
  $('#imgCar').css({
    'width': img_width,
  });
}else{
  $('#imgCar').css({
    'width': '100%',
  });
}
if (img_height){
  $('#imgCar').css({
    'height': img_height,
  });
}else{
  $('#imgCar').css({
    'height': '100%',
  });
}
  
// Append logoPlaceholder as background
$("#logoPlaceholder").css("background-image", "url(" + local_content.logo.value + ")");
$('#logoPlaceholder').css({
  'background-repeat': 'no-repeat',
  'background-size': 'contain',   // Ensure the image fits within the div without cropping
  'background-position': 'left top' // Align the image to the bottom-left corner
});

// Append logo to legal area
$("#legalLogo").css("background-image", "url(" + local_content.logoLegal.value + ")");
$('#legalLogo').css({
  'background-repeat': 'no-repeat',
  'background-size': 'contain',   // Ensure the image fits within the div without cropping
  'background-position': 'left top' // Align the image to the bottom-left corner
});

  $("#legal_txt").html(local_content.legal_text.value);

  TweenMax.set('#legal_bg', {autoAlpha:0});

  // $('#legal_btn')
  // .on('touchstart', onUserClick)
  // .on('touchend', onUserLeaveClick);
// Function to open the legal modal
function openLegalModal(e) {
  e.stopPropagation(); // Prevent worldClick from firing
  $('#legal_bg').addClass('active');
}

// Function to close the legal modal
function closeLegalModal(e) {
  TweenMax.fromTo('#legal_bg', 0.2, { autoAlpha: 1}, { autoAlpha: 0})
  e.stopPropagation(); // Prevent worldClick from firing
  $('#legal_bg').removeClass('active');
}

// Event listeners for the WLTP info button (#legal_btn)
// Use mouseenter for desktop hover, and touchstart for mobile tap.
// Note: On mobile, touchstart will fire, then touchend, then click.
// We want to open on the first touch/hover, and rely on the close button.
$('#legal_btn').on('mouseenter touchstart', function(e) {
  // Check if it's a touch event and prevent default to avoid double-firing click
  if (e.type === 'touchstart') {
    e.preventDefault(); // Prevent default touch behavior (like scrolling)
    // On touch devices, a touchstart might also trigger a click later.
    // We only want to open the modal once.
    if (!$('#legal_bg').hasClass('active')) {
      openLegalModal(e);
    }
  } else { // It's a mouseenter event
    openLegalModal(e);
  }
});

// For mobile, we might want to prevent the subsequent 'click' event from firing
// if the modal is already open from 'touchstart'.
// This is a common pattern to avoid double-triggers.
$('#legal_btn').on('click', function(e) {
  TweenMax.fromTo('#legal_bg', 0.2, { autoAlpha: 0}, { autoAlpha: 1})
    // If the modal is already active from touchstart, prevent this click from doing anything.
    // Otherwise, let it act as a fallback for desktop clicks if mouseenter wasn't caught.
    if ($('#legal_bg').hasClass('active')) {
        e.stopPropagation(); // Stop the click from propagating to worldClick
        e.preventDefault(); // Prevent any default click action
    } else {
        openLegalModal(e); // Open if not already active (e.g., pure desktop click)
    }
});

// We are NOT using mouseleave/touchend to close the modal for this "click to open, click to close" behavior.
// The modal will be closed by the .close-button or clicking the overlay background.

// Event listener for the close button click (to close modal)
$('.close-button').on('click', closeLegalModal);

// Optional: Close modal if clicking outside the modal content but inside the overlay
$('#legal_bg').on('click', function(e) {
  if ($(e.target).is('#legal_bg')) { // Check if the click was directly on the overlay, not its children
    closeLegalModal(e); // Use the close function
  }
});

//////////////////
/// ANIMATIONS ///
/////////////////

// --- GSAP ANIMATIONS ---
// Set initial state for elements to be animated
gsap.set(['#headline', '#subline', '#cta'], { opacity: 0 });

// Create a timeline for sequential animations
var tl = gsap.timeline();

tl.to('#headline', {
  opacity: 1,
  duration: 0.5, // Duration of the fade-in
  delay: 1, // Added delay
  ease: 'power1.out'
})
// .to('#subline', {
//   opacity: 1,
//   duration: 0.5,
//   ease: 'power1.out'
// }, '+=0.2') // Start 0.2 seconds after #headline finishes
.to('#cta', {
  opacity: 1,
  duration: 0.5,
  ease: 'power1.out'
}, '+=0.2'); // Start 0.2 seconds after #subline finishes

// --- Conditional Image Animation ---
var playImageAnimation = local_content.imgAnimation.value;
// Check the imgAnimation variable from Lemonpi
if (playImageAnimation && playImageAnimation === 'yes') {
  // Set initial background size for zoom effect
  gsap.set('#imgCar', { scale: 1 }); // Start at scale 1 (no zoom)

  // Animate scale for the inner div to zoom in
  gsap.to('#imgCar', {
    scale: 1.15, // Zoom in to 115% (adjust as needed)
    duration: 5, // Slightly slow zoom over 5 seconds
    ease: 'power1.out',
    delay: 0.5, // Start the zoom shortly after banner loads
    repeat: -1, // Loop indefinitely
    // yoyo: true // Play animation forwards then backwards
  });
}

// --- CTA Wave Animation ---
// Create a separate timeline for the CTA wave
var ctaWaveTl = gsap.timeline({
  repeat: -1, // Repeat indefinitely
  delay: 3,   // Initial delay before the first wave starts
  repeatDelay: 5 // Wait 5 seconds between each full wave animation cycle
});

// Animate background-position from 100% (off-screen right) to 0% (off-screen left)
ctaWaveTl.fromTo('#cta',
  { backgroundPosition: '110% 0' }, // Start with wave off to the right
  { backgroundPosition: '-5% 0', duration: 1, ease: 'power1.inOut' } // Slide wave across to the left
);

// --- Pause/Resume CTA Wave on Hover ---
$('#cta').on('mouseenter', function() {
  ctaWaveTl.pause(); // Pause the wave animation
});

$('#cta').on('mouseleave', function() {
  ctaWaveTl.resume(); // Resume the wave animation
});



$('#worldClick').click(function(e) {

  // Check if the click target is NOT the legal_btn
  if (!$(e.target).closest('#legal_btn').length) {
    onClick(e); // Only call onClick if it's a general worldClick
  }
});

function onClick (event) {
  return window.dispatchEvent(
    new CustomEvent('lemonpi.interaction/click', {
      detail: {
        placeholder: 'click'
      }
  }));
}

  // Function for animation of content 
    
        // end of code
  });
});