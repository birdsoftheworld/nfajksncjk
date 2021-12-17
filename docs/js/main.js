import { GameState } from "./state/state.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

let width = 10;
let height = 10;
let cwidth = 250;
let cheight = 250;
let size = cwidth / width;
let state = new GameState(width, height);
let updateSpeed = 1000 / 3;

function draw() {
    ctx.clearRect(0, 0, cwidth, cheight);
    ctx.fillStyle = "#eeeeee";
    ctx.fillRect(0, 0, cwidth, cheight);
    ctx.fillStyle = "red";
    ctx.fillRect(state.foodX * size, state.foodY * size, size, size);
    let segments = state.playerSegments;
    ctx.fillStyle = "#7fff00";
    for(let i = 0; i < segments.length; i++) {
        let segment = segments[i];
        ctx.fillRect(segment[0] * size, segment[1] * size, size, size);
    }
    ctx.fillStyle = "#5fcf00";
    ctx.fillRect(state.playerX * size, state.playerY * size, size, size);
    window.requestAnimationFrame(draw);
}

function update() {
    state.movePlayer();
}

function onkeydown(e) {
    //event.preventDefault();
    let keys = { "w": 3, "a": 2, "s": 1, "d": 0 };
    let dir = keys[e.key];
    if(dir != undefined) {
        state.playerDir = dir;
    }
}

window.requestAnimationFrame(draw);
window.addEventListener("keydown", onkeydown);
window.setInterval(update, updateSpeed);