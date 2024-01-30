kaboom();

// CONSTANTS
setGravity(1600)
const SPEED = 300;


// load a sprite from an image
loadSprite("player", "assets/characters/player.png")

// add Player to screen
const Player = add([
    sprite("player"),
    pos(0, height() - 160),
    area(),
    body(),
    stay(),
])

// add platforms
add([
    rect(width()*2, 58),
    pos(0, height() - 58),
    outline(2),
    area(),
    body({ isStatic: true }),
    color(127, 200, 255),
])
add([
    rect(200, 30),
    pos(0, height() - 160),
    outline(2),
    area(),
    body({ isStatic: true }),
    color(127, 200, 255),
])
add([
    rect(200, 30),
    pos(430, height() - 180),
    outline(2),
    area(),
    body({ isStatic: true }),
    color(127, 200, 255),
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
