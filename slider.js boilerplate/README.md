# Slider Plugin
With the Slider Plugin you can easily transform your dynamic data, or image layers, into a configurable slider.


## How to use
This plugin has the following depencies:
1. Add a divs with id and class "slider" and "slide" to your html, see code below.
2. In your script.js create the slider variable by adding the javascript code below.
3. Make sure JQuery and GSAP are added to your creative.


**HTML**
```
<div id="creative_container" class="creative_container">
  <div id="slider" class="slider">
    <div id="slide" class="slide">
  </div>
</div>
```
**JS**
```
var slider = plugins.slider.create({})
```

## Using dynamic data as slider data
In this example a collection placeholder named 'sliderCollection' is used, with a text placeholder called title and an image placeholder called productImage.
```
Slider.create({
	slidesData: content.sliderCollection.value,
	setSlideContent: function(slideDiv, slideData, slideIndex) {
		$(slideDiv).find(".image").css("background-image","url("+slideData.productImage.value+")");
		$(slideDiv).find(".title").html(slideData.text.value);
	}
});
```
## Custom animations
In this example we animate the price element differently than the rest of the slide div.
```
Slider.create({    
	animation: function(timeline, slidesWrapper, currentSlide, lastSlide, index, target, onComplete) {
      timeline
        .to(slidesWrapper, {
            duration: 0.4,
            ease: Power1.easeout,
            x: -target
        })
		//Add additional animations here
		timeline.from($(currentSlide).find(".price"), {duration:0.4, scale: 0, 0.7)
	}
});
```