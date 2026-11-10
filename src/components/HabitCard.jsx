import { Check, Pencil, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';

const CATEGORY_MAP = {
  health:  { label: 'Kesehatan', cls: 'badge-health' },
  study:   { label: 'Belajar',   cls: 'badge-study' },
  fitness: { label: 'Olahraga',  cls: 'badge-fitness' },
  mindset: { label: 'Mindset',  cls: 'badge-mindset' },
  social:  { label: 'Sosial',   cls: 'badge-social' },
  finance: { label: 'Keuangan', cls: 'badge-finance' },
  other:   { label: 'Lainnya',  cls: 'badge-other' },
};

const FREQ_MAP = {
  daily:   'Harian',
  weekday: 'Hari Kerja',
  weekly:  'Mingguan',
};

function HabitCard({ habit, isCompleted, onToggle, onEdit, onDelete, showActions }) {
  const categoryConfig = CATEGORY_MAP[habit.category] || CATEGORY_MAP.other;
  const freqLabel = FREQ_MAP[habit.frequency] || 'Harian';

  return (
    <div className={`ritual-card ${isCompleted ? 'done' : ''}`}>
      <button
        className={`check-btn ${isCompleted ? 'checked' : ''}`}
        onClick={() => onToggle(habit.id)}
        aria-label={isCompleted ? `Tandai ${habit.name} belum selesai` : `Tandai ${habit.name} selesai`}
      >
        {isCompleted && <Check size={14} strokeWidth={3} />}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`ritual-name ${isCompleted ? 'done-text' : ''}`}>
          {habit.name}
        </p>
        <div className="flex gap-2 mt-1 flex-wrap">
          <span className={`badge ${categoryConfig.cls}`}>
            {categoryConfig.label}
          </span>
          <span className="badge badge-other">
            {freqLabel}
          </span>
        </div>
      </div>

      {showActions && (
        <div className="flex gap-2">
          <button
            className="btn-icon edit"
            onClick={() => onEdit(habit)}
            aria-label={`Ubah ${habit.name}`}
            title="Ubah kebiasaan"
          >
            <Pencil size={14} />
          </button>
          <button
            className="btn-icon danger"
            onClick={() => onDelete(habit.id)}
            aria-label={`Hapus ${habit.name}`}
            title="Hapus kebiasaan"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

HabitCard.propTypes = {
  habit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    frequency: PropTypes.string.isRequired,
  }).isRequired,
  isCompleted: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  showActions: PropTypes.bool,
};

HabitCard.defaultProps = {
  showActions: false,
  onEdit: () => {},
  onDelete: () => {},
};

export default HabitCard;
