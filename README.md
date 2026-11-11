# 🌱 Habit Tracker

**Habit Tracker** adalah aplikasi berbasis website yang dirancang untuk membantu pengguna membangun kebiasaan positif, mencatat aktivitas sehari-hari, dan memantau perkembangan kebiasaan secara teratur.

Project ini dikembangkan menggunakan **React JS** dan **Vite** sebagai penerapan materi praktikum Desain dan Pemrograman Web (DPW).

---

## 📌 Daftar Isi

1. [Tentang Aplikasi](#tentang-aplikasi)
2. [Fitur Utama](#fitur-utama)
3. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
4. [Persyaratan Instalasi](#persyaratan-instalasi)
5. [Cara Menjalankan Project](#cara-menjalankan-project)
6. [Struktur Folder](#struktur-folder)
7. [Halaman dan Navigasi](#halaman-dan-navigasi)
8. [Penyimpanan Data](#penyimpanan-data)
9. [Penerapan Materi Praktikum](#penerapan-materi-praktikum)
10. [Perintah yang Tersedia](#perintah-yang-tersedia)

---

## 📖 Tentang Aplikasi

Habit Tracker merupakan aplikasi pencatat kebiasaan yang memungkinkan pengguna untuk membuat daftar rutinitas, mengelola aktivitas, menandai kebiasaan yang telah diselesaikan, serta melihat perkembangan dari waktu ke waktu.

Aplikasi ini memiliki beberapa halaman yang saling terhubung menggunakan React Router sehingga pengguna dapat berpindah halaman tanpa harus memuat ulang seluruh website.

Data kebiasaan disimpan menggunakan **Local Storage** pada browser sehingga aplikasi dapat menjalankan fungsi pencatatan tanpa memerlukan database atau backend.

## ✨ Fitur Utama

Berikut fitur-fitur yang tersedia pada Habit Tracker:

| Fitur | Deskripsi |
|---|---|
| **Home / Dashboard** | Menampilkan ringkasan kebiasaan dan progres harian pengguna. |
| **My Rituals** | Mengelola kebiasaan, mulai dari menambah, mengedit, menghapus, mencari, hingga menandai kebiasaan selesai. |
| **Habit Garden** | Menampilkan visualisasi taman digital yang berkembang berdasarkan aktivitas pengguna. |
| **Progress Lab** | Menampilkan statistik perkembangan, kalender konsistensi, dan pencapaian kebiasaan. |
| **Focus Timer** | Membantu pengguna mengatur waktu agar lebih fokus dalam melakukan aktivitas. |
| **About** | Menampilkan informasi mengenai aplikasi Habit Tracker. |
| **Local Storage** | Menyimpan data kebiasaan secara lokal pada browser pengguna. |

## 🛠️ Teknologi yang Digunakan

Project ini menggunakan beberapa teknologi berikut:

| Teknologi | Kegunaan |
|---|---|
| React JS | Membangun antarmuka website menggunakan komponen. |
| Vite | Menjalankan server pengembangan dan proses build. |
| JavaScript | Mengatur logika dan interaksi aplikasi. |
| React Router DOM | Mengatur navigasi antarhalaman. |
| CSS | Mengatur desain dan tampilan website. |
| Lucide React | Menyediakan ikon untuk antarmuka. |
| PropTypes | Melakukan validasi tipe data Props. |
| Local Storage | Menyimpan data pada browser. |

## 💻 Persyaratan Instalasi

Sebelum menjalankan project, pastikan perangkat sudah memiliki:

- Node.js.
- npm (terpasang bersama Node.js).
- Visual Studio Code.
- Browser seperti Google Chrome, Microsoft Edge, atau Firefox.

Untuk memastikan Node.js dan npm sudah terinstal, jalankan perintah berikut pada terminal:

```bash
node -v
npm -v
```

## 🚀 Cara Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan Habit Tracker:

**1. Download atau ekstrak project**

Ekstrak file project, kemudian buka folder `Habit_Tracker` menggunakan Visual Studio Code.

**2. Buka terminal**

Pastikan terminal berada di dalam folder utama project.

**3. Instal dependency**

Jalankan perintah:

```bash
npm install
```

**4. Jalankan aplikasi**

Setelah proses instalasi selesai, jalankan:

```bash
npm run dev
```

**5. Buka website**

Buka browser dan akses alamat yang muncul pada terminal. Biasanya:

```text
http://localhost:5173
```

Sekarang website Habit Tracker sudah dapat digunakan.

Untuk menghentikan server, tekan `Ctrl + C` pada terminal.

## 📁 Struktur Folder

Berikut struktur folder utama project Habit Tracker:

```text
Habit_Tracker/
│
├── public/
│   └── Aset statis aplikasi
│
├── src/
│   │
│   ├── components/
│   │   ├── AchievementBadge.jsx
│   │   ├── CircularProgress.jsx
│   │   ├── ConsistencyCalendar.jsx
│   │   ├── FocusTimer.jsx
│   │   ├── HabitCard.jsx
│   │   ├── HabitForm.jsx
│   │   ├── Navbar.jsx
│   │   ├── PlantVisual.jsx
│   │   ├── ProgressCard.jsx
│   │   ├── Sidebar.jsx
│   │   └── StatCard.jsx
│   │
│   ├── hooks/
│   │   └── useLocalStorage.js
│   │
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── HabitGarden.jsx
│   │   ├── Home.jsx
│   │   ├── MyRituals.jsx
│   │   ├── NotFound.jsx
│   │   └── ProgressLab.jsx
│   │
│   ├── utils/
│   │   └── dateUtils.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
└── README.md
```

**Keterangan folder:**

- `components/` : Menyimpan komponen yang dapat digunakan kembali.
- `hooks/` : Menyimpan custom hook untuk pengelolaan data.
- `pages/` : Menyimpan komponen untuk setiap halaman website.
- `utils/` : Menyimpan fungsi bantuan aplikasi.
- `App.jsx` : Mengatur komponen utama dan routing aplikasi.
- `main.jsx` : Menjadi titik awal aplikasi React.
- `index.css` : Mengatur tampilan dan desain website.

## 🧭 Halaman dan Navigasi

Website Habit Tracker memiliki beberapa halaman dengan alamat URL masing-masing.

| URL | Halaman | Fungsi |
|---|---|---|
| `/` | Home | Menampilkan ringkasan aktivitas. |
| `/rituals` | My Rituals | Mengelola daftar kebiasaan. |
| `/garden` | Habit Garden | Melihat perkembangan taman digital. |
| `/lab` | Progress Lab | Melihat statistik dan perkembangan. |
| `/about` | About | Menampilkan informasi aplikasi. |

Navigasi antarhalaman menggunakan **React Router DOM**. Alamat `/habits` akan diarahkan ke `/rituals`, sedangkan `/statistics` akan diarahkan ke `/lab`.

## 💾 Penyimpanan Data

Habit Tracker menggunakan **Local Storage** untuk menyimpan data kebiasaan pada browser pengguna.

Data utama yang disimpan adalah:

- `habitflow-habits` : Menyimpan daftar kebiasaan.
- `habitflow-completions` : Menyimpan riwayat kebiasaan yang telah diselesaikan berdasarkan tanggal.

Dengan Local Storage, data tetap tersedia ketika halaman dimuat kembali selama penyimpanan browser tidak dihapus.

**Catatan:** Data hanya tersimpan pada browser dan perangkat yang digunakan. Data belum tersinkronisasi dengan perangkat lain karena aplikasi belum menggunakan database server.

## 📚 Penerapan Materi Praktikum

Project Habit Tracker dibuat dengan menerapkan materi praktikum Desain dan Pemrograman Web, khususnya Modul 9, 10, dan 11.

### Pengenalan React

Materi yang diterapkan:

- **JSX:** Digunakan untuk membuat struktur tampilan website menggunakan sintaks JavaScript.
- **Component:** Membagi tampilan website menjadi beberapa komponen seperti Navbar, HabitCard, dan HabitForm.
- **Composition:** Menggabungkan beberapa komponen untuk membentuk halaman aplikasi.
- **map():** Digunakan untuk menampilkan daftar kebiasaan secara dinamis.

### Props dan State

Materi yang diterapkan:

- **Props:** Mengirimkan data dari komponen induk ke komponen anak.
- **State:** Menyimpan data dan kondisi yang dapat berubah.
- **useState:** Mengelola perubahan data dan tampilan aplikasi.
- **Event Handling:** Menangani interaksi pengguna seperti klik tombol, pengisian formulir, dan perubahan input.

### React Dasar-Dasar Routing

Materi yang diterapkan:

- **BrowserRouter:** Mengaktifkan sistem navigasi React Router.
- **Routes:** Menampung kumpulan rute halaman.
- **Route:** Menghubungkan alamat URL dengan komponen halaman.
- **NavLink:** Membuat navigasi dan menandai halaman yang sedang aktif.
- **Navigate:** Mengarahkan pengguna ke halaman atau URL tertentu.

### Pengembangan Tambahan

Selain materi utama dari ketiga modul, project ini juga menggunakan beberapa fitur tambahan:

- **useEffect:** Mengelola efek samping dalam komponen.
- **useMemo:** Membantu mengoptimalkan perhitungan data.
- **Custom Hook:** Menggunakan `useLocalStorage` untuk pengelolaan penyimpanan lokal.
- **PropTypes:** Memvalidasi tipe data Props.
- **Local Storage:** Menyimpan data kebiasaan pada browser.

## ⚙️ Perintah yang Tersedia

Berikut beberapa perintah yang dapat digunakan untuk mengelola project:

| Perintah | Fungsi |
|---|---|
| `npm install` | Menginstal seluruh dependency. |
| `npm run dev` | Menjalankan server pengembangan. |
| `npm run build` | Membuat hasil build untuk produksi. |
| `npm run preview` | Menampilkan preview hasil build. |
| `npm run lint` | Memeriksa kode menggunakan Oxlint. |

---

## 👨‍💻 Penutup

Habit Tracker merupakan project pengembangan aplikasi berbasis website yang dibuat sebagai penerapan materi praktikum **Desain dan Pemrograman Web (DPW)**.

Melalui project ini, diharapkan konsep React seperti Component, JSX, Props, State, Event Handling, dan React Router dapat dipahami melalui implementasi langsung dalam sebuah aplikasi.

**Terima kasih telah mengunjungi project Habit Tracker!** 🌱