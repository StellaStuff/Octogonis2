function raycle(id, od, seg, segw, segs) { //draws a slice of an ngon, diameters are in pixels, width is in ratio
    if (typeof segs != "number") segs = 8;
    i = seg/segs
    quad(
        cos((i - segw) * TWO_PI) * od,
        sin((i - segw) * TWO_PI) * od,
        cos((i + segw) * TWO_PI) * od, 
        sin((i + segw) * TWO_PI) * od, 
        cos((i + segw) * TWO_PI) * id, 
        sin((i + segw) * TWO_PI) * id,
        cos((i - segw) * TWO_PI) * id, 
        sin((i - segw) * TWO_PI) * id
    );
} 

function nGon(x,y,w,h,sides,off) {
    w = w/2;
    h = h/2;
    if (typeof off != "number") off = 0;
    beginShape();
    for(var i = 0; i <= sides; i+=1) {
        vertex(
            cos((i / sides * TWO_PI) + off) * w + x,
            sin((i / sides * TWO_PI) + off) * h + y,
        );
    }
    endShape();
}

class Base {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xv = 0;
        this.yv = 0;
        this.damper = 0.75;
        this.spring = 1;
        this.deadzone = 2;
        this.distance;
        this.health = 2500;
        this.player1 = new Player(0);
        this.player2 = new Player(1);
        this.size = 0;
    }
    show () {
        nGon(this.x,this.y,100 + this.size,100 + this.size,8,TWO_PI/16);
        this.player1.show();
        this.player2.show();
    }
    move () {
        
        this.player1.move();
        this.player2.move();
        
        this.x += this.xv;
        this.y += this.yv;
        
        this.distance = (abs(this.x) + abs(this.y)) / 5;
        
        //if (this.x < this.deadzone && this.x > -this.deadzone && this.y < this.deadzone && this.y > -this.deadzone && abs(this.xv) < 2 && abs(this.yv) < 2 ) {
            //this.xv = 0;
            //this.yv = 0;
        //} else {
            this.xv *= this.damper;
            this.yv *= this.damper;
            
            if (this.x > 0) {
                this.xv -= this.spring * this.distance;
            } else if (this.x < 0) {
                this.xv += this.spring * this.distance;
            }

            if (this.y > 0) {
                this.yv -= this.spring * this.distance;
            } else if (this.y < 0){
                this.yv += this.spring * this.distance;
                
            }
       // }
    } 
    hit (dir,id) {
        var i = (noteangle[dir] + 5)/16; // gets a ratio from the given note angle and the max number of angles using the "noteangle" lookup table
        var rna = ((noteangle[dir] + 1)/2); //stands for real not angle
        var hit = true //flag that gets set to false if the hit is deflected

        switch (id) {
            case this.player1.id:
                if (this.player1.direction < (noteangle[dir] + 1)/2 + 0.6 && this.player1.direction > (noteangle[dir] + 1)/2 - 0.6) { //checks if the angle of the note is within 0.5 of 1/8 of a circle of the player its looking for
                    hit = false;
                }
            break;
            case this.player2.id:
                if (this.player2.direction < (noteangle[dir] + 1)/2 + 0.6 && this.player2.direction > (noteangle[dir] + 1)/2 - 0.6) {
                    hit = false;
                }
            break
            default:
            
        }
        
        if (hit) {
            print("hit!");
            this.x -= (cos((i) * TWO_PI) * (difficulty/4 + 8)); //"slaps" the base
            this.y -= (sin((i) * TWO_PI) * (difficulty/4 + 8));

            this.health -= 1; //takes damage 
            this.size = random(10);
        } else {
            this.size = 0;   
        }
    }
}

class Player {
    constructor(ID) {
        this.direction = ID;
        this.id = ID;
    }
    show() {
        colorMode(RGB);
        stroke(colors[this.id]);
        fill(0,0,0,0);
        raycle(20,60,(this.direction * 2) + 4,1/10,16);
    }
    move() {
        if (this.id == 0) {
            var u = inputs.leftUP.active;
            var d = inputs.leftDOWN.active;
            var l = inputs.leftLEFT.active;
            var r = inputs.leftRIGHT.active;
        }
        
        if (this.id == 1) {
            var u = inputs.rightUP.active;
            var d = inputs.rightDOWN.active;
            var l = inputs.rightLEFT.active;
            var r = inputs.rightRIGHT.active;
        }
        
        for(let i = 0; i < keyangles.length; i ++) {
            if(keyangles[i][0] == u && 
               keyangles[i][1] == d && 
               keyangles[i][2] == l && 
               keyangles[i][3] == r) {
                this.direction = i;
                return;
            }
        }
    }
}


class PlayField {
    constructor() {
        this.reset();
        this.lazers = [];
    }
    show() {
        for (var i = 0; i < this.lazers.length; i += 1) {
            this.lazers[i].show();
        }
    }
    move() {
        for (var i = 0; i < this.lazers.length; i += 1) {
            this.lazers[i].move();
            if (this.notes[this.lazers[i].note] == false && this.lazers[i].growing == true) this.lazers[i].growing = false;
            
            if (this.lazers[i].end <= 0) {
                this.lazers.splice(i,1);
                i -= 1;
            }
        }
    }
    add(event) {
        //print(event.noteNumber % 12);
        if (event.name == "Note on") {
            this.notes[event.noteNumber] = true;
            this.lazers.push(new lazer(event.noteNumber % 12,abs(event.noteNumber/12),event.noteNumber,event.track - 2));
        }
        if (event.name == "Note off") this.notes[event.noteNumber] = false;
    }
    reset() {
        this.notes = [];
        for (var i = 0; i < 12*9; i += 1) {
            this.notes[i] = false;
        }
    }
}

class lazer {
    constructor(dir,oct,note,id) {
        this.direction = dir;
        if (id < 0) this.direction = 12;
        this.octave = oct;
        this.growing = true; 
        this.start = size;
        this.end = size;
        this.note = note;
        this.playing = false;
        this.id = id;
    }
    show() {
        //colorMode(RGB);
        if (this.id < 0) {
            stroke(colors[2]);   
        } else {
            stroke(colors[this.id]);
        }
        //stroke((this.octave/9)*255,255,100);
        fill(0,0,0,0);
        if (this.playing) {
            raycle(this.start,this.end,noteangle[this.direction] + 5,0.031 + random(0.01),16);
        } else {
            raycle(this.start,this.end,noteangle[this.direction] + 5,0.031,16);
        }
    }
    move() {
        if (this.start > 0) {
            this.start -= difficulty;
        } 
        if (this.start < 50 && this.end > 50) {
            this.playing = true;
            base.hit(this.direction,this.id);
        }
        
        if (!this.growing && this.end > 0) this.end -= difficulty;
    }
}

function startNewGame() {
    midiPlayer.play();
    audio.play(((size-50)/difficulty)*(1/speed));
}

function gameOver() {
    
}

function Pause() {
    
}

function unPause() {
    
}
