(function() {
    'use strict';

    function Opening() {}

    Opening.prototype = {
        create: function() {
            var centerX = this.game.world.centerX,
                centerY = this.game.world.centerY,
                style = {
                    font: '20px Inconsolata',
                    align: 'left',
                    fill: '#FFF'
                };            

            this.game.sound.stopAll();

            this.author1 = this.game.add.text(centerX - 300, 400, 'Alejandro Arroyo Duque', style);
            this.author2 = this.game.add.text(centerX - 300, 440, '@AlexArroyoDuque', style);
            this.author3 = this.game.add.text(centerX - 300, 480, 'http://alexarroyoduque.github.io', style);
            this.author1.alpha = 0;
            this.author2.alpha = 0;
            this.author3.alpha = 0;

            this.game.add.tween(this.author1)
                .to({
                        alpha: 1
                    }, 1000, Phaser.Easing.Linear.None, false, 100, 0, false)
                .to({
                        alpha: 0
                    }, 1000, Phaser.Easing.Linear.None, false, 3000, 0, false)
                .start();

            this.game.add.tween(this.author2)
                .to({
                    alpha: 1
                }, 1000, Phaser.Easing.Linear.None, false, 1000, 0, false)
                .to({
                    alpha: 0
                }, 1000, Phaser.Easing.Linear.None, false, 2500, 0, false)
                .start();

            this.game.add.tween(this.author3)
                .to({
                    alpha: 1
                }, 1000, Phaser.Easing.Linear.None, false, 1300, 0, false)
                .to({
                    alpha: 0
                }, 1000, Phaser.Easing.Linear.None, false, 2500, 0, false)
                .start();


            this.message1 = this.game.add.text(centerX - 250, 50, 'Big Boss here. The artificial intelligence HAL 9000\nto become aware of itself and has exercised\ncontrol over other electronic systems. ', style);
            this.message2 = this.game.add.text(centerX - 250, 150, 'Our mission codenamed Totem is to destroy\nenemy HAL 9000.', style);
            this.message3 = this.game.add.text(centerX - 250, 230, 'In addition to the enemy has also taken control of\nother important technologies such as Stargate allowing\nthe passage of technology from other worlds to\nreinforce the enemy and Skynet artificial intelligence\ndesigned to military defense.', style);
            this.message4 = this.game.add.text(centerX - 250, 390, 'It will provide a prototype of the 90\'s experimental\nship. This ship is impossible to be controlled\nby the enemy.\n\nGood luck.', style);

            this.message1.alpha = 0;
            this.message2.alpha = 0;
            this.message3.alpha = 0;
            this.message4.alpha = 0;

            this.game.add.tween(this.message1)
                .to({
                        alpha: 1
                    }, 2000, Phaser.Easing.Linear.None, false, 4000, 0, false)
                .start();

            this.game.add.tween(this.message2)
                .to({
                        alpha: 1
                    }, 2000, Phaser.Easing.Linear.None, false, 8000, 0, false)
                .start();

            this.game.add.tween(this.message3)
                .to({
                        alpha: 1
                    }, 2000, Phaser.Easing.Linear.None, false, 12000, 0, false)
                .start();

            this.game.add.tween(this.message4)
                .to({
                        alpha: 1
                    }, 2000, Phaser.Easing.Linear.None, false, 17000, 0, false)
                .start();

            this.input.onDown.add(this.toMenu, this);

            this.game.time.events.add(Phaser.Timer.SECOND * 45, this.toMenu, this);
        },

        update: function() {},
        toMenu: function() {
            utils.goToMenu(this);
        }
    };

    window['shootem-totem'] = window['shootem-totem'] || {};
    window['shootem-totem'].Opening = Opening;
}());
