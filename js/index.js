kaboom();

// CONSTANTS
setGravity(1600)
const SPEED = 300;


// load a sprite from an image
loadSprite("player", "assets/characters/player.png")

// add Player to screen
const Player = add([
    sprite("player"),
    pos(80, 40),
    area(),
    body(),
])

// add platform
add([
    rect(width(), 58),
    pos(0, height() - 58),
    outline(2),
    area(),
    body({ isStatic: true }),
    color(127, 200, 255),
])

// move by SPEED pixels per frame every frame when left arrow key is being held down
onKeyDown("a", () => {
    Player.move(-SPEED, 0)
})
onKeyDown("d", () => {
    Player.move(SPEED, 0)
})

// .jump() when "space" key is pressed
onKeyPress("space", () => {
    if (Player.isGrounded()) {
        Player.jump();
    }
});
