var menuUtils = {};

menuUtils.colors = [
    0xf44336, // red
    0xE91E63, // pink
    0xAB47BC, // purple 400
//     0x673AB7, // deep purple X
//     0x3F51B5, // indigo X
    0x03A9F4, // blue
    0x00BCD4, // light blue
    0x009688, // cyan
//     0x4CAF50, // teal X
    0x8BC34A, // green
    0x8BC34A, // light green
    0xCDDC39, // lime
    0xFFEB3B, // yellow
    0xFFC107, // amber
    0xFF9800, // orange
    0xFF5722 // deep orange
];

menuUtils.styleJumbo = {
    font: '26px Inconsolata',
    align: 'center',
    fill: '#FFF'
};  

menuUtils.style = {
    font: '16px Inconsolata',
    align: 'center',
    fill: '#FFF'
}; 


menuUtils.addBackgroundTween = function (bg, milliseconds, xDelta, yDelta, theGame) {
    theGame.game.add.tween(bg)
        .to({
            x: bg.x + xDelta,
            y: bg.y + yDelta
        }, milliseconds, Phaser.Easing.Quadratic.InOut)
        .to({
            x: bg.x,
            y: bg.y
        }, milliseconds, Phaser.Easing.Quadratic.InOut)
        .loop()
        .start();
};

menuUtils.addBackground = function (theGame) {
    theGame.menuBg7 = theGame.game.add.sprite(-100, -100, 'menuBg7');
    theGame.menuBg6 = theGame.game.add.sprite(-100, -100, 'menuBg6');
    theGame.menuBg5 = theGame.game.add.sprite(-100, -100, 'menuBg5');
    theGame.menuBg4 = theGame.game.add.sprite(-100, -100, 'menuBg4');
    theGame.menuBg3 = theGame.game.add.sprite(-100, -100, 'menuBg3');
    theGame.menuBg2 = theGame.game.add.sprite(-100, -100, 'menuBg2');
    theGame.menuBg1 = theGame.game.add.sprite(-100, -100, 'menuBg1');

    menuUtils.addBackgroundTween(theGame.menuBg1, 2800, 10, 20, theGame);
    menuUtils.addBackgroundTween(theGame.menuBg2, 1600, 13, 30, theGame);
    menuUtils.addBackgroundTween(theGame.menuBg3, 4400, 20, 30, theGame);
    menuUtils.addBackgroundTween(theGame.menuBg4, 3000, 10, 5, theGame);
    menuUtils.addBackgroundTween(theGame.menuBg5, 2800, 5, 10, theGame);
    menuUtils.addBackgroundTween(theGame.menuBg6, 2000, 10, 18, theGame);
    menuUtils.addBackgroundTween(theGame.menuBg7, 2400, 15, 25, theGame);
};

menuUtils.setupButtonText = function (text) {
    text.anchor.setTo(0.5, 0.5);
};

menuUtils.setupButton = function (button) {
    button.anchor.setTo(0.5, 0.5);
    button.tint = 0x03A9F4;
    button.onInputOver.add(this.over, this);
    button.onInputOut.add(this.out, this);
    button.onInputUp.add(this.out, this);
};

menuUtils.addCursorParticles = function(theGame) {
    if (theGame.inputOverButton && theGame.game.time.now > theGame.particlesButtonTime) {
        utils.spawnCollisionsEnemyParticles(theGame, theGame.game.input);
        theGame.particlesButtonTime = theGame.game.time.now + 150;
    }
};

menuUtils.tintBackButton = function (button) {
    button.tint = 0xf44336;
};

