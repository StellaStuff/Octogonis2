
function check(pr) { //pr stands for pressed/released
    let temp = Object.keys(inputs); //creates a temporary array of strings based on the names of the inputs
    for (let i = 0; i < temp.length; i++) { //runs through and checks all of the buttons to see if any of them are being pressed by checking each of the preset input keycodes against the current one. there is almost certainly a better way of doing this but it works
        if (keyCode == inputs[temp[i]].code) {
            inputs[temp[i]].active = pr;
        }
    }
    //print(inputs);
}


function keyPressed() {
    check(true);
    if (inputs.PLAY.active) {
        save();
        //startNewGame();   
    }
}
    
function keyReleased() {
    check(false);
}




/*document.addEventListener("visibilitychange", function() {
  if (gameState == "game") {
    if (document.visibilityState === 'visible') {
      if (!song.isLooping()) song.loop();
    } else {
      if (song.isLooping()) song.pause();
    }
  }
});*/