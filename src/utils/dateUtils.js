// utils/dateUtils.js
// Kumpulan fungsi pembantu (helper) untuk mengelola tanggal.
// Dipisahkan ke file tersendiri agar mudah digunakan di banyak komponen.

/**
 * getTodayString
 * Mengembalikan tanggal hari ini dalam format "YYYY-MM-DD".
 * Format ini digunakan sebagai kunci untuk menyimpan progres harian.
 *
 * @returns {string} - Contoh: "2024-01-15"
 */
export function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  // padStart memastikan bulan dan hari selalu 2 digit, misal: "01", "09"
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * formatDate
 * Mengubah string tanggal menjadi format yang lebih mudah dibaca.
 *
 * @param {string} dateString - Tanggal dalam format "YYYY-MM-DD"
 * @returns {string} - Contoh: "Senin, 15 Januari 2024"
 */
export function formatDate(dateString) {
  const date = new Date(dateString + 'T00:00:00'); // Tambah waktu agar tidak ada masalah timezone
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * getLastNDays
 * Menghasilkan array berisi string tanggal untuk N hari terakhir.
 * Digunakan untuk menampilkan statistik mingguan.
 *
 * @param {number} n - Jumlah hari
 * @returns {string[]} - Array tanggal format "YYYY-MM-DD", dari yang terlama ke terbaru
 */
export function getLastNDays(n) {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    days.push(`${year}-${month}-${day}`);
  }
  return days;
}

/**
 * getDayName
 * Mengubah string tanggal menjadi nama hari singkat dalam Bahasa Indonesia.
 *
 * @param {string} dateString - Tanggal dalam format "YYYY-MM-DD"
 * @returns {string} - Contoh: "Sen", "Sel", "Rab"
 */
export function getDayName(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('id-ID', { weekday: 'short' });
}
