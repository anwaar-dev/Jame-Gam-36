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
loadSprite("portal", "assets/portal.png")




// Gameover
scene("gameover", () => {
    
    add([
        text("gameover! press enter to retry"),
        // pos(100, 500)
    ]);
    onKeyPress("enter", () => {
        go("level1")
    });
})
