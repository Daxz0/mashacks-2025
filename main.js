import kaplay from "./kaplay.mjs";

kaplay({
    background: [0, 0, 0],
});

let waterLevel = 100;
let health = 100;
let happiness = 100;
let hygiene = 100;
let day = 1;
loadSprite("house_bg", "sprites/house_bg.jpg");
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
            go("supermarket");
        });
    });

    go("start");
});

function heatwaveEffect() {
    waterLevel -= 80;
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
        rect(90, 300),
        pos(10, height() - 310),
        anchor("left"),
        "water",
        color(0, 0, 0),
    ]);

    const waterMeter = add([
        rect(90, 300),
        pos(10, height() - 310),
        anchor("left"),
        "water",
        color(0, 0, 255),
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
        text(`Water: ${waterLevel}`, { size: 50 }),
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
        rect(40, 60),
        pos(100, 100),
        area(),
        color(255, 0, 0),
        "player",
    ]);

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
            color: [255, 255, 255],
        },
        {
            x: 700,
            y: 100,
            width: 120,
            height: 25,
            color: [255, 255, 255],
        },
    ];

    function createObstacles() {
        obstacles.forEach((obstacle) => {
            add([
                rect(obstacle.width, obstacle.height),
                pos(obstacle.x, obstacle.y),
                area(),
                color(...obstacle.color),
                "obstacle",
            ]);
        });
    }

    createObstacles();

    let width = screen.width;
    let height = screen.height;

    const speed = screen.width / 2;

    let moveX = 0;
    let moveY = 0;

    onKeyPress((key) => {
        debug.log(player.pos);
    });

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
            if (player.pos.y + player.height + speed * dt() < height) {
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
            if (player.pos.x + player.width + speed * dt() < width) {
                moveX = speed * dt();
                moveY = 0;
                direction = "rl";
            }
        }
    });

    onUpdate(() => {
        player.moveBy(moveX, moveY);
    });

    player.onCollide("obstacle", () => {
        if (direction === "ud") {
            player.moveBy(0, -moveY);
        } else if (direction === "rl") {
            player.moveBy(-moveX, 0);
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

scene("gameWin", () => {
    add([
        text("You survived the Watermaster's wrath!", { size: 65 }),
        pos(center().x, center().y),
        anchor("center"),
    ]);

    add([
        text("Congratulations!", { size: 50 }),
        pos(center().x, center().y + 100),
        anchor("center"),
    ]);
});


//test change