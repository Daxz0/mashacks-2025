import kaplay from "./kaplay.mjs";

kaplay({
    background: [0, 0, 0],
});

let waterLevel = 0;
let collectedWater = 100;
// let health = 100;
// let happiness = 100;
// let hygiene = 100;
let day = 1;
//let ticker = 0;

//Setting stuff
let delay = 0.02; //text delay between letters


loadSprite("house_bg", "sprites/house_bg.jpg");
loadSprite("watermaster", "sprites/watermaster.png");
loadSprite("water_sprite", "sprites/water_sprite.png");
loadSprite("player", "sprites/player.png");
loadSprite("water_bg", "sprites/collect_water_bg.jpg")
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
            go("cutscene");
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

const textLines = [
    "Hi, I'm your local watermaster",
    "There have been massive fires recently.",
    "In order to combat these, we will need to turn off our city's water supply",
    "We will turn back on the water supply in 30 days",
    "Survive if you can! We are glad you were able to do your part.",
    "..."
]

function randomEvent() {
    let event = events[Math.floor(Math.random() * events.length)];
    event.effect();
    return event.text;
}

scene("cutscene", () => {    
    let isTyping = false;
    let current = "";
    let i = 0;
    let message = 0;
    let elapse = 0;

    const master = add([
        sprite("watermaster"),
        pos(screen.width * 0.7, 100),
        scale(0.2, 0.2),
    ]);


    const dialogue = add([
        pos(0, 0),
        anchor("bot"),
        rect(screen.width, screen.height/5),
        color(0,0,0),
        opacity(0.5),
    ])

    const textBox = add([
        pos(100, 100), 
        text("THE WATERMASTER", { 
            size: 50, 
            width: screen.width * 0.7
        }), 
        area(),
        color(255, 0, 0), 
    ]);
    
    const clicky = add([
        rect(screen.width, screen.height),
        pos(0, 0),
        color(255, 0, 0), 
        opacity(0),
        area(),
    ])

    let currentIndex = 0;

    clicky.onClick(() => {
        if(!isTyping){
            i = 0;
            current = "";
            message = textLines[currentIndex];
            isTyping = true;
            currentIndex++;
        }

        if(currentIndex >= textLines.length){
            go("water_collect");
        }
    });

    onUpdate(() => {
        if(isTyping){
            elapse += dt();
            if(elapse > delay){
                current += message[i];
                i++;
                textBox.text = current;
                elapse = 0;
            }
            if(i >= message.length){
                isTyping = false;
            }
        }
    })

})

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
    
    function updateWaterBar(){
        waterMeter.height = 300 * (waterLevel / collectedWater);
        waterMeter.pos.y = height() * 0.5 + (300 - waterMeter.height);
    }

    add([
        rect(100, 300),
        pos(10, height() * 0.5),
        anchor("topleft"),
        "water",
        color(0, 0, 0),
    ]);

    const waterMeter = add([
        rect(100, 300),
        pos(10, height() * 0.5),
        anchor("topleft"),
        "water",
        color(11, 193, 246),
    ]);

    // const healthBar = add([
    //     rect(200, 20),
    //     pos(width() - 25, 70),
    //     anchor("topright"),
    //     "health",
    //     color(0, 255, 0),
    // ]);

    // const hygieneBar = add([
    //     rect(200, 20),
    //     pos(width() - 25, 120),
    //     anchor("topright"),
    //     "hygiene",
    //     color(255, 255, 0),
    // ]);

    // const happinessBar = add([
    //     rect(200, 20),
    //     pos(width() - 25, 170),
    //     anchor("topright"),
    //     "happiness",
    //     color(255, 165, 0),
    // ]);

    const waterDisplay = add([
        text(`Water: ${waterLevel}`, { size: 40}),
        pos(50, 400),
        anchor("left"),
        rotate(),
    ]);

    // add([
    //     text("Health", { size: 20 }),
    //     pos(width() - 25, 50),
    //     anchor("topright"),
    // ]);

    // add([
    //     text("Hygiene", { size: 20 }),
    //     pos(width() - 25, 100),
    //     anchor("topright"),
    // ]);

    // add([
    //     text("Happiness", { size: 20 }),
    //     pos(width() - 25, 150),
    //     anchor("topright"),
    // ]);

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

        updateWaterBar();
        
        if (waterLevel <= 0) {
            go("gameOver");
        }
    });

    waterDisplay.angle = 90;
});

scene("water_collect", () => {

    const background = add([
        sprite("water_bg"),
        pos(0, 0),
        fixed(),
    ]);

    background.scale = vec2(width() / background.width, height() / background.height);

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
    let timeLeft = 30;
    
    const timer_water_bg = add([
        pos(565,20),
        rect(300, 100),
        color(0,0,0),
        opacity(0.5),
        outline(4),
        area(),
    ])
    const timerText = add([
        text(`Time: ${timeLeft}`, { size: 40 }),
        pos(center().x, 50),
        anchor("center"),
        "timer"
    ]);

    const waterText = add([
        text(`Water: ${waterLevel}`, { size: 40 }),
        pos(center().x, 90),
        anchor("center"),
    ]);


    onUpdate("timer", (timerText) => {
        timeLeft -= dt();
        timerText.text = `Time: ${Math.floor(timeLeft)}`;
        if (timeLeft <= 0) {
            collectedWater = waterLevel;
            go("house");
            destroy(timerText);
        }

    })

    function canMove(newX, newY) {
        return (
            newX >= 0 &&
            newY >= 0 &&
            newX + player.width <= gameWidth &&
            newY + player.height <= gameHeight
        );
    }

    onKeyRelease((key) => {
        direction = "";
        moveX = 0;
        moveY = 0;
    });

    var direction = "";


    onKeyDown(["up","w"], () => {
        if (direction != "rl" && canMove(player.pos.x, player.pos.y - speed * dt())) {
            player.moveBy(0, -speed * dt());
            direction = "ud";
        }
    });

    onKeyDown(["down","s"], () => {
        if (direction != "rl" && canMove(player.pos.x, player.pos.y + speed * dt())) {
            player.moveBy(0, speed * dt());
            direction = "ud";
        }
    });

    onKeyDown(["left","a"], () => {
        if (direction != "ud" && canMove(player.pos.x - speed * dt(), player.pos.y)) {
            player.moveBy(-speed * dt(), 0);
            direction = "rl";
        }
    });

    onKeyDown(["right","d"], () => {
        if (direction != "ud" && canMove(player.pos.x + speed * dt(), player.pos.y)) {
            player.moveBy(speed * dt(), 0);
            direction = "rl";
        }
    });

    // onUpdate(() => {
    //     ticker++;
    //     if(ticker % 10 == 0){
    //         debug.log("X speed: " + moveX + "Y speed: " + moveY);
    //         debug.log("X: " + player.pos.x + "Y: " + player.pos.y);
    //     }
    // });

    player.onCollide("water_collectible", (waterDrop) => {
        destroy(waterDrop);
        createWaterCollectibles();
        waterLevel += 5;
        waterText.text = `Water: ${waterLevel}`;
    });
});



scene("gameOver", () => {
    const background = add([
        rect(width(), height()),
        pos(0, 0),
        color(0, 0, 0),
    ]);

    add([
        text("Game Over", { size: 80 }),
        pos(center().x, center().y - 50),
        anchor("center"),
    ]);

    add([
        text("You ran out of water!", { size: 40 }),
        pos(center().x, center().y + 50),
        anchor("center"),
    ]);

    const restartButton = add([
        rect(300, 80),
        pos(center().x, center().y + 150),
        anchor("center"),
        area(),
        color(255, 0, 0),
        "restart",
    ]);

    add([
        text("Restart", { size: 40 }),
        pos(center().x, center().y + 150),
        anchor("center"),
        color(255, 255, 255),
    ]);

    onClick("restart", () => {
        waterLevel = 0;
        day = 1;
        go("start");
    });
});

scene("gameWin", () => {
    const background = add([
        rect(width(), height()),
        pos(0, 0),
        color(0, 128, 0),
    ]);

    add([
        text("You Survived!", { size: 80 }),
        pos(center().x, center().y - 50),
        anchor("center"),
    ]);

    add([
        text("Congratulations! You made it through 30 days!", { size: 40 }),
        pos(center().x, center().y + 50),
        anchor("center"),
    ]);

    const restartButton = add([
        rect(300, 80),
        pos(center().x, center().y + 150),
        anchor("center"),
        area(),
        color(0, 0, 255),
        "restart",
    ]);

    add([
        text("Restart", { size: 40 }),
        pos(center().x, center().y + 150),
        anchor("center"),
        color(255, 255, 255),
    ]);

    onClick("restart", () => {
        waterLevel = 0;
        day = 1;
        go("start");
    });
});
