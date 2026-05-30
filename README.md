# SiBoora — Implementasi Fitur Pemesanan Ruang

Repositori ini berisi implementasi fitur utama dari sistem SiBoora, yaitu alur pemesanan ruang oleh mahasiswa. Fitur yang diimplementasikan mencakup tiga halaman utama: pencarian ruang, detail ruang, dan form booking ruang.

## Fitur yang Diimplementasikan

**Cari Ruangan**
Halaman untuk mencari ruang berdasarkan beberapa filter seperti tanggal, waktu, kapasitas, dan fasilitas. Hasil pencarian ditampilkan dalam bentuk kartu yang memuat informasi singkat tiap ruangan beserta statusnya.

**Detail Ruangan**
Halaman yang menampilkan informasi lengkap suatu ruangan, termasuk deskripsi, fasilitas yang tersedia, dan jadwal ketersediaan. Mahasiswa juga dapat memilih tanggal untuk mengecek ketersediaan sebelum melanjutkan ke halaman booking.

**Booking Ruangan**
Halaman form pemesanan ruang. Mahasiswa mengisi informasi seperti waktu yang diinginkan, mata kuliah atau subjek kegiatan, dan tujuan penggunaan ruangan. Form tidak bisa dikirim jika ada field yang belum diisi.

## Teknologi yang Digunakan

- **React 19** — library utama untuk membangun antarmuka berbasis komponen
- **React Router DOM v7** — untuk navigasi antar halaman (SPA)
- **Tailwind CSS v4** — untuk styling dengan utility-class
- **Lucide React** — ikon-ikon antarmuka
- **Vite** — build tool dan development server

## Menjalankan Proyek

```bash
npm install
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`.

## Struktur Proyek

```
src/
├── components/
│   ├── rooms/       # Komponen terkait tampilan ruangan (RoomCard, ScheduleRow, dll)
│   └── ui/          # Komponen UI umum (Button, Badge, SearchFilter)
├── data/
│   └── rooms.js     # Data statis ruangan
├── layouts/
│   └── MainLayout.jsx
├── pages/
│   ├── CariRuanganPage.jsx
│   ├── DetailRuanganPage.jsx
│   └── BookingRuanganPage.jsx
├── router/
│   └── index.jsx
└── services/
    └── roomService.js  # Logika filter dan pencarian ruangan
```

Data ruangan saat ini bersifat statis (tanpa backend). Logika filter pencarian berada di `roomService.js`.
