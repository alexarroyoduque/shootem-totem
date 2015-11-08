(function() {
    'use strict';

    function Game() {}

    Game.prototype = {
        create: function() {
            this.input.onDown.add(this.onInputDown, this);
        },

        update: function() {

        },

        onInputDown: function() {
            this.game.state.start('menu');
        }
    };

    window['shootem-totem'] = window['shootem-totem'] || {};
    window['shootem-totem'].Game = Game;
}());
