let squares = [];

function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 100; i++) {
    squares.push(new Square());
  }
}

function draw() {
  
  for (let i = 0; i < squares.length; i++) {
    squares[i].update();
    squares[i].display();
  }
}

class Square {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(20, 50);
    this.speed = random(0.5, 2);
    this.angle = 0;
    this.color = color(random(255), random(255), random(255), 100);
    this.prevX = this.x;
    this.prevY = this.y;
    this.rotationSpeed = random(0.01, 0.05); 
    this.wiggleRange = 2; 
  }

  update() {
   
    this.angle += this.rotationSpeed;
    if (this.angle >= TWO_PI) {
      this.angle = 0;
    }

    
    this.prevX = this.x;
    this.prevY = this.y;
    this.x += cos(this.angle) * this.speed + random(-this.wiggleRange, this.wiggleRange);
    this.y += sin(this.angle) * this.speed + random(-this.wiggleRange, this.wiggleRange);

    
    if (this.x > width + this.size) {
      this.x = -this.size;
    } else if (this.x < -this.size) {
      this.x = width + this.size;
    }

    if (this.y > height + this.size) {
      this.y = -this.size;
    } else if (this.y < -this.size) {
      this.y = height + this.size;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    strokeWeight(2);
    stroke(this.color);
    noFill(); 
    rectMode(CENTER);
    rect(0, 0, this.size, this.size);
    pop();
  }
}
