import PropTypes from 'prop-types';
import { getLastNDays, getTodayString } from '../utils/dateUtils';

function ConsistencyCalendar({ habits, completions }) {
  const days = getLastNDays(35);
  const today = getTodayString();
  const total = habits.length;

  const getPercentage = (date) => {
    if (total === 0) return 0;
    const doneCount = (completions[date] || []).length;
    return Math.round((doneCount / total) * 100);
  };

  const getIntensity = (pct) => {
    if (pct === 0) return '0';
    if (pct <= 33) return 'low';
    if (pct <= 66) return 'mid';
    return 'hi';
  };

  const weekDays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          marginBottom: '6px',
        }}
      >
        {weekDays.map((d) => (
          <div
            key={d}
            style={{
              fontSize: '0.65rem',
              color: 'var(--text-3)',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="cal-grid">
        {days.map((date) => {
          const pct = getPercentage(date);
          const intensity = getIntensity(pct);
          const isToday = date === today;

          return (
            <div
              key={date}
              className={`cal-day ${isToday ? 'today' : ''}`}
              data-pct={intensity}
              title={`${date}: ${pct}% selesai (${(completions[date] || []).length}/${total})`}
            />
          );
        })}
      </div>

      <div className="flex items-center gap-2 mt-4" style={{ fontSize: '0.7rem', color: 'var(--text-3)' }}>
        <span>Kurang konsisten</span>
        <div style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--surface-3)' }} />
        <div style={{ width: 12, height: 12, borderRadius: 3, background: 'rgba(0,255,135,0.2)' }} />
        <div style={{ width: 12, height: 12, borderRadius: 3, background: 'rgba(0,255,135,0.5)' }} />
        <div style={{ width: 12, height: 12, borderRadius: 3, background: 'rgba(0,255,135,0.85)' }} />
        <span>Sangat konsisten</span>
      </div>
    </div>
  );
}

ConsistencyCalendar.propTypes = {
  habits: PropTypes.array.isRequired,
  completions: PropTypes.object.isRequired,
};

export default ConsistencyCalendar;
