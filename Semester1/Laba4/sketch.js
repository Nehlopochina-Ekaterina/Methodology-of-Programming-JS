let gameObjects = {
    evil: {
        x: 410,
        y: 432,
        Sx: 15,
        Sy: 15,
        state: "evilRight",
        left: 400,
        right: 700,
        dir: 1,
        rand: 0,

        draw: function() {
            stroke("#000000");
            strokeWeight(2);
            fill(255, 0, 0);
            rect(this.x - this.Sx, this.y, this.Sx * 2, this.Sy * -2);
            fill(0, 0, 0);
            if (this.dir === 1) circle(this.x + this.Sx, this.y - this.Sy, 5);
            if (this.dir === -1) circle(this.x - this.Sx, this.y - this.Sy, 5);
        }
    },

    grass: {
        draw: function() {
            noStroke();
            fill(0, 155, 0);
            rect(0, 432, 1024, 144);
        }
    }
};

function setup() {
    createCanvas(1024, 576);
}

function draw() {
    background(100, 155, 255);
    gameObjects.grass.draw();
    gameObjects.evil.draw();
    gameObjects.evil.rand = Math.floor(Math.random() * (13 - 3)) + 3;
    evilMove();
}

function evilMove() {
    const evilM = gameObjects.evil;
    evilM.x += evilM.rand * evilM.dir;
    if (evilM.x <= evilM.left) {
        evilM.x += evilM.left - evilM.x;
        evilM.dir *= -1;
    } else if (evilM.x >= evilM.right) {
        evilM.x -= evilM.x - evilM.right;
        evilM.dir *= -1;
    }
}