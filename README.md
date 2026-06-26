# 🐾 glvsowogame — Premium OwO Bot Web Simulator

<div align="center">

[![Vite](https://img.shields.io/badge/Vite-B736FF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](#deployment)
[![Deploy Status](https://img.shields.io/github/actions/workflow/status/leangtg123-art/glvsowogame/deploy.yml?branch=main&style=for-the-badge&label=Deployment)](https://leangtg123-art.github.io/glvsowogame/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](#license)

**Simulasi game gacha & RPG teks OwO Bot terlengkap dengan antarmuka Discord Obsidian Desktop yang modern, interaktif, dan premium.**

[Mainkan Sekarang 🚀](https://leangtg123-art.github.io/glvsowogame/) • [Laporkan Bug 🐛](https://github.com/leangtg123-art/glvsowogame/issues) • [Kontribusi 🤝](https://github.com/leangtg123-art/glvsowogame/pulls)

</div>

---

## 🌟 Fitur Utama

- **Fidelity Antarmuka Discord**: Desain Obsidian Dark Mode 3-kolom yang pixel-perfect dengan navigasi channel dan panel statistik real-time.
- **Sistem Perburuan & Gacha (`/owo hunt`)**: Kecepatan tangkapan berdasarkan probabilitas *rarity* dari Common hingga Special.
- **Sistem Pertarungan RPG (`/owo battle`)**: Pertarungan dinamis melawan monster liar berbasis statistik kekuatan persenjataan.
- **Toko & Inventaris Marketplace (`/owo shop`)**: Beli berbagai tingkatan senjata, buka peti hewan acak (*Crate*), atau raih koin dari *Lootbox*.
- **Penyimpanan Berkelanjutan**: Menggunakan `localStorage` peramban untuk menyimpan data koin, EXP, level, inventaris, dan koleksi hewan Anda secara otomatis.
- **Auto-deployment**: Terintegrasi penuh dengan GitHub Actions untuk deployment otomatis ke GitHub Pages.

---

## 🛠️ Stack Teknologi

- **Framework**: [Vite](https://vite.dev/) + [React](https://react.dev/) (JavaScript)
- **Styling**: Vanilla CSS (Skema warna OKLCH kustom)
- **Deployment**: GitHub Actions (Official Pages Deployment Workflow)
- **Persistensi Data**: Web Storage API (`localStorage`)

---

## 🎮 Daftar Perintah yang Didukung

| Perintah | Deskripsi | Cooldown |
|---|---|---|
| `/owo hunt` | Berburu hewan liar untuk mendapatkan XP dan Cowoncy | 5 detik |
| `/owo battle` | Bertarung melawan monster menggunakan senjata aktif | 15 detik |
| `/owo inv` | Memeriksa isi ransel, koin, peti, dan persenjataan | Instan |
| `/owo zoo` | Menampilkan seluruh koleksi hewan yang telah Anda tangkap | Instan |
| `/owo shop` | Membuka katalog toko senjata, crate, dan lootbox | Instan |
| `/owo buy [id]` | Membeli item dari toko berdasarkan item ID | Instan |
| `/owo equip [no]` | Memasang senjata aktif dari daftar inventaris | Instan |
| `/owo open crate` | Membuka Peti Hewan acak (peluang mendapat Epic/Mythic) | Instan |
| `/owo open lootbox` | Membuka Kotak Misteri berisi senjata acak atau Cowoncy | Instan |

---

## 🚀 Panduan Memulai Cepat (Lokal)

### Persyaratan Sistem

- [Node.js](https://nodejs.org/) v18 atau lebih tinggi
- npm v9 atau lebih tinggi

### Instalasi & Menjalankan Development Server

1. **Clone repositori**:
   ```bash
   git clone https://github.com/leangtg123-art/glvsowogame.git
   cd glvsowogame
   ```

2. **Instal dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan**:
   ```bash
   npm run dev
   ```

4. Buka [http://localhost:5173](http://localhost:5173) di peramban Anda.

---

## 🚀 Deployment

Repositori ini dikonfigurasi dengan alur kerja GitHub Actions otomatis. Setiap kali Anda melakukan `git push` ke branch `main`, workflow di `.github/workflows/deploy.yml` akan berjalan untuk membangun aplikasi dan menerbitkannya ke GitHub Pages di:

`https://<username>.github.io/glvsowogame/`

---

## 📄 Lisensi

Proyek ini dirilis di bawah lisensi [MIT License](LICENSE).
