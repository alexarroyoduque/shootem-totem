window.addEventListener('load', function() {
    'use strict';

    var ns = window['shootem-totem'];
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'shootem-totem-game');
    game.state.add('boot', ns.Boot);
    game.state.add('preloader', ns.Preloader);
    game.state.add('opening', ns.Opening);
    game.state.add('menu', ns.Menu);
    game.state.add('credits', ns.Credits);
    game.state.add('manual', ns.Manual);
    game.state.add('gameMode', ns.GameMode);
    // levels
    game.state.add('level01', ns.Level01);
    game.state.add('level02', ns.Level02);
    game.state.add('level03', ns.Level03);
    game.state.start('boot');
}, false);
