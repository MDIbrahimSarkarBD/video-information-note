export class  VideoInformationNote {
    videoUrlInYoutube: string;
    private player: YT.Player | undefined;
    public videoID: any;
    private timeDisplayId: string = 'displaying';
    constructor(videoUrl: string) {
      this.videoUrlInYoutube = videoUrl;
      this.videoID = this.url_Validity();
      
      
    }
    static massegeIS(text:any, timeout:number){
      const massegeIS = document.getElementById('MassegeIS') as HTMLElement;
      massegeIS.innerText = text;
      massegeIS.classList.add('MassegeIS');
      // setTimeout(() => {
      //   massegeIS.innerText = '';
      // }, timeout);
  
    }
  
    url_Validity() {
      // Regular expression to match YouTube video URLs
      const youtubeRegex =
        /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  
      // Extract video ID using the regular expression
      const match = this.videoUrlInYoutube.match(youtubeRegex);
  
      // Check if a match is found and return the video ID
  
      return match && match[1] ? match[1] : null;
    }
  
    // Construct the API request and video id playing validity return boolean
    async video_cloud_validity(API_KEY: String, videoId: any): Promise<boolean> {
      const requestUrl: string = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${API_KEY}`;
  
      try {
        const response: Response = await fetch(requestUrl);
        const data: any = await response.json();
  
        if (data.items && data.items.length > 0) {
          return true; // Video exists and duration is available
        } else {
          console.log("Video not found or duration unavailable");
          return false; // Video not found or duration unavailable
        }
      } catch (error) {
        console.error("Error:", error);
        return false; // Error occurred during API call
      }
    }
  
    video_insert_place(videoContainerId: string): void {
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
      } else {
        // If the player is already initialized, load the new video
        this.player.loadVideoById(this.videoID);
      }
    }
    onPlayerReady(){
        console.log("video Playing ready");
        
    }
  
 
  private formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  
    // Handle the player state change event
    private onPlayerStateChange(event: YT.OnStateChangeEvent): void {
      console.log("YouTube player state changed.");
    }
  }