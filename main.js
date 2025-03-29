import kaplay from "./kaplay.mjs";

kaplay({
    background: [0, 0, 0],
});

let waterLevel = 0;
let health = 100;
let happiness = 100;
let hygiene = 100;
let day = 1;

loadSprite("house_bg", "sprites/house_bg.jpg");
loadSprite("water_sprite", "sprites/water_sprite.png");
loadSprite("player", "sprites/player.png");
loadSprite("start_bg", "sprites/start_bg.jpg").then(() => {
    scene("start", () => {
        const background = add([
            sprite("start_bg"),
            pos(0, 0),
            fixed(),
        ]);

        background.scale = vec2(width() / background.width, height() / background.height);

        add([
            text("The Watermaster Strikes!", { size: 100 }),
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

function heatwaveEffect() {
    waterLevel -= 10;
}

function findWellEffect() {
    waterLevel += 3;
}

function normalDayEffect() {}

function banditAttackEffect() {
    waterLevel -= 1;
}

const events = [
    { text: "A heatwave hits! Lose 2 water.", effect: heatwaveEffect },
    { text: "You find an old well! Gain 3 water.", effect: findWellEffect },
    { text: "You have a normal day. No changes.", effect: normalDayEffect },
    { text: "Bandits steal some water! Lose 1 water.", effect: banditAttackEffect },
];

function randomEvent() {
    let event = events[Math.floor(Math.random() * events.length)];
    event.effect();
    return event.text;
}

scene("house", () => {
    const background = add([
        sprite("house_bg"),
        pos(0, 0),
        fixed(),
    ]);

    const infoBox = add([
        pos(0, 0),
        rect(screen.width/2, screen.height/3),
        color(0,0,0),
        opacity(0.5),
        outline(4),
        area(),
    ])

    background.scale = vec2(width() / background.width, height() / background.height);

    const dayText = add([
        text(`Day ${day}`, { size: 50 }),
        pos(50, 50),
    ]);

    const eventText = add([
        text("The water has been shut down...", { size: 30 }),
        pos(50, 200),
    ]);
    add([
        rect(100, 300),
        pos(10, height() * 0.7),
        anchor("left"),
        "water",
        color(0, 0, 0),
    ]);

    const waterMeter = add([
        rect(100, 300),
        pos(10, height() * 0.7),
        anchor("left"),
        "water",
        color(11, 193, 246),
    ]);

    const healthBar = add([
        rect(200, 20),
        pos(width() - 25, 70),
        anchor("topright"),
        "health",
        color(0, 255, 0),
    ]);

    const hygieneBar = add([
        rect(200, 20),
        pos(width() - 25, 120),
        anchor("topright"),
        "hygiene",
        color(255, 255, 0),
    ]);

    const happinessBar = add([
        rect(200, 20),
        pos(width() - 25, 170),
        anchor("topright"),
        "happiness",
        color(255, 165, 0),
    ]);

    const waterDisplay = add([
        text(`Water: ${waterLevel}`, { size: screen.height/50 }),
        pos(45, 280),
        anchor("left"),
        rotate(),
    ]);

    add([
        text("Health", { size: 20 }),
        pos(width() - 25, 50),
        anchor("topright"),
    ]);

    add([
        text("Hygiene", { size: 20 }),
        pos(width() - 25, 100),
        anchor("topright"),
    ]);

    add([
        text("Happiness", { size: 20 }),
        pos(width() - 25, 150),
        anchor("topright"),
    ]);

    add([
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
        if (day >= 30) {
            go("gameWin");
            return;
        }
        day++;
        let eventMessage = randomEvent();
        eventText.text = eventMessage;
        dayText.text = "Day " + day;
        waterDisplay.text = `Water: ${waterLevel}`;

        waterMeter.height = 300 * (waterLevel / 100);
        waterMeter.pos.y = height() * 0.7 + (300 - waterMeter.height)
        healthBar.width = 200 * (health / 100);
        hygieneBar.width = 200 * (hygiene / 100);
        happinessBar.width = 200 * (happiness / 100);

        if (waterLevel <= 0) {
            go("gameOver");
        }
    });

    waterDisplay.angle = 90;
});

scene("supermarket", () => {
    const player = add([
        sprite("player"),
        pos(100, 100),
        area(),
        color(255, 0, 0),
        "player",
    ]);

    function createWaterCollectibles() {
        let x = rand(50, width() - 50);
        let y = rand(50, height() - 50);

        let waterDrop = add([
            sprite("water_sprite"),
            scale(0.1,0.1),
            pos(x, y),
            area(),
            "water_collectible",
        ]);
    }

    createWaterCollectibles();

    const gameWidth = width();
    const gameHeight = height();

    const speed = gameWidth / 2;

    let moveX = 0;
    let moveY = 0;
    let timeLeft = 60;

    const timerText = add([
        text(`Time: ${timeLeft}`, { size: 40 }),
        pos(center().x, 50),
        anchor("center"),
        "timer"
    ]);

    onUpdate("timer", (timerText) => {
        timeLeft -= dt();
        timerText.text = `Time: ${Math.floor(timeLeft)}`;
        if (timeLeft <= 0) {
            go("house");
            destroy(timerText);
        }

    })

    onKeyRelease((key) => {
        direction = "";
        moveX = 0;
        moveY = 0;
    });

    var direction = "";

    onKeyDown("up", () => {
        if (direction != "rl") {
            if (player.pos.y - speed * dt() > 0) {
                moveX = 0;
                moveY = -speed * dt();
                direction = "ud";
            }
        }
    });

    onKeyDown("down", () => {
        if (direction != "rl") {
            if (player.pos.y + player.height + speed * dt() < gameHeight) {
                moveX = 0;
                moveY = speed * dt();
                direction = "ud";
            }
        }
    });

    onKeyDown("left", () => {
        if (direction != "ud") {
            if (player.pos.x - speed * dt() > 0) {
                moveX = -speed * dt();
                moveY = 0;
                direction = "rl";
            }
        }
    });

    onKeyDown("right", () => {
        if (direction != "ud") {
            if (player.pos.x + player.width + speed * dt() < gameWidth) {
                moveX = speed * dt();
                moveY = 0;
                direction = "rl";
            }
        }
    });

    onUpdate(() => {
        player.moveBy(moveX, moveY);
    });

    player.onCollide("water_collectible", (waterDrop) => {
        destroy(waterDrop);
        createWaterCollectibles();
        waterLevel += 5;
    });
});