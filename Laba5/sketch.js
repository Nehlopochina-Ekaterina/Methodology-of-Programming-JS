let countCanyons = 1;
let canyons = [];
let ground;
let sun;
let mountains;
let trees;
let clouds;
let character;
var deathSound = new Audio("death_sound.mp3");


function setup() {
    createCanvas(1024, 576);
    deathSound.volume = 0.07;

    character = {
        x: 90,
        y: 400,
        height: 10,
        width: 27,
        speed: 4,
        color: "#F5F5F5",
        speedGravity: -5,
        fallSpeed: 2,
        isGrounded: false,
        isDead: false,
        isJump: false,
        state: "front",

        draw: function () {
            fill(this.color);
            stroke(1);
            switch (this.state) {
                case "right":
                    this.drawBody();
                    this.drawRight();
                    break;
                case "left":
                    this.drawBody();
                    this.drawLeft();
                    break;
                case "jump":
                    this.drawBody();
                    this.drawJumpF();
                    break;
                case "jumpRight":
                    this.drawBody();
                    this.drawJumpR();
                    break;
                case "jumpLeft":
                    this.drawBody();
                    this.drawJumpL();
                    break;
                default:
                    this.drawBody();
                    this.drawFront();
                    break;
            }
        },

        drawBody: function () {
            strokeWeight(1);
            if (this.isDead) {
                ellipse(this.x, this.y - 50, 30, 70);
                circle(this.x, this.y - 105, 30);
            } else {
                ellipse(this.x, this.y - 50, 30, 70);
                circle(this.x, this.y - 105, 30);
            }
        },

        drawFront: function () {
            line(this.x - 5, this.y - 16, this.x - 9, this.y + 10);
            line(this.x + 5, this.y - 16, this.x + 9, this.y + 10);
            line(this.x - 15, this.y - 55, this.x - 20, this.y - 25);
            line(this.x + 15, this.y - 55, this.x + 20, this.y - 25);
            line(this.x - 3, this.y - 95, this.x + 3, this.y - 95);
            strokeWeight(3);
            point(this.x - 7, this.y - 105);
            point(this.x + 7, this.y - 105);
        },

        drawLeft: function () {
            line(this.x - 5, this.y - 16, this.x - 15, this.y + 10);
            line(this.x + 4, this.y + 10, this.x + 2, this.y - 15);
            line(this.x - 15, this.y - 42, this.x - 19, this.y - 25);
            line(this.x + 5, this.y - 55, this.x + 15, this.y - 25);
            line(this.x - 11, this.y - 95, this.x - 7, this.y - 95);
            strokeWeight(3);
            point(this.x - 7, this.y - 105);
        },

        drawRight: function () {
            line(this.x - 4, this.y + 10, this.x - 2, this.y - 15);
            line(this.x + 5, this.y - 16, this.x + 15, this.y + 10);
            line(this.x - 5, this.y - 55, this.x - 15, this.y - 25);
            line(this.x + 15, this.y - 42, this.x + 19, this.y - 25);
            line(this.x + 11, this.y - 95, this.x + 7, this.y - 95);
            strokeWeight(3);
            point(this.x + 7, this.y - 105);
        },

        drawJumpF: function () {
            if (this.isDead) {
                line(this.x - 5, this.y - 16, this.x - 5, this.y + 14);
                line(this.x + 5, this.y - 16, this.x + 5, this.y + 14);
                line(this.x - 20, this.y - 85, this.x - 15, this.y - 55);
                line(this.x + 20, this.y - 85, this.x + 15, this.y - 55);
                circle(this.x, this.y - 96, 5);
                strokeWeight(3);
                point(this.x - 7, this.y - 105);
                point(this.x + 7, this.y - 105);
            }
            else {
                line(this.x - 5, this.y - 16, this.x - 12, this.y + 11);
                line(this.x + 5, this.y - 16, this.x + 12, this.y + 11);
                line(this.x - 15, this.y - 55, this.x - 25, this.y - 25);
                line(this.x + 15, this.y - 55, this.x + 25, this.y - 25);
                circle(this.x, this.y - 96, 5);
                strokeWeight(3);
                point(this.x - 7, this.y - 105);
                point(this.x + 7, this.y - 105);
            }
        },

        drawJumpL: function () {
            line(this.x - 5, this.y - 16, this.x - 18, this.y + 12);
            line(this.x + 7, this.y + 12, this.x + 2, this.y - 16);
            line(this.x - 15, this.y - 42, this.x - 24, this.y - 25);
            line(this.x + 5, this.y - 55, this.x + 20, this.y - 25);
            ellipse(this.x - 10.5, this.y - 96, 2.5, 5.5);
            strokeWeight(3);
            point(this.x - 7, this.y - 105);
        },

        drawJumpR: function () {
            line(this.x - 7, this.y + 12, this.x - 2, this.y - 15);
            line(this.x + 5, this.y - 16, this.x + 18, this.y + 10);
            line(this.x - 5, this.y - 55, this.x - 20, this.y - 25);
            line(this.x + 15, this.y - 42, this.x + 24, this.y - 25);
            ellipse(this.x + 10.5, this.y - 96, 2.5, 5.5);
            strokeWeight(3);
            point(this.x + 7, this.y - 105);
        },

        movement: function () {
            if (!this.isDead) {
                if (this.isGrounded && keyIsDown(87)) {
                    this.jump();
                    this.state = "jump";
                }

                if (keyIsDown(68)) {
                    this.x += this.speed;
                    this.state = this.isGrounded ? "right" : "jumpRight";
                } else if (keyIsDown(65)) {
                    this.x -= this.speed;
                    this.state = this.isGrounded ? "left" : "jumpLeft";
                } else if (this.isGrounded) {
                    this.state = "front";
                }
            }
        },

        gravity: function (ground) {
            if (this.speedGravity > -5) this.speedGravity--;
            if (this.y + this.height < height - ground.height) this.y -= this.speedGravity;
            //this.isGrounded = false;
            else {
                this.y = height - ground.height - this.height;
                this.isGrounded = true;
            }
        },

        jump: function () {
            this.speedGravity = 15;
            this.y -= this.speedGravity;
            this.isGrounded = false;
        },

        deadAnimation: function () {
            if (this.isDead) {
                if (this.y < height + 100) {
                    this.fallSpeed += 4.2;
                    this.y += this.fallSpeed;
                    this.state = "jump";
                     deathSound.play();
                }
                    if (this.y > height + 150) {
                        this.y = height - ground.height - this.height;
                        this.x = 90;
                        this.isGrounded = true;
                        this.isDead = false;
                        this.fallSpeed = 0;
                        deathSound.pause();
                        deathSound.currentTime = 0;
                    }
                }
            },

        checkOutside: function () {
            if (this.x < -10) this.x = width - 10;
            if (this.x > width + 10) this.x = -10;
        },

        checkCanyon: function () {
            for (let i = 0; i < canyons.length; i++) {
                let characterLeft = this.x - 10;
                let characterRight = this.x + 10;
                let canyonLeft = canyons[i].x;
                let canyonRight = canyons[i].x + canyons[i].width;

                if (characterRight - this.width > canyonLeft && characterLeft + this.width < canyonRight) {
                    if (this.y + this.height >= height - ground.height) {
                        this.isGrounded = false;
                        this.isDead = true;
                    }
                }
            }
            if (this.isDead) {
                this.deadAnimation();
            }
        }
    };

    ground = {
        height: 144,
        color: color(0, 90, 0),
        drawGround: function () {
            noStroke();
            fill(this.color);
            rect(0, height - this.height, width, this.height);
        }
    };

    mountains = {
        height: 144,
        color1: color(120),
        color2: color(145),
        color3: color(170),
        drawMountains: function () {
            noStroke();
            fill(this.color1);
            triangle(712, height - this.height, 870, height - this.height - 272, 950, height - this.height);
            noStroke();
            fill(this.color2);
            triangle(680, height - this.height, 790, height - this.height - 232, 880, height - this.height);
        }
    };

    sun = {
        radius: 150,
        color1: color(178, 34, 34),
        color2: color(255, 240, 0),
        drawSun: function (x, y) {
            for (let r = this.radius; r > 0; r--) {
                let inter = map(r, 0, this.radius, 0, 1);
                let c = lerpColor(this.color1, this.color2, inter);
                fill(c);
                noStroke();
                circle(500, 500, r * 2);
            }
        }
    };

    for (let i = 0; i < countCanyons; i++) {
        canyons.push({
            x: 250 + i * 400,
            y: height - ground.height,
            width: 100,
            drawCanyon: function () {
                fill("#0b4700");
                rect(this.x, this.y, this.width, ground.height);
            }
        });
    }
}

function draw() {
    for (let i = 0; i < height; i++) {
        let inter = map(i, 0, height, 0, 1);
        let c = lerpColor(color(199, 21, 133), color(255, 165, 0), inter);
        stroke(c);
        line(0, i, width, i);
    }
    sun.drawSun(width / 2, height / 2);
    ground.drawGround();
    //sun.drawSun();
    mountains.drawMountains();
    for (let i = 0; i < canyons.length; i++) canyons[i].drawCanyon();
    character.checkCanyon();
    character.draw();
    character.movement();
    character.gravity(ground);
    character.checkOutside();

    //if (character.isDead) {
    //deadCharacter.drawBodyD();
    //deadCharacter.drawJumpFD();
}
