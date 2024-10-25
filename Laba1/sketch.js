/*

The Game Project

1 - Background Scenery

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the scenery as set out in the code comments. The items
should appear next to the text titles.

Each bit of scenery is worth two marks:

0 marks = not a reasonable attempt
1 mark = attempted but it's messy or lacks detail
2 marks = you've used several shape functions to create the scenery

I've given titles and chosen some base colours, but feel free to
imaginatively modify these and interpret the scenery titles loosely to
match your game theme.


WARNING: Do not get too carried away. If you're shape takes more than 5 lines
of code to draw then you've probably over done it.


*/

function setup()
{
	createCanvas(1024, 576);
}

function draw()
{
	background(100, 155, 255); //fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, 432, 1024, 144); //draw some green ground

	//1. a cloud in the sky
	//... add your code here

	noStroke();
	fill(255);
	ellipse(200, 200, 90, 75);
    ellipse(150, 210, 75, 55);
    ellipse(250, 210, 75, 55);

	//2. a mountain in the distance
	//... add your code here

	noStroke();
	fill(120);
	triangle(512, 432, 670, 160, 750, 432);
    fill(170);
	triangle(480, 432, 590, 200, 680, 432);


	//3. a tree
	//... add your code here

	noStroke();
	fill(139, 69, 19);
	rect(850, 270, 30, 180);
    fill(0, 130, 0)
    ellipse(865, 290, 150, 200);
    

	//4. a canyon
	//NB. the canyon should go from ground-level to the bottom of the screen

	//... add your code here

	noStroke();
	fill(60, 50, 20);
	beginShape();
        vertex(230, 432);
        vertex(260, 432);
        vertex(160, 515);
        vertex(130, 576);
        vertex(10, 576);
        vertex(90, 490);
    endShape();
    
    
    

	//5. a collectable token - eg. a jewel, fruit, coins
	//... add your code here

	noStroke();
	fill(184, 134, 11);
	ellipse(430, 400, 50, 50);
    fill(218, 165, 32);
	ellipse(430, 400, 40, 40);
}
