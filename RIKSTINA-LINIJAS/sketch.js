let x, y; // Starting position of the drawing
let step = 20; // Length of each line segment

function setup() {
  createCanvas(720, 720);
  background(200);
  x = width / 2; // Start drawing from the center horizontally
  y = height / 2; // Start drawing from the center vertically
}

function draw() {
  let diceRoll = int(random(1, 7)); // Roll a six-sided dice

  // Draw line based on the dice roll
  switch (diceRoll) {
    case 1:
      drawVerticalLine();
      break;
    case 2:
      drawHorizontalLine();
      break;
    case 3:
      drawDiagonalLine();
      break;
    case 4:
      drawVerticalLineToBottom();
      break;
    case 5:
      drawMirroredDiagonalLine();
      break;
    case 6:
      drawHorizontalLineToLeft();
      break;
  }
}

function drawVerticalLine() {
  if (y - step >= 0) { // Check if line goes beyond canvas top
    line(x, y, x, y - step); // Vertical line
    y -= step; // Move up for the next line
  } else {
    y = height; // Start from bottom if hit top
  }
}

function drawHorizontalLine() {
  if (x + step <= width) { // Check if line goes beyond canvas right
    line(x, y, x + step, y); // Horizontal line
    x += step; // Move right for the next line
  } else {
    x = 0; // Start from left if hit right
  }
}

function drawDiagonalLine() {
  if (x + step <= width && y + step <= height) { // Check if line goes beyond canvas
    line(x, y, x + step, y + step); // Diagonal line
    x += step; // Move right
    y += step; // Move down
  } else {
    if (x < width && y < height) {
      x = 0; // Start from left if hit right
      y = 0; // Start from top if hit bottom
    }
  }
}

function drawVerticalLineToBottom() {
  if (y + step <= height) { // Check if line goes beyond canvas bottom
    line(x, y, x, y + step); // Vertical line to bottom
    y += step; // Move down
  } else {
    y = 0; 
  }
}

function drawMirroredDiagonalLine() {
  if (x - step >= 0 && y + step <= height) { 
    line(x, y, x - step, y + step); 
    x -= step; 
    y += step; 
  } else {
    if (x > 0 && y < height) {
      x = width; 
      y = 0; 
    }
  }
}

function drawHorizontalLineToLeft() {
  if (x - step >= 0) { 
    line(x, y, x - step, y); 
    x -= step;
  } else {
    x = width; 
  }
}
