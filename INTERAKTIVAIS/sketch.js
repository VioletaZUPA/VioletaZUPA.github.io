let img1, img2, img3, img4, img5; // Declare variables for images
let images = []; // Array to store falling images
let imgWidth = 200; // Width of the images
let imgHeight = 100; // Height of the images
let isDragging = false; // Flag to check if image is being dragged
let offsetX, offsetY; // Offset of mouse position relative to image position
let currentIndex = 0; // Index of the current falling image
let fallDelay = 2000; // Delay before each image starts falling (in milliseconds)
let lastFallTime = 0; // Time of the last image falling
let gameOver = false; // Flag to indicate game over state
let gameStarted = false; // Flag to indicate whether the game has started

function preload() {
  // Load your images here
  img1 = loadImage('C1.jpg');
  img2 = loadImage('C2.jpg');
  img3 = loadImage('C3.jpg');
  img4 = loadImage('C4.jpg');
  img5 = loadImage('C5.jpg');
}

function setup() {
  createCanvas(800, 600);
  
  // Push images into the images array
  images.push({img: img1, x: random(width), y: 0, visible: false, isBeingDragged: false});
  images.push({img: img2, x: random(width), y: 0, visible: false, isBeingDragged: false});
  images.push({img: img3, x: random(width), y: 0, visible: false, isBeingDragged: false});
  images.push({img: img4, x: random(width), y: 0, visible: false, isBeingDragged: false});
  images.push({img: img5, x: random(width), y: 0, visible: false, isBeingDragged: false});
}

function draw() {
  if (!gameStarted) {
    background(220);
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Click to see my portfolio", width / 2, height / 2);
  } else if (!gameOver) {
    background(220);
  
    // Display falling images and move them downwards
    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.visible) {
        image(img.img, img.x, img.y, imgWidth, imgHeight);
        img.y += 2; // Move the image downwards
        // Check if the image has reached the bottom of the canvas
        if (img.y >= height) {
          gameOver = true;
          break;
        }
      }
    }
    
    // Check if image is being dragged
    if (isDragging) {
      let draggedImg = images.find(img => img.isBeingDragged);
      if (draggedImg) {
        // Update image position based on mouse position
        draggedImg.x = mouseX - offsetX;
        draggedImg.y = mouseY - offsetY;
      }
    }
    
    // Check if it's time for the next image to start falling
    if (millis() - lastFallTime > fallDelay && currentIndex < images.length) {
      images[currentIndex].visible = true;
      lastFallTime = millis();
      currentIndex++;
    }
  } else {
    // Game over state
    background(255, 0, 0); // Red screen
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2);
  }
}

function mouseClicked() {
  if (!gameStarted && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    gameStarted = true;
  }
}

function mousePressed() {
  // Check if any image is being dragged
  if (!isDragging && gameStarted && !gameOver) {
    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (mouseX > img.x && mouseX < img.x + imgWidth && mouseY > img.y && mouseY < img.y + imgHeight) {
        img.isBeingDragged = true;
        offsetX = mouseX - img.x;
        offsetY = mouseY - img.y;
        isDragging = true;
        break;
      }
    }
  }
}

function mouseReleased() {
  // Stop dragging any image
  isDragging = false;
  for (let i = 0; i < images.length; i++) {
    images[i].isBeingDragged = false;
  }
}
