// Use this file for "Corso Salute e Sicurezza sul Luogo di Lavoro - FORMAZIONE SPECIFICA - Rischio Basso" course

// To make it function:
//   1  open the course window and wait until a play button appears, don't click it yet
//   2  hit f12 or right click anywhere and then on "inspect element"
//   3  go to the "Console" tab
//   4  paste this file
//   5  hit enter
//  (6) grant notification permission if you want to get notified when an excercise needs to be done
//   7  click on the play button, sit and enjoy your click free experience
//
// If the video already started don't worry, you can do the same procedure starting from step 3
//


if (Notification.permission !== "denied")Notification.requestPermission()

var iframedoc = document.getElementById("scorm_object").contentWindow.document


// click the button on screen if Click_Box
function clickIfClickBox(item){
  if(item.id.includes("Click_Box")){
    console.log("Found one Click_Box suitable for clicking:")
    console.log(item)
    item.click()
    return true
  }
  return false
}

function answerAndSend(){
  for(let item of iframedoc.getElementsByTagName("input")){
    if(item.type == "radio"){
      item.click()
      for(let item of iframedoc.getElementsByClassName("cp-frameset")){
        //                                                                                        ↓↓↓        I am assuming this       ↓↓↓
        if(item.hasAttribute("aria-label") && (item.getAttribute("aria-label") == "Conferma " || item.getAttribute("aria-label") == "Confirm ")){
           item.click()
           function wait(){
             let banner = iframedoc.getElementById("feedbackClickDiv")
             if(banner)
               banner.click()
             else
               setTimeout(wait, 100)
           }
           setTimeout(wait, 100)
        }
      }
    }
  }
}

var observer = new MutationObserver(function(mutations) {
  console.log("Mutation detected.")
  if(mutations[0].attributeName == "title"){
    if(mutations[0].target.getAttribute("title") == "Play"){
      console.log("Video Paused")
      console.log("Trying to find a \"continue\" button...")
      for(let item of iframedoc.getElementsByClassName("cp-frameset")){
        if(clickIfClickBox(item)) break
        if(item.getAttribute("aria-label") && item.getAttribute("aria-label").includes("INIZIA IL TEST")){
          console.log("Detected exercise")
          var notification = new Notification("Corso sicurezza: interazione richiesta!")
        }
      }
      answerAndSend()
    }
    else if(mutations[0].target.getAttribute("title") == "Pause")console.log("Video Played")
  }
})

observer.observe(iframedoc.getElementsByClassName("playbarBigButton")[0], {
    attributes: true
})

for(let item of iframedoc.getElementsByClassName("cp-frameset")){
  clickIfClickBox(item)
}
