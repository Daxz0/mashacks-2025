import kaplay from "./kaplay.mjs";

kaplay({
    font: "sans-serif",
    canvas: document.querySelector("#mycanvas"),
    background: [0, 0, 255],
});

// Define game variables
let waterLevel = 0;

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


});

