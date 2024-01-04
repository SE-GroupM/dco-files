/**
 * Template Name
 * @Owner Developer Name 
 * @Date
 */

function onLemonpiReady(cb) {
    if (cb) {
        var loadLemonpiTimerId = setInterval(function() {
            if (window.lemonpi) {
                clearInterval(loadLemonpiTimerId);
                cb();
            }
        }, 0);
    }
}

// Callback to retrieve the adset data
onLemonpiReady(function() {
    lemonpi.subscribe(function callback(content) {

    console.clear();
    // Variables

    // Should be dynamic and added as a placeholder instead
    
    // Local content declaration
    const local_content = content;
    // Collection variable for titles
    let titles = local_content.titles.value;
    // Counter for amount of titles
    let amountOfTitles = parseInt(local_content.amountOfVisibleTitles.value);
    // using a new list of actual titles that exist
    let actualTitleList = [];
    // Local variable for panel container
    let panelContainer = document.getElementById("panel_container");
    let coverContainer = document.getElementById("covers");
    // Start position for title covers (should be able to change this dynamically)
    let startPositionForCovers = parseInt(local_content.leftPositionsOfCovers.value);
    
    // placeholder holding number of active covers
    
    // Margin between title covers
    let titleMargins = parseInt(local_content.leftMarginsOfCovers.value);
    // Width title cover (should also be able to change this dynamically)
    let widthCover = 66;
    // Height title cover (should also be able to change this dynamically)
    let heigthCover = 107;
    // Middle position of panel, should be dynamic as well
    let middleOfPanelContainer = parseInt($("#panel_container").css("width"))
    middleOfPanelContainer = (middleOfPanelContainer / 2) - 20;

    // Append main copy
    $('#main_copy').html(local_content.main_copy.value)
    // Append Cta copy
    $('#cta').html(local_content.cta_copy.value)

    const listOfVideoSrc = [
        { id: 1, videoSrc: "", url: ""},
        { id: 2, videoSrc: "", url: ""},
        { id: 3, videoSrc: "", url: ""},
        { id: 4, videoSrc: "", url: ""},
        { id: 5, videoSrc: "", url: ""},
        { id: 6, videoSrc: "", url: ""}
];

    // For loop to iterate through title colletions
    for (let i = 0; i < amountOfTitles; i++) {
        // Left value calculation
        let leftValueForTitles = (startPositionForCovers + (i * (widthCover + titleMargins)));
        
        $("<div>", {
            // Add both class as title cover selector but also title cover general for hover functionality
            'class': "title_cover_" + (i + 1) + ' title_cover',
            'data-exit-url': titles[i].title_click.value, // add exit url
            'data-video-src': titles[i].video_src.value,    // add videoSrc
            css: {
                content: 'url('+ titles[i].title_cover_1.value + ')',
                'background-repeat': 'no-repeat',
                'background-position': 'center center',
                'position' : 'absolute',
                'bottom': '20px',
                'width': widthCover + 'px',
                'height': heigthCover + 'px',
                'left': leftValueForTitles + 'px',
            }
        }).appendTo(coverContainer);
        listOfVideoSrc[i].url = titles[i].title_click.value;
        listOfVideoSrc[i].videoSrc = titles[i].video_src.value;
    }

    //Test variables for video
    var videoSrc = titles[0].video_src.value;
    var videoTracker = titles[0].video_tracker.value;
    
     //Video player 
     var e = document.createElement('script');
     e.src = 'https://video.seenthis.se/v2/player/74/player.js';
     e.onload = function(){
     var player = new SeenthisPlayer('.player', videoSrc, videoTracker, options); 
     };
     var s = document.getElementsByTagName('script')[0];
     s.parentNode.insertBefore(e, s);

     //Options for video script
     var options = {
         loop: true,
         loopCount: 1,
     };

     // Change to div ONLY for video covers
    // Add event listener to your click area
    document.getElementById('covers').addEventListener('click', function(event) {
        // Get the click value. This depends on how you're defining the "value" of a click.
        // For example, it might be an attribute of the clicked element, or it might be determined some other way.
        
        // TODO change to get the click from a variable instead.

         // Check if a div was clicked
        if (event.target.tagName === 'DIV') {
        // fetch the clicked videoSrc
        const newVideoSrc = event.target.getAttribute('data-video-src');
        changeVideoSource(newVideoSrc);
        }

    });
    
    // Function to reload the new video source on click
    function changeVideoSource(newVideoSrc) {

        const videoPlayer = document.querySelector('.player > div > video');
        
        // If we have a playing video
        if (videoPlayer) {
            // remove the old player
            var oldPlayerDiv = document.querySelector("#creative_container > div > div.player > div.seenthis-player");
            oldPlayerDiv.remove();

            // build a new video player with the new CURRENT videoSrc
            var player = new SeenthisPlayer('.player', newVideoSrc, videoTracker, options); 

            // BEST PRACTISE is to use this code below and load the new src on input and play it. //JOOS
            //videoPlayer.src = newVideoSrc;
            //videoPlayer.load(); // Needed to load the new source
            //videoPlayer.play();
        } else {
            console.error("Video player not found");
        }
    }

    // Animations

    var mt = new TimelineMax({ repeat: 0, delay: 0.2 })
    .from('.title_cover', 0.7, { left: middleOfPanelContainer, ease: Power1.easeOut, },) 
    .from('#main_copy', 0.2, { autoAlpha: 0} )
    .from('#cta', 0.2, { autoAlpha: 0}, 3)

    });
});