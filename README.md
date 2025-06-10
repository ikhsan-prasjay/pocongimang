# Pocongimang

Sebuah game 2D yang dikembangkan menggunakan Phaser 3 dengan animasi karakter yang halus dan efek visual yang menarik.

## 🎮 Fitur Utama

### Animasi Spine
- **Animasi Kerangka Spine**: Karakter dan objek dalam game dianimasikan dengan detail menggunakan Spine
- Aset animasi tersimpan dalam format JSON (contoh: `assets/spine/coin-pro.json`)
- Animasi yang smooth dan responsif untuk pengalaman bermain yang lebih immersive

### Arsitektur Scene
Game diorganisir dengan struktur scene yang jelas:
- **`sceneMenu.js`**: Scene menu utama untuk navigasi dan pengaturan awal game
- **`scenePlay.js`**: Scene inti tempat gameplay berlangsung

### Engine & Physics
- **Phaser 3**: Memanfaatkan pustaka Phaser 3 untuk semua aspek pengembangan game
- **Physics Engine**: Menggunakan `phaser-arcade-physics.js` untuk simulasi fisika yang realistis
- **Rendering**: Sistem rendering yang optimal untuk performa yang lancar
- **Asset Management**: Manajemen aset yang efisien

### Efek Visual
- **Sistem Partikel**: Efek partikel yang menarik menggunakan konfigurasi JSON
- Contoh: `assets/particles/flares.json` untuk efek visual yang memukau
- Efek lighting dan visual feedback yang responsif

## 🚀 Cara Menjalankan Game

### Persyaratan
- Browser web modern (Chrome, Firefox, Safari, Edge)
- Koneksi internet (untuk memuat pustaka Phaser jika menggunakan CDN)

### Langkah-langkah
1. **Clone repositori ini**:
   ```bash
   git clone https://github.com/username/pocongimang.git
   cd pocongimang
   ```

2. **Buka game**:
   - Buka file `index.html` di browser web Anda
   - Atau gunakan local server untuk pengalaman yang lebih optimal:
     ```bash
     # Menggunakan Python
     python -m http.server 8000
     
     # Menggunakan Node.js
     npx serve .
     ```

3. **Mulai bermain**:
   - Anda akan disambut oleh Menu Utama
   - Pilih opsi untuk memulai permainan
   - Game akan memuat Scene Permainan utama

## 🎯 Cara Bermain

<!-- Tambahkan kontrol dan aturan permainan spesifik di sini -->
- Gunakan **tombol panah** untuk menggerakkan karakter
- Tekan **spasi** untuk melompat atau berinteraksi
- Kumpulkan koin dan hindari rintangan
- Capai skor tertinggi untuk membuka fitur baru

## 🛠️ Struktur Proyek

```
pocongimang/
├── index.html              # File utama game
├── assets/                 # Folder aset game
│   ├── spine/             # Animasi Spine
│   │   └── coin-pro.json  # Animasi koin
│   ├── particles/         # Efek partikel
│   │   └── flares.json    # Efek cahaya
│   ├── images/            # Gambar dan sprite
│   └── sounds/            # File audio
├── js/                    # File JavaScript
│   ├── sceneMenu.js       # Scene menu utama
│   ├── scenePlay.js       # Scene gameplay
│   └── phaser-arcade-physics.js  # Physics engine
└── README.md              # Dokumentasi ini
```

## 🔧 Teknologi yang Digunakan

- **[Phaser 3](https://phaser.io/)** - Framework game HTML5
- **[Spine](http://esotericsoftware.com/)** - Tool animasi 2D skeletal
- **JavaScript ES6+** - Bahasa pemrograman utama
- **HTML5 Canvas** - Rendering graphics
- **Web Audio API** - Pemrosesan audio

## 🤝 Kontribusi

Kontribusi selalu diterima! Berikut cara berkontribusi:

1. Fork repositori ini
2. Buat branch fitur baru (`git checkout -b fitur-amazing`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan fitur amazing'`)
4. Push ke branch (`git push origin fitur-amazing`)
5. Buat Pull Request

## 📝 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE) - lihat file LICENSE untuk detail lengkap.

## 📞 Kontak

- **Developer**: [Nama Anda]
- **Email**: [email@example.com]
- **GitHub**: [@username](https://github.com/username)

## 🎉 Acknowledgments

- Tim Phaser.js untuk framework yang luar biasa
- Esoteric Software untuk tool animasi Spine
- Komunitas game development Indonesia

---

⭐ **Jangan lupa berikan star jika proyek ini membantu Anda!**
## Tampilan 
![ocong](https://github.com/user-attachments/assets/77c66978-f02b-472f-a2ab-72b2c30866cf)
![Screenshot 2025-06-10 191358](https://github.com/user-attachments/assets/39e876b4-57fc-4246-8c53-848c744c5dc9)
