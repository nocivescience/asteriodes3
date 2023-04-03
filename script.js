const fps= 30;
const friction= 0.7;
const roid_jag= 0.4;
const roids_num= 3;
const roid_size= 100;
const roid_spd= 50;
const roid_vert= 10;
const ship_size= 30;
const ship_thrust= 5;
const ship_turn_spd= 360;
const show_centre_dot= false;
const game_lives= 3;
const laser_dist= 0.6;
const laser_explode_dur= 0.1;
const laser_max= 10;
const laser_spd= 500;
const roid_pts_lge= 20;
const roid_pts_med= 50;
const roid_pts_sml= 100;
const save_key_score= "highscore";
const ship_blink_dur= 0.1;
const ship_explode_dur= 0.6;
const ship_inv_dur= 3;
const show_bounding= false;
const text_fade_time= 2.5;
const text_size= 40;
var ship, level, roids, x, y;
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
newGame();
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
setInterval(update, 10);
function newShip(){
    return {
        x: canvas.width/2,
        y: canvas.height/2,
        r: ship_size/2,
        rot:0,
        a: 90/180*Math.PI,
        blinkNum: Math.ceil(ship_inv_dur/ship_blink_dur),
        explodeTime: 0,
        thrusting: false,
        thrust: {x:0, y:0},
    }
}
function keyDown(/** @type {KeyboardEvent} */ ev){
    if (ship.dead){
        return;
    }
    switch(ev.key){
        case "p":
            break;
        case "a":
            ship.rot= ship_turn_spd/180*Math.PI/fps;
            break;
        case "d":
            ship.rot= -ship_turn_spd/180*Math.PI/fps;
            break;
        case "w":
            ship.thrusting= true;
            break;
    }
}
function keyUp(/** @type {KeyboardEvent} */ ev){
    if (ship.dead){
        return;
    }
    switch(ev.key){
        case "a":
            ship.rot= 0;
            break;
        case "d":
            ship.rot= 0;
            break;
        case "w":
            ship.thrusting= false;
            break;
    }
};
function distBetweenPoints(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
}
function createAsteroidsBelt(){
    roids=[];
    roidsTotal=(roids_num+level)*7;
    var x, y;
    for (var i=0; i<roids_num+level; i++){
        do{
            x= Math.floor(Math.random()*canvas.width);
            y= Math.floor(Math.random()*canvas.height);
        }while(distBetweenPoints(ship.x, ship.y, x, y) < roid_size*2+ship_size);
        roids.push(newAsteroid(x,y, Math.ceil(roid_size/2)));
    }
};
function newAsteroid(x,y,r){
    var lvlMult= 1+.1*level
    let roid={
        x: x,
        y: y,
        xv: Math.random()*roid_spd*lvlMult/fps*(Math.random()<0.5?1:-1),
        yv: Math.random()*roid_spd*lvlMult/fps*(Math.random()<0.5?1:-1),
        r: r,
        a: Math.random()*Math.PI*2,
        vert: Math.floor(Math.random()*(roid_vert+1)+roid_vert/2),
        offs: []
    }
    for (let i=0; i<roid.vert; i++){
        roid.offs.push(Math.random()*roid_jag*2+1-roid_jag);
    }
};
function newGame(){
    ship=newShip();
}
function drawShip(x,y,a, colour="white"){
    ctx.strokeStyle=colour;
    ctx.lineWidth=ship_size/20;
    ctx.beginPath();
    ctx.moveTo(
        x+4/3*ship.r*Math.cos(a),
        y-4/3*ship.r*Math.sin(a)
    );
    ctx.lineTo(
        x-ship.r*(2/3*Math.cos(a)+Math.sin(a)),
        y+ship.r*(2/3*Math.sin(a)-Math.cos(a))
    );
    ctx.lineTo(
        x-ship.r*(2/3*Math.cos(a)-Math.sin(a)),
        y+ship.r*(2/3*Math.sin(a)+Math.cos(a))
    );
    ctx.closePath();
    ctx.stroke();
}
function update(){
    var blinkOn=ship.blinkNum%2==0;
    var exploding=ship.explodeTime>0;
    ctx.filsStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ship.a+=ship.rot/10;
    if (ship.thrusting){
        ship.x+=ship_thrust*Math.cos(ship.a)/fps*10;
        ship.y-=ship_thrust*Math.sin(ship.a)/fps*10;
    }
    drawShip(ship.x, ship.y, ship.a);
}