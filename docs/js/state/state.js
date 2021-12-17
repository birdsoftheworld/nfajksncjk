let directions = [ [1, 0], [0, 1], [-1, 0], [0, -1] ];

class GameState {
    constructor(width, height) {
        this.playerLength = 1;
        this.playerDir = -1;
        this.playerX = 1;
        this.playerY = 1;
        this.playerSegments = [];
        this.playerSegments.push([this.playerX, this.playerY]);
        this.width = width;
        this.height = height;
        this.lost = false;
        this.spawnFood();
    }

    gameOver() {
        this.lost = true;
    }

    movePlayer() {
        if(this.lost) return;
        if(this.playerDir == -1) return;
        let dir = directions[this.playerDir];
        let newX = dir[0] + this.playerX;
        let newY = dir[1] + this.playerY;
        if(newX < 0 || newY < 0 || newX >= this.width || newY >= this.height) {
            this.gameOver();
            return;
        }

        for(let i = 0; i < this.playerSegments.length; i++) {
            let segment = this.playerSegments[i];
            if(segment[0] == newX && segment[1] == newY) {
                this.gameOver();
                return;
            }
        }

        if(newX == this.foodX && newY == this.foodY) {
            this.playerLength++;
        } else {
            this.playerSegments.pop();
        }
        this.playerX = newX;
        this.playerY = newY;
        this.playerSegments.unshift([this.playerX, this.playerY]);
    }

    spawnFood() {
        this.foodX = Math.floor(Math.random() * this.width);
        this.foodY = Math.floor(Math.random() * this.height);
    }
}

export { GameState };