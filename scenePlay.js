// scenePlay.js
var scenePlay = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { key: "scenePlay" });
    },

    init: function() {},

    preload: function() {
        this.load.image('chara', 'assets/images/chara.png'); //
        this.load.image('fg_loop_back', 'assets/images/fg_loop_back.png'); //
        this.load.image('fg_loop', 'assets/images/fg_loop.png'); //
        this.load.image('obstc', 'assets/images/obstc.png'); //
        this.load.image('panel_skor', 'assets/images/panel_skor.png'); //
        this.load.spritesheet("sps_mummy", "assets/sprite/mummy37x45.png", {frameWidth: 37, frameHeight: 45}); //
        
        this.load.audio('snd_dead', 'assets/audio/dead.mp3'); //
        this.load.audio('snd_klik_1', 'assets/audio/klik_1.mp3'); //
        this.load.audio('snd_klik_2', 'assets/audio/klik_2.mp3'); //
        this.load.audio('snd_klik_3', 'assets/audio/klik_3.mp3'); //
    },

    create: function() {
        // Initialize variables
        this.timerHitungan = 0; //
        this.hitungan = []; //
        this.background = []; //
        this.halangan = []; // Initialize the obstacles array
        this.timerHalangan = 0; // Initialize obstacle timer
        this.isGameRunning = false; //
        this.charaTweens = null; // Variable for character animations
        // Gunakan this.game.config.width untuk bgWidth jika itu sesuai dengan lebar desain game Anda
        this.bgWidth = 1366; //
        
        // Sound when character collides with obstacle
        this.snd_dead = this.sound.add('snd_dead'); //
        // Create sound array for click sounds
        this.snd_click = []; //
        // Push sound assets into the array
        this.snd_click.push(this.sound.add('snd_klik_1')); //
        this.snd_click.push(this.sound.add('snd_klik_2')); //
        this.snd_click.push(this.sound.add('snd_klik_3')); //
        // Set volume for all click sounds
        for(let i = 0; i < this.snd_click.length; i++){ //
            this.snd_click[i].setVolume(0.5); //
        }
        
        // Add character sprite
        this.chara = this.add.image(130, this.game.config.height / 2, 'chara'); // Gunakan this.game.config.height
        this.chara.setDepth(3); //
        this.chara.setScale(0); //
        
        var myScene = this; //
        
        this.tweens.add({
            delay: 250, //
            targets: this.chara, //
            ease: 'Back.Out', //
            duration: 500, //
            scale: 1, //
            onComplete: function() { //
                myScene.isGameRunning = true; //
            }
        });
        
        this.score = 0; //
        
        this.panel_score = this.add.image(this.game.config.width / 2, 60, 'panel_skor'); // Gunakan this.game.config.width
        this.panel_score.setOrigin(0.5); //
        this.panel_score.setDepth(20); //
        this.panel_score.setAlpha(0.8); //
        
        this.label_score = this.add.text(this.panel_score.x + 25, this.panel_score.y, this.score); //
        this.label_score.setOrigin(0.5); //
        this.label_score.setDepth(20); //
        this.label_score.setFontSize(30); //
        this.label_score.setTint(0xff7f2e); //
        
        var bg_x = 1366 / 2; // Jika ini adalah lebar gambar background, biarkan
        
        for(let i = 0; i < 2; i++) { //
            var bg_mat = []; //
            var BG = this.add.image(bg_x, this.game.config.height / 2, 'fg_loop_back'); // Gunakan this.game.config.height
            var FG = this.add.image(bg_x, this.game.config.height / 2, 'fg_loop'); // Gunakan this.game.config.height
            
            BG.setOrigin(0.5, 0.5); //
            FG.setOrigin(0.5, 0.5); //
            
            BG.setData('kecepatan', 5); //
            FG.setData('kecepatan', 10); //
            
            BG.setDepth(1); //
            FG.setDepth(2); //
            
            bg_mat.push(BG); //
            bg_mat.push(FG); //
            
            this.background.push(bg_mat); //
            
            bg_x += 1366; // Jika ini adalah lebar gambar background, biarkan
        }
        
        this.gameOver = function() { //
            let highScore = localStorage.getItem('highscore') || 0; //
            if(myScene.score > highScore) { //
                localStorage.setItem('highscore', myScene.score); //
            }
            myScene.scene.start("sceneMenu"); // Kembali ke sceneMenu
        };
        
        // Inisialisasi input keyboard untuk tombol panah
        this.cursors = this.input.keyboard.createCursorKeys();

        // Input handler untuk pergerakan karakter menggunakan tombol panah atas
        this.input.keyboard.on('keydown-UP', function(event) {
            if(!this.isGameRunning) return;
            
            this.snd_click[Math.floor(Math.random() * this.snd_click.length)].play(); //
            
            if(this.charaTweens && this.charaTweens.isPlaying()) { //
                this.charaTweens.stop(); //
            }
            
            this.charaTweens = this.tweens.add({
                targets: this.chara, //
                ease: 'Power1', //
                duration: 750, //
                y: this.chara.y - 200 // Mengurangi Y untuk bergerak ke atas
            });
        }, this);
    },

    update: function() {
        if(!this.isGameRunning) return; //
        
        // Karakter jatuh secara otomatis
        this.chara.y += 5; //

        // Batas bawah layar untuk karakter
        if(this.chara.y > this.game.config.height - (this.chara.displayHeight / 2)) { // Gunakan this.game.config.height
             this.chara.y = this.game.config.height - (this.chara.displayHeight / 2); // Sesuaikan dengan tinggi karakter
        }
        
        for(let i = 0; i < this.background.length; i++) { //
            for(let j = 0; j < this.background[i].length; j++) { //
                let bgElement = this.background[i][j]; //
                bgElement.x -= bgElement.getData('kecepatan'); //
                
                if(bgElement.x < -this.bgWidth/2) { //
                    var diff = bgElement.x + (this.bgWidth/2); //
                    bgElement.x = this.bgWidth * 1.5 + diff; //
                }
            }
        }
        
        if(this.timerHalangan <= 0) { //
            var acak_y = Math.floor((Math.random() * (this.game.config.height - 120)) + 60); // Gunakan this.game.config.height
            var halanganBaru = this.add.image(this.game.config.width + 50, acak_y, 'obstc'); // Mulai dari luar kanan layar
            
            halanganBaru.setOrigin(0, 0); //
            halanganBaru.setData('status_aktif', true); //
            halanganBaru.setData('kecepatan', Math.floor((Math.random() * 15) + 10)); //
            halanganBaru.setDepth(5); //
            
            this.halangan.push(halanganBaru); //
            this.timerHalangan = Math.floor((Math.random() * 50) + 10); //
        }
        
        for(let i = this.halangan.length - 1; i >= 0; i--) { //
            this.halangan[i].x -= this.halangan[i].getData('kecepatan'); //
            
            if(this.halangan[i].x < -this.halangan[i].displayWidth) { // Periksa ketika objek sepenuhnya keluar layar
                this.halangan[i].destroy(); //
                this.halangan.splice(i, 1); //
                continue; //
            }
            
            if(this.chara.x > this.halangan[i].x + 50 && this.halangan[i].getData('status_aktif') == true) { //
                this.halangan[i].setData('status_aktif', false); //
                this.score++; //
                this.label_score.setText(this.score); //
            }
            
            if(Phaser.Geom.Intersects.RectangleToRectangle(this.chara.getBounds(), this.halangan[i].getBounds())) { //
                this.halangan[i].setData('status_aktif', false); //
                this.isGameRunning = false; //
                
                this.snd_dead.play(); //
                
                if(this.charaTweens != null) { //
                    this.charaTweens.stop(); //
                }
                
                var myScene = this; //
                
                this.charaTweens = this.tweens.add({
                    targets: this.chara, //
                    ease: 'Elastic.easeOut', //
                    duration: 2000, //
                    alpha: 0, //
                    onComplete: function() { //
                        myScene.gameOver(); //
                    }
                });
                break; //
            }
        }
        
        // Check if character flies too high (batas atas layar)
        if(this.chara.y < (this.chara.displayHeight / 2) - 50) { // Sesuaikan batas atas agar tidak terlalu jauh
            this.isGameRunning = false; //
            
            if(this.charaTweens != null) { //
                this.charaTweens.stop(); //
            }
            
            let myScene = this; //
            
            this.charaTweens = this.tweens.add({
                targets: this.chara, //
                ease: 'Elastic.easeOut', //
                duration: 2000, //
                alpha: 0, //
                onComplete: function() { //
                    myScene.gameOver(); //
                }
            });
        }
        
        this.timerHalangan--; //
    }
});