var stage = 0;

var EvilStX = 410;
var EvilStY = 432;
var EvilSizeX = 15;
var EvilSizeY = 15;
var EvilState = evilRight;
var EvilLeft = 400;
var EvilRight = 700;
let EvilDir = 1;
var EvilRand;

var moveSpeed = 7;

function setup() {
    createCanvas(1024, 576);
}

function draw() {
    background(100, 155, 255);

    noStroke();
    fill(0, 155, 0);
    rect(0, 432, 1024, 144);

    if (stage == 0) {
        EvilRand = Math.floor(Math.random() * (13 - 3)) + 3;
        switch (EvilState) {
            case "evilLeft":
                evilLeft();
                break;
            case "evilRight":
                evilRight();
                break;
            default:
                evilRight();
                break;
        }

        evil();
    }
}

function evil() {
    EvilStX += EvilRand * EvilDir;
    if (EvilStX <= EvilLeft) {
        EvilStX += EvilLeft - EvilStX;
        EvilDir *= -1;
        EvilState = "evilRight";
    } else if (EvilStX >= EvilRight) {
        EvilStX -= EvilStX - EvilRight;
        EvilDir *= -1;
        EvilState = "evilLeft";
    }
}

function evilLeft() {
    stroke(0, 0, 0);
    strokeWeight(2);
    fill(255, 0, 0);
    rect(EvilStX - EvilSizeX, EvilStY, EvilSizeX * 2, EvilSizeY * -2);
    fill(0, 0, 0);
    circle(EvilStX - EvilSizeX, EvilStY - EvilSizeY, 5);
}

function evilRight() {
    stroke(0, 0, 0);
    strokeWeight(2);
    fill(255, 0, 0);
    rect(EvilStX - EvilSizeX, EvilStY, EvilSizeX * 2, EvilSizeY * -2);
    fill(0, 0, 0);
    circle(EvilStX + EvilSizeX, EvilStY - EvilSizeY, 5);
}
