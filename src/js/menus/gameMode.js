(function() {
    'use strict';

    function GameMode() {}

    GameMode.prototype = {
        create: function() {
            var centerX = this.game.world.centerX,
                centerY = this.game.world.centerY;
            gameUtils.resetGameMode();

            menuUtils.addBackground(this);

            this.title = this.game.add.sprite(centerX, 100, 'title');
            this.title.anchor.setTo(0.5, 0.5);
            this.title.tint = menuUtils.colors[utils.getRandomInt(0, menuUtils.colors.length-1)];

            menuUtils.addBackgroundTween(this.title, 2000, 0, 20, this);

            this.buttonGroup = this.game.add.group();
            this.buttonTextGroup = this.game.add.group();

            this.buttonGroup.add(this.game.add.button(centerX - 300, 300, 'buttonJumbo', this.play, [this, 'onePlayer'], 1, 0, 1));
            this.buttonTextGroup.add(this.game.add.text(centerX - 300, 300, '1 player', menuUtils.styleJumbo));
            
            this.buttonGroup.add(this.game.add.button(centerX - 100, 300, 'buttonJumbo', this.play, [this, 'twoPlayers'], 1, 0, 1));
            this.buttonTextGroup.add(this.game.add.text(centerX - 100, 300, '2 players', menuUtils.styleJumbo));

            // this.buttonGroup.add(this.game.add.button(centerX + 100, 300, 'buttonJumbo', this.none, this, 1, 0, 1));
            // this.buttonTextGroup.add(this.game.add.text(centerX + 100, 300, '3 players', menuUtils.styleJumbo));
            // this.buttonGroup.add(this.game.add.button(centerX + 100, 380, 'button', this.none, [this, 'threePlayersOnePads'], 1, 0, 1));
            // this.buttonTextGroup.add(this.game.add.text(centerX + 100, 380, '1 pad', menuUtils.style));
            // this.buttonGroup.add(this.game.add.button(centerX + 100, 430, 'button', this.none, [this, 'threePlayersTwoPads'], 1, 0, 1));
            // this.buttonTextGroup.add(this.game.add.text(centerX + 100, 430, '2 pads', menuUtils.style));
            // this.buttonGroup.add(this.game.add.button(centerX + 100, 480, 'button', this.none, [this, 'threePlayersThreePads'], 1, 0, 1));
            // this.buttonTextGroup.add(this.game.add.text(centerX + 100, 480, '3 pads', menuUtils.style));

            // this.buttonGroup.add(this.game.add.button(centerX + 300, 300, 'buttonJumbo', this.none, this, 1, 0, 1));
            // this.buttonTextGroup.add(this.game.add.text(centerX + 300, 300, '4 players', menuUtils.styleJumbo));
            // this.buttonGroup.add(this.game.add.button(centerX + 300, 380, 'button', this.none, [this, 'fourPlayersTwoPads'], 1, 0, 1));
            // this.buttonTextGroup.add(this.game.add.text(centerX + 300, 380, '2 pads', menuUtils.style));
            // this.buttonGroup.add(this.game.add.button(centerX + 300, 430, 'button', this.none, [this, 'fourPlayersThreePads'], 1, 0, 1));
            // this.buttonTextGroup.add(this.game.add.text(centerX + 300, 430, '3 pads', menuUtils.style));
            // this.buttonGroup.add(this.game.add.button(centerX + 300, 480, 'button', this.none, [this, 'fourPlayersFourPads'], 1, 0, 1));
            // this.buttonTextGroup.add(this.game.add.text(centerX + 300, 480, '4 pads', menuUtils.style));

            
            this.buttonGroup.add(this.game.add.button(centerX - 340, 560, 'button', this.back, this, 1, 0, 1));
            this.buttonTextGroup.add(this.game.add.text(centerX - 340, 560, 'Back', menuUtils.style));

            this.buttonGroup.forEach(menuUtils.setupButton, this);
            this.buttonTextGroup.forEach(menuUtils.setupButtonText, this);
            menuUtils.tintBackButton(this.buttonGroup.getAt(this.buttonGroup.length-1));
            
            this.particlesButtonTime = 100;          
            utils.generateEmitters(this);
        },
        none: function () {
        },
        play: function () {
            var theGame = this[0],
                mode = this[1];
            gameUtils.mode = mode;

            theGame.game.state.start('level01');
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
    window['shootem-totem'].GameMode = GameMode;
}());
