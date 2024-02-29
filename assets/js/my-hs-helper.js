// url checker
function isValidYoutubeUrl(url) {
    // Regular expression to match YouTube video and channel URLs
    var youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|channel\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/i;
    
    // Test if the URL matches the YouTube video or channel pattern
    return youtubeRegex.test(url);
}


function getYouTubeVideoId(url) {
    // Regular expression to match YouTube video URLs
    var youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    
    // Extract video ID using the regular expression
    var match = url.match(youtubeRegex);
    
    // Check if a match is found and return the video ID
    if (match && match[1]) {
        return match[1];
    } else {
        return null;
    }
}



