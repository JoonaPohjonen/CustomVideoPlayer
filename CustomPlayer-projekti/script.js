let video = document.querySelector('.video');
let juice = document.querySelector('.orange-juice');
let btn = document.getElementById('play-pause');
let fullscreen = document.getElementById('fullscreen');
let videoContainer = document.getElementById('videoContainer');
let volumeincrease = document.getElementById('volinc');
let volumedecrease = document.getElementById('voldec');
let bar = document.querySelector('.orange-bar');
let mute = document.getElementById('mute');

/*---tarkistetaan-tukeeko-selain-fullscrean-toimintoa---*/
let fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
let isFullScreen = function() {
  return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
};
/*---tarkistetaan-tukeeko-selain-fullscrean-toimintoa---*/
/*----Play---*/
function togglePlayPause() {
  if(video.paused) {
    btn.className = 'pause';
    video.play();
  } else {
    btn.className = 'play';
    video.pause();
  }
}

btn.onclick = function() {
  togglePlayPause();
};

video.addEventListener('timeupdate', function() {
  let juicePos = video.currentTime / video.duration;
  juice.style.width = juicePos * 100 + '%';
  if(video.ended) {
    btn.className = 'rewatch';
  }
});
/*----Play---*/

/*----fullscreen----*/
/*---jossei-fullscreen-toimintoa-tueta-näppäin-piilotetaan---*/
if(!fullScreenEnabled) {
  fullscreen.style.display = 'none';
}
/*---jossei-fullscreen-toimintoa-tueta-näppäin-piilotetaan---*/
fullscreen.onclick = function() {
  goFullScreen();
};

function goFullScreen() {
  if (isFullScreen()) {
    fullscreen.className = 'play';
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
    setFullscreenData(false);
  }
  else {
    fullscreen.className = 'pause';
    if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
    else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
    else if (videoContainer.webkitRequestFullScreen) videoContainer.webkitRequestFullScreen();
    else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
    setFullscreenData(true);
  }
}
/*----fullscreen----*/
/*-----volume-----*/
volumeincrease.addEventListener('click', function() {
  alterVolume('+');
});

volumedecrease.addEventListener('click', function() {
  alterVolume('-');
});

let alterVolume = function(dir) {
  let currentVolume = Math.floor(video.volume * 10) / 10;
  if(dir === '+') {
    if(currentVolume < 1) video.volume += 0.1;
  } else if(dir === '-') {
    if(currentVolume > 0) video.volume -= 0.1;
  }
};
/*-----volume-----*/
/*------skip------*/
bar.addEventListener('click', function(event) {
  let x = (event.clientX - this.offsetLeft) / this.offsetWidth;
  console.log(x);
  console.log(video.duration);
  console.log(Math.floor(video.duration * x));
  video.currentTime = Math.floor(video.duration * x);
});
/*------skip------*/
/*-----mute-----*/
mute.addEventListener('click', function(event) {
  video.muted = !video.muted;
});

mute.onclick = function() {
  toggleMute();
};

function toggleMute() {
  if(video.muted) {
    mute.className = 'muted';
    console.log('muted');
  } else {
    mute.className = 'unmuted';
    console.log('unmuted');
  }
}
/*-----mute-----*/