var gameUtils = {
    version: '0.0.2',
    defaultMode: 'onePlayer',
    mode: 'twoPlayers' //onePlayer
};

gameUtils.resetGameMode = function () {
    gameUtils.mode = gameUtils.defaultMode;
};