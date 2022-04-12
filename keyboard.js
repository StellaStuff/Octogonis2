
let keyboardHandler;

class KeyboardHandler {
    constructor() {
        let temp = Object.entries(keyboardHandler.inputs);
        print(temp);
        for( var i = 0; i += 1; i < temp.length) {
            print( Object.fromEntries(temp[i][1]));
        }
        
    }
}


function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    Rleft = true;
  }
  if (keyCode === RIGHT_ARROW) {
    Rright = true;
  }
  if (keyCode === UP_ARROW) {
    Rup = true;
  }
  if (keyCode === DOWN_ARROW) {
    Rdown = true;
  }
  if (key == 'a') {
    Lleft = true;
  }
  if (key == 'd') {
    Lright = true;
  }
  if (key == 'w') {
    Lup = true;
  }
  if (key == 's') {
    Ldown = true;
  }
}
    
function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    Rleft = false;
  }
  if (keyCode === RIGHT_ARROW) {
    Rright = false;
  }
  if (keyCode === UP_ARROW) {
    Rup = false;
  }
  if (keyCode === DOWN_ARROW) {
    Rdown = false;
  }
  if (key == 'a') {
    Lleft = false;
  }
  if (key == 'd') {
    Lright = false;
  }
  if (key == 'w') {
    Lup = false;
  }
  if (key == 's') {
    Ldown = false;
  }
}
 
    /*
  if (keyCode === ENTER && debug) {
    walls.walls.push(new Wall(player.rotation, 1.25))
    print(walls);
    print(walls.length - 1);
  }





  if (key == 's' && debug) {
    let temp = [];
    for (var i = 0; i < walls.length; i++) {
      temp.push(walls[i].rotation.toString());
      temp.push(walls[i].x.toString());
    }

    saveStrings(temp, "ffuck");
    print("test");
    print(walls);
    print(walls.length);
  }

  if (key == '=' && debug) {
    walls[walls.length - 1].x = walls[walls.length - 1].x + 0.01;
  }

  if (key == '-' && debug) {
    walls[walls.length - 1].x = walls[walls.length - 1].x - 0.01;
  }


  if (key == 'f') {
    if (fullscreen()) {
      resizeCanvas(lastWidth, lastHeight);
    } else {
      resizeCanvas(displayWidth, displayHeight);
      
    }
    resetElements();
    size = sqrt((width * width) + (height * height)) / 2;
    fullscreen(!fullscreen());
  }


  if ((gameState == "title" || gameState == "gameOver") && goBuffer < 0) {

    startNewGame();
  }

  if (key == "p") {
    if (paused) {
      unPause();
    } else {
      pause();
    }
  }
  */





/*document.addEventListener("visibilitychange", function() {
  if (gameState == "game") {
    if (document.visibilityState === 'visible') {
      if (!song.isLooping()) song.loop();
    } else {
      if (song.isLooping()) song.pause();
    }
  }
});*/