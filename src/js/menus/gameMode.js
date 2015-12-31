var playersGroup = [];

(function() {
    'use strict';

    function GameMode() {

        try {
            this.socket = io();
            var self = this.socket,
                playerAction,
                numberOfPlayer,
                playerInGroup;

            self.on('connect', function() {
                console.log('conectado desde screen');

                self.emit('register_screen');

                self.on('actionCode_resend', function(data) {
                    console.log('desde screen');
                    console.log('actionCode_resend');
                    console.log(data);

                    if (playersGroup.length) {
                        playerAction = data.actionCode;
                        numberOfPlayer = data.numberOfPlayer;
                        playerInGroup = playersGroup.getAt(numberOfPlayer);

                        if (playerAction === 'right') {
                            playerInGroup.cursorsSocket.right = true;
                            playerInGroup.cursorsSocket.left = false;
                        } else if (playerAction === 'left') {
                            playerInGroup.cursorsSocket.left = true;
                            playerInGroup.cursorsSocket.right = false;
                        }

                        if (playerAction === 'rightFalse') {
                            playerInGroup.cursorsSocket.right = false;
                        } else if (playerAction === 'leftFalse') {
                            playerInGroup.cursorsSocket.left = false;
                        }

                        if (playerAction === 'shoot') {
                            playerInGroup.actionControlsSocket.shoot = true;
                            playerInGroup.actionControlsSocket.powerUp = false;
                            playerInGroup.actionControlsSocket.callShenron = false;
                        } else if (playerAction === 'powerUp') {
                            playerInGroup.actionControlsSocket.shoot = false;
                            playerInGroup.actionControlsSocket.powerUp = true;
                            playerInGroup.actionControlsSocket.callShenron = false;
                        } else if (playerAction === 'callShenron') {
                            playerInGroup.actionControlsSocket.shoot = false;
                            playerInGroup.actionControlsSocket.powerUp = false;
                            playerInGroup.actionControlsSocket.callShenron = true;
                        }

                        if (playerAction === 'shootFalse') {
                            playerInGroup.actionControlsSocket.shoot = false;
                        } else if (playerAction === 'powerUpFalse') {
                            playerInGroup.actionControlsSocket.powerUp = false;
                        } else if (playerAction === 'callShenronFalse') {
                            playerInGroup.actionControlsSocket.callShenron = false;
                        }
                    }

                });

                self.on('startGame_resend', function() {
                    console.log('Iniciando partida...');
                });

                self.on('playersNotReady', function() {
                    console.log('Algunos jugadores no están listos');
                });
            });
        
        }
        catch(err) {
            console.log(err)
        }
    }

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
            this.socketTextGroup = this.game.add.group();

            this.buttonGroup.add(this.game.add.button(centerX - 200, 300, 'buttonJumbo', this.play, [this, 'onePlayer'], 1, 0, 1));
            this.buttonTextGroup.add(this.game.add.text(centerX - 200, 300, '1 player', menuUtils.styleJumbo));
            
            this.buttonGroup.add(this.game.add.button(centerX - 200, 425, 'buttonJumbo', this.play, [this, 'twoPlayers'], 1, 0, 1));
            this.buttonTextGroup.add(this.game.add.text(centerX - 200, 425, '2 players', menuUtils.styleJumbo));

            // https://diafygi.github.io/webrtc-ips/
            getIPs(function(ip) {
                if(ip.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)) {
                    var urlText = this.game.add.text(centerX + 150, 450, ip + ':3000/controller', menuUtils.style);
                    urlText.anchor.setTo(0.5, 0.5);
                }
            }.bind(this));

            this.socketTextGroup.add(this.game.add.text(centerX + 150, 280, 'Play with your mobile!', menuUtils.styleJumbo));
            this.socketTextGroup.add(this.game.add.text(centerX + 150, 360, 'Only with server opened.\nYou need run "gulp server".\nConnect a mobile to same network\nas your computer.\nEnter the next url in mobile browser:', menuUtils.style));
            this.socketTextGroup.forEach(this.setupSocketText, this);
            
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
        setupSocketText : function (text) {
            text.anchor.setTo(0.5, 0.5);
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
