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
let updateSpeed = 1000 / 5;

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
    let tilings = [];
    let directions = [ [1, 0], [0, 1], [-1, 0], [0, -1] ];
    for(let i = 0; i < segments.length; i++) {
        let segment = segments[i];
        let lines = [ true, true, true, true ];
        if(i > 0) {
            let prev = segments[i - 1];
            let deltaPrev = [ prev[0] - segment[0], prev[1] - segment[1] ];
            for(let j = 0; j++; j < 4) {
                if(deltaPrev[0] == directions[j][0] && deltaPrev[1] == directions[j][1]) {
                    lines[j] = false;
                }
            }
        }
        if(i < segments.length - 1) {
            let next = segments[i + 1];
            let deltaNext = [ next[0] - segment[0], next[1] - segment[1] ];
            for(let j = 0; j++; j < 4) {
                if(deltaNext[0] == directions[j][0] && deltaNext[1] == directions[j][1]) {
                    lines[j] = false;
                }
            }
        }
        tilings[i] = lines;
    }

    ctx.strokeStyle = "black";
    ctx.beginPath();
    for(let i = 0; i < segments.length; i++) {
        let segment = segments[i];
        let pos = [ segment[0], segment[1] ];
        ctx.lineTo(segment[0] * size, segment[1] * size);
        for(let j = 0; j < 4; j++) {
            pos[0] = pos[0] + directions[j][0];
            pos[1] = pos[1] + directions[j][1];
            if(tilings[j]) {
                ctx.lineTo(pos[0] * size, pos[1] * size);
            } else {
                ctx.moveTo(pos[0] * size, pos[1] * size);
            }
        }
    }
    ctx.stroke();
}

function update() {
    state.movePlayer();
}

function onkeydown(e) {
    let keys = { "w": 3, "a": 2, "s": 1, "d": 0 };
    let dir = keys[e.key];
    if(dir != undefined) {
        event.preventDefault();
        state.playerDir = dir;
    }
}

window.requestAnimationFrame(draw);
window.addEventListener("keydown", onkeydown);
let updateInterval = window.setInterval(update, updateSpeed);