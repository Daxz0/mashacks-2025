import kaplay from "./kaplay.mjs";

kaplay({
    font: "sans-serif",
    canvas: document.querySelector("#mycanvas"),
    background: [ 0, 0, 255, ],
})


// define game variables


let waterLevel = 0


loadSprite("start_bg", "sprites/start_bg.png")
scene("start", () => {
    add([
        text("60 Seconds Till Drought", { size: 48 }),
        pos(center().x, 100),
        anchor("center"),
    ]);

    const startButton = add([
        rect(200, 50),
        pos(center().x, 200),
        anchor("center"),
        area(),
        "start",
    ]);

    add([
        text("Start", { size: 24 }),
        pos(center().x, 200),
        anchor("center"),
        color(0, 0, 0),
    ]);

    const quitButton = add([
        rect(200, 50),
        pos(center().x, 300),
        anchor("center"),
        area(),
        "quit",
    ]);

    add([
        text("Quit", { size: 24 }),
        pos(center().x, 300),
        anchor("center"),
        color(0, 0, 0),
    ]);

    onClick("start", () => {
        go("house");
    });
    add([
        sprite("start_bg"),
        pos(0, 0),
        scale(width() / sprite("start_bg"),").width, height() / sprite("start_bg"),").height),
        fixed(),
    ]);

    // onClick("quit", () => {
    // });
});


scene("house", () => {
    add([
        rect(220, 32),
        pos(20, 20),
        color(0, 0, 0),
        "waterBarBg",
    ]);

    const waterBar = add([
        rect(220, 32),
        pos(20, 20),
        color(0, 0, 255),
        "waterBar",
    ]);

    function updateWaterBar() {
        waterBar.width = (waterLevel / 100) * 220; // Scale width based on water level
    }

    // Example of decreasing water level over time
    loop(1, () => {
        if (waterLevel > 0) {
            waterLevel -= 1; // Decrease water level
            updateWaterBar(); // Update the water bar
        }
    });

    // Call the update function to set the initial state
    updateWaterBar();
});


go("start");
