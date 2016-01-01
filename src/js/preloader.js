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

            this.game.load.audio('menuAudio', 'assets/audio/RE.ogg');
            this.game.load.audio('level01Audio', 'assets/audio/Teriaah.ogg');
            this.game.load.audio('level02Audio', 'assets/audio/Afterburner.ogg');
            this.game.load.audio('level03Audio', 'assets/audio/Teriaah.ogg');
            this.game.load.audio('hitEnemyAudio', 'assets/audio/stop.ogg');
            this.game.load.audio('explosionAudio', 'assets/audio/explosion.ogg');
            this.game.load.audio('shootPlayerAudio', 'assets/audio/laser5.ogg');
            this.game.load.audio('superSaiyanAudio', 'assets/audio/Dragon_Ball_Z_-_Super_Saiyan_Sound_Effect.ogg');
            this.game.load.audio('shenronAudio', 'assets/audio/AGE-DBZ-Shenron_eyes_Glowing.ogg');
            this.game.load.audio('powerUpGetAudio', 'assets/audio/pepSound3.ogg');
            this.game.load.audio('powerUpAttackAudio', 'assets/audio/sci-fi_1_2.ogg');
            this.game.load.audio('triforceGetAudio', 'assets/audio/powerUp2.ogg');
            this.game.load.audio('dragonBallGetAudio', 'assets/audio/phaserUp7.ogg');

            this.load.image('player', 'assets/player/player.png');
            this.load.image('playerPowerUp', 'assets/player/playerPowerUp.png');

            this.load.spritesheet('particles', 'assets/others/particles.png', 6, 6);
            this.load.image('hud', 'assets/interface/hud.png');
            this.load.spritesheet('items', 'assets/items/items.png', 50, 50);
            this.load.spritesheet('dragonBalls', 'assets/items/dragonBalls.png', 50, 50);
            this.load.spritesheet('triforce', 'assets/items/triforce.png', 50, 50);
            this.load.spritesheet('powerUps', 'assets/items/powerUps.png', 250, 200);
            this.load.image('bullet', 'assets/player/bullet.png');
            this.load.image('square', 'assets/enemies/square.png');
            this.load.image('diamond', 'assets/enemies/diamond.png');
            this.load.image('pentagon', 'assets/enemies/pentagon.png');
            this.load.image('rectangle', 'assets/enemies/rectangle.png');
            this.load.image('pyramid', 'assets/enemies/pyramid.png');
            this.load.spritesheet('stargate', 'assets/enemies/bosses/stargate.png', 160, 160);
            this.load.spritesheet('enemyBullets01', 'assets/enemies/enemyBullets01.png', 24, 24);
            this.load.image('egg', 'assets/enemies/egg.png');
            this.load.image('circle', 'assets/enemies/circle.png');
            this.load.image('spider', 'assets/enemies/spider.png');
            this.load.image('shell', 'assets/enemies/shell.png');
            this.load.image('background01', 'assets/backgrounds/background01.png');
            this.load.image('background02', 'assets/backgrounds/background02.png');
            this.load.image('background03', 'assets/backgrounds/background03.png');
            this.load.image('background04', 'assets/backgrounds/background04.png');
            this.load.spritesheet('terminator1', 'assets/enemies/bosses/terminator1.png', 160, 160);
            this.load.spritesheet('terminator2', 'assets/enemies/bosses/terminator2.png', 160, 160);

            this.load.image('title', 'assets/menu/title.png');
            this.load.image('creditsTitle', 'assets/menu/creditsTitle.png');
            this.load.image('credits', 'assets/menu/credits.png');
            this.load.image('manualTitle', 'assets/menu/manualTitle.png');
            this.load.spritesheet('manual', 'assets/menu/manual.png', 540, 340);
            this.load.image('menuBg1', 'assets/menu/menuBg1.png');
            this.load.image('menuBg2', 'assets/menu/menuBg2.png');
            this.load.image('menuBg3', 'assets/menu/menuBg3.png');
            this.load.image('menuBg4', 'assets/menu/menuBg4.png');
            this.load.image('menuBg5', 'assets/menu/menuBg5.png');
            this.load.image('menuBg6', 'assets/menu/menuBg6.png');
            this.load.image('menuBg7', 'assets/menu/menuBg7.png');

            this.load.spritesheet('buttonJumbo', 'assets/menu/buttonJumbo.png', 170, 100);
            this.load.spritesheet('button', 'assets/menu/button.png', 95, 56);

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
                this.game.state.start('opening');
                // this.game.state.start('opening');
                // this.game.state.start('menu');
                // this.game.state.start('level01');
            }
        },

        onLoadComplete: function() {
            // this.ready = true;
        }
    };

    window['shootem-totem'] = window['shootem-totem'] || {};
    window['shootem-totem'].Preloader = Preloader;
}());
