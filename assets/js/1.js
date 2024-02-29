var player;
var videoID = 'JNqFUyIrx2I';


function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: videoID,
    playerVars: {
      controls: 1, // Hide default controls
      disablekb: 1, // Disable keyboard controls
      enablejsapi: 1 // Enable the JavaScript API
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}
var progressBar;
function onPlayerReady(event) {
  // Get the progress bar element
   progressBar = player.getIframe().contentDocument.querySelector('.ytp-progress-bar-container');

  // Add an event listener to the progress bar
  progressBar.addEventListener('click', function(event) {
    // Get the width of the progress bar
    var progressBarWidth = progressBar.offsetWidth;

    // Calculate the percentage of the click position
    var clickX = event.clientX - progressBar.getBoundingClientRect().left;
    var percentage = clickX / progressBarWidth;

    // Calculate the new time based on the percentage
    var newTime = player.getDuration() * percentage;

    // Perform your conditions based on the click position
    if (newTime < 60) {
      console.log('Clicked on progress bar before 1 minute.');
    } else {
      console.log('Clicked on progress bar after 1 minute or more.');
    }

    // Seek to the new time
    player.seekTo(newTime, true);
  });
}

function onPlayerStateChange(event) {
  // You can handle player state changes here
}