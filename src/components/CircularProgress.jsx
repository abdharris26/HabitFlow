import PropTypes from 'prop-types';

const SIZE = 160;
const STROKE = 10;
const RADIUS = (SIZE / 2) - (STROKE / 2);
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function CircularProgress({ percentage, label, sublabel, color }) {
  const pct = Math.min(100, Math.max(0, percentage));
  const strokeOffset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;
  const strokeColor = color || (pct === 100 ? 'var(--green)' : 'var(--purple)');

  return (
    <div className="progress-ring-container" style={{ width: SIZE, height: SIZE }}>
      <svg
        className="progress-ring-svg"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
      >
        <circle
          className="progress-ring-track"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE}
        />
        <circle
          className="progress-ring-fill"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE}
          stroke={strokeColor}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeOffset}
          style={{
            transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.3s ease',
          }}
          filter={pct > 0 ? `drop-shadow(0 0 8px ${strokeColor})` : undefined}
        />
      </svg>
      <div className="progress-ring-label">
        <span
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: strokeColor,
            lineHeight: 1,
            transition: 'color 0.3s ease',
          }}
        >
          {pct}%
        </span>
        {label && (
          <span style={{ fontSize: '0.72rem', color: 'var(--text-2)', marginTop: '0.25rem', fontWeight: 500 }}>
            {label}
          </span>
        )}
        {sublabel && (
          <span style={{ fontSize: '0.65rem', color: 'var(--text-3)' }}>
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}

CircularProgress.propTypes = {
  percentage: PropTypes.number.isRequired,
  label: PropTypes.string,
  sublabel: PropTypes.string,
  color: PropTypes.string,
};

CircularProgress.defaultProps = {
  label: '',
  sublabel: '',
  color: '',
};

export default CircularProgress;
