let img1, img2, img3, img4, img5, img6, img7, img8, img9, img10; // Declare variables for images
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
let reloadButton; // Button to reload the game
let startTime; // Variable to store the start time
let elapsedTime = 0; // Variable to store the elapsed time
let gifImage; // Declare a variable to store the GIF image
let backgroundImage; // Variable to store the background image

function preload() {

   // Load the GIF file
   gifImage = loadImage('firee.gif');

  // Load your images here
  img1 = loadImage('C1.jpg');
  img2 = loadImage('C2.jpg');
  img3 = loadImage('C3.jpg');
  img4 = loadImage('C4.jpg');
  img5 = loadImage('C5.jpg');
  img6 = loadImage('C6.jpg');
  img7 = loadImage('C7.jpg');
  img8 = loadImage('C8.jpg');
  img9 = loadImage('C9.jpg');
  img10 = loadImage('C10.jpg');

 // Load the background image
 backgroundImage = loadImage('BG.png');

}



function setup() {
  createCanvas(800, 600);
  
  // Push images into the images array
  images.push({img: img1, x: random(imgWidth / 2, width - imgWidth / 2), y: 0, visible: false, isBeingDragged: false});
  images.push({img: img2, x: random(imgWidth / 2, width - imgWidth / 2), y: 0, visible: false, isBeingDragged: false});
  images.push({img: img3, x: random(imgWidth / 2, width - imgWidth / 2), y: 0, visible: false, isBeingDragged: false});
  images.push({img: img4, x: random(imgWidth / 2, width - imgWidth / 2), y: 0, visible: false, isBeingDragged: false});
  images.push({img: img5, x: random(imgWidth / 2, width - imgWidth / 2), y: 0, visible: false, isBeingDragged: false});
  images.push({img: img6, x: random(imgWidth / 2, width - imgWidth / 2), y: 0, visible: false, isBeingDragged: false});
  images.push({img: img7, x: random(imgWidth / 2, width - imgWidth / 2), y: 0, visible: false, isBeingDragged: false});
  images.push({img: img8, x: random(imgWidth / 2, width - imgWidth / 2), y: 0, visible: false, isBeingDragged: false});
  images.push({img: img9, x: random(imgWidth / 2, width - imgWidth / 2), y: 0, visible: false, isBeingDragged: false});
  images.push({img: img10, x: random(imgWidth / 2, width - imgWidth / 2), y: 0, visible: false, isBeingDragged: false});
  

}

function draw() {
  if (!gameStarted) {
    background(backgroundImage);
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    textFont('Georgia'); // Change to your desired font
    fill(255); // Set text color to white
    text("Click to save my portfolio!", width / 2, height / 2);
    
    // Draw the firee gifImage at the bottom
    let gifWidth = width;
    let gifHeight = gifImage.height * (width / gifImage.width); // Maintain aspect ratio
    image(gifImage, 0, height - gifHeight, gifWidth, gifHeight);

  } else {
    background(backgroundImage);

        // Update and display timer
        elapsedTime = millis() - startTime;
        fill(0);
        textSize(32);
        textAlign(LEFT, TOP);
        text("Time: " + nf(floor(elapsedTime / 1000), 2) + "s", 10, 10);
  
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

    // Update and display timer
    elapsedTime = millis() - startTime;
    fill(0);
    textSize(32);
    textAlign(LEFT, TOP);
    text("Time: " + nf(floor(elapsedTime / 1000), 2) + "s", 10, 10);
    
    // Draw the firee gifImage at the bottom
    let gifWidth = width;
    let gifHeight = gifImage.height * (width / gifImage.width); // Maintain aspect ratio
    image(gifImage, 0, height - gifHeight, gifWidth, gifHeight);
  }
  
  if (gameOver) {
    background(255, 0, 0);
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2);
    
    text("Click to play again", width / 2, height / 2 + 80);
  }
}


function mouseClicked() {
  if (!gameStarted && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    gameStarted = true;
    startTime = millis();
    
  } else if (gameOver && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    // Reload the game
    reloadGame();
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

function reloadGame() {
  // Reset all game variables
  images.forEach(img => {
    img.y = 0;
    img.visible = false;
    img.isBeingDragged = false;
  });
  currentIndex = 0;
  lastFallTime = 0;
  gameOver = false;
  gameStarted = false;
  isDragging = false;
  reloadButton.hide();
  elapsedTime = 0; // Reset elapsed time
}
