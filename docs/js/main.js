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

function draw() {
    ctx.clearRect(0, 0, cwidth, cheight);
    ctx.fillStyle = "red";
    ctx.fillRect(state.foodX * size, state.foodY * size, size, size);
    let segments = state.playerSegments;
    ctx.fillStyle = "black";
    for(let i = 0; i < segments.length; i++) {
        let segment = segments[i];
        ctx.fillRect(segment[0] * size, segment[1] * size, size, size);
    }
}

function update() {
    state.movePlayer();
}

function onKeyDown(e) {
    event.preventDefault();
    let keys = { "w": 3, "a": 2, "s": 1, "d": 0 };
    let dir = keys[e.key];
    if(dir != undefined) {
        state.playerDir = dir;
    }
}

window.requestAnimationFrame(draw);
window.addEventListener("keydown", onKeyDown);