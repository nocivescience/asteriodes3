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
// setInterval(update, 1000);
ship=newShip();
level=1;
createAsteroidsBelt();
update();
function newShip(){
    return {
        x: canvas.width/2,
        y: canvas.height/2,
        r: ship_size/2,
        a: 90/180*Math.PI,
        blinkNum: Math.ceil(ship_inv_dur/ship_blink_dur),
        explodeTime: 0,
    }
}
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
function update(){
    var blinkOn=ship.blinkNum%2==0;
    var exploding=ship.explodeTime>0;
    ctx.filsStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    var a,r,x,y, offset, vert;
    console.log(roids);
}   
