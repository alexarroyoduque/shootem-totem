var interfaceUtils = {};

interfaceUtils.createHud = function (theGame) {
    var style = {
        font: "18px Inconsolata",
        align: "center"
    };

    theGame.hud = theGame.game.add.sprite(0, 0, 'hud');
    theGame.hud.alpha = 0.2;

    theGame.hudLifes = theGame.game.add.sprite(32, 30, 'player');
    theGame.hudLifes.scale.setTo(0.7, 0.7);
    theGame.hudLifes.anchor.setTo(0.5, 0.5);
    theGame.hudLifes.alpha = 0.6;
    theGame.hudLifes.tint = playerUtils.color.one;
    theGame.hudLifesText = theGame.game.add.text(theGame.hudLifes.x - 5, theGame.hudLifes.y - 2, playerUtils.lifes, {
        font: style.font,
        align: style.font,
        fill: '#fff'
    });
    theGame.hudLifesText.alpha = 0.8;

    theGame.hudTriforce = theGame.game.add.sprite(32, 100, 'triforce', 0);
    theGame.hudTriforce.anchor.setTo(0.5, 0.5);
    theGame.hudTriforce.alpha = 0.6;
    theGame.hudTriforceText = theGame.game.add.text(theGame.hudTriforce.x - 13, theGame.hudTriforce.y + 22, '0/3', {
        font: style.font,
        align: style.font,
        fill: '#FDD835'
    });
    theGame.hudTriforceText.alpha = 0.8;

    theGame.hudDragonBalls = theGame.game.add.sprite(32, 170, 'dragonBalls', 3);
    theGame.hudDragonBalls.anchor.setTo(0.5, 0.5);
    theGame.hudDragonBalls.alpha = 0.6;
    theGame.hudDragonBallsText = theGame.game.add.text(theGame.hudDragonBalls.x - 13, theGame.hudDragonBalls.y + 22, utils.dragonBallsInPlayer + '/7', {
        font: style.font,
        align: style.font,
        fill: '#FFA726'
    });
    theGame.hudDragonBallsText.alpha = 0.8;   
};

interfaceUtils.createScorePanel = function (theGame) {
    var style = {
        font: "24px Inconsolata",
        align: "right"
    };

    theGame.player1ScoreText = theGame.game.add.text(780, 10, '0', {
        font: style.font,
        align: style.font,
        fill: '#00c853'
    });

    theGame.player1ScoreText.anchor.setTo(1, 0);
    theGame.player1ScoreText.alpha = 0.8;

};

interfaceUtils.updateScorePanel = function (theGame, numberOfPlayer) {
    theGame.player1ScoreText.setText(theGame.player1.score);
}


interfaceUtils.createInitialInstructions = function (theGame) {
    var x = 70,
        y = 15,
        delay = 10000,
        style = {
        font: '18px Inconsolata',
        align: 'left',
        fill: '#fff'
    };

    theGame.instructions1Text = theGame.game.add.text(x, y, 'Lifes', style);
    theGame.instructions1Text.alpha = 0.9;

    theGame.instructions2Text = theGame.game.add.text(x, y + 75, 'Get 3 triforces to fight with the boss', style);
    theGame.instructions2Text.alpha = 0.9;

    theGame.instructions3Text = theGame.game.add.text(x, y + 150, 'Get 7 dragon balls to call Shenron and make a wish', style);
    theGame.instructions3Text.alpha = 0.9;

    theGame.instructions4Text = theGame.game.add.text(x, y + 225, 'A greater damage, most chance of exploit', style);
    theGame.instructions4Text.alpha = 0.9;

    theGame.instructions5Text = theGame.game.add.text(x, y + 300, 'Get power ups to defeat enemies easier', style);
    theGame.instructions5Text.alpha = 0.9;

    //to(properties, duration, ease, autoStart, delay, repeat, yoyo)
    theGame.game.add.tween(theGame.instructions1Text)
        .to({
            alpha: 0
        }, 1200, Phaser.Easing.Linear.None, true, delay, 0, false);

    theGame.game.add.tween(theGame.instructions2Text)
        .to({alpha: 0}, 1200, Phaser.Easing.Linear.None, true, delay, 0, false);
    theGame.game.add.tween(theGame.instructions3Text)
        .to({alpha: 0}, 1200, Phaser.Easing.Linear.None, true, delay, 0, false);
    theGame.game.add.tween(theGame.instructions4Text)
        .to({alpha: 0}, 1200, Phaser.Easing.Linear.None, true, delay, 0, false);
    theGame.game.add.tween(theGame.instructions5Text)
        .to({alpha: 0}, 1200, Phaser.Easing.Linear.None, true, delay, 0, false);

};

