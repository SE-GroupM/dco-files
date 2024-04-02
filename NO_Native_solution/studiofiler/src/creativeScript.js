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

    ///////////////////////////////////////////////////
    ////////////////// VARIABLES //////////////////////
    ///////////////////////////////////////////////////
    console.clear();;
    console.log(content);
    // fetch content from adset
    var local_content = content;

    var mainCopy = local_content.mainText.value; // get mainCopy
    var imgCopy = local_content.imgText.value; // get imgCopy
    var imgSrc = local_content.imagePlaceholder.value; // get img src
    var useFont = local_content.whichFont.value;

    // variables adjusting CSS top value for img, imgText and mainCopy
    var topvalueImgTxt = parseInt(content.topValue_imgTxt.value);
    var topValueMainTxt = parseInt(content.topValue_mainCopy.value);
    var topValueImg = parseInt(content.topValue_img.value);
    // css line heiught on mainCopy
    var lineHeightMainTxt = parseInt(content.lineHeight_mainCopy.value);
    // Append data to html in creative
    $('#mainCopy').html(mainCopy);
    $('#imgCopy').html(imgCopy);

    // Append static CSS
    if (topvalueImgTxt == ''){
      $('#imgCopy').css({
        // no difference
      });
    } else{
      $('#imgCopy').css({
        'top': topvalueImgTxt + 'px', // adjust top value img Text
      });
    }

    if (topValueMainTxt == ''){
      $('#mainCopy').css({
        // no difference
      });
    } else{
      $('#mainCopy').css({
        'top': topValueMainTxt + 'px', // adjust top value mainCopy
      });
    }
    if (lineHeightMainTxt == '') {
      $('#mainCopy').css({
        // no difference
      });
    }else{
      $('#mainCopy').css({
        'line-height': lineHeightMainTxt + 'px', // adjust mainCopy line height
      });
    }

    // if useFont variable is empty, specify which font to use as default
    if (useFont == '') {
      $('#mainCopy').css({
        'font-family': "TV2_bold",
      });
    }else {
      $('#mainCopy').css({
        'font-family': useFont,
      });
    }

    // Append image to div
      
      $('#img_container').css({
      backgroundImage: 'url("' + imgSrc + '")',
      'background-size': 'contain',
      'background-repeat': 'no-repeat',
      'background-position': 'center'
      });

      if (topValueImg == '') {
        // nothing changes
      } else {
        $('#img_container').css({
          'top': topValueImg + 'px', // adjust img position 
          });
      }

    ///////////////////////////////////////////////////
    ////////////////// FUNCTIONS //////////////////////
    ///////////////////////////////////////////////////

  });
});
  