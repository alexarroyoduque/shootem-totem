(function() {
    'use strict';

    function Manual() {}

    Manual.prototype = {
        create: function() {
            var centerX = this.game.world.centerX,
                centerY = this.game.world.centerY;

            menuUtils.addBackground(this);

            this.title = this.game.add.sprite(centerX, 80, 'manualTitle');
            this.title.anchor.setTo(0.5, 0.5);
            this.manual = this.game.add.sprite(centerX, 370, 'manual');
            this.manual.frame = 0;
            this.manual.anchor.setTo(0.5, 0.5);

            this.title.tint = menuUtils.colors[utils.getRandomInt(0, menuUtils.colors.length-1)];

            menuUtils.addBackgroundTween(this.title, 2000, 0, 20, this);

            this.buttonGroup = this.game.add.group();
            this.buttonTextGroup = this.game.add.group();

            this.buttonGroup.add(this.game.add.button(centerX - 280, 180, 'button', this.showPlayer1, this, 1, 0, 1));
            this.buttonTextGroup.add(this.game.add.text(centerX - 280, 180, 'Player 1', menuUtils.style));
            this.buttonGroup.add(this.game.add.button(centerX - 140, 180, 'button', this.showPlayer2, this, 1, 0, 1));
            this.buttonTextGroup.add(this.game.add.text(centerX - 140, 180, 'Player 2', menuUtils.style));
            this.buttonGroup.add(this.game.add.button(centerX, 180, 'button', this.showGame, this, 1, 0, 1));
            this.buttonTextGroup.add(this.game.add.text(centerX, 180, 'Game', menuUtils.style));
            this.buttonGroup.add(this.game.add.button(centerX + 140, 180, 'button', this.showPowerUps, this, 1, 0, 1));
            this.buttonTextGroup.add(this.game.add.text(centerX + 140, 180, 'Power ups', menuUtils.style));

            this.buttonGroup.add(this.game.add.button(centerX + 280, 180, 'button', this.showOnline, this, 1, 0, 1));
            this.buttonTextGroup.add(this.game.add.text(centerX + 280, 180, 'Online', menuUtils.style));

            this.buttonGroup.add(this.game.add.button(centerX - 340, 560, 'button', this.back, this, 1, 0, 1));
            this.buttonTextGroup.add(this.game.add.text(centerX - 340, 560, 'Back', menuUtils.style));

            this.buttonGroup.forEach(menuUtils.setupButton, this);
            this.buttonTextGroup.forEach(menuUtils.setupButtonText, this);

            menuUtils.tintBackButton(this.buttonGroup.getAt(5));

            this.particlesButtonTime = 100;          
            utils.generateEmitters(this);
        },
        tintButton: function (button) {
            button.tint = 0x03A9F4;
        },
        showPlayer1: function () {
            this.manual.frame = 0;
        },
        showPlayer2: function () {
            this.manual.frame = 1;
        },
        showGame: function () {
            this.manual.frame = 2;
        },
        showPowerUps: function () {
            this.manual.frame = 3;
        },
        showOnline: function () {
            this.manual.frame = 4;
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
    window['shootem-totem'].Manual = Manual;
}());
