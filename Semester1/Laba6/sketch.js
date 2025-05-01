let countCanyons = 1;
let canyons = [];
let ground;
let sun;
let mountains;
let trees;
let clouds;
let character;
let enemy1;
let enemy2;
var death_sound = new Audio("death_sound.mp3");

function setup() {
    createCanvas(innerWidth, innerHeight); 
    death_sound.volume = 0.07;

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
        isDeadCanyon: false,
        isDeadEnemy1: false,

        spiritY: innerWidth / 2, 
        spiritOpacity: 1, 
        isSpiritVisible: false,

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
            if (this.isDead) {
                line(this.x - 5, this.y - 103, this.x - 9, this.y - 107);
                line(this.x - 9, this.y - 103, this.x - 5, this.y - 107);
                line(this.x + 5, this.y - 103, this.x + 9, this.y - 107);
                line(this.x + 9, this.y - 103, this.x + 5, this.y - 107);
            }
            else {
                
                strokeWeight(3);
                point(this.x - 7, this.y - 105);
                point(this.x + 7, this.y - 105); 
            }
        },

        drawLeft: function () {
            line(this.x - 5, this.y - 16, this.x - 15, this.y + 10);
            line(this.x + 4, this.y + 10, this.x + 2, this.y - 15);
            line(this.x - 15, this.y - 42, this.x - 19, this.y - 25);
            line(this.x + 5, this.y - 55, this.x + 15, this.y - 25);
            line(this.x - 11, this.y - 95, this.x - 7, this.y - 95);
            if (this.isDead) {
                line(this.x - 5, this.y - 103, this.x - 9, this.y - 107);
                line(this.x - 9, this.y - 103, this.x - 5, this.y - 107);
            }
            else {
                
                strokeWeight(3);
                point(this.x - 7, this.y - 105); 
            }
        },

        drawRight: function () {
            line(this.x - 4, this.y + 10, this.x - 2, this.y - 15);
            line(this.x + 5, this.y - 16, this.x + 15, this.y + 10);
            line(this.x - 5, this.y - 55, this.x - 15, this.y - 25);
            line(this.x + 15, this.y - 42, this.x + 19, this.y - 25);
            line(this.x + 11, this.y - 95, this.x + 7, this.y - 95);
            if (this.isDead) {
                line(this.x + 5, this.y - 103, this.x + 9, this.y - 107);
                line(this.x + 9, this.y - 103, this.x + 5, this.y - 107);
            }
            else {
                
                strokeWeight(3);
                point(this.x + 7, this.y - 105); 
            }
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
            } else {
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

        drawDeadEnemy1: function () {
            if (this.isDead) {
                this.y = innerHeight / 1.358;
                this.isSpiritVisible = true; 
                if (this.isSpiritVisible) {
                    this.spawnSpirit();
                }
            }
        },

        spawnSpirit: function () {
            if (this.spiritY > 0) { 
                this.spiritY -= 1.2; 
                this.spiritOpacity -= 0.0025; 
            }
            else {
                this.spiritY = -40; 
            }

            fill(245, 245, 245, this.spiritOpacity * 255);
           
            noStroke();
            arc(this.x, this.spiritY, 50, 70, PI, 0, CHORD);
            
            beginShape();
            vertex(this.x - 25, this.spiritY);
            for (let x = this.x - 25; x <= this.x + 25; x += 5) {
                let y = this.spiritY + 30 + sin((x - (this.x - 10)) * 0.1) * 5;
                vertex(x, y);
            }
            vertex(this.x + 25, this.spiritY);
            endShape(CLOSE);
            
            fill(0, 0, 0, this.spiritOpacity * 255);
            ellipse(this.x - 10, this.spiritY - 10, 10, 15); 
            ellipse(this.x + 10, this.spiritY - 10, 10, 15); 
            circle(this.x, this.spiritY + 5, 10)
            },

        gravity: function (ground) {
            if (this.speedGravity > -5) this.speedGravity--;
            if (this.y + this.height < height - ground.height) this.y -= this.speedGravity;
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
            if (this.isDead && this.isDeadCanyon) {
                if (this.y < height + 100) {
                    this.fallSpeed += 1;
                    this.y += this.fallSpeed;
                    this.state = "jump";
                    death_sound.play();
                }
                if (this.y > height + 150) {
                    this.resetPosition();
                }
            }
            if (this.isDead && this.isDeadEnemy1) {
                this.drawDeadEnemy1();
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
                        this.isDeadCanyon = true;
                    }
                }
            }
            if (this.isDead) {
                this.deadAnimation();
            }
        },

        resetPosition: function () {
            this.y = height - ground.height - this.height;
            this.x = 90;
            this.isGrounded = true;
            this.isDead = false;
            this.fallSpeed = 0;
            death_sound.pause();
            death_sound.currentTime = 0;
        }
    };

    enemy1 = {
        x: 500,
        height: 30,
        y: innerHeight - innerHeight / 4 - 15,
        width: 30,
        speed: 2.5,
        color: "#FF0000",
        left: 480,
        right: 580,
        dir: 1,
        isDead: false,

        draw: function () {
            stroke("#000000");
            strokeWeight(2);
            fill(this.color);
            rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
            if (this.isDead) {
                fill(255, 255, 0); 
                ellipse(this.x, this.y, this.width, this.height); 
            } else {
                fill(0, 0, 0);
                circle(this.x - 6, this.y, 3);
                circle(this.x + 6, this.y, 3);
                line(this.x - 5, this.y - 2, this.x - 7, this.y - 5);
                line(this.x + 5, this.y - 2, this.x + 7, this.y - 5);
            }
        },

        movement: function () {
            if (!this.isDead) {
                this.x += this.speed * this.dir;
                if (this.x <= this.left || this.x >= this.right) {
                    this.dir *= -1;
                }
            }
        },
    };

    ground = {
        height: innerHeight / 4,
        color: color(0, 90, 0),
        drawGround: function () {
            noStroke();
            fill(this.color);
            rect(0, height - this.height, width, this.height);
        }
    };

    mountains = {
        x: innerWidth,
        y: innerHeight,
        h: innerHeight / 4,
        color1: color(120),
        color2: color(145),
        color3: color(170),
        drawMountains: function () {
            noStroke();
            fill(this.color1);
            triangle(1012, this.y - this.h, 1170, this.y - this.h - 272, 1250, this.y - this.h);
            noStroke();
            fill(this.color2);
            triangle(980, this.y - this.h, 1090, this.y - this.h - 232, 1180, this.y - this.h);
        }
    };

    sun = {
        radius: 200,
        color1: color(178, 34, 34),
        color2: color(255, 240, 0),
        drawSun: function (x, y) {
            for (let r = this.radius; r > 0; r--) {
                let inter = map(r, 0, this.radius, 0, 1);
                let c = lerpColor(this.color1, this.color2, inter);
                fill(c);
                noStroke();
                circle(innerWidth / 2, innerHeight / 1.2, r * 2);
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

function checkCollision(rectA, rectB) {
    return (
        rectA.x - rectA.width < rectB.x + rectB.width &&
        rectA.x + rectA.width > rectB.x - rectB.width &&
        rectA.y < rectB.y + rectB.height &&
        rectA.y + rectA.height > rectB.y
    );
}

function deathFromEnemy1() {
    if (checkCollision(character, enemy1)) {
        if (character.y >= enemy1.y - enemy1.height + (enemy1.height * 2) / 3 && character.y <= enemy1.y) {
            enemy1.isDead = true;
        } else {
            character.isDead = true;
            character.isDeadEnemy1 = true;
        }
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
    mountains.drawMountains();
    for (let i = 0; i < canyons.length; i++) canyons[i].drawCanyon();
    character.checkCanyon();
    character.draw();
    character.movement();
    character.gravity(ground);
    character.checkOutside();
    character.deadAnimation();
    enemy1.draw();
    enemy1.movement();
    deathFromEnemy1();
    if (enemy1.isDead) {
        enemy1.y += 400;
        enemy1.isDead = false;
    }
}

function drawDeathScreen() {
    noStroke();
    background(0, 0, 0, 40);
    textAlign(CENTER, CENTER);
    textSize(200);
    textFont(font);
    fill(255, 0, 0);
    text("WASTED", width / 2, height / 3);

    fill(200, 0, 0);
    rect(width / 2 - 100, height / 2 + 50, 200, 50);
    fill(255);
    textSize(30);
    text("RETRY", width / 2, height / 2 + 75);
}
