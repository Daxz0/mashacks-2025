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

let width = screen.width;
let height = screen.height;

// Define movement speed
const speed = screen.width/2;

let moveX = 0;
let moveY = 0;

onKeyPress((key) => {
    debug.log(key);
});

onKeyRelease((key) => {
    direction = ""
});


var direction = "" //either up down (ud) or left right (lr)

// Register keydown events for movement
onKeyDown("up", () => {
    if(direction != "rl"){
        player.moveBy(0, -speed * dt());
        direction = "ud";
    }
});
onKeyDown("down", () => {
    if(direction != "rl"){
        player.moveBy(0, speed * dt());
        direction = "ud";
    }
});
onKeyDown("left", () => {
    if(direction != "ud"){
        player.moveBy(-speed * dt(),0);
        direction = "rl";
    }
});
onKeyDown("right", () => {
    if(direction != "ud"){
        player.moveBy(speed * dt(),0);
        direction = "rl";
    }
});
