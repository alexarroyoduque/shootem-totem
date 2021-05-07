(function() {
    'use strict';

    function Menu() {}

    Menu.prototype = {
        create: function() {
            var centerX = this.game.world.centerX,
                centerY = this.game.world.centerY;

            menuUtils.addBackground(this);

            var name = this.game.add.text(30, 540, 'Created by @AlexArroyoDuque', menuUtils.style);
            var version = this.game.add.text(30, 560, gameUtils.version, menuUtils.style);
            name.alpha = 0.3;
            version.alpha = 0.3;

            this.title = this.game.add.sprite(centerX, 100, 'title');
            this.title.anchor.setTo(0.5, 0.5);
            this.title.tint = menuUtils.colors[utils.getRandomInt(0, menuUtils.colors.length-1)];

            menuUtils.addBackgroundTween(this.title, 2000, 0, 20, this);

            this.buttonGroup = this.game.add.group();
            this.buttonTextGroup = this.game.add.group();

            this.buttonGroup.add(this.game.add.button(centerX - 100, 300, 'buttonJumbo', this.gameMode, this, 1, 0, 1));
            this.buttonTextGroup.add(this.game.add.text(centerX - 100, 300, 'Play', menuUtils.styleJumbo));
            this.buttonGroup.add(this.game.add.button(centerX + 100, 300, 'buttonJumbo', this.manual, this, 1, 0, 1));
            this.buttonTextGroup.add(this.game.add.text(centerX + 100, 300, 'Manual', menuUtils.styleJumbo));
            this.buttonGroup.add(this.game.add.button(centerX - 100, 430, 'buttonJumbo', this.opening, this, 1, 0, 1));
            this.buttonTextGroup.add(this.game.add.text(centerX - 100, 430, 'Opening', menuUtils.styleJumbo));
            this.buttonGroup.add(this.game.add.button(centerX + 100, 430, 'buttonJumbo', this.credits, this, 1, 0, 1));
            this.buttonTextGroup.add(this.game.add.text(centerX + 100, 430, 'Credits', menuUtils.styleJumbo));
            this.buttonGroup.add(this.game.add.button(centerX + 330, 560, 'button', this.goFull, this, 1, 0, 1));
            this.buttonTextGroup.add(this.game.add.text(centerX + 330, 560, 'Screen', menuUtils.style));

            this.buttonGroup.forEach(menuUtils.setupButton, this);
            this.buttonTextGroup.forEach(menuUtils.setupButtonText, this);

            this.particlesButtonTime = 100;          
            utils.generateEmitters(this);
        },
        gameMode: function () {
            this.game.state.start('gameMode');
        },
        goFull: function () {
            utils.gofull(this);
        },
        manual: function () {
            this.game.state.start('manual');
        },
        opening: function () {
            this.game.state.start('opening');
        },
        credits: function () {
            this.game.state.start('credits');
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
    window['shootem-totem'].Menu = Menu;
}());
