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
const speed = screen.width;

let moveX = 0;
let moveY = 0;

// Register keydown events for movement
onKeyDown("left", () => {
    moveX = -speed;
  });
  onKeyDown("right", () => {
    moveX = speed;
  });
  onKeyDown("up", () => {
    moveY = -speed;
  });
  onKeyDown("down", () => {
    moveY = speed;
  });
  
  // Register keyup events to stop movement
  onKeyUp("left", () => {
    if (moveX === -speed) moveX = 0;
  });
  onKeyUp("right", () => {
    if (moveX === speed) moveX = 0;
  });
  onKeyUp("up", () => {
    if (moveY === -speed) moveY = 0;
  });
  onKeyUp("down", () => {
    if (moveY === speed) moveY = 0;
  });
  
  // Update the player's position based on current movement
  onUpdate(() => {
    player.moveBy(moveX * dt(), moveY * dt());
  });