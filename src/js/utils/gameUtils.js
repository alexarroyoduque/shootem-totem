var gameUtils = {
    version: '0.0.3',
    defaultMode: 'onePlayer',
    mode: 'onePlayer' //onePlayer, twoPlayers
};

gameUtils.resetGameMode = function () {
    gameUtils.mode = gameUtils.defaultMode;
};