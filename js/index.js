kaboom({
    background: [141, 183, 255],
})

// this is the game scene starts (game over logic)
scene ("game", () => {

// CONSTANTS
setGravity(1600)
const SPEED = 300;
const ENEMY_SPEED = 200;

// This will run every FRAME
onUpdate(() => {
    // Enemy1.move(Player.pos.x, 0)
    onCollide("MyBullet", "obstacle", (mb) => {destroy(mb)})
    onCollide("Bullet", "obstacle", (en) => {destroy(en)})
})

// load a sprite from an image
loadSprite("player", "assets/characters/player.png")
loadSprite("bullet", "assets/bullet.png")

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
    sprite("player"),
    pos(200, height() - 160),
    area(),
    body(),
    anchor("center"),
    health(3),
    state("move", [ "idle", "attack", "move" ]),
    "enemy"
])

let mousepos;
// Player Shooting bullets at Enemy
onClick(() => {
    const mb = add([
        sprite("bullet"),
        pos(Player.pos.x,Player.pos.y),
        area(),
        move(toWorld(mousePos()).sub(Player.pos),1500),
        // offscreen({destroy: true, distance: 400}),
        "MyBullet",
    ])
})
// document.addEventListener('mousemove', event => {
//     console.log(event) // THIS should do what you want 
//     mousepos = (event.clientX, event.clientY);
// })

Player.onCollide("MyBullet", (mb) => {
    console.log(mousePos().sub(Player.pos))
    console.log(Player.pos.angle(Enemy1.pos))
    // Player.hurt(1)
    // destroy(mb) player.pos.sub(enemy.pos).unit()
})


// enemy throwing bullets at player
loop(1, () => {
if (Player.exists()) {
 	const en = add([
    	sprite("bullet"),
    	pos(Enemy1.pos.x,Enemy1.pos.y+20),
    	area(),
    	move(Player.pos.angle(Enemy1.pos), 1500),
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
    const dir = Player.pos.sub(Enemy1.pos).unit()
    Enemy1.move(dir.scale(ENEMY_SPEED))
})


// triggers when hp reaches 0
Player.on("death", () => {
    destroy(Player)
    go("gameover")
})

// add platforms
add([
    rect(width(), 58),
    pos(-100, height() - 58),
    outline(2),
    area(),
    body({ isStatic: true }),
    color(127, 200, 255),
    "obstacle"
])
add([
    rect(200, 30),
    pos(0, height() - 160),
    outline(2),
    area(),
    body({ isStatic: true }),
    color(127, 200, 255),
    "obstacle"
])
add([
    rect(200, 30),
    pos(430, height() - 180),
    outline(2),
    area(),
    body({ isStatic: true }),
    color(127, 200, 255),
    "obstacle"
])
	camPos(Player.pos.x, height()/2)


// move by SPEED px per frame
onKeyDown("a", () => {
    Player.move(-SPEED, 0)
	camPos(Player.pos.x, height()/2)
})
onKeyDown("d", () => {
    Player.move(SPEED, 0);
	camPos(Player.pos.x, height()/2)
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
        text("gameover!")
    ]);

    onKeyPress("space", () => {
        go("game");
    });
})

go ("game");
