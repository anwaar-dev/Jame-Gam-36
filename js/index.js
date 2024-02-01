kaboom({
    background: [0, 0, 0, 0]
})

// --CONSTANTS--

setGravity(1600)
const SPEED = 300;
const BULLET_SPEED = 700;
const ENEMY_SPEED = 200;

// --This will run every FRAME--

onUpdate(() => {
    // Enemy1.move(Player.pos.x, 0)
    onCollide("MyBullet", "obstacle", (mb) => { destroy(mb) })
    onCollide("Bullet", "obstacle", (en) => { destroy(en) })
})

// --loading sprites--

loadSprite("player", "assets/characters/player.png")
loadSprite("enemy1", "assets/characters/enemy1.png")
loadSprite("enemy2", "assets/characters/enemy1.png")
loadSprite("enemy3", "assets/characters/enemy1.png")
loadSprite("bullet", "assets/bullet.png")
loadSprite("plat1", "assets/level1/level1-1.png")


// add Player to screen
const Player = add([
    sprite("player"),
    pos(0, height() - 160),
    area(),
    body(),
    stay(),
    health(5),
    anchor("center"),
    "player"
])    

// add Enemy to screen
const Enemy1 = add([
    sprite("enemy1"),
    pos(1450, height() - 350),
    area(),
    body(),
    anchor("center"),
    health(3),
    state("move", ["idle", "attack", "move"]),
    "enemy1"
])

// add Enemy to screen
const Enemy2 = add([
    sprite("enemy2"),
    pos(2000, height() - 500),
    area(),
    body(),
    anchor("center"),
    health(3),
    state("move", ["idle", "attack", "move"]),
    "enemy2"
])

// add Enemy to screen
const Enemy3 = add([
    sprite("enemy3"),
    pos(750, height() - 200),
    area(),
    body(),
    anchor("center"),
    health(3),
    state("move", ["idle", "attack", "move"]),
    "enemy3"
])

// --The controls--

// move by SPEED px per frame
camPos(Player.pos.x, height() / 2)
onKeyDown("a", () => {
    Player.move(-SPEED, 0)
    camPos(Player.pos.x, height() / 2)
})
onKeyDown("d", () => {
    Player.move(SPEED, 0);
    camPos(Player.pos.x, height() / 2)
})

// .jump() when "space" key is pressed
onKeyPress("w", () => {
    if (Player.isGrounded()) {
        Player.jump();
    }
});
onKeyPress("space", () => {
    if (Player.isGrounded()) {
        Player.jump();
    }
});

let mousepos;
// Player Shooting bullets at Enemy
onClick(() => {
    const mb = add([
        sprite("bullet"),
        pos(Player.pos.x, Player.pos.y),
        area(),
        move(toWorld(mousePos()).sub(Player.pos), BULLET_SPEED),
        // offscreen({destroy: true, distance: 400}),
        "MyBullet",
    ])
})
Enemy1.onCollide("MyBullet", (mb) => {
    Enemy1.hurt(1)
    addBlood({ pos: Enemy1.pos, colour: 'green'})
    destroy(mb)
})
Enemy2.onCollide("MyBullet", (mb) => {
    Enemy2.hurt(1)
    addBlood({ pos: Enemy2.pos, colour: 'green'})
    destroy(mb)
})
Enemy3.onCollide("MyBullet", (mb) => {
    Enemy3.hurt(1)
    addBlood({ pos: Enemy3.pos, colour: 'green'})
    destroy(mb)
})
Player.onCollide("enemy2", () => {
    Player.hurt(0.5)
    addBlood({ pos: Player.pos, colour: 'red'})
});
Player.onCollide("enemy3", () => {
    Player.hurt(0.5)
    addBlood({ pos: Player.pos, colour: 'red'})
});

// enemy throwing bullets at player
loop(1, () => {
    if (Player.exists()) {
        if (!Enemy1.exists()) return
        const en = add([
            sprite("bullet"),
            pos(Enemy1.pos.x, Enemy1.pos.y + 20),
            area(),
            move(Player.pos.angle(Enemy1.pos), BULLET_SPEED),
            offscreen({ destroy: true }),
            "Bullet",
        ])
    }
})
Player.onCollide("Bullet", (en) => {
    Player.hurt(0.5)
    addBlood({ pos: Player.pos, colour: 'red'})
    destroy(en)
})

// Here we move towards the player every frame if the current state is "move"
Enemy2.onStateUpdate("move", () => {
    if (!Player.exists()) return
    let distance = Player.pos.x - Enemy2.pos.x;
    if (distance < 250 && distance > -250) {
        const dir = Player.pos.sub(Enemy2.pos).unit()
        Enemy2.move(dir.scale(ENEMY_SPEED))
    }
})
Enemy3.onStateUpdate("move", () => {
    if (!Player.exists()) return
    let distance = Player.pos.x - Enemy3.pos.x;
    if (distance < 250 && distance > -250) {
        const dir = Player.pos.sub(Enemy3.pos).unit()
        Enemy3.move(dir.scale(ENEMY_SPEED))
    }
})

// Game Scene
const scene = {
    menu: () => {},

    1: () => {
        // add platforms
        add([
        // rect(350, 70),
        pos(-100, height() - 70),
        sprite("plat1"),
        area(),
        body({ isStatic: true }),
        "obstacle"
    ])

    add([
        rect(200, 160),
        pos(350, height() - 160),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(127, 200, 255),
        "obstacle"
    ])
    add([
        rect(250, 180),
        pos(650, height() - 180),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(127, 200, 255),
        "obstacle"
    ])
    add([
        rect(200, 100),
        pos(1000, height() - 300),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(127, 200, 255),
        "obstacle"
    ])
    add([
        rect(100, 300),
        pos(1400, height() - 300),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(127, 200, 255),
        "obstacle"
    ])
    add([
        rect(500, 200),
        pos(1700, height() - 200),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(127, 200, 255),
        "obstacle"
    ])
    add([
        rect(400, 225),
        pos(2200, height() - 225),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(127, 200, 255),
        "obstacle"
    ])
    add([
        rect(700, 200),
        pos(2600, height() - 200),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(127, 200, 255),
        "obstacle"
    ])
    },

    2: () => {},

    gameover: () => {},

    end: () => {}
}

gameover: () => {
    add([
        text("gameover! press enter to retry")
    ]);
    onKeyPress("enter", () => {
        scene[1]();
    });
}

// triggers when hp reaches 0
Player.on("death", () => {
    destroy(Player)
    go("gameover")
})
Enemy1.on("death", () => {
    destroy(Enemy1)
})
Enemy2.on("death", () => {
    destroy(Enemy2)
})
Enemy3.on("death", () => {
    destroy(Enemy3)
})
scene[1]();
