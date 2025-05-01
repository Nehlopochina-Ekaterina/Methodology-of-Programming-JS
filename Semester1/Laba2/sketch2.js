function setup()
{
	createCanvas(1024, 576);
}

function draw()
{
	background(100, 155, 255);
	noStroke();
	fill(0,155,0);
	rect(0, 432, 1024, 144);
    if (key == ' ')
    {
        JumpF();
    }
    else if (key == 'f')
    {
        WalkR();
    }
    else if (key == 's')
    {
        WalkL();
    }
    else if (key == 'e')
    {
        JumpL();
    }
    else if (key == 'r')
    {
        JumpR();
    }
    else if (key == 'd')
    {
        Front();
    }
    else
    {
        Front();
    }
}

function Front()
{
    stroke(1);
    strokeWeight(2);
    fill(216, 191, 216);
	circle(650, 330, 40);
    ellipse(650, 400, 40, 90);
    line(640, 440, 630, 490);
    line(660, 440, 670, 490);
    line(630, 390, 610, 430);
    line(670, 390, 690, 430);
    strokeWeight(4);
    point(640, 330);
    point(660, 330);
}

function JumpF()
{
    stroke(1);
    strokeWeight(2);
    fill(216, 191, 216);
	circle(650, 310, 40);
    ellipse(650, 380, 40, 90);
    line(640, 420, 650, 450);
    line(650, 450, 630, 430);
    line(660, 420, 670, 450);
    line(670, 450, 650, 430);
    line(630, 370, 610, 410);
    line(670, 370, 690, 410);
    strokeWeight(4);
    point(640, 310);
    point(660, 310);
}

function WalkL()
{
    stroke(1);
    strokeWeight(2);
    fill(216, 191, 216);
	circle(650, 330, 40);
    ellipse(650, 400, 40, 90);
    line(650, 445, 650, 490);
    line(650, 380, 650, 420);
    strokeWeight(4);
    point(640, 330);
   
}

function WalkR()
{
    stroke(1);
    strokeWeight(2);
    fill(216, 191, 216);
	circle(650, 330, 40);
    ellipse(650, 400, 40, 90);
    line(650, 445, 650, 490);
    line(650, 380, 650, 420);
    strokeWeight(4);
    point(660, 330);  
}

function JumpL()
{
    stroke(1);
    strokeWeight(2);
    fill(216, 191, 216);
	circle(650, 310, 40);
    ellipse(650, 380, 40, 90);
    line(650, 425, 640, 455);
    line(640, 455, 660, 465);
    line(650, 360, 650, 400);
    strokeWeight(4);
    point(640, 310);  
}

function JumpR()
{
    stroke(1);
    strokeWeight(2);
    fill(216, 191, 216);
	circle(650, 310, 40);
    ellipse(650, 380, 40, 90);
    line(650, 425, 660, 455);
    line(660, 455, 640, 465);
    line(650, 360, 650, 400);
    strokeWeight(4);
    point(660, 310);  
}





