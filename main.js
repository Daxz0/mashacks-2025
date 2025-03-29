import kaplay from "./kaplay.mjs";

kaplay({
    font: "sans-serif",
    canvas: document.querySelector("#mycanvas"),
    background: [ 0, 0, 255, ],
})



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
        go("game");
    });

    // onClick("quit", () => {
    // });
});


go("start");
