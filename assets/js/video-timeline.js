let Video_url_in_user = $('Video_url_in_user');
var player;
function loadAndPlayYouTubeVideo(videoId) {
    if (player) {
        player.stopVideo();
        player.loadVideoById(videoId);
        console.log('Video Stop And play');
        
    } else {
        console.log('Play new onject video in youtube');
        
        player = new YT.Player('player', {
            height: '360',
            width: '640',
            videoId: videoId,
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
}
var progressBar;
function onPlayerReady(event) {
    player.getIframe().addEventListener('click', function(event) {
        // Get the width of the player's container
        var playerWidth = player.getIframe().offsetWidth;
    
        // Calculate the time based on the click position
        var clickX = event.clientX - player.getIframe().getBoundingClientRect().left;
        var percentage = clickX / playerWidth;
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


function loadNextVideo(nextVideoId) {
    // Implement your logic to determine the next video ID
   
    // Load the next video
    player.loadVideoById(nextVideoId);
}



// Define your API key
const API_KEY = 'AIzaSyDPBMHt70deqFNfr-bvDhUb0pWu3tlUT5g'; // Replace with your own API key

// Function to get video duration
function getVideoDuration(videoId) {
  // Construct the API request
  const requestUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${API_KEY}`;

  // Make the API call
  fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
      // Check if response contains items and the item is not empty
      if (data.items && data.items.length > 0) {
        const duration = data.items[0].contentDetails.duration;
        console.log("Video duration:", convertISO8601ToDuration(duration));
      } else {
        console.log("Video not found or duration unavailable");
      }
    })
    .catch(error => console.error("Error:", error));
}

// Function to convert ISO 8601 duration format to HH:MM:SS format
function convertISO8601ToDuration(duration) {
  const matches = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = matches[1] ? parseInt(matches[1]) : 0;
  const minutes = matches[2] ? parseInt(matches[2]) : 0;
  const seconds = matches[3] ? parseInt(matches[3]) : 0;

  return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
}

// Function to pad single digits with leading zeros
function pad(num) {
  return (num < 10) ? '0' + num : num;
}




function checkYouTubeVideoValidity(videoId, apiKey, callback) {
    // Construct the API request URL
    var apiUrl = 'https://www.googleapis.com/youtube/v3/videos';
    apiUrl += '?part=snippet&id=' + videoId;
    apiUrl += '&key=' + apiKey;

    // Make a GET request to the YouTube Data API
    fetch(apiUrl)
        .then(response => {
            // Check if response is successful (status code 200)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Check if the video exists
            if (data.items && data.items.length > 0) {
                console.log("Valid YouTube video ID");
                callback(videoId);
                console.log("Title:", data.items[0].snippet.title);
            } else {
                console.log("Invalid YouTube video ID");
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            console.log("Invalid YouTube video ID or error occurred while checking validity");
        });
}

// Example usage:

var apiKey = API_KEY;


$("#youtube_video_url").on('change', function  () {

    console.log($(this).val());

var videoId =  getYouTubeVideoId($(this).val());
checkYouTubeVideoValidity(videoId, apiKey,loadAndPlayYouTubeVideo);
getVideoDuration(videoId);


if ($(this).val()) {

    loadNextVideo(videoId);
} else {
    console.log("Invalid GitHub profile URL");
}
});

let count = 1;
function onPlayerStateChange(event) {
    // You can handle player state changes here
    console.log("Invalid GitHub profile URL = "+ count++);
    var newTime = player.getCurrentTime() ;
    
    // Perform your condition here
    if (newTime < 60) {
      console.log('Clicked on progress bar before 1 minute.'+newTime);
    } else {
      console.log('Clicked on progress bar after 1 minute or more.'+newTime);
    }

  }