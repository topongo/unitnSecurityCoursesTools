// Use this file for "Corso Salute e Sicurezza sul Luogo di Lavoro - Formazione GENERALE" course

// To make it function:
//   1  open the course window and click the big play button
//   2  hit f12 and go to the "Console" tab
//   3  Based on what browser you are using:
//      Chrome (or chromium based, eg. Edge, Opera, ecc): in the drop-down menu in the top left corner select "scormdriver_content"
//      Firefox: in the drop-down menu in the right bottom corner select "Modulo X" (X will be the module you are attending)
//   4  paste this file in the command line (the browser may complain about pasting code in the console, and it's not wrong! check my code before pasting stuff in you browser!)
//   5  hit enter
//  (6) grant notification permission if you want to get notified when an excercise needs to be done
//   7  click on the play button, sit and enjoy your click free experience
//
// If the video already started don't worry, you can do the same procedure starting from step 3
//

var next = document.getElementById("control-next")
var playpause = document.getElementById("control-pauseplay")
var play_icon = playpause.getElementsByClassName("icon")[0]
var submit = document.getElementById("control-submit")

function playing(){
    return play_icon.classList.contains("pause")
}

function visible(a){
    return a.style.display != "none"
}

if (Notification.permission !== "denied")Notification.requestPermission();

var observer = new MutationObserver(function(mutations) {
    console.log("Mutation detected.")
    console.log(mutations)

    if(!playing()){
        if(player.timelineManager.getActiveTimelineOwner().timeline._timelineComplete) {
            if (visible(next)) {
                // yes
                next.click()
            } else if (visible(submit)) {
                // no, probably there's an exercise ongoing
                var notification = new Notification("Corso sicurezza: interazione richiesta!");
            } else {
                console.log("unknown event occurred, interaction required")
            }
        }
    }
})

observer.observe(document.getElementById("control-next"), {"attributes": true})

