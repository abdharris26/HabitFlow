import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';

const CATEGORIES = [
  { value: 'health',  label: '🫀 Kesehatan' },
  { value: 'study',   label: '📚 Belajar' },
  { value: 'fitness', label: '🏃 Olahraga' },
  { value: 'mindset', label: '🧘 Mindset' },
  { value: 'social',  label: '🤝 Sosial' },
  { value: 'finance', label: '💰 Keuangan' },
  { value: 'other',   label: '✨ Lainnya' },
];

const FREQUENCIES = [
  { value: 'daily',   label: 'Setiap Hari' },
  { value: 'weekday', label: 'Hari Kerja Saja' },
  { value: 'weekly',  label: 'Seminggu Sekali' },
];

const INITIAL_FORM = {
  name: '',
  category: 'health',
  frequency: 'daily',
};

function HabitForm({ isOpen, onClose, onSubmit, editData }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        category: editData.category,
        frequency: editData.frequency,
      });
    } else {
      setFormData(INITIAL_FORM);
    }
    setError('');
  }, [editData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Nama kebiasaan tidak boleh kosong.');
      return;
    }
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="title">{editData ? 'Ubah Kebiasaan' : 'Tambah Kebiasaan Baru'}</h2>
          <button
            className="btn-icon"
            onClick={onClose}
            aria-label="Tutup formulir"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="habit-name">
              Nama Kebiasaan
            </label>
            <input
              id="habit-name"
              className="form-input"
              type="text"
              name="name"
              placeholder="Contoh: Membaca buku 20 halaman"
              value={formData.name}
              onChange={handleChange}
              autoFocus
            />
            {error && (
              <span style={{ color: '#EF4444', fontSize: '0.78rem' }}>
                {error}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="habit-category">
              Kategori
            </label>
            <select
              id="habit-category"
              className="form-select"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="habit-frequency">
              Frekuensi
            </label>
            <select
              id="habit-frequency"
              className="form-select"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
            >
              {FREQUENCIES.map((freq) => (
                <option key={freq.value} value={freq.value}>
                  {freq.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              className="btn btn-ghost flex-1"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn btn-purple flex-1"
            >
              {editData ? 'Simpan Perubahan' : 'Tambah Kebiasaan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

HabitForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editData: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    frequency: PropTypes.string,
  }),
};

HabitForm.defaultProps = {
  editData: null,
};

export default HabitForm;
