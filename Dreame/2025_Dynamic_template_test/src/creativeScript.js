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
  const content = event.detail.content
  const source = event.detail.source
  // Do stuff

  const local_content = content;

  console.log(content);

  //Append background image
  $("#bgImage").css("background-image","url("+local_content.Hero_Image.value+")");
  //Append logo image
  $("#logo").css("background-image","url("+local_content.Logo.value+")");
  //Append copy
  $("#headlineText").html(local_content.Headline_Text.value);
  $("#subText").html(local_content.Sub_Text.value);
  $("#cta").html(local_content.CTA_Text.value);

  gsap.set("#textHolder", { marginTop:local_content.Copy_Margin_Top.value});
  gsap.set("#cta", { backgroundColor: local_content.CTA_Text_Active_Background_Color.value, color:local_content.CTA_Text_Active_Color.value, border:local_content.CTA_Text_Active_Border.value, ease: "expo.out", duration: 0.5});
  addStylesheets(local_content.Extra_Font_URL.value)

  $('#creative_container').mouseenter(onMouseEnter);
  $('#creative_container').mouseleave(onMouseLeave);

  const timeline = gsap.timeline({
    repeat:3,
    repeatDelay: 3
  });

  timeline
    .to("#creative_container", { opacity:1, ease: "expo.out", duration:0.7}, "+=0.2")
    .fromTo("#headlineText", { opacity:0, x:-10}, { opacity:1, x:0, ease: "expo.out", duration: 1})
    .fromTo("#subText", { opacity:0, x:-10}, { opacity:1, x:0, ease: "expo.out", duration: 1}, "-=0.7")
    .fromTo("#cta", { opacity:0, scale:0.5}, { opacity:1, scale:1, ease: "expo.out", duration: 1}, "-=0.7");
    
  gsap.delayedCall(0.2, startResizeFont);

  function startResizeFont(){
    const subTextElement = document.querySelector("p#subText");
    autoResizeFont(subTextElement, 2, 7);

    const headlineTextElement = document.querySelector("p#headlineText");
    autoResizeFont(headlineTextElement, 2, 17);
  }

  function autoResizeFont(element, maxLines, minFontSize) {
    if (!element || !element.tagName) {
        console.error("Invalid element provided.");
        return;
    }

    const elementStyle = window.getComputedStyle(element);
    const initialFontSize = parseFloat(elementStyle.fontSize);
    const lineHeight = parseFloat(elementStyle.lineHeight) || initialFontSize;

    if (isNaN(initialFontSize) || isNaN(lineHeight)) {
        console.error("Failed to retrieve font size or line height.");
        return;
    }

    let currentFontSize = initialFontSize;

    // Function to calculate the number of lines using the element's height
    function calculateLines() {
        const elementHeight = element.getBoundingClientRect().height;
        return Math.round(elementHeight / lineHeight);
    }

    // Reduce font size until the text fits within the max lines or the minimum font size is reached
    while (calculateLines() > maxLines && currentFontSize > minFontSize) {
        currentFontSize -= 1; // Decrease font size
        //element.style.fontSize = `${currentFontSize}px`;
        //$(element).css("font-size",`${currentFontSize}px`);
        gsap.set(element, { fontSize:`${currentFontSize}px`});
    }

    

    // Notify if the minimum font size was reached without fitting the lines
    if (currentFontSize <= minFontSize && calculateLines() > maxLines) {
        console.warn("Text could not be resized to fit within the max lines without exceeding the minimum font size.");
    }
  }

  function onMouseEnter(e){
    gsap.to("#cta", { backgroundColor: local_content.CTA_Text_Hover_Background_Color.value, color:local_content.CTA_Text_Hover_Color.value, border:local_content.CTA_Text_Hover_Border.value, ease: "expo.out", duration: 0.5});
  }

  function onMouseLeave(e){
    gsap.to("#cta", { backgroundColor: local_content.CTA_Text_Active_Background_Color.value, color:local_content.CTA_Text_Active_Color.value, border:local_content.CTA_Text_Active_Border.value, ease: "expo.out", duration: 0.5});
  }

  function addStylesheets(urls, media = "all") {
    if (!urls || urls.trim() === "") return; // Exit function if no URLs provided
    
    urls.split(",").forEach(url => {
        const trimmedUrl = url.trim();
        if (trimmedUrl) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = trimmedUrl;
            link.media = media;
            link.onload = () => console.log(`Stylesheet loaded: ${trimmedUrl}`);
            link.onerror = () => console.error(`Failed to load stylesheet: ${trimmedUrl}`);
            
            document.head.appendChild(link);
        }
    });
  }

  //Append exit url to creative container
  document.getElementById('creative_container').onclick = () =>
    window.dispatchEvent(
        new CustomEvent('lemonpi.interaction/click', {
        detail: {
            placeholder: ['URL_Exit'],
        }
    })
  );
})