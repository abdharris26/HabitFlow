import { useState, useMemo } from 'react';
import { Plus, Search, Sparkles, ListChecks } from 'lucide-react';
import PropTypes from 'prop-types';
import HabitCard from '../components/HabitCard';
import HabitForm from '../components/HabitForm';
import { getTodayString } from '../utils/dateUtils';

const FILTER_TABS = [
  { value: 'all',     label: 'Semua Kebiasaan' },
  { value: 'health',  label: '🫀 Kesehatan' },
  { value: 'study',   label: '📚 Belajar' },
  { value: 'fitness', label: '🏃 Olahraga' },
  { value: 'mindset', label: '🧘 Mindset' },
  { value: 'social',  label: '🤝 Sosial' },
  { value: 'finance', label: '💰 Keuangan' },
  { value: 'other',   label: '✨ Lainnya' },
];

function MyRituals({ habits, completions, onAdd, onEdit, onDelete, onToggle }) {
  const today = getTodayString();
  const todayCompletedIds = completions[today] || [];

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => {
      const matchCategory = activeFilter === 'all' || habit.category === activeFilter;
      const matchSearch = habit.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [habits, activeFilter, searchQuery]);

  const handleOpenAdd = () => {
    setEditData(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (habit) => {
    setEditData(habit);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditData(null);
  };

  const handleSubmit = (formData) => {
    if (editData) {
      onEdit({ ...editData, ...formData });
    } else {
      onAdd(formData);
    }
  };

  const handleDelete = (id) => {
    const habit = habits.find((h) => h.id === id);
    if (window.confirm(`Hapus kebiasaan "${habit?.name}"? Tindakan ini tidak dapat dibatalkan.`)) {
      onDelete(id);
    }
  };

  return (
    <div className="container page-enter">
      {/* Header Halaman */}
      <header className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="badge badge-mindset">
              <Sparkles size={12} />
              <span>KOLEKSI</span>
            </span>
            <span className="text-xs text-muted">
              {todayCompletedIds.length} dari {habits.length} kebiasaan selesai hari ini
            </span>
          </div>
          <h1 className="headline gradient-text">Kebiasaan Saya</h1>
          <p className="text-sm text-muted mt-1">
            Atur dan kelola rutinitas harian, hari kerja, dan mingguanmu.
          </p>
        </div>

        <button className="btn btn-purple" onClick={handleOpenAdd}>
          <Plus size={16} />
          <span>Tambah Kebiasaan</span>
        </button>
      </header>

      {/* Pencarian dan Tab Filter Kategori */}
      <div className="card mb-6" style={{ padding: '1.25rem' }}>
        <div className="flex flex-col gap-3">
          <div className="search-wrap">
            <Search size={16} color="var(--text-3)" />
            <input
              type="text"
              placeholder="Cari kebiasaan berdasarkan kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-tabs">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.value}
                className={`filter-tab ${activeFilter === tab.value ? 'active' : ''}`}
                onClick={() => setActiveFilter(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Daftar Kebiasaan atau Kondisi Kosong */}
      {filteredHabits.length === 0 ? (
        <div className="card">
          <div className="empty">
            <ListChecks size={44} />
            {habits.length === 0 ? (
              <>
                <h3>Belum ada kebiasaan yang dibuat</h3>
                <p>Mulai tentukan rutinitas harian pribadimu sekarang.</p>
                <button className="btn btn-purple btn-sm mt-3" onClick={handleOpenAdd}>
                  <Plus size={14} /> Buat Kebiasaan Pertama
                </button>
              </>
            ) : (
              <>
                <h3>Tidak ada kebiasaan yang cocok</h3>
                <p>Coba ubah kata kunci pencarian atau filter kategori.</p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              isCompleted={todayCompletedIds.includes(habit.id)}
              onToggle={onToggle}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
              showActions={true}
            />
          ))}
        </div>
      )}

      {/* Modal Formulir */}
      <HabitForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        editData={editData}
      />
    </div>
  );
}

MyRituals.propTypes = {
  habits: PropTypes.array.isRequired,
  completions: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default MyRituals;
