# 🎮 MathBlitz — Math Adventure & Cognitive Training Platform

> **Game Petualangan Matematika & Pelatihan Kognitif Interaktif** terinspirasi oleh visual RPG ala [Codédex](https://www.codedex.io/) dan filosofi konkret sensori **Montessori CPA (Concrete-Pictorial-Abstract)**, ditenagai oleh **Google Gemini AI** dan **Smart Procedural Math Engine**.

---

## 🌟 Fitur Utama

### 1. 🗺️ 5-Stage RPG Math Adventure (Codédex Inspired)
- **Zero Login Frictionless Gameplay**: Pemain (termasuk anak-anak) dapat langsung bermain instan tanpa registrasi/login; semua progres (XP, Level, Koin, Heart HP, Daily Streak, Lencana) tersimpan otomatis di `localStorage`.
- **5 Dunia Petualangan Bertingkat**:
  1. **🏝️ Stage 1 — Kepulauan Aritmatika & Sensori**: Batang Angka (*Number Rods*) & Manik Emas (*Golden Beads*). Boss: *Reef Math Golem*.
  2. **🌲 Stage 2 — Rimba Deret & Operator Satwa**: Deduksi tanda operator (`+`, `-`, `*`, `/`) & pola deret. Boss: *Primal Lion Titan*.
  3. **🏰 Stage 3 — Kuil Kristal Aljabar Fantasi**: Keseimbangan timbangan kristal & variabel $x$. Boss: *Mana Crystal Dragon*.
  4. **🌊 Stage 4 — Palung Samudera Estimasi & Logika**: Taksiran numerik cepat & sonar laut dalam. Boss: *Abyssal Giant Kraken*.
  5. **🚀 Stage 5 — Galaksi Kosmik & Matriks Raja Otak**: Kisi koordinat bintang & aljabar kosmik. Grand Boss: *Cosmic Brain Overlord 👑*.
- **5-Round Boss Battle Engine**: Tiap battle terdiri dari 5 tahap hitung (100 HP, berkurang 20 HP per jawaban benar) dengan sistem kombo dan deteksi HP (*Hearts*).

### 2. 🪵 Sensori Konkret Montessori CPA & Zero Math Anxiety
- **Concrete Stage**: Representasi batang merah-biru (*Number Rods*) segmen 1–10 dan balok manik emas (*Golden Beads*) satuan, puluhan, dan ratusan desimal.
- **Pictorial Stage**: Visualisasi ikon tematik (emoji kelinci, buah, kristal, kapal) yang dapat dihitung langsung oleh anak sebelum beralih ke angka abstrak.
- **Zero Math Anxiety Policy**: Tidak ada hukuman waktu yang menakutkan, dilengkapi petunjuk (*smart hints*) otomatis saat salah jawab agar anak belajar dari konsep.

### 3. ✨ AI Gemini & Multi-Thematic Question Engine
- Didukung oleh **Google Gemini 1.5 API** untuk menghasilkan narasi cerita matematika yang selalu bervariasi tanpa henti.
- Dilengkapi **Smart Procedural Fallback Engine**: Sistem tetap dapat berjalan offline 100% tanpa hambatan jika API Key belum dipasang.
- **6 Pilihan Tema Soal Dinamis**:
  - 🦊 Satwa Rimba (*Animals & Safari*)
  - 🌊 Biota Laut (*Ocean Deep*)
  - 🧑‍🍳 Master Koki (*Culinary & Cooking*)
  - 🧙‍♂️ Sihir & Kristal (*Fantasy Realm*)
  - 🛸 Penjelajah Antariksa (*Space & Cosmic*)
  - 🪵 Montessori Asli (*Sensory CPA*)

### 4. 🧠 8 Classic Cognitive Math Games
Mode permainan klasik 60 detik untuk melatih 5 pilar kognitif (*Speed, Focus, Logic, Memory, Analysis*):
- Quick Arithmetic ⚡
- Missing Operator ❓
- Algebra Balance ⚖️
- Number Sequence 📈
- Mental Estimation 🎯
- Comparison Math 🔀
- Matrix Math 🔲
- Prime Factorization 🔢

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + Vite (SPA)
- **Language**: TypeScript (Strict typing)
- **Styling**: Tailwind CSS (Dark Mode Slate/Indigo aesthetic)
- **Icons**: Lucide React
- **Audio Engine**: Native Web Audio API Sound Effects Synthesizer (Zero asset dependency)
- **Routing**: React Router v6

### Backend
- **Runtime**: Node.js + Express.js
- **Language**: TypeScript
- **ORM**: Prisma ORM
- **Database**: MySQL (`brain_trainer_db`)
- **AI Integration**: Google Generative AI SDK (`@google/genai` / REST)
- **Architecture**: Layered Architecture (`Routes → Controllers → Services → Prisma ORM`)

---

## 📁 Struktur Repositori

```text
BrainTrainer/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma        # Skema model basis data MySQL
│   ├── src/
│   │   ├── config/              # Konfigurasi database & environment
│   │   ├── controllers/         # Handler endpoint API (Gemini, Auth, Game, Montessori)
│   │   ├── middleware/          # JWT auth & validasi input
│   │   ├── routes/              # Rute endpoint REST API
│   │   ├── services/            # Logika bisnis & Gemini AI Question Generator
│   │   ├── types/               # TypeScript interfaces & DTOs
│   │   └── server.ts            # Entrypoint server Express
│   ├── .env.example             # Contoh environment backend
│   ├── .gitignore               # Aturan ignore backend
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── adventure/       # Komponen RPG (WorldMap, BattleCanvas, Navbar, Modal)
│   │   │   ├── montessori/      # Manipulatif (NumberRods, GoldenBeads, Sandbox)
│   │   │   └── games/           # 8 Game Matematika Klasik
│   │   ├── context/             # State Management (AdventureContext, MontessoriContext)
│   │   ├── pages/               # Halaman utama (Adventure, Montessori, Classic Games)
│   │   ├── services/            # AI Question Service & API clients
│   │   ├── utils/               # Audio synth SFX & helpers
│   │   ├── App.tsx              # Router & layout wrapper
│   │   └── main.tsx
│   ├── .env.example             # Contoh environment frontend
│   ├── .gitignore               # Aturan ignore frontend
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
├── .gitignore                   # Root repository gitignore
└── README.md
```

---

## 🚀 Panduan Menjalankan Proyek

### 1. Prasyarat
- [Node.js](https://nodejs.org/) (versi 18 ke atas)
- [MySQL](https://www.mysql.com/) (Opsional: via XAMPP, Docker, atau penyedia cloud)

### 2. Menjalankan Backend
```bash
# Masuk ke direktori backend
cd backend

# Install dependencies
npm install

# Buat file konfigurasi environment
cp .env.example .env
# (Opsional) Tambahkan GEMINI_API_KEY Anda di dalam .env jika ingin menggunakan AI asli

# Jalankan server dalam mode development
npm run dev
```
> Server backend akan berjalan di: **`http://localhost:5000`**

### 3. Menjalankan Frontend
```bash
# Buka terminal baru dan masuk ke direktori frontend
cd frontend

# Install dependencies
npm install

# Jalankan client dalam mode development
npm run dev
```
> Akses aplikasi web melalui browser di: **`http://localhost:5173`**

---

## 🌐 Endpoint REST API Utama

| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/api/v1/gemini/generate-questions` | Generate soal AI dinamis sesuai tipe quest, tingkat kesulitan, dan tema |
| `GET` | `/api/v1/montessori/modules` | Mengambil katalog modul manipulatif Montessori |
| `POST` | `/api/v1/auth/register` | Pendaftaran akun pengguna (opsional) |
| `POST` | `/api/v1/auth/login` | Login pengguna & penerbitan token JWT |
| `GET` | `/api/v1/game/history` | Riwayat skor dan waktu latihan kognitif |

---

## 🛡️ Keamanan & Best Practices
- **Data Privasi**: Kunci API dan rahasia database tidak pernah di-commit ke Git (dilindungi oleh `.gitignore` berlapis).
- **Graceful Offline Fallback**: Sistem permainan tidak bergantung mutlak pada ketersediaan koneksi database MySQL atau kuota API Gemini; mesin prosedural lokal akan mengambil alih secara transparan saat offline.
- **Clean Code & Type Safety**: Seluruh komponen frontend dan layanan backend menggunakan TypeScript dengan *strict type checking*.

---

## 📄 Lisensi
Proyek ini dibuat untuk keperluan portofolio edukasi kognitif dan pengembangan aplikasi fullstack modern. Bebas dikembangkan dan dimodifikasi.
