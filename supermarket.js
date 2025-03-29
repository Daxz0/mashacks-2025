import kaplay from "./kaplay.mjs";

// Initialize KAPLAY
kaplay();

// Set gravity to zero (no gravity)
setGravity(0);

// Create the player object as a rectangle
const player = add([
  rect(40, 60), // Draw a rectangle with width 40 and height 60
  pos(100, 100), // Set the initial position
  area(),        // Enable collision detection
  body(),        // Enable physics (optional, for gravity and collisions)
  color(255, 0, 0), // Set the color to red (optional)
]);

// Array to hold obstacle objects
const obstacles = [
    {
      x: 300,
      y: 200,
      width: 100,
      height: 20,
      color: [255, 255, 255],
    },
    {
      x: 500,
      y: 150,
      width: 80,
      height: 30,
      color: [255, 255, 255], // Green color
    },
    {
      x: 700,
      y: 100,
      width: 120,
      height: 25,
      color: [255, 255, 255], // Blue color
    },
    // Add more obstacles as needed
  ];
  
  // Function to create obstacle game objects
  function createObstacles() {
    obstacles.forEach((obstacle) => {
      add([
        rect(obstacle.width, obstacle.height), // Rectangle shape
        pos(obstacle.x, obstacle.y),           // Position
        area(),                               // Enable collision detection
        color(...obstacle.color),             // Set color
        "obstacle",                           // Tag for identification
      ]);
    });
  }

  createObstacles();


let width = screen.width;
let height = screen.height;

// Define movement speed
const speed = screen.width/2;

let moveX = 0;
let moveY = 0;

onKeyPress((key) => {
    debug.log(player.pos);
});

onKeyRelease((key) => {
    direction = ""
});


var direction = "" //either up down (ud) or left right (lr)

onKeyDown("up", () => {
    if(direction != "rl"){
        if(player.pos.y - speed * dt() > 0){
            player.moveBy(0, -speed * dt());
            direction = "ud";
        }
    }
});
onKeyDown("down", () => {
    if(direction != "rl"){
        if(player.pos.y + player.height + speed * dt() < height){
            player.moveBy(0, speed * dt());
            direction = "ud";
        }
    }
});
onKeyDown("left", () => {
    if(direction != "ud"){
        if(player.pos.x - speed * dt() > 0){

            player.moveBy(-speed * dt(),0);
            direction = "rl";
        }
    }
});
onKeyDown("right", () => {
    if(direction != "ud"){        
        if(player.pos.x + player.width + speed * dt() < width){

            player.moveBy(speed * dt(),0);
            direction = "rl";
        }
    }
});

function isColliding(player, movement) {
    const futurePos = player.pos.add(movement);
    for (const obstacle of obstacles) {
      if (futurePos.isInRect(obstacle.pos, obstacle.width, obstacle.height)) {
        return true; // Collision detected
      }
    }
    return false; // No collision
}
