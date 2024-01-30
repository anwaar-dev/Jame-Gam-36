kaboom();

// CONSTANTS
setGravity(1600)
const SPEED = 300;

// This will run every FRAME
onUpdate(() => {
    // Enemy1.move(Player.pos.x, 0)
    onCollide("Bullet", "obstacle", (en) => {
    destroy(en)
})
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
    "player"
])

// add Enemy to screen
const Enemy1 = add([
    sprite("player"),
    pos(200, height() - 160),
    area(),
    body(),
    health(3),
    "enemy"
])

// enemy throwing feces at player
loop(1, () => {
 	const en = add([
    	sprite("bullet"),
    	pos(Enemy1.pos.x,Enemy1.pos.y+20),
    	area(),
    	move(Player.pos.angle(Enemy1.pos), 1500),
    	offscreen({ destroy: true }),
    	"Bullet",
	])
})

Player.onCollide("Bullet", (en) => {
	Player.hurt(1)
    destroy(en)
})
// triggers when hp reaches 0
Player.on("death", () => {
    destroy(Player)
})

// add platforms
add([
    rect(width()*2, 58),
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
onKeyPress("space", () => {
    if (Player.isGrounded()) {
        Player.jump();
    }
});
