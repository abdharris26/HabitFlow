// components/StatCard.jsx
// Komponen reusable untuk menampilkan sebuah kartu statistik.
// Menerima data melalui props dan menampilkannya secara konsisten.
// Contoh penggunaan: "Total Habits: 8", "Completed: 5", "Progress: 62%"

import PropTypes from 'prop-types';

/**
 * StatCard Component — Reusable Component (Pertemuan 9)
 *
 * Props (semua data dikirim dari Parent — Pertemuan 10):
 * @param {string|number} value  - Angka atau nilai yang ditampilkan besar
 * @param {string}        label  - Deskripsi singkat di bawah nilai
 * @param {ReactNode}     icon   - Ikon dari Lucide yang sudah dirender
 * @param {string}        color  - Warna tema kartu (hex atau CSS variable)
 * @param {string}        bgColor - Warna latar ikon
 */
function StatCard({ value, label, icon, color, bgColor }) {
  return (
    <div className="stat-card">
      {/* Ikon dengan warna dinamis sesuai props */}
      <div
        className="stat-card-icon"
        style={{ backgroundColor: bgColor || '#EDE9FE', color: color || 'var(--color-primary)' }}
      >
        {icon}
      </div>

      {/* Informasi statistik */}
      <div className="stat-card-info">
        <h3 style={{ color: color || 'var(--color-text-primary)' }}>{value}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
}

// PropTypes: memastikan data yang dikirim sesuai tipe yang diharapkan — Pertemuan 10
StatCard.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string,
  bgColor: PropTypes.string,
};

export default StatCard;
