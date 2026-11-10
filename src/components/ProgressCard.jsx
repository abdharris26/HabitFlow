// components/ProgressCard.jsx
// Komponen untuk menampilkan progress bar harian.
// Menerima data persentase melalui props dan menampilkan bar yang terisi sesuai nilai.

import PropTypes from 'prop-types';

/**
 * ProgressCard Component — Reusable Component (Pertemuan 9)
 *
 * Props (dikirim dari Parent — Pertemuan 10):
 * @param {number} percentage  - Persentase progres (0–100)
 * @param {number} completed   - Jumlah kebiasaan yang selesai
 * @param {number} total       - Total kebiasaan
 * @param {string} title       - Judul kartu
 */
function ProgressCard({ percentage, completed, total, title }) {
  // Pastikan persentase tidak melebihi 100 dan tidak negatif
  const safePercentage = Math.min(100, Math.max(0, percentage));

  // Conditional Rendering berdasarkan nilai persentase — Pertemuan 10
  const getProgressColor = () => {
    if (safePercentage >= 80) return 'var(--color-success)';
    if (safePercentage >= 50) return 'var(--color-primary)';
    return 'var(--color-warning)';
  };

  const getProgressMessage = () => {
    if (total === 0) return 'Belum ada kebiasaan. Yuk mulai tambahkan! 🌱';
    if (safePercentage === 100) return 'Luar biasa! Semua kebiasaan selesai hari ini! 🎉';
    if (safePercentage >= 80) return 'Hampir sempurna! Terus semangat! 💪';
    if (safePercentage >= 50) return 'Bagus! Sudah setengah jalan! 🌟';
    if (safePercentage > 0) return 'Terus berusaha! Kamu bisa! 🚀';
    return 'Ayo mulai hari ini! Satu langkah sekarang! ✨';
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold" style={{ fontSize: '1rem' }}>{title}</h2>
        <span
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: getProgressColor(),
          }}
        >
          {safePercentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{
            width: `${safePercentage}%`,
            background: `linear-gradient(90deg, ${getProgressColor()}, var(--color-accent))`,
          }}
        />
      </div>

      {/* Detail dan pesan motivasi */}
      <div className="flex items-center justify-between mt-3">
        <p className="text-sm text-muted">{getProgressMessage()}</p>
        {/* Conditional Rendering: hanya tampil jika ada kebiasaan — Pertemuan 10 */}
        {total > 0 && (
          <span className="text-sm font-semibold" style={{ color: getProgressColor() }}>
            {completed}/{total}
          </span>
        )}
      </div>
    </div>
  );
}

// PropTypes
ProgressCard.propTypes = {
  percentage: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default ProgressCard;
