var audioUtils = {};

audioUtils.createLevelAudios = function (theGame) {
    theGame.hitEnemyAudio = theGame.game.add.audio('hitEnemyAudio');
    theGame.explosionAudio = theGame.game.add.audio('explosionAudio');

    theGame.powerUpGetAudio = theGame.game.add.audio('powerUpGetAudio');
    theGame.powerUpAttackAudio = theGame.game.add.audio('powerUpAttackAudio');
    
    theGame.triforceGetAudio = theGame.game.add.audio('triforceGetAudio');
    theGame.dragonBallGetAudio = theGame.game.add.audio('dragonBallGetAudio');

    theGame.shootPlayerAudio = theGame.game.add.audio('shootPlayerAudio');
    theGame.shenronAudio = theGame.game.add.audio('shenronAudio');
    theGame.superSaiyanAudio = theGame.game.add.audio('superSaiyanAudio');
};

audioUtils.playShootPlayerAudio  = function (theGame) {
    theGame.shootPlayerAudio.play('', 0, 0.6);
};

audioUtils.playHitEnemyAudio  = function (theGame) {
    theGame.hitEnemyAudio.play('', 0, 0.2);
};

audioUtils.playExplosionAudio  = function (theGame) {
    theGame.explosionAudio.play('', 0, 0.2);
};

audioUtils.playPowerUpGetAudio  = function (theGame) {
    theGame.powerUpGetAudio.play('', 0, 3);
};

audioUtils.playPowerUpAttackAudio  = function (theGame) {
    theGame.powerUpAttackAudio.play('', 0, 0.6);
};

audioUtils.playTriforceGetAudio  = function (theGame) {
    theGame.triforceGetAudio.play('', 0, 3);
};

audioUtils.playDragonBallGetAudio  = function (theGame) {
    theGame.dragonBallGetAudio.play('', 0, 2.5);
};

audioUtils.playShenronAudio  = function (theGame) {
    theGame.shenronAudio.play('', 0, 1);
};

audioUtils.playSuperSaiyanAudio  = function (theGame) {
    theGame.superSaiyanAudio.play('', 0, 1.2);
};
