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
    // levels
    game.state.add('level01', ns.Level01);
    /* yo phaser:state new-state-files-put-here */
    game.state.start('boot');
}, false);
