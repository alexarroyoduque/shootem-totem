var utils = {
    version: '0.0.1',
    pointsToNextTriforceOriginal: 5000,
    pointsToNextTriforce: 5000,
    triforceInPlayer: 0,
    timeToNextDragonBall: 10000,
    timeToNextDragonBallOriginal: 10000,
    dragonBallsInPlayer: 0
};

utils.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

utils.resetVars = function (theGame) {
    utils.pointsToNextTriforce = utils.pointsToNextTriforceOriginal,
    utils.timeToNextDragonBall = utils.timeToNextDragonBallOriginal,
    utils.triforceInPlayer = 0;
    utils.dragonBallsInPlayer = 0;
    playerUtils.lifes = playerUtils.lifesOriginal;

    enemyUtils.spawnSquaresTime.current = enemyUtils.spawnSquaresTime.currentOriginal;
    enemyUtils.spawnPentagonsTime.current = enemyUtils.spawnPentagonsTime.currentOriginal;
    enemyUtils.spawnRectanglesTime.current = enemyUtils.spawnRectanglesTime.currentOriginal;
    enemyUtils.spawnPyramidTime.current = enemyUtils.spawnPyramidTime.currentOriginal;
};

utils.createVars = function (theGame) {
    theGame.levelId;
    theGame.music;

    theGame.bullets;
    theGame.enemyBullets;
    theGame.enemies;
    theGame.bossGroup;

    theGame.player1;
    theGame.cursors;
    theGame.shootTime = 200;
    theGame.actionControls;

    theGame.bg1;
    theGame.bg2;
    theGame.accelerateBackground = false;
    theGame.stopDefaultBehavior = false;

    theGame.hud;
    theGame.hudLifes;
    theGame.hudLifesText;
    theGame.hudTriforce;
    theGame.hudTriforceText;
    theGame.hudDragonBalls;
    theGame.hudDragonBallsText;
    theGame.updateScorePanel;

    theGame.items;
    theGame.powerUpsPool;
    theGame.triforcesGroup;
    theGame.dragonBalls;
    theGame.emitterCollisionWithEnemy
    theGame.emitterCollisionWithPlayer1;
    theGame.emitterExplosionEnemy;
    theGame.emitterSaiyan;
};

utils.resetTimes = function (theGame) {
    utils.timeToNextDragonBall = theGame.game.time.now + utils.timeToNextDragonBall;
};

utils.generateItems = function(theGame) {
    theGame.items = theGame.game.add.group();
    theGame.items.enableBody = true;
    theGame.items.physicsBodyType = Phaser.Physics.ARCADE;
    theGame.items.createMultiple(15, 'items');
    theGame.items.setAll('anchor.x', 0.5);
    theGame.items.setAll('anchor.y', 0.5);
    theGame.items.setAll('checkWorldBounds', true);
    theGame.items.setAll('outOfBoundsKill', true);
};

utils.generateDragonBalls = function(theGame) {
    theGame.dragonBalls = theGame.game.add.group();
    theGame.dragonBalls.enableBody = true;
    theGame.dragonBalls.physicsBodyType = Phaser.Physics.ARCADE;
    theGame.dragonBalls.createMultiple(3, 'dragonBalls');
    theGame.dragonBalls.setAll('anchor.x', 0.5);
    theGame.dragonBalls.setAll('anchor.y', 0.5);
    theGame.dragonBalls.setAll('checkWorldBounds', true);
    theGame.dragonBalls.setAll('outOfBoundsKill', true);
};

utils.generateTriforces = function(theGame) {
    theGame.triforcesGroup = theGame.game.add.group();
    theGame.triforcesGroup.enableBody = true;
    theGame.triforcesGroup.physicsBodyType = Phaser.Physics.ARCADE;
    theGame.triforcesGroup.createMultiple(3, 'triforce');
    theGame.triforcesGroup.setAll('anchor.x', 0.5);
    theGame.triforcesGroup.setAll('anchor.y', 0.5);
    theGame.triforcesGroup.setAll('checkWorldBounds', true);
    theGame.triforcesGroup.setAll('outOfBoundsKill', true);

};

utils.spawnItem = function(itemName, obj, theGame) {
    var item = theGame.items.getFirstExists(false);

    if (item) {
        item.reset(obj.x, obj.y, itemName);
        if (itemName === 'thor') {
            item.body.sprite.frame = 1;
        } else if (itemName === 'newteam') {
            item.body.sprite.frame = 2;
        } else if (itemName === 'ghostbuster') {
            item.body.sprite.frame = 3;
        }

        item.body.velocity.y = 150;
    }
};

utils.spawnDragonBall = function(theGame) {
    if ((utils.dragonBallsInPlayer < 7) && theGame.game.time.now > utils.timeToNextDragonBall) {
        var dragonBall = theGame.dragonBalls.getFirstExists(false);

        utils.timeToNextDragonBall = theGame.game.time.now + 15000;

        if (dragonBall) {
            dragonBall.reset(utils.getRandomInt(100, 600), -10);
            dragonBall.body.sprite.frame = utils.dragonBallsInPlayer;

            dragonBall.body.velocity.y = 80;
        }
    }
};

utils.spawnTriforce = function(theGame) {
    if (utils.triforceInPlayer < 3) {
        var triforce = theGame.triforcesGroup.getFirstExists(false);
        triforce.reset(400, 10);
        triforce.body.velocity.y = 70;
        triforce.animations.add('default', [1, 2, 3]);
        triforce.animations.play('default', 6, true);

    }
};

utils.checkGhostbusterInGame = function(theGame) {
    theGame.enemyBullets.forEachAlive(function(enemyBullet) {
        theGame.powerUpsPool.forEachAlive(function(powerUp) {
            if (powerUp.body.sprite.frame === 2) {
                theGame.game.physics.arcade.moveToObject(enemyBullet, powerUp, 100);
            }
        }, theGame);
    }, theGame);
};

utils.generateEmitters = function(theGame) {
    var gravity = 70,
        maxScale = 1.5;
    minScale = 0.8;
    theGame.emitterCollisionWithEnemy = theGame.game.add.emitter(100);
    theGame.emitterCollisionWithEnemy.makeParticles('particles', 0);
    theGame.emitterCollisionWithEnemy.gravity = gravity;
    theGame.emitterCollisionWithEnemy.maxParticleScale = maxScale;
    theGame.emitterCollisionWithEnemy.minParticleScale = minScale;
    theGame.emitterCollisionWithEnemy.setAlpha(0.5, 0.8);

    theGame.emitterExplosionEnemy = theGame.game.add.emitter(100);
    theGame.emitterExplosionEnemy.makeParticles('particles', 1);
    theGame.emitterExplosionEnemy.gravity = -30;
    theGame.emitterExplosionEnemy.maxParticleScale = 2;
    theGame.emitterExplosionEnemy.minParticleScale = 1;
    theGame.emitterExplosionEnemy.setAlpha(0.5, 0.8);

    theGame.emitterSaiyan = theGame.game.add.emitter(100);
    theGame.emitterSaiyan.makeParticles('particles', 2);
    theGame.emitterSaiyan.gravity = -160;
    theGame.emitterSaiyan.maxParticleScale = 2;
    theGame.emitterSaiyan.minParticleScale = 1;
    theGame.emitterSaiyan.setAlpha(0.5, 0.8);

    theGame.emitterCollisionWithPlayer1 = theGame.game.add.emitter(50);
    theGame.emitterCollisionWithPlayer1.makeParticles('particles', 3);
    theGame.emitterCollisionWithPlayer1.gravity = gravity;
    theGame.emitterCollisionWithPlayer1.maxParticleScale = maxScale;
    theGame.emitterCollisionWithPlayer1.minParticleScale = minScale;
    theGame.emitterCollisionWithPlayer1.setAlpha(0.5, 0.8);
};

utils.spawnCollisionsEnemyParticles = function(theGame, obj) {
    theGame.emitterCollisionWithEnemy.x = obj.x;
    theGame.emitterCollisionWithEnemy.y = obj.y;

    theGame.emitterCollisionWithEnemy.start(true, 600, null, 3);
};

utils.spawnExplosionEnemyParticles = function(theGame, obj) {
    theGame.emitterExplosionEnemy.x = obj.x;
    theGame.emitterExplosionEnemy.y = obj.y;

    theGame.emitterExplosionEnemy.start(true, 1500, null, 15);
};

utils.spawnSaiyanParticles = function(theGame, obj) {
    theGame.emitterSaiyan.x = obj.x;
    theGame.emitterSaiyan.y = obj.y;

    theGame.emitterSaiyan.start(true, 600, null, 1);
};

utils.spawnCollisionsParticlesPlayer1 = function(theGame, obj) {
    theGame.emitterCollisionWithPlayer1.x = obj.x;
    theGame.emitterCollisionWithPlayer1.y = obj.y;

    theGame.emitterCollisionWithPlayer1.start(true, 600, null, 3);
};

utils.checkIfPlayerHasAllTriforces = function(theGame) {
    if (utils.triforceInPlayer === 3) {
        var style = {
                font: '50px Inconsolata',
                align: 'center',
                fill: '#fff'
            },
            bossText,
            bossInfo;

        bossText = theGame.game.add.text(400, 100, 'Boss is here!', style);
        bossText.anchor.setTo(0.5, 0.5);
        bossText.alpha = 0;

        var bossInfo = theGame.game.add.tween(bossText);
        bossInfo.to({
            alpha: 1
        }, 1000, Phaser.Easing.Linear.None);
        bossInfo.to({
            alpha: 0
        }, 1000, Phaser.Easing.Linear.None);
        bossInfo.start();

        theGame.stopDefaultBehavior = true;
        theGame.accelerateBackground = true;

        theGame.game.time.events.add(Phaser.Timer.SECOND * 5, function() {
            theGame.accelerateBackground = false;
        }, this);

        theGame.enemies.forEachAlive(function(enemy) {
            utils.spawnExplosionEnemyParticles(theGame, enemy);
            enemy.kill();
        }, theGame);

        theGame.enemyBullets.forEachAlive(function(enemyBullet) {
            utils.spawnExplosionEnemyParticles(theGame, enemyBullet);
            enemyBullet.kill();
        }, theGame);

        enemyUtils.spawnBoss(theGame);
    }
};

utils.gameOver = function (theGame) {
    var centerX = theGame.game.world.centerX,
        style = {
            font: '50px Inconsolata',
            align: 'center',
            fill: '#fff'
        },
        text1,
        text2,
        text3;

    text1 = theGame.game.add.text(centerX, 200, 'Game over', style);
    text1.anchor.setTo(0.5, 0.5);
    text1.alpha = 0;

    theGame.game.add.tween(text1)
        .to({
                alpha: 1
            }, 1000, Phaser.Easing.Linear.None, false, 400, 0, false)
        .to({
                alpha: 0
            }, 1000, Phaser.Easing.Linear.None, false, 4000, 0, false)
        .start();

    theGame.game.time.events.add(Phaser.Timer.SECOND * 7, function() {
        utils.goToMenu(theGame);
    }, theGame);
}

utils.levelCompleted = function (theGame) {
    var centerX = theGame.game.world.centerX,
        style = {
            font: '50px Inconsolata',
            align: 'center',
            fill: '#fff'
        },
        text1,
        text2,
        text3;

    utils.triforceInPlayer = 0;
    utils.dragonBallsInPlayer = 0;

    text1 = theGame.game.add.text(centerX, 100, 'Congratulations!', style);
    text1.anchor.setTo(0.5, 0.5);
    text1.alpha = 0;

    text2 = theGame.game.add.text(centerX, 200, 'Level completed', style);
    text2.anchor.setTo(0.5, 0.5);
    text2.alpha = 0;

    text3 = theGame.game.add.text(centerX, 300, 'More levels coming soon!', style);
    text3.anchor.setTo(0.5, 0.5);
    text3.alpha = 0;

    text4 = theGame.game.add.text(centerX, 400, 'Thanks for playing', style);
    text4.anchor.setTo(0.5, 0.5);
    text4.alpha = 0;

    theGame.game.add.tween(text1)
        .to({
                alpha: 1
            }, 1000, Phaser.Easing.Linear.None, false, 400, 0, false)
        .to({
                alpha: 0
            }, 1000, Phaser.Easing.Linear.None, false, 4000, 0, false)
        .start();

    theGame.game.add.tween(text2)
        .to({
            alpha: 1
        }, 1000, Phaser.Easing.Linear.None, false, 1000, 0, false)
        .to({
            alpha: 0
        }, 1000, Phaser.Easing.Linear.None, false, 4000, 0, false)
        .start();

    theGame.game.add.tween(text3)
        .to({
            alpha: 1
        }, 1000, Phaser.Easing.Linear.None, false, 1300, 0, false)
        .to({
            alpha: 0
        }, 1000, Phaser.Easing.Linear.None, false, 4000, 0, false)
        .start();

    theGame.game.add.tween(text4)
        .to({
            alpha: 1
        }, 1000, Phaser.Easing.Linear.None, false, 1600, 0, false)
        .to({
            alpha: 0
        }, 1000, Phaser.Easing.Linear.None, false, 4000, 0, false)
        .start();

    theGame.game.time.events.add(Phaser.Timer.SECOND * 10, function() {
        utils.goToMenu(theGame);
    }, theGame);

};

utils.goToMenu = function (theGame) {
    theGame.game.sound.stopAll();
    theGame.music = theGame.game.add.audio('menuAudio');
    theGame.music.play('', 0, 0.5, true);
    theGame.game.state.start('menu');
};

utils.gofull = function (theGame) {
    theGame.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
    if (theGame.game.scale.isFullScreen) {
        theGame.game.scale.stopFullScreen();
    } else {
        theGame.game.scale.startFullScreen(false);
    }
}

// to debug sprite
utils.debugSpriteArcade = function (spriteKey, theGame) {
    theGame.mySprite = theGame.game.add.sprite(300, 300, spriteKey);
    theGame.game.physics.enable(theGame.mySprite, Phaser.Physics.ARCADE);
    theGame.mySprite.anchor.setTo(0.5, 0.5);
    theGame.mySprite.body.setSize(100, 100); // change size to debug
};


