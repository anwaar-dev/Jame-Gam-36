kaboom({
    background: [0, 0, 0, 0],
})

// this is the game scene starts (game over logic)
scene("game", () => {

    // CONSTANTS
    setGravity(1600)
    const SPEED = 300;
    const BULLET_SPEED = 700;
    const ENEMY_SPEED = 200;

    // This will run every FRAME
    onUpdate(() => {
        // Enemy1.move(Player.pos.x, 0)
        onCollide("MyBullet", "obstacle", (mb) => { destroy(mb) })
        onCollide("Bullet", "obstacle", (en) => { destroy(en) })
    })

    // load a sprite from an image
    loadSprite("player", "assets/characters/player.png")
    loadSprite("enemy1", "assets/characters/player.png")
    loadSprite("enemy2", "assets/characters/enemy2.png")
    loadSprite("bullet", "assets/bullet.png")

    loadSprite("plat1", "assets/level1/level1-1.svg")

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
        pos(200, height() - 160),
        area(),
        body(),
        anchor("center"),
        health(3),
        state("move", ["idle", "attack", "move"]),
        "enemy"
    ])

    // add Enemy to screen
    const Enemy2 = add([
        sprite("enemy2"),
        pos(900, height() - 500),
        area(),
        body(),
        anchor("center"),
        health(3),
        state("move", ["idle", "attack", "move"]),
        "enemy2"
    ])

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
        destroy(mb)
    })

    Enemy2.onCollide("MyBullet", (mb) => {
        Enemy2.hurt(3)
        destroy(mb)
    })

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
        Player.hurt(1)
        destroy(en)
    })

    // Here we move towards the player every frame if the current state is "move"
    Enemy1.onStateUpdate("move", () => {
        if (!Player.exists()) return
            // let distance = Player.pos.x - Enemy1.pos.x;
            // if (distance<250&&distance>-250) {
            //     const dir = Player.pos.sub(Enemy1.pos).unit()
            //     Enemy1.move(dir.scale(ENEMY_SPEED))
            // }
    })

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
    camPos(Player.pos.x, height() / 2)

    // move by SPEED px per frame
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

})

// this is where the game scene overs (game over logic)
scene("gameover", () => {
    add([
        text("gameover! press enter to retry")
    ]);

    onKeyPress("enter", () => {
        go("game");
    });
})

go("game");
