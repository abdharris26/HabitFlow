// pages/MyHabits.jsx
// Halaman My Habits — menampilkan semua kebiasaan dan fitur CRUD lengkap.
// Ini adalah halaman paling kompleks yang menggabungkan:
// - useState untuk state lokal (modal, filter, editData)
// - props untuk menerima data dan fungsi dari App.jsx
// - map() untuk render daftar
// - Conditional Rendering
// - Event handling

import { useState, useMemo } from 'react';
import { Plus, Search, ClipboardList, Filter } from 'lucide-react';
import PropTypes from 'prop-types';
import HabitCard from '../components/HabitCard';
import HabitForm from '../components/HabitForm';
import { getTodayString } from '../utils/dateUtils';

// Pilihan filter kategori (termasuk "Semua")
const FILTER_OPTIONS = [
  { value: 'all',     label: 'Semua' },
  { value: 'health',  label: '🫀 Kesehatan' },
  { value: 'study',   label: '📚 Belajar' },
  { value: 'fitness', label: '🏃 Olahraga' },
  { value: 'mindset', label: '🧘 Mindset' },
  { value: 'social',  label: '🤝 Sosial' },
  { value: 'finance', label: '💰 Keuangan' },
  { value: 'other',   label: '✨ Lainnya' },
];

/**
 * MyHabits Page
 *
 * Props dari App.jsx (Parent → Child):
 * @param {Array}    habits      - Daftar semua kebiasaan
 * @param {Object}   completions - Riwayat penyelesaian per tanggal
 * @param {Function} onAdd       - Fungsi menambah kebiasaan baru
 * @param {Function} onEdit      - Fungsi mengedit kebiasaan
 * @param {Function} onDelete    - Fungsi menghapus kebiasaan
 * @param {Function} onToggle    - Fungsi toggle selesai/belum
 */
function MyHabits({ habits, completions, onAdd, onEdit, onDelete, onToggle }) {
  const today = getTodayString();
  const todayCompletedIds = completions[today] || [];

  // ===== STATE LOKAL =====
  // useState untuk mengontrol tampilan modal — Pertemuan 10
  const [isFormOpen, setIsFormOpen]   = useState(false);
  const [editData, setEditData]       = useState(null);    // null = mode tambah, object = mode edit
  const [searchQuery, setSearchQuery] = useState('');      // Teks pencarian
  const [filterCategory, setFilterCategory] = useState('all'); // Filter kategori

  // ===== FILTER & SEARCH =====
  // useMemo: hitung daftar yang terfilter hanya saat data berubah
  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => {
      // Filter berdasarkan kategori
      const matchCategory = filterCategory === 'all' || habit.category === filterCategory;
      // Filter berdasarkan nama (case-insensitive)
      const matchSearch = habit.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [habits, filterCategory, searchQuery]);

  // ===== HANDLER FUNGSI =====

  /** Buka form untuk tambah kebiasaan baru */
  const handleOpenAdd = () => {
    setEditData(null);     // Reset ke mode tambah
    setIsFormOpen(true);
  };

  /** Buka form untuk edit kebiasaan yang ada */
  const handleOpenEdit = (habit) => {
    setEditData(habit);    // Isi form dengan data kebiasaan
    setIsFormOpen(true);
  };

  /** Tutup form */
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditData(null);
  };

  /**
   * handleSubmit: dipanggil oleh HabitForm saat form di-submit
   * Fungsi sebagai props — data mengalir dari Child (HabitForm) → ke sini → ke App.jsx
   */
  const handleSubmit = (formData) => {
    if (editData) {
      // Mode edit: panggil onEdit dari Parent (App.jsx)
      onEdit({ ...editData, ...formData });
    } else {
      // Mode tambah: panggil onAdd dari Parent (App.jsx)
      onAdd(formData);
    }
  };

  /**
   * handleDelete: konfirmasi sebelum menghapus
   */
  const handleDelete = (id) => {
    const habit = habits.find((h) => h.id === id);
    if (window.confirm(`Hapus kebiasaan "${habit?.name}"? Tindakan ini tidak bisa dibatalkan.`)) {
      onDelete(id);  // Kirim ke Parent (App.jsx) — Pertemuan 10
    }
  };

  return (
    <div className="page-container">
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between mb-4">
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>📋 My Habits</h1>
          <p>Kelola semua kebiasaanmu di sini.</p>
        </div>
        {/* Tombol tambah kebiasaan baru */}
        <button
          className="btn btn-primary"
          onClick={handleOpenAdd}
        >
          <Plus size={16} />
          Tambah
        </button>
      </div>

      {/* ===== SEARCH & FILTER ===== */}
      <div className="card mb-4" style={{ padding: '1rem 1.25rem' }}>
        <div className="flex gap-3" style={{ flexWrap: 'wrap' }}>
          {/* Search bar */}
          <div className="flex items-center gap-2 form-input" style={{ flex: '1 1 200px', padding: '0.5rem 0.875rem' }}>
            <Search size={16} color="var(--color-text-muted)" />
            <input
              type="text"
              placeholder="Cari kebiasaan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}  // onChange — Pertemuan 10
              style={{ border: 'none', outline: 'none', flex: 1, fontSize: '0.875rem', background: 'transparent' }}
            />
          </div>

          {/* Dropdown filter kategori */}
          <div className="flex items-center gap-2" style={{ flex: '1 1 180px' }}>
            <Filter size={16} color="var(--color-text-muted)" style={{ flexShrink: 0 }} />
            <select
              className="form-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{ flex: 1 }}
            >
              {/* map() untuk render pilihan filter — Pertemuan 9 */}
              {FILTER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ===== INFO JUMLAH ===== */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-muted">
          {/* Conditional Rendering berdasarkan hasil filter — Pertemuan 10 */}
          {filteredHabits.length === 0
            ? 'Tidak ada kebiasaan ditemukan'
            : `Menampilkan ${filteredHabits.length} kebiasaan`}
        </p>
        <p className="text-sm font-semibold text-primary">
          {todayCompletedIds.length}/{habits.length} selesai hari ini
        </p>
      </div>

      {/* ===== DAFTAR KEBIASAAN ===== */}
      {/* Conditional Rendering: kosong vs ada data — Pertemuan 10 */}
      {filteredHabits.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <ClipboardList size={48} />
            {/* Conditional Rendering: pesan berbeda tergantung kondisi */}
            {habits.length === 0 ? (
              <>
                <h3>Belum Ada Kebiasaan</h3>
                <p>Mulai perjalananmu dengan menambahkan kebiasaan pertama!</p>
                <button className="btn btn-primary btn-sm mt-3" onClick={handleOpenAdd}>
                  <Plus size={14} /> Tambah Kebiasaan Pertama
                </button>
              </>
            ) : (
              <>
                <h3>Tidak Ditemukan</h3>
                <p>Coba ubah kata kunci atau filter kategori.</p>
              </>
            )}
          </div>
        </div>
      ) : (
        // Render menggunakan map() — Pertemuan 9
        <div className="habits-grid">
          {filteredHabits.map((habit) => (
            // Props dikirim dari Parent (sini) ke Child (HabitCard) — Pertemuan 10
            <HabitCard
              key={habit.id}
              habit={habit}
              isCompleted={todayCompletedIds.includes(habit.id)}
              onToggle={onToggle}
              onEdit={handleOpenEdit}    // Fungsi sebagai props — Pertemuan 10
              onDelete={handleDelete}    // Fungsi sebagai props — Pertemuan 10
              showActions={true}
            />
          ))}
        </div>
      )}

      {/* ===== FORM MODAL =====
          HabitForm menerima props dari sini (Parent) — Pertemuan 10 */}
      <HabitForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        editData={editData}
      />
    </div>
  );
}

// PropTypes
MyHabits.propTypes = {
  habits: PropTypes.array.isRequired,
  completions: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default MyHabits;
