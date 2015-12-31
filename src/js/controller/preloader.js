(function() {
    'use strict';

    function Preloader() {
        this.asset = null;
        this.ready = false;
    }

    Preloader.prototype = {
        preload: function() {
            this.asset = this.add.sprite(150, 200, 'preloader');
            this.load.setPreloadSprite(this.asset);

            this.load.spritesheet('buttonJumbo', 'assets/menu/buttonJumbo.png', 170, 100);
            this.load.spritesheet('button', 'assets/menu/button.png', 95, 56);

            this.load.spritesheet('particles', 'assets/others/particles.png', 6, 6);

            // this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            // this.loadResources();

            this.ready = true;
        },

        loadResources: function() {
            // load your assets here
        },

        create: function() {

        },

        update: function() {
            if (!!this.ready) {
                this.game.state.start('controller');
            }
        },

        onLoadComplete: function() {
            // this.ready = true;
        }
    };

    window['shootem-totem'] = window['shootem-totem'] || {};
    window['shootem-totem'].Preloader = Preloader;
}());
