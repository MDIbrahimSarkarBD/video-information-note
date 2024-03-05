// Define a TypeScript class to manage YouTube videos
export class YouTubeVideoManager {
    constructor() {
        this.videoID = 'lnup-9bBCUQ';
    }
    // Load and play a YouTube video
    loadAndPlayVideo(videoContainerId) {
        if (!this.player) {
            // If the player is not initialized, create a new one
            this.player = new YT.Player(videoContainerId, {
                height: 300,
                width: 600,
                videoId: this.videoID,
                events: {
                    'onReady': this.onPlayerReady.bind(this),
                    'onStateChange': this.onPlayerStateChange.bind(this)
                }
            });
        }
        else {
            // If the player is already initialized, load the new video
            this.player.loadVideoById(this.videoID);
        }
    }
    // Handle the player ready event
    onPlayerReady(event) {
        console.log('YouTube player is ready.');
    }
    // Handle the player state change event
    onPlayerStateChange(event) {
        console.log('YouTube player state changed.');
    }
}
// Define the onYouTubeIframeAPIReady function
function onYouTubedIframeAPIReady() {
    // Create an instance of YouTubeVideoManager
    const videoManager = new YouTubeVideoManager();
    // Load and play a YouTube video
    //https://www.youtube.com/watch?v=lnup-9bBCUQ
    videoManager.loadAndPlayVideo('player2');
}
