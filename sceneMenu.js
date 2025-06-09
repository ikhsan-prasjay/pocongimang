// sceneMenu.js
var sceneMenu = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function () {
        Phaser.Scene.call(this, { key: "sceneMenu" });
    },

    preload: function () {
        this.load.image('bg_start', 'assets/images/bg_start.png'); //
        this.load.image('btn_play', 'assets/images/btn_play.png'); //
        this.load.image('title_game', 'assets/images/title_game.png'); //
        this.load.image('panel_skor', 'assets/images/panel_skor.png'); //
        this.load.spritesheet("sps_mummy", "assets/sprite/mummy37x45.png", {frameWidth: 37, frameHeight: 45}); //
        this.load.audio('snd_ambience', 'assets/audio/ambience.mp3'); //
        this.load.audio('snd_touch', 'assets/audio/touch.mp3'); //
        this.load.audio('snd_transisi_menu', 'assets/audio/transisi_menu.mp3'); //
    },
    
    create: function () {
        // Gunakan this.game.config.width dan this.game.config.height untuk posisi responsif
        var X_CENTER = this.game.config.width / 2;
        var Y_CENTER = this.game.config.height / 2;
        
        // Background - Sesuaikan ukurannya agar mengisi seluruh layar secara responsif
        var bgStart = this.add.image(X_CENTER, Y_CENTER, "bg_start"); //
        bgStart.setDisplaySize(this.game.config.width, this.game.config.height);

        // Add mummy sprite with correct animation
        var mummy = this.add.sprite(X_CENTER, this.game.config.height - 170, 'sps_mummy'); //
        mummy.setDepth(10); //
        mummy.setScale(3); //
        
        this.anims.create({
            key: 'walk', //
            frames: this.anims.generateFrameNumbers('sps_mummy', {start: 0, end: 17}), //
            frameRate: 16, //
            repeat: -1 //
        });
        
        mummy.play('walk'); //

        // Sound setup dengan variabel global
        this.snd_touch = this.sound.add('snd_touch'); //
        var snd_transisi_menu = this.sound.add('snd_transisi_menu'); //
        
        // Global ambience sound management
        // Akses variabel global 'snd_ambience' yang dideklarasikan di index.html
        if (typeof snd_ambience === 'undefined' || snd_ambience === null || !snd_ambience.isPlaying) {
             snd_ambience = this.sound.add('snd_ambience'); //
             snd_ambience.setLoop(true); //
             snd_ambience.play(); //
             snd_ambience.setVolume(0.35); //
        } else if (snd_ambience && !snd_ambience.isPlaying) {
            // Jika sudah ada tapi tidak dimainkan (misalnya dari scene sebelumnya), mainkan lagi
            snd_ambience.play();
        }
        
        // Correct localStorage access
        var skorTertinggi = localStorage.getItem('highscore') || 0; //

        // Play button
        var btnPlay = this.add.image(X_CENTER, Y_CENTER + 75, 'btn_play'); //
        btnPlay.setScale(0); // Initial scale is 0
        btnPlay.setDepth(10); //

        // Title
        this.titleGame = this.add.image(X_CENTER, Y_CENTER - 184, 'title_game'); // Sesuaikan posisi Y awal
        this.titleGame.setDepth(10); //
        this.titleGame.setScale(0); //

        // Score panel
        var panelSkor = this.add.image(X_CENTER, this.game.config.height - 120, 'panel_skor'); //
        panelSkor.setOrigin(0.5); //
        panelSkor.setDepth(10);    //
        panelSkor.setAlpha(0.8); //

        // Score text
        var lblSkor = this.add.text(panelSkor.x + 25, panelSkor.y, "High Score : " + skorTertinggi); //
        lblSkor.setOrigin(0.5); //
        lblSkor.setDepth(10);      //
        lblSkor.setFontSize(25); //
        lblSkor.setTint(0xff7f2e); //

        var diz = this;

        // Title animation (posisi Y akhir 200, sesuai dengan desain Anda)
        this.tweens.add({
            targets: diz.titleGame, //
            ease: 'Bounce.easeOut', // Gunakan 'easeOut' untuk Bounce
            duration: 550, //
            delay: 250, //
            y: 200, //
            onComplete: function() { //
                snd_transisi_menu.play(); //
            }
        });

        // Play button animation
        this.tweens.add({
            targets: btnPlay, //
            ease: 'Back.easeOut', // Gunakan 'easeOut' untuk Back
            duration: 500, //
            delay: 750, //
            scaleX: 1, //
            scaleY: 1 //
        });

        // Additional title animation (skala awal 0)
        this.tweens.add({
            targets: diz.titleGame, //
            ease: 'Elastic.easeOut', // Gunakan 'easeOut' untuk Elastic
            duration: 750, //
            delay: 1000, //
            scaleX: 1, //
            scaleY: 1 //
        });

        // Score panel animation
        this.tweens.add({
            targets: panelSkor, //
            ease: 'Power2', //
            duration: 500, //
            delay: 1250, //
            alpha: 0.8 //
        });

        // Variable to track if button is clicked
        var btnClicked = false; //

        // Play button click handler
        btnPlay.setInteractive(); //
        
        this.input.on('gameobjectover', function(pointer, gameObject) { //
            console.log("Scene Menu | Object Over"); //
            if(btnClicked) return; //
            if(gameObject === btnPlay) { // Gunakan strict equality
                btnPlay.setTint(0xa0a0a0); //
            }
        }, this);

        this.input.on('gameobjectout', function(pointer, gameObject) { //
            console.log("Scene Menu | Object Out"); //
            if(btnClicked) return; //
            if(gameObject === btnPlay) { // Gunakan strict equality
                btnPlay.setTint(0xffffff); //
            }
        }, this);

        this.input.on('gameobjectdown', function(pointer, gameObject) { //
            console.log("Scene Menu | Object Click"); //
            if(gameObject === btnPlay) { // Gunakan strict equality
                btnClicked = true; //
            }
        }, this);

        this.input.on('gameobjectup', function(pointer, gameObject) { //
            console.log("Scene Menu | Object End Click"); //
            if(gameObject === btnPlay && btnClicked) { //
                diz.scene.start('scenePlay'); //
                diz.snd_touch.play(); //
            }
        }, this);

        this.input.on('pointerup', function(pointer, gameObject) { //
            console.log("Scene Menu | Mouse Up"); //
            btnClicked = false; //
        }, this);
    },
    update: function () {}
});