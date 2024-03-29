var playerUtils = {
    velocity: 200,
    bulletVelocity: 450,
    lifesOriginal: 2,
    lifes: 2,
    invulnerabilityTime: 3000,
    timeToVulnerable: 2000,
    saiyanTimeSeconds: 30,
    color: {
        one: 0x00c853,
        two: 0x00E5FF,
        saiyan: 0xfff110
    },
    item: ''
};

playerUtils.addPlayers = function(theGame) {
    playerUtils.generatePlayers(theGame);

    if (gameUtils.mode === 'twoPlayers') {
        playerUtils.createPlayer(theGame, 0);
        playerUtils.createPlayer(theGame, 1);
    } else {
        playerUtils.createPlayer(theGame, 0);
    }

    playerUtils.generateBullets(theGame);
    playerUtils.generatePowerUpsPool(theGame);
};

playerUtils.managePlayers = function(theGame) {
    playersGroup.forEachAlive(function(player) {
        playerUtils.actions(theGame, player);
        player.textDamage.x = player.x;
        player.playerPowerUp.x = player.x;
        if (player.isSaiyan) {
            utils.spawnSaiyanParticles(theGame, player);
        }
    }, theGame);
};

playerUtils.actions = function(theGame, player) {
    if (player.alive) {
        player.body.velocity.setTo(0, 0);

        if (player.numPlayer === 1) {
            if (player.cursors.left.isDown || theGame.pad2.isDown(player.cursorsPad.left) || player.cursorsSocket.left) {
                player.body.velocity.x = -playerUtils.velocity;
            } else if (player.cursors.right.isDown || theGame.pad2.isDown(player.cursorsPad.right) || player.cursorsSocket.right) {
                player.body.velocity.x = playerUtils.velocity;
            }

            if (player.actionControls.shoot.isDown || theGame.pad2.isDown(player.actionControlsPad.shoot) || player.actionControlsSocket.shoot) {
                playerUtils.fireBullet(theGame, player);
            }

            if (player.actionControls.powerUp.isDown || theGame.pad2.isDown(player.actionControlsPad.powerUp) || player.actionControlsSocket.powerUp) {
                playerUtils.firePowerUp(theGame, player);
            }

            if (player.actionControls.callShenron.isDown || theGame.pad2.isDown(player.actionControlsPad.callShenron) || player.actionControlsSocket.callShenron) {
                playerUtils.callShenron(theGame, player);
            }

        } else {
            if (player.cursors.left.isDown || theGame.pad1.isDown(player.cursorsPad.left) || player.cursorsSocket.left) {
                player.body.velocity.x = -playerUtils.velocity;
            } else if (player.cursors.right.isDown || theGame.pad1.isDown(player.cursorsPad.right) || player.cursorsSocket.right) {
                player.body.velocity.x = playerUtils.velocity;
            }

            if (player.actionControls.shoot.isDown || theGame.pad1.isDown(player.actionControlsPad.shoot) || player.actionControlsSocket.shoot) {
                playerUtils.fireBullet(theGame, player);
            }

            if (player.actionControls.powerUp.isDown || theGame.pad1.isDown(player.actionControlsPad.powerUp) || player.actionControlsSocket.powerUp) {
                playerUtils.firePowerUp(theGame, player);
            }

            if (player.actionControls.callShenron.isDown || theGame.pad1.isDown(player.actionControlsPad.callShenron) || player.actionControlsSocket.callShenron) {
                playerUtils.callShenron(theGame, player);
            }

        }

    }
};

playerUtils.addPlayerOneKeyboardControls = function(player, theGame) {
    player.cursors = {
        'left': theGame.game.input.keyboard.addKey(65), //a
        'right': theGame.game.input.keyboard.addKey(68), //d
    };
    player.actionControls = {
        'shoot': theGame.game.input.keyboard.addKey(32), // space
        'powerUp': theGame.game.input.keyboard.addKey(75), // k
        'callShenron': theGame.game.input.keyboard.addKey(74), // j
    };
}

playerUtils.addPlayerSocketControls = function(player, theGame) {
    player.cursorsSocket = {
        'left': false,
        'right': false
    };

    player.actionControlsSocket = {
        'shoot': false,
        'powerUp': false,
        'callShenron': false
    };
}

playerUtils.addPlayerTwoKeyboardControls = function(player, theGame) {
    player.cursors = {
        'left': theGame.game.input.keyboard.addKey(37), // left arrow
        'right': theGame.game.input.keyboard.addKey(39), // right arrow
    };
    player.actionControls = {
        'shoot': theGame.game.input.keyboard.addKey(16), // shift
        'powerUp': theGame.game.input.keyboard.addKey(38), // up arrow
        'callShenron': theGame.game.input.keyboard.addKey(40), // down arrow
    };
}

playerUtils.addPlayerOnePadControls = function(player, theGame) {
    theGame.game.input.gamepad.start();
    theGame.pad1 = theGame.game.input.gamepad.pad1;

    player.cursorsPad = {
        'left': Phaser.Gamepad.XBOX360_DPAD_LEFT,
        'right': Phaser.Gamepad.XBOX360_DPAD_RIGHT,
    };
    player.actionControlsPad = {
        'shoot': Phaser.Gamepad.XBOX360_RIGHT_TRIGGER,
        'powerUp': Phaser.Gamepad.XBOX360_LEFT_TRIGGER,
        'callShenron': Phaser.Gamepad.XBOX360_Y
    };
}

playerUtils.addPlayerTwoPadControls = function(player, theGame) {
    theGame.game.input.gamepad.start();
    theGame.pad2 = theGame.game.input.gamepad.pad2;

    player.cursorsPad = {
        'left': Phaser.Gamepad.XBOX360_DPAD_LEFT,
        'right': Phaser.Gamepad.XBOX360_DPAD_RIGHT,
    };
    player.actionControlsPad = {
        'shoot': Phaser.Gamepad.XBOX360_RIGHT_TRIGGER,
        'powerUp': Phaser.Gamepad.XBOX360_LEFT_TRIGGER,
        'callShenron': Phaser.Gamepad.XBOX360_Y
    };
}

playerUtils.mapControls = function(theGame, player, numPlayer) {
    if (gameUtils.mode === 'twoPlayers') {
        if (numPlayer === 1) {
            playerUtils.addPlayerTwoKeyboardControls(player, theGame);
        } else {
            playerUtils.addPlayerOneKeyboardControls(player, theGame);
        }
    } else if (gameUtils.mode === 'onePlayer') {
        if (!numPlayer || numPlayer === 0) {
            playerUtils.addPlayerOneKeyboardControls(player, theGame);
        }
    }
};

// xbox controls
playerUtils.mapControlsPad = function(theGame, player, numPlayer) {
    if (gameUtils.mode === 'twoPlayers') {
        if (numPlayer === 1) {
            playerUtils.addPlayerTwoPadControls(player, theGame);
        } else {
            playerUtils.addPlayerOnePadControls(player, theGame);
        }
    } else if (gameUtils.mode === 'onePlayer') {
        if (!numPlayer || numPlayer === 0) {
            playerUtils.addPlayerOnePadControls(player, theGame);
        }
    }
};

// socket controls
playerUtils.mapControlsSocket = function(theGame, player, numPlayer) {
    if (gameUtils.mode === 'twoPlayers') {
        if (numPlayer === 1) {
            playerUtils.addPlayerSocketControls(player);
        } else {
            playerUtils.addPlayerSocketControls(player);
        }
    } else if (gameUtils.mode === 'onePlayer') {
        if (!numPlayer || numPlayer === 0) {
            playerUtils.addPlayerSocketControls(player);
        }
    }
};

playerUtils.generatePlayers = function(theGame) {
    playersGroup = theGame.game.add.group();
    playersGroup.enableBody = true;
    playersGroup.physicsBodyType = Phaser.Physics.ARCADE;
    if (gameUtils.mode === 'twoPlayers') {
        playersGroup.createMultiple(2, 'player');
    } else {
        playersGroup.createMultiple(1, 'player');
    }
    playersGroup.setAll('anchor.x', 0.5);
    playersGroup.setAll('anchor.y', 0.5);
    playersGroup.setAll('body.fixedRotation', true);
    playersGroup.setAll('body.collideWorldBounds', true);
};

playerUtils.setupPlayer = function(player, theGame) {
    var style = {
        font: "18px Inconsolata",
        fill: "#000",
        align: "center"
    };
    theGame.game.physics.enable(player, Phaser.Physics.ARCADE);
    player.timeToVulnerable = playerUtils.timeToVulnerable;
    player.body.setSize(50, 35, 0, 10);
    player.shootTime = 150;
    player.shootTimeInterval = 150;
    player.score = 0;
    player.damagePlayer = 0;
    player.textDamage = theGame.game.add.text(player.x, player.y + 15, player.damagePlayer + '%', style);
    player.textDamage.anchor.setTo(0.5, 0.5);
    player.playerPowerUp = theGame.game.add.sprite(player.x, player.y, 'playerPowerUp');
    player.playerPowerUp.alpha = 0;
    player.playerPowerUp.anchor.setTo(0.5, 0.5);
    player.item = playerUtils.item;
    player.isSaiyan = false;
    if (player.numPlayer === 0) {
        player.originalTint = playerUtils.color.one;
        player.body.sprite.tint = playerUtils.color.one;
    } else if (player.numPlayer === 1) {
        player.originalTint = playerUtils.color.two;
        player.body.sprite.tint = playerUtils.color.two;
    }
};


playerUtils.createPlayer = function(theGame, numPlayer) {
    var newPlayer = playersGroup.getFirstExists(false);
    if (numPlayer === 1) {
        newPlayer.reset(500, 550, 'player');
    } else {
        newPlayer.reset(400, 550, 'player');
    }
    newPlayer.numPlayer = numPlayer;
    playerUtils.setupPlayer(newPlayer, theGame);

    playerUtils.mapControls(theGame, newPlayer, numPlayer);
    playerUtils.mapControlsPad(theGame, newPlayer, numPlayer);
    playerUtils.mapControlsSocket(theGame, newPlayer, numPlayer);
};

playerUtils.fireBullet = function(theGame, player) {
    if (theGame.game.time.now > player.shootTime) {
        var bullet = theGame.bullets.getFirstExists(false);

        if (bullet) {
            audioUtils.playShootPlayerAudio(theGame);

            bullet.reset(player.x, player.y - 16);
            bullet.body.velocity.y = utils.getRandomInt(-playerUtils.bulletVelocity, -playerUtils.bulletVelocity + 50);
            bullet.body.velocity.x = utils.getRandomInt(-30, 30);
            bullet.damagePoints = 1;
            bullet.numPlayer = player.numPlayer;

            if (player.isSaiyan) {
                bullet.tint = playerUtils.color.saiyan;
                bullet.damagePoints = 2;
            } else {
                bullet.tint = player.originalTint;
            }

            player.shootTime = theGame.game.time.now + player.shootTimeInterval;
        }
    }
};

function spawnNewteamBullets(theGame, player) {
    var bullet,
        i = 0,
        x = player.x,
        y = player.y,
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
            bullet.numPlayer = player.numPlayer;
            bullet.tint = player.originalTint;
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


function spawnThorBullets(theGame, player) {
    var bullet,
        i = 0,
        x = player.x,
        y = player.y,
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
            bullet.numPlayer = player.numPlayer;
            bullet.tint = player.originalTint;
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

playerUtils.fireThorPowerUp = function(theGame, player) {
    spawnThorBullets(theGame, player);
};

playerUtils.fireNewteamPowerUp = function(theGame, player) {
    spawnNewteamBullets(theGame, player);
};

playerUtils.fireGhostbusterPowerUp = function(theGame, player) {
    var powerUp = theGame.powerUpsPool.getFirstExists(false),
        x = player.x,
        y = player.y;

    if (powerUp) {
        powerUp.reset(x, y - 100, 'powerUps');
        powerUp.body.sprite.frame = 2;
        powerUp.body.velocity.y = -100;
        powerUp.alpha = 0.4;
    }
};

playerUtils.firePowerUp = function(theGame, player) {
    if (player.item && (theGame.game.time.now > player.shootTime)) {
        audioUtils.playPowerUpAttackAudio(theGame);
        player.playerPowerUp.alpha = 0;

        if (player.item === 'thor') {
            playerUtils.fireThorPowerUp(theGame, player);
        } else if (player.item === 'newteam') {
            playerUtils.fireNewteamPowerUp(theGame, player);
        } else if (player.item === 'ghostbuster') {
            playerUtils.fireGhostbusterPowerUp(theGame, player);
        }
        player.item = '';

        player.shootTime = theGame.game.time.now + 200;
    }
};

playerUtils.callShenron = function(theGame, player) {
    if ((utils.dragonBallsInPlayer === 7) && theGame.game.time.now > player.shootTime) {
        utils.dragonBallsInPlayer = 0;
        theGame.hudDragonBallsText.setText(utils.dragonBallsInPlayer + '/7');

        player.isSaiyan = true;
        player.damagePlayer = 0;
        player.textDamage.setText(player.damagePlayer + '%');

        player.tint = playerUtils.color.saiyan;
        playerUtils.lifes++;
        theGame.hudLifesText.setText(playerUtils.lifes);

        player.shootTime = theGame.game.time.now + 200;
        audioUtils.playShenronAudio(theGame);
        audioUtils.playSuperSaiyanAudio(theGame);

        theGame.game.time.events.add(Phaser.Timer.SECOND * playerUtils.saiyanTimeSeconds, function() {
            player.isSaiyan = false;
            theGame.superSaiyanAudio.stop();
            player.tint = player.originalTint;
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

playerUtils.revivePlayer = function(player, theGame) {
    playerUtils.lifes--;
    theGame.hudLifesText.setText(playerUtils.lifes);
    player.revive(1);
    player.tint = 0xffffff;
    player.invulnerable = true;
    player.damagePlayer = 0;
    player.textDamage.setText(player.damagePlayer + '%');

    theGame.game.time.events.add(playerUtils.invulnerabilityTime, function() {
        player.invulnerable = false;
        player.tint = player.originalTint;
    }, theGame);
}
