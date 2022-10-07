// this one just adds a progress bar and modify the video playing speed.
// don't forget to modify the playback speed value down below.
//
//                        **** WARNING ****
// this just speeds up the playback but you have to play the video at
// normal speed if you want moodle to recognise it.
// I suggest in running two separate windows, one with normal speed muted
// and the other sped up for actually listening and don't die bored :)
//
// Also some time it bugs out and it hangs... just reopen it and click
// on "continue from where I left".
//


const tabs = document.getElementById("tabs")
const n = document.createElement("p")
const b = document.createElement("progress")
b.max = 100
tabs.appendChild(n)
tabs.appendChild(b)
const video = document.getElementsByTagName("video")[0]


var video_speed = 1.5 //    <---- Modify this value for modifying the playback speed


function update(){
  var perc = Math.floor(video.currentTime / video.duration * 1000) / 10;
  n.innerHTML = perc + "%"
  b.value = perc
  setTimeout(update, 1000)
}
