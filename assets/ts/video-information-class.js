var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class VideoInformationNote {
    constructor(videoUrl) {
        this.timeDisplayId = 'displaying';
        this.videoUrlInYoutube = videoUrl;
        this.videoID = this.url_Validity();
    }
    static massegeIS(text, timeout) {
        const massegeIS = document.getElementById('MassegeIS');
        massegeIS.innerText = text;
        massegeIS.classList.add('MassegeIS');
        // setTimeout(() => {
        //   massegeIS.innerText = '';
        // }, timeout);
    }
    url_Validity() {
        // Regular expression to match YouTube video URLs
        const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        // Extract video ID using the regular expression
        const match = this.videoUrlInYoutube.match(youtubeRegex);
        // Check if a match is found and return the video ID
        return match && match[1] ? match[1] : null;
    }
    // Construct the API request and video id playing validity return boolean
    video_cloud_validity(API_KEY, videoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${API_KEY}`;
            try {
                const response = yield fetch(requestUrl);
                const data = yield response.json();
                if (data.items && data.items.length > 0) {
                    return true; // Video exists and duration is available
                }
                else {
                    console.log("Video not found or duration unavailable");
                    return false; // Video not found or duration unavailable
                }
            }
            catch (error) {
                console.error("Error:", error);
                return false; // Error occurred during API call
            }
        });
    }
    video_insert_place(videoContainerId) {
        if (!this.player) {
            // If the player is not initialized, create a new one
            this.player = new YT.Player(videoContainerId, {
                height: 260,
                width: 320,
                videoId: this.videoID,
                events: {
                    onReady: this.onPlayerReady.bind(this),
                    onStateChange: this.onPlayerStateChange.bind(this),
                },
            });
        }
        else {
            // If the player is already initialized, load the new video
            this.player.loadVideoById(this.videoID);
        }
    }
    onPlayerReady() {
        console.log("video Playing ready");
    }
    formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    // Handle the player state change event
    onPlayerStateChange(event) {
        console.log("YouTube player state changed.");
    }
}
