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

    // fetch content from adset
    var local_content = content;

    var mainCopy = local_content.mainText.value; // get mainCopy
    var imgCopy = local_content.imgText.value; // get imgCopy
    var imgSrc = local_content.imagePlaceholder.value; // get img src
    var publicist = local_content.publicist.value.toLowerCase();
    var panelTopValue = local_content.panelTopValue.value;

    // variables adjusting CSS top value for img, imgText and mainCopy
    var topvalueImgTxt = parseInt(content.topValue_imgTxt.value);
    var topValueMainTxt = parseInt(content.topValue_mainCopy.value);
    var topValueImg = parseInt(content.topValue_img.value);

    // variables holding logo and adjusting position of it
    var logo_src = local_content.logo_src.value;
    var logo_top_placement = parseInt(local_content.logo_topplacement.value);
    var logo_left_placement = parseInt(local_content.logo_leftplacement.value);

    // Added possibility to change fontsize on mainCopy
    var mainCopy_fontSize = parseInt(local_content.mainText_fontSize.value);

    // css line heiught on mainCopy
    var lineHeightMainTxt = parseInt(content.lineHeight_mainCopy.value);
    // Append data to html in creative
    $('#mainCopy').html(mainCopy);
    $('#imgCopy').html(imgCopy);

    $('#panel_container').css({
      'top' : panelTopValue + 'px',
    });
  
    if (publicist.toLowerCase() === "amedia") {
      $('#mainCopy').css({
        'font-family': 'Amedia_montserat_bold',
      });
      $('#imgCopy').css({
        'opacity': 0,
      });
      $('#mainCopy').css({
        'font-size': '50px',
      });
    } else if (publicist === "tv2") {
      $('#mainCopy').css({ 
        'font-family': 'TV2_bold',
      });
      $('#imgCopy').css({
        'font-family': 'TV2_regular',
      });
    } else if (publicist === "aller") {
      $('#mainCopy').css({
        'font-family': 'Arial Narrow-Bold',
      });
      $('#imgCopy').css({
        'font-family': 'Arial Narrow-Regular',
      });
      $('#mainCopy').css({
        'font-size': '60px',
      });
    }

    // adjust mainCopt fontsize
    if (mainCopy_fontSize != '') {
      $('#mainCopy').css({
        'font-size': mainCopy_fontSize+'px',
      });
    }
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
      
      $('#logo_container').css({
        backgroundImage: 'url("' + logo_src + '")',
        'background-size': 'contain',
        'background-repeat': 'no-repeat',
        'background-position': 'left'
        });

        if (logo_top_placement === '' && logo_left_placement === '') {
          // nothing changes
        } else {
          $('#logo_container').css({
            'top': logo_top_placement + 'px', // adjust img position
            'left': logo_left_placement + 'px', // left 
            });
        }

  

    ///////////////////////////////////////////////////
    ////////////////// FUNCTIONS //////////////////////
    ///////////////////////////////////////////////////

  });
});
