// Game Scene 2
scene("level2", () => {


    // add Player to screen
    const Player = add([
        sprite("player"),
        pos(-500, height() - 160),
        area(),
        body(),
        stay(),
        health(15),
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
    const Enemy4 = add([
        sprite("enemy4"),
        pos(4200, height() - 800),
        area(),
        anchor("center"),
        health(5),
        state("move", ["idle", "attack", "move"]),
        "enemy4"
    ])
    const Enemy5 = add([
        sprite("enemy5"),
        pos(3500, height() - 800),
        area(),
        anchor("center"),
        health(5),
        state("move", ["idle", "attack", "move"]),
        "enemy4"
    ])

    // Portal
    const Portal = add([
        rect(100, 100),
        pos(4700, height() - 400),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(127, 200, 255),
        "portal"
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
        addBlood({ pos: Enemy1.pos, colour: 'green' })
        destroy(mb)
    })
    Enemy2.onCollide("MyBullet", (mb) => {
        Enemy2.hurt(1)
        addBlood({ pos: Enemy2.pos, colour: 'green' })
        destroy(mb)
    })
    Enemy3.onCollide("MyBullet", (mb) => {
        Enemy3.hurt(1)
        addBlood({ pos: Enemy3.pos, colour: 'green' })
        destroy(mb)
    })
    Enemy4.onCollide("MyBullet", (mb) => {
        Enemy4.hurt(1)
        addBlood({ pos: Enemy4.pos, colour: 'green' })
        destroy(mb)
    })
    Enemy5.onCollide("MyBullet", (mb) => {
        Enemy5.hurt(1)
        addBlood({ pos: Enemy5.pos, colour: 'green' })
        destroy(mb)
    })
    Player.onCollide("enemy2", () => {
        Player.hurt(0.5)
        addBlood({ pos: Player.pos, colour: 'red' })
    });
    Player.onCollide("enemy3", () => {
        Player.hurt(0.5)
        addBlood({ pos: Player.pos, colour: 'red' })
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

    loop(1, () => {
        if (Player.exists()) {
            if (!Enemy2.exists()) return
            const en = add([
                sprite("bullet"),
                pos(Enemy2.pos.x, Enemy2.pos.y + 20),
                area(),
                move(Player.pos.angle(Enemy2.pos), BULLET_SPEED),
                offscreen({ destroy: true }),
                "Bullet",
            ])
        }
    })
    loop(1, () => {
        if (Player.exists()) {
            if (!Enemy4.exists()) return
            const en = add([
                sprite("bullet"),
                pos(Enemy4.pos.x, Enemy4.pos.y + 20),
                area(),
                move(Player.pos.angle(Enemy4.pos), BULLET_SPEED),
                offscreen({ destroy: true }),
                "Bullet",
            ])
        }
    })
    loop(1, () => {
        if (Player.exists()) {
            if (!Enemy5.exists()) return
            const en = add([
                sprite("bullet"),
                pos(Enemy5.pos.x, Enemy5.pos.y + 20),
                area(),
                move(Player.pos.angle(Enemy5.pos), BULLET_SPEED),
                offscreen({ destroy: true }),
                "Bullet",
            ])
        }
    })

    Player.onCollide("Bullet", (en) => {
        Player.hurt(0.5)
        addBlood({ pos: Player.pos, colour: 'red' })
        destroy(en)
    })
    Player.onCollide("portal", (Portal) => {
        go("end")
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
    Enemy4.onStateUpdate("move", () => {
        if (!Player.exists()) return
        let distance = Player.pos.x - Enemy4.pos.x;
        if (distance < 250 && distance > -250) {
            const dir = Player.pos.sub(Enemy4.pos).unit()
            Enemy4.move(dir.scale(ENEMY_SPEED))
        }
    })
    Enemy5.onStateUpdate("move", () => {
        if (!Player.exists()) return
        let distance = Player.pos.x - Enemy5.pos.x;
        if (distance < 250 && distance > -250) {
            const dir = Player.pos.sub(Enemy5.pos).unit()
            Enemy5.move(dir.scale(ENEMY_SPEED))
        }
    })
    // falling gameover logic
    const fall = add([
        rect(2000000, 160),
        pos(-2000, height() - 1),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(0, 0, 0),
        "fall"
    ])
    Player.onCollide("fall", () => {
        Player.hurt(15)

    });
    add([
        rect(1350, 160),
        pos(-1000, height() - 100),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(127, 200, 255),
        "obstacle"
    ])

    add([
        rect(200, 350),
        pos(350, height() - 200),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(12, 200, 255),
        "obstacle"
    ])
    add([
        rect(250, 180),
        pos(650, height() - 150),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(147, 200, 255),
        "obstacle"
    ])
    add([
        rect(200, 50),
        pos(650, height() - 570),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(147, 200, 255),
        "obstacle"
    ])
    add([
        rect(1700, 50),
        pos(950, height() - 670),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(147, 200, 255),
        "obstacle"
    ])
    add([
        rect(150, 90),
        pos(980, height() - 250),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(127, 270, 255),
        "obstacle"
    ])
    add([
        rect(150, 50),
        pos(960, height() - 470),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(127, 270, 255),
        "obstacle"
    ])
    add([
        rect(200, 50),
        pos(1200, height() - 350),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(127, 220, 255),
        "obstacle"
    ])
    add([
        rect(100, 300),
        pos(1400, height() - 200),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(197, 200, 255),
        "obstacle"
    ])
    add([
        rect(500, 200),
        pos(1800, height() - 200),
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
        rect(2000, 200),
        pos(2600, height() - 200),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(127, 200, 255),
        "obstacle"
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
    Enemy4.on("death", () => {
        destroy(Enemy4)
    })
    Enemy5.on("death", () => {
        destroy(Enemy5)
    })

})