(function() {
    'use strict';

    function Credits() {}

    Credits.prototype = {
        create: function() {
            var centerX = this.game.world.centerX,
                centerY = this.game.world.centerY;

            menuUtils.addBackground(this);

            this.title = this.game.add.sprite(centerX, 80, 'creditsTitle');
            this.title.anchor.setTo(0.5, 0.5);
            this.credits = this.game.add.sprite(centerX, 335, 'credits');
            this.credits.anchor.setTo(0.5, 0.5);

            this.title.tint = menuUtils.colors[utils.getRandomInt(0, menuUtils.colors.length-1)];

            menuUtils.addBackgroundTween(this.title, 2000, 0, 20, this);

            this.buttonGroup = this.game.add.group();
            this.buttonTextGroup = this.game.add.group();

            this.buttonGroup.add(this.game.add.button(centerX - 340, 560, 'button', this.back, this, 1, 0, 1));
            this.buttonTextGroup.add(this.game.add.text(centerX - 340, 560, 'Back', menuUtils.style));

            this.buttonGroup.forEach(menuUtils.setupButton, this);
            this.buttonTextGroup.forEach(menuUtils.setupButtonText, this);

            menuUtils.tintBackButton(this.buttonGroup.getAt(0));
            this.particlesButtonTime = 100;          
            utils.generateEmitters(this);
        },

        back: function () {
            this.game.state.start('menu');
        },
        over: function () {
            this.inputOverButton = true;
        },
        out: function () {
            this.inputOverButton = false;
        },
        update: function() {
            menuUtils.addCursorParticles(this);
        }
    };

    window['shootem-totem'] = window['shootem-totem'] || {};
    window['shootem-totem'].Credits = Credits;
}());
