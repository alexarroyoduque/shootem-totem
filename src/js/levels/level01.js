(function() {
    'use strict';

    function Level01() {
        utils.createVars(this);
    }

    Level01.prototype = {
        create: function() {
            this.game.sound.stopAll();
            this.levelId = '01';
            utils.resetVars();
            this.music = this.game.add.audio('level01Audio');
            this.music.play('', 0, 0.5, true);
            audioUtils.createLevelAudios(this);

            this.bg1 = this.game.add.tileSprite(0, 0, 800, 600, 'background01');
            this.bg2 = this.game.add.tileSprite(0, 0, 800, 600, 'background02');

            enemyUtils.resetTimes(this);
            utils.resetTimes(this);

            playerUtils.addPlayers(this);

            interfaceUtils.createHud(this);
            interfaceUtils.createScorePanel(this);

            enemyUtils.generateEnemies(this);
            enemyUtils.generateEnemyBullets(this);
            enemyUtils.generateBossGroup(this);

            utils.generateItems(this);
            utils.generateDragonBalls(this);
            utils.generateTriforces(this);
            interfaceUtils.createInitialInstructions(this);

            utils.generateEmitters(this);

            this.game.input.onDown.add(utils.gofull, this);

            // utils.debugSpriteArcade('square', this);
        },
        update: function() {
            playerUtils.managePlayers(this);
            this.game.physics.arcade.overlap(this.bullets, this.enemies, collisions.withPlayerBullets, null, this);
            this.game.physics.arcade.overlap(this.bullets, this.bossGroup, collisions.withPlayerBullets, null, this);
            this.game.physics.arcade.overlap(this.enemyBullets, playersGroup, collisions.withEnemyBullets, null, this);
            this.game.physics.arcade.overlap(this.enemies, playersGroup, collisions.withEnemies, null, this);
            this.game.physics.arcade.overlap(this.items, playersGroup, collisions.withItems, null, this);
            this.game.physics.arcade.overlap(this.triforcesGroup, playersGroup, collisions.withTriforces, null, this);
            this.game.physics.arcade.overlap(this.dragonBalls, playersGroup, collisions.withDragonBalls, null, this);

            this.enemies.forEachAlive(enemyUtils.enemyShoots, this);
            this.bossGroup.forEachAlive(enemyUtils.bossAttack, this);
            this.bossGroup.forEachAlive(function (enemy) {
                enemy.rotation += 0.03;
            }, this);

            utils.spawnDragonBall(this);
            utils.checkGhostbusterInGame(this);

            if (!this.accelerateBackground) {
                this.bg1.tilePosition.y += 1.5;
                this.bg2.tilePosition.y += 2;
            } else {
                this.bg1.tilePosition.y += 6.5;
                this.bg2.tilePosition.y += 8;
            }

            if (!this.stopDefaultBehavior) {
                enemyUtils.spawnSquaresPack(this);
                enemyUtils.spawnPentagonsPack(this);
                enemyUtils.spawnRectanglesPack(this);
                enemyUtils.spawnPyramidPack(this);
            }

        },
        render: function() {
            // this.game.debug.bodyInfo(this.player1, 32, 32);
            // this.game.debug.body(this.player1);

            // this.game.debug.body(this.mySprite); // use utils.debugSprite(spriteKey, this) in create phase
        }
    };

    window['shootem-totem'] = window['shootem-totem'] || {};
    window['shootem-totem'].Level01 = Level01;
}());
