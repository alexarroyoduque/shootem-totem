(function() {
    'use strict';

    function Controller() {
        utils.createVars(this);
    }

    Controller.prototype = {
        create: function() {
            var centerX = this.game.world.centerX,
                centerY = this.game.world.centerY,
                buttonLeft,
                buttonRight,
                buttonShoot,
                buttonPowerUp,
                buttonCallShenron;

            this.buttonGroup = this.game.add.group();
            this.buttonTextGroup = this.game.add.group();

            var socket = io(),
                controllerInfo = {},
                self = this;

            function sendReady(imReady) {
                socket.emit('playerIsReady', {isReady: imReady, numberOfPlayer: controllerInfo.numberOfPlayer});
            }

            function cleanRoom() {
                socket.emit('cleanRoom');
            }

            function startGame() {
                socket.emit('startGame');
            }

            socket.on('connect', function () {
                console.log('Soy el controllerInfo');
                socket.emit('register_newPlayer');

                socket.on('register_newPlayer_resend', function (data) {
                    console.log('Mi info de player es:');
                    controllerInfo = data;
                    console.log(controllerInfo);
                    console.log(data);

                    self.game.add.text(25, 25, 'Player id: ' + controllerInfo.numberOfPlayer, menuUtils.styleJumbo);
                });

                socket.on('cleanRoom_resend', function (data) {
                    console.log('Información de jugador borrada');
                    controllerInfo = {};
                });

                socket.on('playerIsReady_resend', function (data) {
                    console.log('Estado de los jugadores');
                    console.log(data);
                });

                socket.on('playersNotReady', function (data) {
                    console.log('Algunos jugadores no están listos');
                    console.log(data);
                });

                socket.on('startGame_resend', function () {
                    console.log('Iniciando partida...');
                });

                function emmitActionCode () {
                    var theGame = this[0],
                        actionName = this[1];
                    socket.emit('actionCode', {
                        actionCode: actionName,
                        numberOfPlayer: controllerInfo.numberOfPlayer
                    });
                    theGame.inputOverButton = true;
                };

                buttonLeft = self.game.add.button(centerX - 300, 300, 'buttonJumbo', null, [self, controllerInfo], 1, 0, 1);
                buttonLeft.onInputDown.add(emmitActionCode, [self, 'left']);
                buttonLeft.onInputOut.add(emmitActionCode, [self, 'leftFalse']);
                buttonLeft.onInputUp.add(emmitActionCode, [self, 'leftFalse']);
                self.buttonGroup.add(buttonLeft);
                self.buttonTextGroup.add(self.game.add.text(centerX - 300, 300, '<<<', menuUtils.styleJumbo));
                
                buttonRight = self.game.add.button(centerX - 100, 300, 'buttonJumbo', null, [self, controllerInfo], 1, 0, 1);
                buttonRight.onInputDown.add(emmitActionCode, [self, 'right']);
                buttonRight.onInputOut.add(emmitActionCode, [self, 'rightFalse']);
                buttonRight.onInputUp.add(emmitActionCode, [self, 'rightFalse']);

                self.buttonGroup.add(buttonRight);
                self.buttonTextGroup.add(self.game.add.text(centerX - 100, 300, '>>>', menuUtils.styleJumbo));

                buttonShoot = self.game.add.button(centerX + 200, 300, 'buttonJumbo', null, [self, controllerInfo], 1, 0, 1);
                buttonShoot.onInputDown.add(emmitActionCode, [self, 'shoot']);
                buttonLeft.onInputOut.add(emmitActionCode, [self, 'shootFalse']);
                buttonLeft.onInputUp.add(emmitActionCode, [self, 'shootFalse']);
                self.buttonGroup.add(buttonShoot);
                self.buttonTextGroup.add(self.game.add.text(centerX + 200, 300, 'Fire!', menuUtils.styleJumbo));

                buttonPowerUp = self.game.add.button(centerX + 100, 100, 'buttonJumbo', null, [self, controllerInfo], 1, 0, 1);
                buttonPowerUp.onInputDown.add(emmitActionCode, [self, 'powerUp']);
                buttonPowerUp.onInputOut.add(emmitActionCode, [self, 'powerUpFalse']);
                buttonPowerUp.onInputUp.add(emmitActionCode, [self, 'powerUpFalse']);
                self.buttonGroup.add(buttonPowerUp);
                self.buttonTextGroup.add(self.game.add.text(centerX + 100, 100, 'PowerUp', menuUtils.styleJumbo));

                buttonCallShenron = self.game.add.button(centerX + 300, 100, 'buttonJumbo', null, [self, controllerInfo], 1, 0, 1);
                buttonCallShenron.onInputDown.add(emmitActionCode, [self, 'callShenron']);
                buttonCallShenron.onInputOut.add(emmitActionCode, [self, 'callShenronFalse']);
                buttonCallShenron.onInputUp.add(emmitActionCode, [self, 'callShenronFalse']);
                self.buttonGroup.add(buttonCallShenron);
                self.buttonTextGroup.add(self.game.add.text(centerX + 300, 100, 'Shenron', menuUtils.styleJumbo));

                // setup
                self.buttonGroup.forEach(self.setupControllerButton, self);
                self.buttonTextGroup.forEach(menuUtils.setupButtonText, self);
            });

            
            this.particlesButtonTime = 100;          
            utils.generateEmitters(this);
        },
        update: function() {
            menuUtils.addCursorParticles(this);
        },
        setupControllerButton: function (button) {
            button.anchor.setTo(0.5, 0.5);
            button.tint = 0x03A9F4;
        },
        over: function () {
            this.inputOverButton = true;
        },
        out: function () {
            this.inputOverButton = false;
        },
        render: function() {}
    };

    window['shootem-totem'] = window['shootem-totem'] || {};
    window['shootem-totem'].Controller = Controller;
}());
