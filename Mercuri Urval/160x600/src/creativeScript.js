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
    var product_collection = local_content.ad_collection.value[0];

    // Dynamic variables holding values from CHoreograph Create
    // Static variables from Adset
    const ctaText = local_content.cta_text.value;
    const mercuriLogoLarge = local_content.mercuri_logo_large_formats.value;
    const mercuriLogoSmall = local_content.mercuri_logo_small.value;

    const blueGraphicsLeftSide = "https://assets.lemonpi.io/a/k/3534c442-0907-4251-ba18-ecb860adc9e3/Assets/Mercuri_Urval_VSC/mercuri_urval_blue_graphics.png";
    const geo_img = "https://assets.lemonpi.io/a/k/1189d575-e6f6-4d75-9df0-277a4e3e7a90/Assets/Mercuri_Urval_VSC/mercuri_urval_location.png";

    // Product store/Pixel variables
    const companyLogo = product_collection.company_logo.value; // logo . E.g Google logo
    const companyName = product_collection.company_name.value; // name E.g Google

    const jobDescription = product_collection.description_text.value; // job description. E.g Coding in a variaty of environments combined with leading productions
    const jobTitle = product_collection.job_title.value; // job title. E.g Software Engineer

    const jobLocation = product_collection.placement_text.value; // job location. E.g Sverige

    const jobClick = product_collection.click.value; // job  exit url from scraper

    //Append background image
    $("#Blue_Graphic").css("background-image","url("+blueGraphicsLeftSide+")");
    //Append Mercuri logo
    $("#mercurilogo").css("background-image","url("+mercuriLogoSmall+")");

    //Append background image
    $("#geowhiteblue").css("background-image","url("+geo_img+")");

    //Append job/company logo
    $("#companyLogo").css({
      "background-image":"url("+companyLogo+")",
      'background-size': 'contain',
      'background-repeat': 'no-repeat',
      'background-position': 'center right',
    });


    //Append texts
    $("#ctaText").html(ctaText);

    $("#companyName").html(companyName);
    $("#mainText").html(jobTitle);
    truncateProductText('#mainText', 50);
    $("#subText").html(jobDescription);
    truncateProductText('#subText', 130);
    $("#locationText").html(jobLocation);
    
    ////////////////////////////////////////////
    /////           ANIMATIONS             /////
    ////////////////////////////////////////////

    var mainTl = new TimelineMax({ });
    TweenMax.set('#copy', {opacity: 0}) // Initially hide all elements that going to animate in
    
    mainTl.fromTo('#copy', 0.5, {x: -20, opacity:0, ease: Linear.ease},{x: 0, opacity:1, ease: Linear.ease}, 1) //Product image 1 fade in
          .fromTo('#cta', 0.5, {x: 20, opacity:0, ease: Linear.ease},{x: 0, opacity:1, ease: Linear.ease}, 1) //Product image 1 fade in




    ///////////////////////////////////////////
    /////           FUNCTIONS             /////
    ///////////////////////////////////////////

    // Truncate function
    function truncateProductText(selector, truncLength) {
      var element = $(selector);
      var truncateLength = truncLength;

      var sentence = element[0].innerText;
      var result = sentence;
      var resultArray = result;
      element.css({
        height: 'auto',
    });
    if (sentence.length >= truncateLength){
      result = resultArray.split(" ").splice(0, 5).join(" ");

      splitSentence = result.split(" ")
      secondCheck = splitSentence[0] + ' ' + splitSentence[1];
      threeWords = splitSentence[0] + ' ' + splitSentence[1] + ' ' + splitSentence[2];
      fourWords = splitSentence[0] + ' ' + splitSentence[1] + ' ' + splitSentence[2] + ' ' + splitSentence[3];

      if (fourWords.length >= truncateLength){
          result = threeWords;
      }
      if (threeWords.length >= truncateLength){
          result = secondCheck;
      }
      if (secondCheck.length >= truncateLength){
          result = splitSentence[0]
      }
      element.text(result + '...');
      } else{
      element.text(result);
      }
    return result;
    }


    //Product click funtion
    $('#creative_container').click(onClick);

     // Append click to product box
    function onClick (event) {
      return window.dispatchEvent(
        new CustomEvent('lemonpi.interaction/click', {
          detail: {
            placeholder: ['ad_collection', 0, 'click'],
          }
      }));
    } 

    // end of code
  });
});
  