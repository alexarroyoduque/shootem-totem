window.addEventListener('load', function() {
    'use strict';

    var ns = window['shootem-totem'];
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'shootem-totem-game');
    game.state.add('boot', ns.Boot);
    game.state.add('preloader', ns.Preloader);
    game.state.add('controller', ns.Controller);
    game.state.start('boot');
}, false);
