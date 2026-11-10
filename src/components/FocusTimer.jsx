import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Check, Sparkles } from 'lucide-react';
import PropTypes from 'prop-types';

const PRESETS = [
  { label: '5m Kilat', seconds: 300 },
  { label: '15m Fokus', seconds: 900 },
  { label: '25m Pomodoro', seconds: 1500 },
  { label: '45m Kerja Mendalam', seconds: 2700 },
];

function padNumber(num) {
  return String(num).padStart(2, '0');
}

function FocusTimer({ habits, todayCompletedIds, onToggle }) {
  const [duration, setDuration] = useState(1500);
  const [remaining, setRemaining] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleSelectPreset = (secs) => {
    setDuration(secs);
    setRemaining(secs);
    setIsRunning(false);
    setIsFinished(false);
  };

  const handleReset = () => {
    setRemaining(duration);
    setIsRunning(false);
    setIsFinished(false);
  };

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const progressPct = ((duration - remaining) / duration) * 100;

  const ringRadius = 78;
  const circumference = 2 * Math.PI * ringRadius;
  const ringOffset = circumference * (1 - progressPct / 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
      {/* Presets */}
      <div className="flex gap-2 flex-wrap justify-center">
        {PRESETS.map((preset) => (
          <button
            key={preset.seconds}
            className={`filter-tab ${duration === preset.seconds ? 'active' : ''}`}
            onClick={() => handleSelectPreset(preset.seconds)}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* SVG Countdown Ring */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="180" height="180" style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx="90"
            cy="90"
            r={ringRadius}
            fill="none"
            stroke="var(--surface-3)"
            strokeWidth="8"
          />
          <circle
            cx="90"
            cy="90"
            r={ringRadius}
            fill="none"
            stroke={isFinished ? 'var(--green)' : 'var(--purple)'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={ringOffset}
            style={{ transition: 'stroke-dashoffset 0.8s linear, stroke 0.3s ease' }}
            filter={`drop-shadow(0 0 8px ${isFinished ? 'var(--green)' : 'var(--purple)'})`}
          />
        </svg>

        <div style={{ position: 'absolute', textAlign: 'center' }}>
          <div
            className="timer-display"
            style={{ color: isFinished ? 'var(--green)' : 'var(--text)' }}
          >
            {padNumber(minutes)}:{padNumber(seconds)}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginTop: '0.25rem', fontWeight: 500 }}>
            {isFinished ? 'Sesi Selesai!' : isRunning ? 'Sedang Fokus' : 'Siap'}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="timer-controls">
        <button
          className="btn-icon"
          onClick={handleReset}
          aria-label="Atur ulang timer"
          title="Atur Ulang"
        >
          <RotateCcw size={16} />
        </button>

        <button
          className={`btn ${isRunning ? 'btn-ghost' : 'btn-purple'}`}
          style={{ minWidth: 130 }}
          onClick={() => {
            setIsRunning((prev) => !prev);
            setIsFinished(false);
          }}
        >
          {isRunning ? (
            <>
              <Pause size={16} /> Jeda
            </>
          ) : (
            <>
              <Play size={16} /> {remaining < duration ? 'Lanjutkan' : 'Mulai Fokus'}
            </>
          )}
        </button>
      </div>

      {/* Post-Session Habit Completion Action */}
      {isFinished && habits.length > 0 && (
        <div
          className="card card-glow-green w-full mt-2"
          style={{ padding: '1rem', background: 'var(--surface-2)', textAlign: 'left' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-green" />
            <h4 className="title" style={{ fontSize: '0.875rem' }}>
              Sesi selesai! Tandai kebiasaan yang tuntas:
            </h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {habits.map((h) => {
              const done = todayCompletedIds.includes(h.id);
              return (
                <button
                  key={h.id}
                  className={`btn ${done ? 'btn-ghost' : 'btn-green'} btn-sm justify-between w-full`}
                  onClick={() => onToggle(h.id)}
                  style={{ textAlign: 'left' }}
                >
                  <span className="truncate">{h.name}</span>
                  {done ? <Check size={14} className="text-green" /> : <span>+ Selesai</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

FocusTimer.propTypes = {
  habits: PropTypes.array.isRequired,
  todayCompletedIds: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default FocusTimer;
