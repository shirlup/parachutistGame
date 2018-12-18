var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
c.fillStyle = "#00BFFF";

var score = 0;
var lives = 3;


var map = {
    
    37: false, //Left arrow key
    39: false, //Right arrow key

}

addEventListener('keydown',function(event){
    console.log(event.keyCode);
    if(event.keyCode in map){
        map[event.keyCode] = true;

        if(map[37]){
             if(boat.x > 0 )
                 boat.x += -10;
        }
        else if(map[39]){ 
            if(boat.x < innerWidth - boat.width) 
                boat.x += 10;
        }
        
    }
})

addEventListener('keyup',function(event){

    if(event.keyCode in map){
        map[event.keyCode] = false;
    }
})

var airplane = {},
    airplanewidth = 150,
    airplaneHeight = 70,
    airplaneImg = new Image();
    airplaneImg.src = 'images/plane.jpg';

var boat = {},
    boatWidth = 100,
    boatHeight = 100,
    boatImg = new Image();
    boatImg.src = 'images/boat.jpg';

var parachutist = {},
    parachutistWidth = 70,
    parachutistHeight = 70,
    parachutistImg = new Image();
    parachutistImg.src = 'images/parach.jpg';

var sea = {},
    seaWidth = innerWidth,
    seaHeight = 80;
    c.font = "30px Arial";
    c.fillStyle = '#00000';
    c.fillText("Hello World", 10, 50);

airplane = {

    width: airplanewidth,
    height: airplaneHeight,
    x: innerWidth - airplanewidth/2,
    y: 30,
    draw: function(){
        c.drawImage(airplaneImg,this.x,this.y,this.width,this.height);
    }
}

boat = {

    width: boatWidth,
    height: boatHeight,
    x: innerWidth/2,
    y:innerHeight - boatHeight - seaHeight/2 - 39,
    draw: function(){
        c.drawImage(boatImg,this.x,this.y,this.width,this.height);
    }
}

parachutist = {

    width: parachutistWidth,
    height: parachutistHeight,
    x: this.x += 1,
    y: 100,
    show :false,
    draw: function(){
        if (!this.show) this.x =  airplane.x;
        c.drawImage(parachutistImg,this.x,this.y,this.width,this.height);
        this.show = true;
        if( this.y < boat.y + 200) {
            this.y += 2;
            this.x -= 0.3;
            toChange();
        }
        else {
            this.show = false;
            this.y = 100;
         }

    },

    parachutistLand: function(){
        var z = Math.floor(Math.random() * innerWidth);
        if(z < innerWidth/40 || this.show) {
            parachutist.draw();
            
        }

    }
}

sea = {
    width: seaWidth,
    height: seaHeight,
    x: 0,
    y: innerHeight - seaHeight,
    draw: function(){
        c.fillStyle = "#1E90FF";
        c.fillRect(this.x,this.y,innerWidth,seaHeight);
    }
}

text = function(){
    c.font = "18px arial";
    c.fillStyle = '#000000';
    c.fillText('SCORE: ' + score,5,25);

    c.font = "18px arial";
    c.fillStyle = '#000000';
    c.fillText('LIVES: ' + lives, innerWidth - 100, 25);
    if(lives == 0) {
        cancelAnimationFrame(animated);
        alert('Your score is: ' + score);
        location.reload();
    }
}

function collides(a,b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function toChange(){

    if (collides(this.parachutist,this.sea)) {
        lives--;
        parachutist.show = false;
        parachutist.y = 100;
    } 
    else if(collides(this.parachutist,this.boat)) {
        score += 10;
        parachutist.show = false;
        parachutist.y = 100;
    }


}


var x = innerWidth;
var y = 50;
var dx = 3;
var dy = 3;
var radius = 30 
function animated(){

        requestAnimationFrame(animated);
        c.clearRect(0,0,innerWidth,innerHeight);
        text();
        parachutist.parachutistLand();
        sea.draw();
        boat.draw();
        airplane.draw();
        if (airplane.x == 0 - airplanewidth -1  ) airplane.x = innerWidth - airplanewidth/2;
        airplane.x -= 3;

}

animated();

        
    
    



