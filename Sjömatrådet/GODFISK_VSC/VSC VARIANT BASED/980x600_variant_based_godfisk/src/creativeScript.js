/**
  * Template Name
  * @Owner Developer Name 
  * @Date
*/

function onLemonpiReady(cb) {
  if (typeof cb === 'function') {
    const checkLemonpi = () => {
      if (window.lemonpi) {
        cb();
      } else {
        requestAnimationFrame(checkLemonpi);
      }
    };
    requestAnimationFrame(checkLemonpi);
  }
}

// Callback to retrieve the adset data
function handleContentReady(content) {
  // Extract values from content object
  const {
    Headline_Text: { value: headlineText },
    CTA_Text: { value: ctaText },
    CTA_Background: { value: ctaBackground },
    Background_Color: { value: backgroundColor },
    Hero_Image: { value: heroImage },
    logo: { value: logo }
  } = content;

  $("#headline_text").html('<p>'+content.Headline_Text.value+'</p>');

  // Group DOM updates
  const ctaCopyElement = document.getElementById('cta_copy');
  const ctaElement = document.getElementById('cta');
  const panelContainerElement = document.getElementById('panel_container');
  const heroImageElement = document.querySelector('.hero_image');

  if (ctaCopyElement) {
    ctaCopyElement.innerHTML = ctaText;
  }

  if (ctaElement) {
    ctaElement.style.backgroundColor = ctaBackground;
  }

  if (panelContainerElement) {
    panelContainerElement.style.backgroundColor = backgroundColor;
  }

  const elements = [
    {
      id: "headline_text",
      maxContainerWidth: 390,
      maxContainerHeight: 325,
      maxFontSize: 70,
      textSelector: "p",
    },]

    // Modified function to resize a single element with retry limit
function resizeElement(element, retryCount = 0) {
const maxRetries = 3; // Maximum number of retry attempts
const el = document.getElementById(element.id);
if (!el) {
  console.error(`Element with ID '${element.id}' not found.`);
  return;
}

const textElement = el.querySelector(element.textSelector);
if (!textElement || textElement.innerHTML.trim() === "") {
  console.warn(`Text element not found or empty in '${element.id}'.`);
  if (retryCount < maxRetries) {
    setTimeout(() => resizeElement(element, retryCount + 1), 100);
  } else {
    console.error(`Failed to resize '${element.id}' after ${maxRetries} retries.`);
  }
  return;
}

el.style.maxHeight = `${element.maxContainerHeight}px`;
el.style.maxWidth = `${element.maxContainerWidth}px`;

let fontSize = element.maxFontSize;
textElement.style.fontSize = `${fontSize}px`;

const minFontSize = 4; // Example minimum font size
while (
  (textElement.scrollHeight > element.maxContainerHeight ||
    textElement.scrollWidth > element.maxContainerWidth) &&
  fontSize > minFontSize
) {
  fontSize--;
  textElement.style.fontSize = `${fontSize}px`;
}

if (
  fontSize === minFontSize &&
  (textElement.offsetHeight > element.maxContainerHeight ||
    textElement.offsetWidth > element.maxContainerWidth)
) {
  console.warn(
    `Text in '${element.id}' cannot fit within the container at min font size.`
  );
}

console.log(`Final font size for '${element.id}': ${fontSize}px`);
}

// Function to resize all elements remains unchanged
function resizeElements() {
elements.forEach((element) => {
  resizeElement(element);
});
}
document.fonts.ready.then(function() {
resizeElements();
});

  // Update the hero image source and apply the TweenMax animation
  if (heroImageElement) {
    heroImageElement.src = heroImage;

       /////////////////
      /// ANIMATION ///
     /////////////////

    // Defer animation to idle time to prevent blocking
    requestIdleCallback(() => {
      TweenMax.to(heroImageElement, 5, {
        scale: 1.1,
        transformOrigin: "center",
        repeat: -1,
        ease: Power1.easeInOut
      });
    });
  }
}

// Register event listener for lemonpi content ready event
window.addEventListener('lemonpi.content/ready', event => {
  const { content } = event.detail;
  handleContentReady(content);
});

onLemonpiReady(() => {
  lemonpi.subscribe(content => {
    // Perform any additional operations when lemonpi is ready
  });
});
