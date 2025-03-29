import kaplay from "./kaplay.mjs";

kaplay({
    font: "sans-serif",
    canvas: document.querySelector("#mycanvas"),
    background: [0, 0, 255],
});

// Define game variables
let waterLevel = 100;
let day = 1;

loadSprite("start_bg", "sprites/start_bg.jpg").then(() => {
    scene("start", () => {
        const background = add([
            sprite("start_bg"),
            pos(0, 0),
            fixed(),
        ]);

        // Scale the background to fit the canvas
        background.scale = vec2(width() / background.width, height() / background.height);

        add([
            text("60 Seconds Till Drought", { size: 100 }),
            pos(center().x, 250),
            anchor("center"),
        ]);

        const startButton = add([
            rect(400, 100),
            pos(center().x, 500),
            anchor("center"),
            area(),
            "start",
        ]);

        add([
            text("Start", { size: 45 }),
            pos(center().x, 500),
            anchor("center"),
            color(0, 0, 0),
        ]);


        onClick("start", () => {
            go("house");
        });


    });

    go("start");
});


scene("house", () => {
    add([
        text("House", { size: 100 }),
        pos(center().x, center().y),
        anchor("center"),
    ]);

    const waterMeter = add([
        rect(100,600),
        anchor("left"),
        "water",
    ])


    const nextDayButton = add([
        rect(400, 100),
        pos(center().x, 500),
        anchor("center"),
        area(),
        "nextDay",
    ]);

    onClick("nextDay", () => {
        
        day += 1;
    });

});

const events = [
    { text: "A heatwave hits! Lose 2 water.", effect: () => waterLevel -= 2 },
    { text: "You find an old well! Gain 3 water.", effect: () => waterLevel += 3 },
    { text: "You have a normal day. No changes.", effect: () => {} },
    { text: "Bandits steal some water! Lose 1 water.", effect: () => waterLevel -= 1 },
];

function randomEvent() {
    let event = events[Math.floor(Math.random() * events.length)];
    event.effect();
    return event.text;
}

scene("house", () => {
    const dayText = add([
        text(`Day ${day}`, { size: 50 }),
        pos(50, 50),
    ]);

    const waterDisplay = add([
        text(`Water: ${waterLevel}`, { size: 50 }),
        pos(50, 100),
    ]);

    const eventText = add([
        text("What's going to happen today?", { size: 30 }),
        pos(50, 200),
    ]);

    const nextDayButton = add([
        rect(400, 100),
        pos(center().x, 500),
        anchor("center"),
        area(),
        "nextDay",
    ]);

    add([
        text("Next Day", { size: 45 }),
        pos(center().x, 500),
        anchor("center"),
        color(0, 0, 0),
    ]);

    onClick("nextDay", () => {
        day++;
        let eventMessage = randomEvent();
        eventText.text = eventMessage;
        waterDisplay.text = `Water: ${waterLevel}`;

        if (waterLevel <= 0) {
            go("gameOver");
        }
    });
});

scene("gameOver", () => {
    add([
        text("You ran out of water!", { size: 70 }),
        pos(center().x, center().y),
        anchor("center"),
    ]);

    add([
        text("Game Over", { size: 50 }),
        pos(center().x, center().y + 100),
        anchor("center"),
    ]);
});

go("start");


onUpdate("dayText")
