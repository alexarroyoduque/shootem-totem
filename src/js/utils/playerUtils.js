var playerUtils = {
    velocity: 200,
    shootTime: 150,
    shootTimeInterval: 150,
    bulletVelocity: 450,
    lifesOriginal: 2,
    lifes: 2,
    invulnerabilityTime: 3000,
    timeToVulnerable: 2000,
    saiyanTimeSeconds: 30,
    color: {
        one: 0x00c853,
        saiyan: 0xfff110
    },
    item: ''
};

playerUtils.actions = function(theGame) {
    if (theGame.player1.alive) {
        theGame.player1.body.velocity.setTo(0, 0);

        if (theGame.cursors.left.isDown || theGame.pad1.isDown(theGame.cursorsPad.left)) {
            theGame.player1.body.velocity.x = -playerUtils.velocity;
        } else if (theGame.cursors.right.isDown || theGame.pad1.isDown(theGame.cursorsPad.right)) {
            theGame.player1.body.velocity.x = playerUtils.velocity;
        }

        if (theGame.actionControls.shoot.isDown|| theGame.pad1.isDown(theGame.actionControlsPad.shoot)) {
            playerUtils.fireBullet(theGame);
        }

        if (theGame.actionControls.powerUp.isDown || theGame.pad1.isDown(theGame.actionControlsPad.powerUp)) {
            playerUtils.firePowerUp(theGame);
        }

        if (theGame.actionControls.callShenron.isDown|| theGame.pad1.isDown(theGame.actionControlsPad.callShenron)) {
            playerUtils.callShenron(theGame);
        }
    }
};

playerUtils.mapControls = function(theGame, numPlayer) {
    theGame.cursors = {
        'left': theGame.game.input.keyboard.addKey(65), //a
        'right': theGame.game.input.keyboard.addKey(68), //d
    };
    theGame.actionControls = {
        'shoot': theGame.game.input.keyboard.addKey(32), // space
        'powerUp': theGame.game.input.keyboard.addKey(75), // k
        'callShenron': theGame.game.input.keyboard.addKey(74), // j
    };
};

// xbox controls
playerUtils.mapControlsPad = function(theGame, numPlayer) {
    theGame.game.input.gamepad.start();
    theGame.pad1 = theGame.game.input.gamepad.pad1;

    theGame.cursorsPad = {
        'left': Phaser.Gamepad.XBOX360_DPAD_LEFT,
        'right': Phaser.Gamepad.XBOX360_DPAD_RIGHT,
    };
    theGame.actionControlsPad = {
        'shoot': Phaser.Gamepad.XBOX360_RIGHT_TRIGGER,
        'powerUp': Phaser.Gamepad.XBOX360_LEFT_TRIGGER,
        'callShenron': Phaser.Gamepad.XBOX360_Y
    };
};

playerUtils.createPlayer = function(theGame, numPlayer) {
    var style = {
        font: "18px Inconsolata",
        fill: "#000",
        align: "center"
    };

    if (!numPlayer || numPlayer === 1) {
        theGame.player1 = theGame.game.add.sprite(400, 550, 'player');
        theGame.player1.anchor.setTo(0.5, 0.5);
        theGame.game.physics.enable(theGame.player1, Phaser.Physics.ARCADE);
        theGame.player1.body.fixedRotation = true;
        theGame.player1.body.collideWorldBounds = true;
        theGame.player1.timeToVulnerable = playerUtils.timeToVulnerable;
        theGame.player1.score = 0;
        theGame.player1.body.setSize(50, 35, 0, 10);
        theGame.player1.damagePlayer = 0;
        theGame.player1.textDamage = theGame.game.add.text(theGame.player1.x, theGame.player1.y + 15, theGame.player1.damagePlayer + '%', style);
        theGame.player1.textDamage.anchor.set(0.5);

        theGame.player1.playerPowerUp = theGame.game.add.sprite(theGame.player1.x, theGame.player1.y, 'playerPowerUp');
        theGame.player1.playerPowerUp.alpha = 0;
        theGame.player1.playerPowerUp.anchor.setTo(0.5, 0.5);

        theGame.player1.item = playerUtils.item;
        theGame.player1.isSaiyan = false;

        theGame.player1.body.sprite.tint = playerUtils.color.one;
    }
    playerUtils.mapControls(theGame, 1);
    playerUtils.mapControlsPad(theGame, 1)
};

playerUtils.fireBullet = function(theGame) {
    if (theGame.game.time.now > playerUtils.shootTime) {
        var bullet = theGame.bullets.getFirstExists(false);

        if (bullet) {
            audioUtils.playShootPlayerAudio(theGame);

            bullet.reset(theGame.player1.x, theGame.player1.y - 16);
            bullet.body.velocity.y = utils.getRandomInt(-playerUtils.bulletVelocity, -playerUtils.bulletVelocity + 50);
            bullet.body.velocity.x = utils.getRandomInt(-30, 30);
            bullet.damagePoints = 1;

            if (theGame.player1.isSaiyan) {
                bullet.tint = playerUtils.color.saiyan;
                bullet.damagePoints = 2;
            } else {
                bullet.tint = playerUtils.color.one;
            }

            playerUtils.shootTime = theGame.game.time.now + playerUtils.shootTimeInterval;
        }
    }
};


function spawnNewteamBullets(theGame) {
    var bullet,
        i = 0,
        x = theGame.player1.x,
        y = theGame.player1.y,
        defaultYVel = -playerUtils.bulletVelocity + 50;
    bulletsConfig = [{
        yVel: defaultYVel,
        xVel: 0
    }];

    for (i = 0; i < 2; i++) {
        bulletsConfig.push({
            yVel: defaultYVel + 10,
            xVel: -10 * i
        }, {
            yVel: defaultYVel + 10,
            xVel: 10 * i
        });
    };

    for (i = 0; i < 5; i++) {
        bulletsConfig.push({
            yVel: defaultYVel + 20,
            xVel: -25 * i
        }, {
            yVel: defaultYVel + 20,
            xVel: 25 * i
        });
    };

    for (i = 5; i < 8; i++) {
        bulletsConfig.push({
            yVel: defaultYVel + 25,
            xVel: -25 * i
        }, {
            yVel: defaultYVel + 25,
            xVel: 25 * i
        });
    };

    for (i = 6; i < 9; i++) {
        bulletsConfig.push({
            yVel: defaultYVel + 35,
            xVel: -25 * i
        }, {
            yVel: defaultYVel + 35,
            xVel: 25 * i
        });
    };

    for (i = 8; i < 9; i++) {
        bulletsConfig.push({
            yVel: defaultYVel + 40,
            xVel: -25 * i
        }, {
            yVel: defaultYVel + 40,
            xVel: 25 * i
        });
    };

    for (i = 8; i < 9; i++) {
        bulletsConfig.push({
            yVel: defaultYVel + 50,
            xVel: -25 * i
        }, {
            yVel: defaultYVel + 50,
            xVel: 25 * i
        });
    };

    for (i = 0; i < bulletsConfig.length; i++) {
        bullet = theGame.bullets.getFirstExists(false);

        if (bullet) {
            bullet.reset(x, y);
            bullet.damagePoints = 1;
            bullet.body.velocity.y = bulletsConfig[i].yVel;
            bullet.body.velocity.x = bulletsConfig[i].xVel;
        }
    }

    var powerUp = theGame.powerUpsPool.getFirstExists(false);

    if (powerUp) {
        powerUp.reset(x - 10, y + 60);
        powerUp.body.sprite.frame = 0;
        powerUp.body.velocity.y = defaultYVel;
        powerUp.alpha = 0.4;
    }

};


function spawnThorBullets(theGame) {
    var bullet,
        i = 0,
        x = theGame.player1.x,
        y = theGame.player1.y,
        defaultYVel = -playerUtils.bulletVelocity - 200;
    bulletsConfig = [];

    for (i = 1; i < 4; i++) {
        bulletsConfig.push({
            yVel: defaultYVel + (i * 30),
            xVel: -10
        }, {
            yVel: defaultYVel + (i * 30),
            xVel: -20
        }, {
            yVel: defaultYVel + (i * 30),
            xVel: -30
        });
    };

    for (i = 1; i < 4; i++) {
        bulletsConfig.push({
            yVel: defaultYVel + (i * 50),
            xVel: -10
        }, {
            yVel: defaultYVel + (i * 50),
            xVel: 0
        }, {
            yVel: defaultYVel + (i * 50),
            xVel: 10
        });
    };

    for (i = 1; i < 4; i++) {
        bulletsConfig.push({
            yVel: defaultYVel + (i * 60),
            xVel: 0
        }, {
            yVel: defaultYVel + (i * 60),
            xVel: 10
        });
    };


    for (i = 0; i < bulletsConfig.length; i++) {
        bullet = theGame.bullets.getFirstExists(false);

        if (bullet) {
            bullet.reset(x, y);
            bullet.damagePoints = 1;
            bullet.body.velocity.y = bulletsConfig[i].yVel;
            bullet.body.velocity.x = bulletsConfig[i].xVel;
        }
    }

    var powerUp = theGame.powerUpsPool.getFirstExists(false);

    if (powerUp) {
        powerUp.reset(x, y + 70);
        powerUp.body.sprite.frame = 1;
        powerUp.body.velocity.y = defaultYVel;
        powerUp.alpha = 0.4;
    }
};

playerUtils.fireThorPowerUp = function(theGame) {
    spawnThorBullets(theGame);
};

playerUtils.fireNewteamPowerUp = function(theGame) {
    spawnNewteamBullets(theGame);
};

playerUtils.fireGhostbusterPowerUp = function(theGame) {
    var powerUp = theGame.powerUpsPool.getFirstExists(false),
        x = theGame.player1.x,
        y = theGame.player1.y;

    if (powerUp) {
        powerUp.reset(x, y - 100, 'powerUps');
        powerUp.body.sprite.frame = 2;
        powerUp.body.velocity.y = -100;
        powerUp.alpha = 0.4;
    }
};

playerUtils.firePowerUp = function(theGame) {
    if (theGame.player1.item && (theGame.game.time.now > playerUtils.shootTime)) {
        audioUtils.playPowerUpAttackAudio(theGame);
        theGame.player1.playerPowerUp.alpha = 0;

        if (theGame.player1.item === 'thor') {
            playerUtils.fireThorPowerUp(theGame);
        } else if (theGame.player1.item === 'newteam') {
            playerUtils.fireNewteamPowerUp(theGame);
        } else if (theGame.player1.item === 'ghostbuster') {
            playerUtils.fireGhostbusterPowerUp(theGame);
        }
        theGame.player1.item = '';

        playerUtils.shootTime = theGame.game.time.now + 200;
    }
};

playerUtils.callShenron = function(theGame) {
    if ((utils.dragonBallsInPlayer === 7) && theGame.game.time.now > playerUtils.shootTime) {
        utils.dragonBallsInPlayer = 0;
        theGame.hudDragonBallsText.setText(utils.dragonBallsInPlayer + '/7');

        theGame.player1.isSaiyan = true;
        theGame.player1.damagePlayer = 0;
        theGame.player1.textDamage.setText(theGame.player1.damagePlayer + '%');

        theGame.player1.tint = playerUtils.color.saiyan;
        playerUtils.lifes++;
        theGame.hudLifesText.setText(playerUtils.lifes);

        playerUtils.shootTime = theGame.game.time.now + 200;
        audioUtils.playShenronAudio(theGame);
        audioUtils.playSuperSaiyanAudio(theGame);

        theGame.game.time.events.add(Phaser.Timer.SECOND * playerUtils.saiyanTimeSeconds, function() {
            theGame.player1.isSaiyan = false;
            theGame.superSaiyanAudio.stop();
            theGame.player1.tint = playerUtils.color.one;
        }, this);
    }
};

playerUtils.generateBullets = function(theGame) {
    theGame.bullets = theGame.game.add.group();
    theGame.bullets.enableBody = true;
    theGame.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    theGame.bullets.createMultiple(60, 'bullet');
    theGame.bullets.setAll('anchor.x', 0.5);
    theGame.bullets.setAll('anchor.y', 1);
    theGame.bullets.setAll('checkWorldBounds', true);
    theGame.bullets.setAll('outOfBoundsKill', true);
    theGame.bullets.setAll('body.sprite.tint', playerUtils.color.one);
    theGame.bullets.setAll('damagePoints', 1);
};

playerUtils.generatePowerUpsPool = function(theGame) {
    theGame.powerUpsPool = theGame.game.add.group();
    theGame.powerUpsPool.enableBody = true;
    theGame.powerUpsPool.physicsBodyType = Phaser.Physics.ARCADE;
    theGame.powerUpsPool.createMultiple(10, 'powerUps');
    theGame.powerUpsPool.setAll('anchor.x', 0.5);
    theGame.powerUpsPool.setAll('anchor.y', 0.5);
    theGame.powerUpsPool.setAll('checkWorldBounds', true);
    theGame.powerUpsPool.setAll('outOfBoundsKill', true);
};

playerUtils.revivePlayer = function (player, theGame) {
    playerUtils.lifes--;
    theGame.hudLifesText.setText(playerUtils.lifes);
    player.revive(1);
    player.tint = 0xffffff;
    player.invulnerable = true;
    player.damagePlayer = 0;
    player.textDamage.setText(player.damagePlayer + '%');

    theGame.game.time.events.add(playerUtils.invulnerabilityTime, function() {
        player.invulnerable = false;
        player.tint = playerUtils.color.one;
    }, theGame);
}
