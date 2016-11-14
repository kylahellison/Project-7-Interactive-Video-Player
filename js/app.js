//Could not finish two of the Exceeds Expectations requirements 
//Couldn't figure out how to make the video jump to point of video corresponding to where user clicked on the transcript
//Couldn't figure out the buffering progress



document.addEventListener("DOMContentLoaded", function() {
	console.log("DOM fully loaded");
	initializeHTMLPlayer(); 
}, false);



//VARIABLES
var videoPlayer;
var progressBar = document.getElementById('progress-bar');
var lines = document.getElementById("caption-wrap").getElementsByTagName("span");
var speedSlow = document.getElementById("slow");
var speedNormal = document.getElementById("normal");
var speedFast = document.getElementById("fast");



function initializeHTMLPlayer() {
	videoPlayer = document.getElementById('video-player');
	videoPlayer.controls = false;
	videoPlayer.textTracks[0].mode="hidden";
	videoPlayer.addEventListener('timeupdate', updateProgressBar, false);
	videoPlayer.addEventListener('timeupdate', seektimeupdate, false);
	
	//show controls when page first loads
	var videocontrols = document.getElementById('video-controls');
	videocontrols.style.visibility = "visible";	

	videoPlayer.addEventListener("timeupdate", highlight, false);

	speedSlow.addEventListener("click", changeSpeedS, false);
	speedNormal.addEventListener("click", changeSpeedN, false);
	speedFast.addEventListener("click", changeSpeedF, false);
}


//Show video controls on mouseover
function showControls() {
	var videocontrols = document.getElementById('video-controls');
	videocontrols.style.display = "flex";
}

//Hide video controls on mouseout
function hideControls() {
	var videocontrols = document.getElementById('video-controls');

		if (videoPlayer.paused) {
		videocontrols.style.display = "flex";	
		} else {
			videocontrols.style.display = "none";
		}
}

//toggle visibility of play and pause buttons
function togglePlayPause() {
	var playbtn = document.getElementById('playpause');
	var pausebtn = document.getElementById('pauseplay');
	var videocontrols = document.getElementById('video-controls');
	if (videoPlayer.paused || videoPlayer.ended) {
		playbtn.title = "play";
		videoPlayer.play();
		playbtn.style.display = "none";
		pausebtn.style.display = "block";
	} else {
		pausebtn.title = "pause";
		videoPlayer.pause();
		playbtn.style.display = "block";
		pausebtn.style.display = "none";		
	}
}

function showPause() {
	if (videoPlayer.paused) {
		videocontrols.style.display = "flex";	
	}
}

//stop button - on click video stops playback
function stopPlayer() {
	videoPlayer.pause();
	videoPlayer.currentTime = 0;
}


//mute button - on click video volume mutes
function toggleMute() {
	var mutebtn = document.getElementById('mute');
	var unmutebtn = document.getElementById('unmute');
	if (videoPlayer.muted) {
		mutebtn.style.display ="block";
		unmutebtn.style.display = "none";
		mutebtn.title = "mute";
		videoPlayer.muted = false;

	} else {
		mutebtn.style.display = "none";
		unmutebtn.style.display ="block";
		unmutebtn.title = "unmute";
		videoPlayer.muted = true;

	}
}

//VOLUME SLIDER
function SetVolume(val) {
	console.log('Before: ' + videoPlayer.volume);
	videoPlayer.volume = val / 100;
	console.log('After: ' + videoPlayer.volume);
}

//toggle full screen 
function toggleFullScreen() {
	var fullscreenbtn = document.getElementById('fsbutton');
	if (videoPlayer.requestFullScreen) {
		videoPlayer.requestFullScreen();
	} else if (videoPlayer.webkitRequestFullScreen) {
		videoPlayer.webkitRequestFullScreen();
	} else if (videoPlayer.mozRequestFullScreen) {
		videoPlayer.mozRequestFullScreen();
	}
}

//toggle captions on/off
function toggleCaptions() {
	//if captions are off
	if (videoPlayer.textTracks[0].mode == "hidden") {
	//turn captions on
		videoPlayer.textTracks[0].mode = "showing";
	} else {
	//if they're already on, turn them off
		videoPlayer.textTracks[0].mode = "hidden";
	}
}

//make progress bar fill in as video plays
function updateProgressBar() {
	var percentage = Math.floor((100 / videoPlayer.duration) * videoPlayer.currentTime);
	progressBar.value = percentage;
	progressBar.innerHTML = percentage + '% played';
}


//make progress bar clickable to take you to another part of the video
var seekBar = document.getElementById('progress-bar');
seekBar.addEventListener("click", seek);
function seek(e) {
	var percent = e.offsetX / this.offsetWidth;
	videoPlayer.currentTime = percent * videoPlayer.duration;
	seekBar.value = percent * 100;
}

//display time played and total video time
function seektimeupdate() {
	var current = document.getElementById("current");
	var timeDuration = document.getElementById("duration");
	var nt = videoPlayer.currentTime * (100 / videoPlayer.duration);
	progressBar.value = nt;
	var curmins = Math.floor(videoPlayer.currentTime / 60);
	var cursecs = Math.floor(videoPlayer.currentTime - curmins * 60);
	var durmins = Math.floor(videoPlayer.duration / 60);
	var dursecs = Math.floor(videoPlayer.duration - durmins * 60);

	if(cursecs < 10){ cursecs = "0"+cursecs; }
	if(dursecs < 10){ dursecs = "0"+dursecs; }
	if(curmins < 10){ curmins = "0"+curmins; }
	if(durmins < 10){ durmins = "0"+durmins; }
	current.innerHTML = curmins+":"+cursecs+" / ";
	timeDuration.innerHTML = durmins+":"+dursecs;
}



//Highlight transcript
function highlight() {
	var timenow = Math.floor(videoPlayer.currentTime);
	//var lines = document.getElementById("caption-wrap").getElementsByTagName("span");
	for (var i=0; i<lines.length; i++) {
		if (timenow >= parseInt(lines[i].dataset.start) && timenow <= parseInt(lines[i].dataset.end) ) {
			lines[i].classList.add("highlight");
		} else {
			lines[i].classList.remove("highlight");
		}	
	}
}


//Playback speed control
function changeSpeedS() {
		videoPlayer.playbackRate = 0.75;
} 

function changeSpeedN() {
		videoPlayer.playbackRate = 1;
} 

function changeSpeedF() {
		videoPlayer.playbackRate = 1.75;
} 