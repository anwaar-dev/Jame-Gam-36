scene("end", () => {
    add([
        rect(width(), height()),
        pos(0, 0),
        area(),
        body({ isStatic: true }),
        color(127, 200, 255),
    ])
    add([
        text("Congratulations you Win the Game!"),
        anchor("center"),
        pos(width()/2, height()/2)
    ]);
    onKeyPress("enter", () => {
        go("level1")
    });
})