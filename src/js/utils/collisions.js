var collisions = {};

var invulnerable = false;


collisions.withPlayerBullets = function(bullet, enemy) {
    bullet.kill();
    audioUtils.playHitEnemyAudio(this);

    this.player1.score += enemy.points;
    interfaceUtils.updateScorePanel(this);

    if (this.player1.score > utils.pointsToNextTriforce) {
        utils.spawnTriforce(this);
        utils.pointsToNextTriforce = utils.pointsToNextTriforce + 5000;
    }

    utils.spawnCollisionsEnemyParticles(this, bullet);
    enemy.damage(bullet.damagePoints);


    if (enemy.itemName && (enemy.health === 0 || enemy.health <= 0)) {
        utils.spawnItem(enemy.itemName, enemy, this);
    }

    if (enemy.health === 0 || enemy.health <= 0) {
        utils.spawnExplosionEnemyParticles(this, enemy);
        audioUtils.playExplosionAudio(this);

        if (enemy.key === 'stargate') {
            utils.levelCompleted(this);
        }
    }
};

collisions.withItems = function(player, item) {
    if (!player.item) {
        item.kill();
        audioUtils.playPowerUpGetAudio(this);
        player.playerPowerUp.alpha = 1;
        
        if (item.body.sprite.frame === 0) { // thor
            player.item = 'thor';
        } else if (item.body.sprite.frame === 1) { // newteam
            player.item = 'newteam';
        } else if (item.body.sprite.frame === 2) { // ghostbuster
            player.item = 'ghostbuster';
        }
    }
};

collisions.withTriforces = function(player, triforce) {
    triforce.kill();
    if (utils.triforceInPlayer < 3) {
        utils.triforceInPlayer++;
        this.hudTriforceText.setText(utils.triforceInPlayer + '/3');
        utils.checkIfPlayerHasAllTriforces(this);
        audioUtils.playTriforceGetAudio(this);
    }
};

collisions.withEnemies = function(player, enemy) {
    utils.spawnCollisionsEnemyParticles(this, enemy);
    utils.spawnCollisionsParticlesPlayer1(this, enemy);
    collisions.checkIfPlayerDie(this, player, enemy);
    enemy.kill();
    audioUtils.playHitEnemyAudio(this);
    audioUtils.playExplosionAudio(this);

};

collisions.withEnemyBullets = function(player, enemyBullet) {
    enemyBullet.kill();
    utils.spawnCollisionsParticlesPlayer1(this, enemyBullet);
    collisions.checkIfPlayerDie(this, player, enemyBullet);
    audioUtils.playHitEnemyAudio(this);
};

collisions.withDragonBalls = function(player, dragonBall) {
    dragonBall.kill();
    if (utils.dragonBallsInPlayer < 7) {
        utils.dragonBallsInPlayer++;
        this.hudDragonBallsText.setText(utils.dragonBallsInPlayer + '/7');
        audioUtils.playDragonBallGetAudio(this);
    }
};

collisions.killPlayer = function (player, theGame) {
    player.kill();
    audioUtils.playExplosionAudio(theGame);
    theGame.player1.textDamage.setText('');
    theGame.player1.textDamage.fill = '#000';
    player.item = '';
    player.playerPowerUp.alpha = 0;


    if (playerUtils.lifes > 0) {
        playerUtils.revivePlayer(player, theGame)
    } else {
        utils.gameOver(theGame);
    }
};

collisions.checkIfPlayerDie = function(theGame, player, enemyObj) {

    if (!player.invulnerable) {
        player.damagePlayer += enemyObj.damagePoints;
        player.textDamage.setText(player.damagePlayer + '%');
    }

    if (player.damagePlayer >= 75) {
        var calculateProbabilityToKill = Math.random() * (100 - 0) + 0;

        if ((player.damagePlayer >= 75 && player.damagePlayer < 80) && calculateProbabilityToKill < 10) {
            collisions.killPlayer(player, theGame);
        } else if ((player.damagePlayer >= 80 && player.damagePlayer < 90) && calculateProbabilityToKill < 20) {
            collisions.killPlayer(player, theGame);
        } else if ((player.damagePlayer >= 90 && player.damagePlayer < 100) && calculateProbabilityToKill < 40) {
            collisions.killPlayer(player, theGame);
        } else if ((player.damagePlayer >= 110 && player.damagePlayer < 120) && calculateProbabilityToKill < 50) {
            collisions.killPlayer(player, theGame);
        } else if ((player.damagePlayer >= 130 && player.damagePlayer < 140) && calculateProbabilityToKill < 60) {
            collisions.killPlayer(player, theGame);
        } else if ((player.damagePlayer >= 140 && player.damagePlayer < 150) && calculateProbabilityToKill < 70) {
            collisions.killPlayer(player, theGame);
        } else if ((player.damagePlayer >= 150 && player.damagePlayer < 160) && calculateProbabilityToKill < 80) {
            collisions.killPlayer(player, theGame);
        } else if ((player.damagePlayer >= 160 && player.damagePlayer < 170) && calculateProbabilityToKill < 90) {
            collisions.killPlayer(player, theGame);
        } else if ((player.damagePlayer >= 170 && player.damagePlayer < 180) && calculateProbabilityToKill < 92) {
            collisions.killPlayer(player, theGame);
        } else if ((player.damagePlayer >= 180 && player.damagePlayer < 190) && calculateProbabilityToKill < 94) {
            collisions.killPlayer(player, theGame);
        } else if ((player.damagePlayer >= 190) && calculateProbabilityToKill < 98) {
            collisions.killPlayer(player, theGame);
        }
    }

    if (player.damagePlayer >= 100) {
        player.textDamage.fill = '#f44336';
    } else if (player.damagePlayer >= 60) {
        player.textDamage.fill = '#EF6C00';
    } else {
        player.textDamage.fill = '#000';
    }
};
