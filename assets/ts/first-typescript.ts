
console.log("type script check");

import { VideoInformationNote } from "./video-information-class.js";

const VINote: VideoInformationNote = new VideoInformationNote(
  "https://www.youtube.com/watch?v=lnup-9bBCUQ"
);

// VINote.video_insert_place("player2");

// Define the onYouTubeIframeAPIReady function
function onYouTubeIframeAPIReady() {
  // Create an instance of YouTubeVideoManager
  const videoManager = new VideoInformationNote("https://www.youtube.com/watch?v=lnup-9bBCUQ");

  // Load and play a YouTube video
  //https://www.youtube.com/watch?v=lnup-9bBCUQ

}

// Find the button element by its ID
const button = document.getElementById('play') as HTMLElement;

// Add an event listener to the button
button.addEventListener('click', function(event: MouseEvent) {
    console.log('Button clicked!');
    console.log('Event:', event);
    VINote.video_insert_place("player2");
    VideoInformationNote.massegeIS("button click", 3000);
});



// MY Google API
// const api_key: string = "AIzaSyDPBMHt70deqFNfr-bvDhUb0pWu3tlUT5g";
// const videoId: any = VINote.url_Validity();
