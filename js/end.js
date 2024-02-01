scene("end", () => {
    add([
        text("congratulation you Win the Game!"),
        pos(0, 500)
    ]);
    onKeyPress("enter", () => {
        go("level1")
    });
})