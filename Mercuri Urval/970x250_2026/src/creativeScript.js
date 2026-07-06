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
    
    ///////////////////////////////////////////
    /////    VARIABLES & DECLARATIONS     /////
    ///////////////////////////////////////////

    //Local content variable
    var local_content = content;

   // collection holding values from scraper
    //var product_collection = local_content.ad_collection.value[0];

    // Dynamic variables holding values from CHoreograph Create
    // Static variables from Adset
     const ctaText = local_content.cta_text.value;
    const mercuriLogoLarge = local_content.mercuri_logo_large_formats.value;
    const mercuriLogoSmall = local_content.mercuri_logo_small.value;

    const blueGraphicsLeftSide = "https://assets.lemonpi.io/a/k/3534c442-0907-4251-ba18-ecb860adc9e3/Assets/Mercuri_Urval_VSC/mercuri_urval_blue_graphics.png";
    const geo_img = "https://assets.lemonpi.io/a/k/1189d575-e6f6-4d75-9df0-277a4e3e7a90/Assets/Mercuri_Urval_VSC/mercuri_urval_location.png";
    
    // Product store/Pixel variables
    const companyLogo = local_content.company_logo.value; // logo . E.g Google logo
    const companyName = local_content.company_name.value; // name E.g Google

    const jobDescription = local_content.description_text.value; // job description. E.g Coding in a variaty of environments combined with leading productions
    const jobTitle = local_content.job_title.value; // job title. E.g Software Engineer

    const jobLocation = local_content.placement_text.value; // job location. E.g Sverige

    const jobClick = local_content.click.value; // job  exit url from scraper

    const logoHeight = local_content.company_logo_height.value; //Adjust logo height if needed

    const jobTitleTrunc = local_content.truncJobtitle.value; //Adjust length of job title if needed

    const jobDesTrunc = local_content.truncJobDescription.value; //Adjust length of job description if needed
    
    const fontSizeJobtitle = parseInt(local_content.fontSizeJobtitle.value); //Adjust font size of job title if needed

    const fontSizeJobDes = parseInt(local_content.fontSizeJobDes.value); //Adjust font size of job description if needed
    
    const bgImage = local_content.bg_image.value;
    const fontColor = local_content.font_color.value;
    

    if (bgImage != ''){
       //Append bg image
      $("#bg_image").css({
        "background-image":"url("+bgImage+")",
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
        'background-position': 'top left',
      });
    }
    if (fontColor != ''){
      $("#companyName, #mainText, #subText, #locationText").css({
        'color': fontColor,
      })
    }

    //Append background image
    $("#Blue_Graphic").css("background-image","url("+blueGraphicsLeftSide+")");
    //Append Mercuri logo
    $("#mercurilogo").css("background-image","url("+mercuriLogoLarge+")");

    //Append background image
    $("#geowhiteblue").css("background-image","url("+geo_img+")");

    //Append job/company logo
    $("#companyLogo").css({
      "background-image":"url("+companyLogo+")",
      'background-size': 'contain',
      'background-repeat': 'no-repeat',
      'background-position': 'top right',
    });

    //Adjust font size on job title if needed
    if (fontSizeJobtitle) {
      $("#mainText").css({
        'font-size': fontSizeJobtitle + 'px',
        'line-height': fontSizeJobtitle + 2 + 'px'
      });
    }
     //Adjust font size on job description if needed
    if (fontSizeJobDes) {
      $("#subText").css({
        'font-size': fontSizeJobDes + 'px',
        'line-height': fontSizeJobDes + 2 + 'px'
      });
    }


     //Adjust company logo if needed
     if(logoHeight) {
      $("#companyLogo").css({
        'height': logoHeight
      });
    }
      //Append texts
      $("#ctaText").html(ctaText);
      $("#companyName").html(companyName);
      $("#mainText").html(jobTitle);
      //Adjusts job title if needed from adset
      if (jobTitleTrunc) {
        truncateProductText('#mainText', jobTitleTrunc);
      } else {
        truncateProductText('#mainText', 90);
      }
      $("#subText").html(jobDescription);
       //Adjusts job description if needed from adset
      if (jobDesTrunc) {
        truncateProductText('#subText', jobDesTrunc);
      } else {
        truncateProductText('#subText', 180);
      }
      $("#locationText").html(jobLocation);
    
    
    ////////////////////////////////////////////
    /////           ANIMATIONS             /////
    ////////////////////////////////////////////

    var mainTl = new TimelineMax({ });
    TweenMax.set('#copy', {opacity: 0}) // Initially hide all elements that going to animate in
    
    mainTl.fromTo('#copy', 0.5, {x: -20, opacity:0, ease: Linear.ease},{x: 0, opacity:1, ease: Linear.ease}, 1) //Product image 1 fade in
          .fromTo('#cta', 0.5, {x: 20, opacity:0, ease: Linear.ease},{x: 0, opacity:1, ease: Linear.ease}, 1) //Product image 1 fade in

      // Pulse animation function
    function pulseCTA() {
    TweenMax.fromTo('#cta', 0.2, 
      { scale: 1 }, 
      { scale: 1.05, yoyo: true, repeat: 1, ease: Power1.easeInOut }
    );
    }

    // Loop the pulse after main animation is done
    mainTl.eventCallback("onComplete", function() {
    function pulseLoop() {
      pulseCTA();
      TweenMax.delayedCall(3, pulseLoop);
    }
    TweenMax.delayedCall(0.5, pulseLoop); // First pulse after 0.5s
    });



    ///////////////////////////////////////////
    /////           FUNCTIONS             /////
    ///////////////////////////////////////////

      // Truncate function
      function truncateProductText(selector, truncLength) {
  var element = $(selector);
  var sentence = element[0].innerText.trim();

  element.css({ height: 'auto' });

  if (sentence.length >= truncLength) {
    // Cut at truncLength, then back up to the nearest word boundary
    var truncated = sentence.substring(0, truncLength);
    var lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 0) {
      truncated = truncated.substring(0, lastSpace);
    }
    element.text(truncated + '...');
    return truncated;
  } else {
    element.text(sentence);
    return sentence;
  }
}

    $('#creative_container').off('click').click(onClick);
    
    function onClick (event) {
      event.preventDefault(); // Prevent default behavior
      event.stopPropagation(); // Stop event from propagating to parent/child elements
      return window.dispatchEvent(
        new CustomEvent('lemonpi.interaction/click', {
          detail: {
            placeholder: 'click',
          }
      }));
    }

    // end of code
  });
});
  