var gameState = "loading";
var size;
var halfnotes = [0,1,1,0,1,1,1,0];
var fullnotes = [1,0,1,0,1,1,0,1,0,1,0,1];
var noteangle = [1,2,3,4,5,7,8,9,10,11,12,13];
var speed = 30; //ticks per second
var difficulty = 10 //how hard the game is, higher number harder the game, the ammount of pixels the lazers move per tick

let midiPlayer, audio, playField, amplitude, midiFile, songs;

function preload() {
    songs = loadJSON("music.json");
}

function setup() {
    load();
    playField = new PlayField();
    base = new Base();
    player = new Player();
    amplitude = new p5.Amplitude();
    createCanvas(1280,820);
    size = sqrt((width * width) + (height * height)) / 2; //sets the size variable that dictates the size of objects that have to go off screen, it is the distance from one corner of the screen to the other in pixels
    setInterval(tick, 1000/speed); //sets up the tick function where all of the game logic resides, it is seperate from the draw loop so that the framerate doesnt effect game speed or audio sync
    frameRate(120); //sets the max framerate
}

function load() { //loads the files into memory
    console.log("loading!");
    audio = loadSound("music/tutorial.mp3");
    midiFile = loadBytes("music/tutorial.mid",function() {midiFile.isLoaded = true});
}

function loading() { //checks if stuff is loaded in before finishing the loading process and moving on
    //console.log(midiFile);
    if(audio.isLoaded && midiFile.isLoaded) {
        console.log("done loading!");
        console.log(midiFile);
        
        midiPlayer = new MidiPlayer.Player(function(event) {
            playField.add(event);
        });
        
        midiPlayer.on('endOfFile', function() {
            playField.reset();
        });
        
        midiPlayer.loadArrayBuffer(midiFile.bytes);
        

        gameState = "titleScreen";
    }
}


function draw() { ///main p5js draw loop. ONLY use for graphics related functions, all game functions reside in tick()
    translate(width/2,height/2);
    switch (gameState) {
        case "titleScreen":
        drawTitleScreen();
        break;
        case "game":
        drawGame();
        break;
        case "gameOver":
        drawGameOver();
        break;
        case "loading":
        drawLoading();
        break;
    }
}

function tick() { //the loop where all of the game logic resides
    //console.log("test");
    switch (gameState) {
        case "titleScreen":
        titleScreen();
        break;
        case "game":
        game();
        break;
        case "gameOver":
        gameOver();
        break;
        case "loading":
        loading();
        break;
    }
}

function drawBackGround() {
    background(0);
    stroke(255);
    fill(0);
    var inter = TWO_PI / 8;
    var offset = TWO_PI / 4 + TWO_PI/16;
    for (var i = 0; i <= 7; i += 1) {
        line(0, 0, cos(i * inter + offset) * size, sin(i * inter + offset) * size);
        if (halfnotes[i]) {
            push();
            rotate(offset);
            raycle(350,size*2,i,0.031);
            pop();
        }
    }
    nGon(0,420,400,300,16,TWO_PI/32);

}

function drawLoading() {
    background(0);
}
    
function drawTitleScreen() {
    strokeWeight(amplitude.getLevel()*50 + 0.5);
    drawBackGround();
    playField.show();
    fill(0);
    stroke(255);
    base.show();
    player.show();
}

function titleScreen() {
    playField.move();
    base.move();
}

function drawGame() {
    
}

function drawGameOver() {
    
}
    

function mouseClicked() {
    startNewGame();
}
    
//this software uses MidiPlayerJS, a library made by Garrett Grimm, (https://github.com/grimmdude/MidiPlayerJS/graphs/contributors) dont forget to credit him