var enemyUtils = {
    spawnSquaresTime: {
        currentOriginal: 15000,
        current: 15000,
        nextWave: 16000
    },
    spawnPentagonsTime: {
        currentOriginal: 24000,
        current: 24000,
        nextWave: 16000
    },
    spawnRectanglesTime: {
        currentOriginal: 30000,
        current: 30000,
        nextWave: 8000
    },
    spawnPyramidTime: {
        currentOriginal: 45000,
        current: 45000,
        nextWave: 20000
    }
};

enemyUtils.resetTimes = function (theGame) {
    enemyUtils.spawnSquaresTime.current = theGame.game.time.now  + enemyUtils.spawnSquaresTime.current;
    enemyUtils.spawnPentagonsTime.current = theGame.game.time.now  + enemyUtils.spawnPentagonsTime.current;
    enemyUtils.spawnRectanglesTime.current = theGame.game.time.now  + enemyUtils.spawnRectanglesTime.current;
    enemyUtils.spawnPyramidTime.current = theGame.game.time.now  + enemyUtils.spawnPyramidTime.current;
}

enemyUtils.generateEnemies = function(theGame) {
    theGame.enemies = theGame.game.add.group();
    theGame.enemies.enableBody = true;
    theGame.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    theGame.enemies.createMultiple(30);
    theGame.enemies.setAll('anchor.x', 0.5);
    theGame.enemies.setAll('anchor.y', 0.5);
    theGame.enemies.setAll('checkWorldBounds', true);
    theGame.enemies.setAll('outOfBoundsKill', true);
};

enemyUtils.generateBossGroup = function(theGame) {
    theGame.bossGroup = theGame.game.add.group();
    theGame.bossGroup.enableBody = true;
    theGame.bossGroup.physicsBodyType = Phaser.Physics.ARCADE;
    theGame.bossGroup.createMultiple(4);
    theGame.bossGroup.setAll('anchor.x', 0.5);
    theGame.bossGroup.setAll('anchor.y', 0.5);
    theGame.bossGroup.setAll('checkWorldBounds', true);
    theGame.bossGroup.setAll('outOfBoundsKill', true);
};

enemyUtils.addItemToEnemy = function(enemy) {
    var random100 = Math.random() * (100 - 0) + 0;

    if (random100 <= 25) {
        random3 = utils.getRandomInt(1, 3);
        if (random3 === 1) {
            enemy.itemName = 'thor';
        } else if (random3 === 2) {
            enemy.itemName = 'newteam';
        } else if (random3 === 3) {
            enemy.itemName = 'ghostbuster';
        }
    }
}

enemyUtils.setupEnemy = function(enemy) {
    enemy.shootTime = 3000;
    enemy.shootTimeInterval = 5000;
    enemy.damagePoints = 3;
    enemy.bulletVelocityY = 100;
    enemy.points = 100;
    enemy.health = 2;

    enemy.anchor.x = 0.5;
    enemy.anchor.y = 0.5;

    enemy.body.velocity.y = 60;

    if (enemy.key === 'square') {
        enemy.body.setSize(50, 40);
    } else if (enemy.key === 'diamond') {
        // enemy.angle = 45;
        enemy.body.setSize(50, 40);
        enemy.shootTimeInterval = 4800;
        enemy.damagePoints = 4;
        enemy.bulletVelocityY = 200;
        enemy.health = 4;
    } else if (enemy.key === 'pentagon') {
        enemy.body.setSize(40, 40);
        enemy.health = 4;
        enemy.shootTimeInterval = 4800;
        enemy.damagePoints = 5;
        enemy.bulletVelocityY = 400;
        enemy.body.velocity.y = 170;
        enemy.body.velocity.x = -30;
    } else if (enemy.key === 'rectangle') {
        enemy.body.setSize(50, 25, 0, 6);
        enemy.damagePoints = 5;
        enemy.bulletVelocityY = 140;
        enemy.body.velocity.y = 90;
        enemy.body.velocity.x = 50;
    } else if (enemy.key === 'pyramid') {
        enemy.body.setSize(100, 50, 0, 25);
        enemy.health = 8;
        enemy.shootTimeInterval = 6000;
        enemy.damagePoints = 8;
        enemy.bulletVelocityY = 220;
        enemy.shootTimeInterval = 5000;
        enemy.body.velocity.y = 50;
    }

    enemyUtils.addItemToEnemy(enemy);

};

enemyUtils.generateEnemyBullets = function(theGame) {
    theGame.enemyBullets = theGame.game.add.group();
    theGame.enemyBullets.enableBody = true;
    theGame.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    theGame.enemyBullets.createMultiple(300, 'enemyBullets01');
    theGame.enemyBullets.setAll('anchor.x', 0.5);
    theGame.enemyBullets.setAll('anchor.y', 0.5);
    theGame.enemyBullets.setAll('checkWorldBounds', true);
    theGame.enemyBullets.setAll('outOfBoundsKill', true);

};

enemyUtils.enemyShoots = function(enemy) {

    var enemyBullet = this.enemyBullets.getFirstExists(false);

    if (this.game.time.now > enemy.shootTime) {
        if (enemyBullet) {
            enemy.shootTime = this.game.time.now + enemy.shootTimeInterval;
            enemyBullet.damagePoints = enemy.damagePoints;
            enemyBullet.reset(enemy.x, enemy.y);

            if (enemy.key === 'square') {
                enemyBullet.body.sprite.frame = 0;
                enemyBullet.body.velocity.y = enemy.bulletVelocityY;
            } else if (enemy.key === 'diamond') {
                enemyBullet.body.sprite.frame = 1;
                this.game.physics.arcade.moveToObject(enemyBullet, playersGroup.getRandom(), enemy.bulletVelocityY);
            } else if (enemy.key === 'pentagon') {
                enemyBullet.body.sprite.frame = 2;
                enemyBullet.body.velocity.y = enemy.bulletVelocityY;
            } else if (enemy.key === 'rectangle') {
                enemyBullet.body.sprite.frame = 3;
                this.game.physics.arcade.moveToObject(enemyBullet, playersGroup.getRandom(), enemy.bulletVelocityY);
            } else if (enemy.key === 'pyramid') {
                enemyBullet.body.sprite.frame = 4;
                this.game.physics.arcade.moveToObject(enemyBullet, playersGroup.getRandom(), enemy.bulletVelocityY);
            }
        }
    }
};

enemyUtils.bossAttack = function(enemy) {

    var enemyBullet = this.enemyBullets.getFirstExists(false);

    if (this.game.time.now > enemy.shootTime) {
        if (enemyBullet) {
            enemy.shootTime = this.game.time.now + enemy.shootTimeInterval;
            enemyBullet.damagePoints = enemy.damagePoints;
            enemyBullet.reset(enemy.x, enemy.y);

            if (enemy.key === 'stargate') {
                enemyBullet.body.sprite.frame = 4;
                this.game.physics.arcade.moveToObject(enemyBullet, playersGroup.getRandom(), enemy.bulletVelocityY);
            }

        }
    }

    if (this.game.time.now > enemy.shootTime2) {
        enemy.shootTime2 = this.game.time.now + enemy.shootTimeInterval2;

        if (enemy.key === 'stargate') {
            enemyUtils.spawnEnemiesPackStargate(this, enemy);
        }
    }
};

enemyUtils.spawnSquaresPack = function(theGame) {
    if (theGame.game.time.now > enemyUtils.spawnSquaresTime.current) {
        theGame.enemies.create(100, -10, 'square');

        theGame.enemies.create(300, -10, 'square');
        theGame.enemies.create(400, -10, 'diamond');
        theGame.enemies.create(500, -10, 'square');

        theGame.enemies.create(700, -10, 'square');

        theGame.enemies.create(100, -110, 'square');
        theGame.enemies.create(200, -110, 'diamond');
        theGame.enemies.create(300, -110, 'diamond');
        theGame.enemies.create(400, -110, 'square');
        theGame.enemies.create(500, -110, 'diamond');
        theGame.enemies.create(600, -110, 'diamond');
        theGame.enemies.create(700, -110, 'square');

        theGame.enemies.forEachAlive(enemyUtils.setupEnemy, theGame);
        enemyUtils.spawnSquaresTime.current = theGame.game.time.now + enemyUtils.spawnSquaresTime.nextWave;
    }
};

enemyUtils.spawnEnemiesPackStargate = function(theGame, obj) {
    var random = utils.getRandomInt(0, 2);

    if (random === 1) {
        theGame.enemies.create(obj.x, obj.y, 'rectangle');
    } else if (random === 2) {
        theGame.enemies.create(obj.x, obj.y, 'pentagon');
    } else {
        theGame.enemies.create(obj.x, obj.y, 'square');
    }

    theGame.enemies.forEachAlive(enemyUtils.setupEnemy, theGame);
};

enemyUtils.spawnPentagonsPack = function(theGame) {
    if (theGame.game.time.now > enemyUtils.spawnPentagonsTime.current) {
        theGame.enemies.create(500, -10, 'pentagon');
        theGame.enemies.create(580, -50, 'pentagon');
        theGame.enemies.create(660, -90, 'pentagon');

        theGame.enemies.forEachAlive(enemyUtils.setupEnemy, theGame);
        enemyUtils.spawnPentagonsTime.current = theGame.game.time.now + enemyUtils.spawnPentagonsTime.nextWave;
    }
};

enemyUtils.spawnRectanglesPack = function(theGame) {
    if (theGame.game.time.now > enemyUtils.spawnRectanglesTime.current) {
        theGame.enemies.create(50, -10, 'rectangle');
        theGame.enemies.create(150, -10, 'rectangle');
        theGame.enemies.create(250, -10, 'rectangle');
        theGame.enemies.create(350, -10, 'rectangle');

        theGame.enemies.forEachAlive(enemyUtils.setupEnemy, theGame);
        enemyUtils.spawnRectanglesTime.current = theGame.game.time.now + enemyUtils.spawnRectanglesTime.nextWave;
    }
};

enemyUtils.spawnPyramidPack = function(theGame) {
    if (theGame.game.time.now > enemyUtils.spawnPyramidTime.current) {
        theGame.enemies.create(200, -20, 'pyramid');
        theGame.enemies.create(600, -20, 'pyramid');

        theGame.enemies.forEachAlive(enemyUtils.setupEnemy, theGame);
        enemyUtils.spawnPyramidTime.current = theGame.game.time.now + enemyUtils.spawnPyramidTime.nextWave;
    }
};

enemyUtils.spawnBoss = function (theGame) {
    if (theGame.levelId === '01') {
        theGame.bossGroup.create(300, 50, 'stargate');

        theGame.bossGroup.forEachAlive(function (enemy) {
            enemy.body.setSize(100, 100);

            enemy.animations.add('standby', [0,1,2,3,2,1], 8, true);
            enemy.animations.play('standby');
            enemy.shootTime = 400;
            enemy.shootTimeInterval = 1000;

            enemy.shootTime2 = 4000;
            enemy.shootTimeInterval2 = 4000;

            enemy.damagePoints = 4;
            enemy.bulletVelocityY = 100;
            enemy.points = 120;
            enemy.health = 200;
            enemy.alpha = 0;

            enemy.anchor.x = 0.5;
            enemy.anchor.y = 0.5;

            enemy.body.velocity.y = 0;
            enemy.body.velocity.x = 0;
            enemy.body.kinematic = true;

        theGame.game.add.tween(enemy)
            .to({
                alpha: 1
            }, 3000, Phaser.Easing.Quadratic.InOut)
            .start();

        theGame.game.add.tween(enemy.body)
            .to({
                y: enemy.body.y + 100
            }, 400, Phaser.Easing.Quadratic.InOut)
            .to({
                y: enemy.body.y - 0
            }, 300, Phaser.Easing.Quadratic.InOut)
            .to({
                x: enemy.body.x - 100,
                y: enemy.body.y + 50
            }, 500, Phaser.Easing.Quadratic.InOut)
            .to({
                x: enemy.body.x + 90,
                y: enemy.body.y + 80
            }, 600, Phaser.Easing.Quadratic.InOut)
            .to({
                x: enemy.body.x - 200,
                y: enemy.body.y - 10
            }, 400, Phaser.Easing.Quadratic.InOut)
            .to({
                x: enemy.body.x + 250,
                y: enemy.body.y + 90
            }, 600, Phaser.Easing.Quadratic.InOut)
            .to({
                x: enemy.body.x,
                y: enemy.body.y
            }, 800, Phaser.Easing.Quadratic.InOut)
            .loop()
            .start();

        }, theGame);
    }
};

