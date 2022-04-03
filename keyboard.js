function keyPressed() {
  if (keyCode === LEFT_ARROW || key == 'a') {
    left = true;
  }
  if (keyCode === RIGHT_ARROW || key == 'd') {
    right = true;
  }
  if (keyCode === UP_ARROW || key == 'w') {
    up = true;
  }
  if (keyCode === DOWN_ARROW || key == 's') {
    down = true;
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

}

function keyReleased() {
  if (keyCode === LEFT_ARROW || key == 'a') {
    left = false;
  }
  if (keyCode === RIGHT_ARROW || key == 'd') {
    right = false;
  }
  if (keyCode === UP_ARROW || key == 'w') {
    up = false;
  }
  if (keyCode === DOWN_ARROW || key == 's') {
    down = false;
  }
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