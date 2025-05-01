let score;
let canyon1;
let canyon2;
let ground;
let sun;
let trees;
let clouds;
let lives;
let character;
let simple_enemy;
let death_sound = new Audio("death_sound.mp3");
let death_fall_sound = new Audio("death_fall_sound.mp3");
let background_sound = new Audio("background_sound.mp3");
let coin_sound = new Audio("coin_sound.mp3");
let volume = 0.14;
let img_noSound;
let img_sound;
let restartButton;
let canPlay = true;
let sliderX = 240;
let sliderY = 15;
let isDragging = false;

let coins = [
    {
        x: 500,
        y: innerHeight - innerHeight / 4 - 15,
        height: 30,
        collected: false,
        draw: function () {
            if (!this.collected) {
                noStroke();
                fill(184, 134, 11);
                ellipse(this.x + 30, this.y, this.height, 30);
                fill(218, 165, 32);
                ellipse(this.x + 30, this.y, this.height - 5, 25);
            }
        },
        checkCollision: function (player) {
            let d = dist(player.x, player.y, this.x + 30, this.y);
            if (d < 30 && !this.collected) {
                this.collected = true;
                score.point += 2;
                coin_sound.play();
                return true;
            }
            return false;
        }
    },
    {
        x: 550,
        y: innerHeight - innerHeight / 4 - 15,
        height: 30,
        collected: false,
        draw: function () {
            if (!this.collected) {
                noStroke();
                fill(184, 134, 11);
                ellipse(this.x + 30, this.y, this.height, 30);
                fill(218, 165, 32);
                ellipse(this.x + 30, this.y, this.height - 5, 25);
            }
        },
        checkCollision: function (player) {
            let d = dist(player.x, player.y, this.x + 30, this.y);
            if (d < 30 && !this.collected) {
                this.collected = true;
                score.point += 2;
                coin_sound.play();
                return true;
            }
            return false;
        }
    },
    {
        x: 700,
        y: innerHeight - innerHeight / 4 - 15,
        height: 30,
        collected: false,
        draw: function () {
            if (!this.collected) {
                noStroke();
                fill(184, 134, 11);
                ellipse(this.x + 30, this.y, this.height, 30);
                fill(218, 165, 32);
                ellipse(this.x + 30, this.y, this.height - 5, 25);
            }
        },
        checkCollision: function (player) {
            let d = dist(player.x, player.y, this.x + 30, this.y);
            if (d < 30 && !this.collected) {
                this.collected = true;
                score.point += 2;
                coin_sound.play();
                return true;
            }
            return false;
        }
    },
    {
        x: 800,
        y: innerHeight - innerHeight / 4 - 15,
        height: 30,
        collected: false,
        draw: function () {
            if (!this.collected) {
                noStroke();
                fill(184, 134, 11);
                ellipse(this.x + 30, this.y, this.height, 30);
                fill(218, 165, 32);
                ellipse(this.x + 30, this.y, this.height - 5, 25);
            }
        },
        checkCollision: function (player) {
            let d = dist(player.x, player.y, this.x + 30, this.y);
            if (d < 30 && !this.collected) {
                this.collected = true;
                score.point += 2;
                coin_sound.play();
                return true;
            }
            return false;
        }
    }
];

function preload() {
    img_noSound = loadImage("noSound.png");
    img_sound = loadImage("sound.png");
    restartButton = loadImage("restartButton.png");
}

function drawCoins() {
    for (let coin of coins) {
        coin.draw();
    }
}

function checkCoinCollection(character) {
    for (let coin of coins) {
        coin.checkCollision(character);
    }
}

function restart() {
    spawnPoint = {
        x: 90,
        y: 400
    };

    character = {
        x: spawnPoint.x,
        y: spawnPoint.y,
        height: 10,
        width: 27,
        speed: 4,
        color: "#F5F5F5",
        speedGravity: -5,
        fallSpeed: 2,
        isGrounded: false,
        isDead: false,
        isVisible: true,
        isJump: false,
        state: "front",
        isDeadCanyon: false,
        isDeadsimple_enemy: false,
        isMoving: false,
        isMovingRight: false,
        direction: "right",
        death: 0,

        spiritY: 400 - 120,
        spiritOpacity: 1,
        isSpiritVisible: false,

        draw: function () {
            if (!this.isVisible) return;
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
            } else {
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
            } else {
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
            } else {
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
                    if (!this.isMovingRight) this.x += this.speed;
                    this.state = this.isGrounded ? "right" : "jumpRight";
                    //this.direction = 'right';
                } else if (keyIsDown(65)) {
                    this.x -= this.speed;
                    this.state = this.isGrounded ? "left" : "jumpLeft";
                    //this.direction = 'left';
                } else if (this.isGrounded) {
                    this.state = "front";
                }
            }
        },

        drawDeadsimple_enemy: function () {
            if (this.isDead && lives.hearts == 0) {
                this.y = 544;
                this.isSpiritVisible = true;
                if (this.isSpiritVisible) {
                    this.spawnSpirit();
                }
            }
        },

        spawnSpirit: function () {
            if (this.spiritY >= -40) {
                this.spiritY -= 1.2;
                this.spiritOpacity -= 0.0025;
            } else {
                this.spiritY = this.y - this.height - 120;
                this.spiritOpacity = 1;
                this.x = spawnPoint.x;
                this.y = spawnPoint.y;
                this.isDead = false;
                this.enemy_kill = null;
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
            circle(this.x, this.spiritY + 5, 10);
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
                    if (this.isMoving) this.x -= canyons.speedX / 2;
                    this.fallSpeed += 1;
                    this.y += this.fallSpeed;
                    this.state = "jump";
                    death_fall_sound.play();
                }
                if (this.y > height + 200) {
                    this.isVisible = false;
                    this.isDeadCanyon = false;
                    this.isMoving = false;
                    lives.hearts = 0;
                }
            }
            if (this.isDead && this.enemy_kill == "simple_enemy") {
                this.drawDeadsimple_enemy();
                death_sound.play();
            }
        },

        checkOutside: function () {
            if (this.x < -10) this.x = width - 10;
            if (this.x > width + 10) this.x = -10;
        },

        checkCanyon1: function () {
            let characterLeft = this.x - 10;
            let characterRight = this.x + 10;
            let canyon1Left = canyon1.x;
            let canyon1Right = canyon1.x + canyon1.width;

            if (characterRight - this.width > canyon1Left && characterLeft + this.width < canyon1Right) {
                if (this.y + this.height >= height - ground.height) {
                    this.isGrounded = false;
                    this.isDead = true;
                    this.isDeadCanyon = true;
                }
            }
            if (this.isDead) {
                this.deadAnimation();
            }
        },

        checkCanyon2: function () {
            let characterLeft = this.x - 10;
            let characterRight = this.x + 10;
            let canyon2Left = canyon2.x;
            let canyon2Right = canyon2.x + canyon2.width;

            if (characterRight - this.width > canyon2Left && characterLeft + this.width < canyon2Right) {
                if (this.y + this.height >= height - ground.height) {
                    this.isGrounded = false;
                    this.isDead = true;
                    this.isDeadCanyon = true;
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
            this.isVisible = true;
            this.fallSpeed = 0;
            death_fall_sound.pause();
            death_fall_sound.currentTime = 0;
            death_sound.pause();
            death_sound.currentTime = 0;
        }
    };

    simple_enemy = {
        name: "simple_enemy",
        x: 500,
        height: 30,
        y: innerHeight - innerHeight / 4 - 15,
        width: 30,
        speed: 2.5,
        speedX: 4,
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
        }
    };

    lives = {
        x: 40,
        y: 690,
        hearts: 3,
        color1: color(220, 0, 0),
        color2: color(0, 90, 0),

        drawLives: function () {
            if (this.hearts == 3) {
                fill(this.color1);
                circle(this.x, this.y, 20);
                circle(this.x + 15, this.y, 20);
                triangle(this.x + 7.5, this.y + 25, this.x - 10, this.y + 3, this.x + 25, this.y + 3);
                fill(this.color1);
                circle(this.x + 40, this.y, 20);
                circle(this.x + 55, this.y, 20);
                triangle(this.x + 47.5, this.y + 25, this.x + 30, this.y + 3, this.x + 65, this.y + 3);
                fill(this.color1);
                circle(this.x + 80, this.y, 20);
                circle(this.x + 95, this.y, 20);
                triangle(this.x + 87.5, this.y + 25, this.x + 70, this.y + 3, this.x + 105, this.y + 3);
            }
            if (this.hearts == 2) {
                fill(this.color1);
                circle(this.x, this.y, 20);
                circle(this.x + 15, this.y, 20);
                triangle(this.x + 7.5, this.y + 25, this.x - 10, this.y + 3, this.x + 25, this.y + 3);
                fill(this.color1);
                circle(this.x + 40, this.y, 20);
                circle(this.x + 55, this.y, 20);
                triangle(this.x + 47.5, this.y + 25, this.x + 30, this.y + 3, this.x + 65, this.y + 3);
            }
            if (this.hearts == 1) {
                fill(this.color1);
                circle(this.x, this.y, 20);
                circle(this.x + 15, this.y, 20);
                triangle(this.x + 7.5, this.y + 25, this.x - 10, this.y + 3, this.x + 25, this.y + 3);
            }
        }
    };

    score = {
        x: 0,
        y: 0,
        width: 100,
        height: 30,
        point: 0,

        draw: function () {
            noStroke();
            fill(255);
            rect(this.x, this.y, this.width, this.height);
            fill(0);
            textAlign(CENTER, CENTER);
            textSize(15);
            text(this.point, this.x + this.width / 2, this.y + this.height / 2);
        }
    };
}

function setup() {
    createCanvas(innerWidth, innerHeight);

    restart();

    clouds = {
        x: 0,
        speedX: 1,

        drawClouds: function () {
            noStroke();
            fill(255, 187, 199);
            ellipse(this.x + 140, 200, 90, 75);
            ellipse(this.x + 90, 210, 75, 55);
            ellipse(this.x + 190, 210, 75, 55);
            noStroke();
            fill(255, 187, 199);
            ellipse(this.x - innerWidth + 140, 200, 90, 75);
            ellipse(this.x - innerWidth + 90, 210, 75, 55);
            ellipse(this.x - innerWidth + 190, 210, 75, 55);

            noStroke();
            fill(255, 204, 213);
            ellipse(this.x + 320, 100, 70, 55);
            ellipse(this.x + 280, 110, 55, 35);
            ellipse(this.x + 360, 110, 55, 35);
            noStroke();
            fill(255, 204, 213);
            ellipse(this.x - innerWidth + 320, 100, 70, 55);
            ellipse(this.x - innerWidth + 280, 110, 55, 35);
            ellipse(this.x - innerWidth + 360, 110, 55, 35);

            noStroke();
            fill(255, 192, 203);
            ellipse(this.x + 60, 50, 40, 25);
            ellipse(this.x + 40, 55, 30, 15);
            ellipse(this.x + 80, 55, 30, 15);
            noStroke();
            fill(255, 192, 203);
            ellipse(this.x - innerWidth + 60, 50, 40, 25);
            ellipse(this.x - innerWidth + 40, 55, 30, 15);
            ellipse(this.x - innerWidth + 80, 55, 30, 15);

            noStroke();
            fill(255, 187, 199);
            ellipse(this.x + 760, 70, 90, 75);
            ellipse(this.x + 710, 80, 75, 55);
            ellipse(this.x + 810, 80, 75, 55);
            noStroke();
            fill(255, 187, 199);
            ellipse(this.x - innerWidth + 760, 70, 90, 75);
            ellipse(this.x - innerWidth + 710, 80, 75, 55);
            ellipse(this.x - innerWidth + 810, 80, 75, 55);

            noStroke();
            fill(255, 204, 213);
            ellipse(this.x + 540, 180, 70, 55);
            ellipse(this.x + 500, 190, 55, 35);
            ellipse(this.x + 580, 190, 55, 35);
            noStroke();
            fill(255, 204, 213);
            ellipse(this.x - innerWidth + 540, 180, 70, 55);
            ellipse(this.x - innerWidth + 500, 190, 55, 35);
            ellipse(this.x - innerWidth + 580, 190, 55, 35);

            noStroke();
            fill(255, 192, 203);
            ellipse(this.x + 500, 40, 40, 25);
            ellipse(this.x + 480, 45, 30, 15);
            ellipse(this.x + 520, 45, 30, 15);
            noStroke();
            fill(255, 192, 203);
            ellipse(this.x - innerWidth + 500, 40, 40, 25);
            ellipse(this.x - innerWidth + 480, 45, 30, 15);
            ellipse(this.x - innerWidth + 520, 45, 30, 15);

            noStroke();
            fill(255, 187, 199);
            ellipse(this.x + 980, 200, 90, 75);
            ellipse(this.x + 930, 210, 75, 55);
            ellipse(this.x + 1030, 210, 75, 55);
            noStroke();
            fill(255, 187, 199);
            ellipse(this.x - innerWidth + 980, 200, 90, 75);
            ellipse(this.x - innerWidth + 930, 210, 75, 55);
            ellipse(this.x - innerWidth + 1030, 210, 75, 55);

            noStroke();
            fill(255, 204, 213);
            ellipse(this.x + 1160, 100, 70, 55);
            ellipse(this.x + 1120, 110, 55, 35);
            ellipse(this.x + 1200, 110, 55, 35);
            noStroke();
            fill(255, 204, 213);
            ellipse(this.x - innerWidth + 1160, 100, 70, 55);
            ellipse(this.x - innerWidth + 1120, 110, 55, 35);
            ellipse(this.x - innerWidth + 1200, 110, 55, 35);

            noStroke();
            fill(255, 192, 203);
            ellipse(this.x + 940, 50, 40, 25);
            ellipse(this.x + 920, 55, 30, 15);
            ellipse(this.x + 960, 55, 30, 15);
            noStroke();
            fill(255, 192, 203);
            ellipse(this.x - innerWidth + 940, 50, 40, 25);
            ellipse(this.x - innerWidth + 920, 55, 30, 15);
            ellipse(this.x - innerWidth + 960, 55, 30, 15);

            noStroke();
            fill(255, 204, 213);
            ellipse(this.x + 1380, 180, 70, 55);
            ellipse(this.x + 1340, 190, 55, 35);
            ellipse(this.x + 1420, 190, 55, 35);
            noStroke();
            fill(255, 204, 213);
            ellipse(this.x - innerWidth + 1380, 180, 70, 55);
            ellipse(this.x - innerWidth + 1340, 190, 55, 35);
            ellipse(this.x - innerWidth + 1420, 190, 55, 35);

            noStroke();
            fill(255, 192, 203);
            ellipse(this.x + 1340, 40, 40, 25);
            ellipse(this.x + 1320, 45, 30, 15);
            ellipse(this.x + 1360, 45, 30, 15);
            noStroke();
            fill(255, 192, 203);
            ellipse(this.x - innerWidth + 1340, 40, 40, 25);
            ellipse(this.x - innerWidth + 1320, 45, 30, 15);
            ellipse(this.x - innerWidth + 1360, 45, 30, 15);
        },

        move: function () {
            if (this.x < innerWidth) {
                this.x += this.speedX;
            }
            if (character.x > innerWidth / 2.5) {
                this.x -= this.speedX - 0.5;
            }

            if (this.x > innerWidth - 1) {
                this.x = 0;
            }
        }
    };

    trees = {
        x: 425,
        y: innerHeight,
        h: innerHeight / 4,
        speedX: 4,
        color1: color(139, 69, 19),
        color2: color(0, 105, 0),
        color3: color(0, 90, 0),

        drawTrees: function () {
            noStroke();
            fill(this.color1);
            triangle(this.x, this.y - this.h, this.x + 25, this.y - this.h - 200, this.x + 50, this.y - this.h);
            fill(this.color2);
            circle(this.x + 25, this.y - this.h - 90, 70);
            circle(this.x - 5, this.y - this.h - 100, 70);
            circle(this.x + 55, this.y - this.h - 100, 70);
            circle(this.x - 5, this.y - this.h - 140, 55);
            circle(this.x + 55, this.y - this.h - 140, 55);
            circle(this.x + 25, this.y - this.h - 140, 55);
            circle(this.x + 5, this.y - this.h - 180, 45);
            circle(this.x + 45, this.y - this.h - 180, 45);
            circle(this.x + 25, this.y - this.h - 180, 45);
            circle(this.x + 25, this.y - this.h - 210, 45);

            fill(this.color1);
            triangle(this.x + 105, this.y - this.h, this.x + 115, this.y - this.h - 105, this.x + 125, this.y - this.h);
            fill(this.color3);
            circle(this.x + 115, this.y - this.h - 50, 30);
            circle(this.x + 100, this.y - this.h - 55, 30);
            circle(this.x + 130, this.y - this.h - 55, 30);
            circle(this.x + 100, this.y - this.h - 75, 25);
            circle(this.x + 130, this.y - this.h - 75, 25);
            circle(this.x + 115, this.y - this.h - 75, 25);
            circle(this.x + 105, this.y - this.h - 90, 20);
            circle(this.x + 125, this.y - this.h - 90, 20);
            circle(this.x + 115, this.y - this.h - 95, 20);

            fill(this.color1);
            triangle(this.x + 915, this.y - this.h, this.x + 930, this.y - this.h - 115, this.x + 945, this.y - this.h);
            fill(this.color3);
            circle(this.x + 930, this.y - this.h - 50, 30);
            circle(this.x + 915, this.y - this.h - 55, 30);
            circle(this.x + 945, this.y - this.h - 55, 30);
            circle(this.x + 945, this.y - this.h - 75, 25);
            circle(this.x + 915, this.y - this.h - 75, 25);
            circle(this.x + 930, this.y - this.h - 75, 25);
            circle(this.x + 940, this.y - this.h - 95, 23);
            circle(this.x + 920, this.y - this.h - 95, 23);
            circle(this.x + 930, this.y - this.h - 103, 25);

            fill(this.color2);
            rect(this.x + 797, this.y - this.h - 10, 30, 10);
            circle(this.x + 795, this.y - this.h - 10, 20);
            circle(this.x + 810, this.y - this.h - 10, 20);
            circle(this.x + 825, this.y - this.h - 10, 20);
            circle(this.x + 804, this.y - this.h - 20, 17);
            circle(this.x + 816, this.y - this.h - 20, 17);

            fill(this.color2);
            rect(this.x - 367, this.y - this.h - 10, 30, 10);
            circle(this.x - 365, this.y - this.h - 10, 20);
            circle(this.x - 350, this.y - this.h - 10, 20);
            circle(this.x - 335, this.y - this.h - 10, 20);
            circle(this.x - 357, this.y - this.h - 20, 17);
            circle(this.x - 344, this.y - this.h - 20, 17);
        }
    };

    mountains = {
        x: 1012,
        y: innerHeight,
        h: innerHeight / 4,
        speedX: 4,

        drawMountains: function () {
            noStroke();
            fill(120);
            triangle(this.x, this.y - this.h, this.x + 158, this.y - this.h - 272, this.x + 238, this.y - this.h);

            noStroke();
            fill(145);
            triangle(this.x - 32, this.y - this.h, this.x + 78, this.y - this.h - 232, this.x + 168, this.y - this.h);

            fill(120);
            triangle(
                this.x - innerWidth - 1012,
                this.y - this.h,
                this.x - innerWidth - 1890,
                this.y - this.h - 272,
                this.x - innerWidth - 1750,
                this.y - this.h
            );
        }
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

    canyon1 = {
        x: 250,
        y: height - ground.height,
        width: 100,
        speedX: 4,

        drawCanyon: function () {
            fill("#0b4700");
            rect(this.x, this.y, this.width, ground.height);
        }
    };

    canyon2 = {
        x: 950,
        y: height - ground.height,
        width: 100,
        speedX: 4,

        drawCanyon: function () {
            fill("#0b4700");
            rect(this.x, this.y, this.width, ground.height);
        }
    };
}

function checkCollision(rectA, rectB) {
    return (
        rectA.x - rectA.width < rectB.x + rectB.width &&
        rectA.x + rectA.width > rectB.x - rectB.width &&
        rectA.y < rectB.y + rectB.height &&
        rectA.y + rectA.height > rectB.y
    );
}

function deathFromEnemy(enemy) {
    if (enemy.name == "simple_enemy") {
        if (checkCollision(character, enemy)) {
            if (
                character.y >= simple_enemy.y - enemy.height + (simple_enemy.height * 2) / 3 &&
                character.y <= simple_enemy.y
            ) {
                simple_enemy.isDead = true;
            } else {
                character.isDead = true;
                character.enemy_kill = enemy.name;
                lives.hearts -= 1;
                character.isVisible = false;
                if (lives.hearts > 0) {
                    character.resetPosition();
                }
            }
        }
    }
}

function mousePressed() {
    if (mouseX > 100 && mouseX < 140 && mouseY > 0 && mouseY < 40)
        if (canPlay) canPlay = false;
        else if (!canPlay) canPlay = true;

    if (
        lives.hearts <= 0 &&
        mouseX > width / 2 - restartButton.width / 10 &&
        mouseX - width / 2 + restartButton.width / 10 &&
        mouseY > height / 2 &&
        mouseY < height / 2 + restartButton.height / 10
    ) {
        restart();
    }
    if (dist(sliderX, sliderY, mouseX, mouseY) <= 7.5) {
        isDragging = true;
    }
}

function mouseDragged() {
    if (isDragging) {
        sliderX = constrain(mouseX, 155, 250);
    }
}

function mouseReleased() {
    isDragging = false;
}

function play() {
    fill("#ffffff");
    rect(100, 0, 170, 30);
    stroke("#000000");
    strokeWeight(3);
    line(155, 15, 250, 15);
    fill("#c66b00");
    noStroke();
    circle(sliderX, sliderY, 15);

    background_sound.volume = volume / 2;
    coin_sound.volume = volume;
    death_fall_sound.volume = volume;
    death_sound.volume = volume;

    if (canPlay) {
        image(img_sound, 110, 0, 30, 30);
        volume = map(sliderX, 155, 250, 0, 0.14);
    } else {
        image(img_noSound, 110, 0, 30, 30);
        volume = 0;
    }
}

function deathScreen() {
    if (lives.hearts == 0) {
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(200);
        fill(255, 0, 0);
        text("DEAD", width / 2, height / 3);

        image(
            restartButton,
            width / 2 - restartButton.width / 10,
            height / 2,
            restartButton.width / 5,
            restartButton.height / 5
        );
    }
}

function draw() {
    background_sound.play();

    for (let i = 0; i < height; i++) {
        let inter = map(i, 0, height, 0, 1);
        let c = lerpColor(color(199, 21, 133), color(255, 165, 0), inter);
        stroke(c);
        line(0, i, width, i);
    }
    sun.drawSun(width / 2, height / 2);

    ground.drawGround();
    mountains.drawMountains();
    trees.drawTrees();
    clouds.drawClouds();
    clouds.move();
    canyon1.drawCanyon();
    canyon2.drawCanyon();
    lives.drawLives();
    character.checkCanyon1();
    character.checkCanyon2();
    character.draw();
    character.movement();
    character.gravity(ground);
    character.checkOutside();
    character.deadAnimation();
    drawCoins();
    simple_enemy.draw();
    simple_enemy.movement();
    deathFromEnemy(simple_enemy);
    checkCoinCollection(character);
    score.draw();
    play();
    if (simple_enemy.isDead) {
        simple_enemy.y += 400;
        simple_enemy.isDead = false;
    }
    deathScreen();
}
