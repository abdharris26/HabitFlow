import PropTypes from 'prop-types';

export function getPlantStage(completedCount) {
  if (completedCount >= 21) return 4;
  if (completedCount >= 12) return 3;
  if (completedCount >= 6)  return 2;
  if (completedCount >= 1)  return 1;
  return 0;
}

export const STAGE_LABELS = ['Benih', 'Tunas', 'Tumbuh', 'Kuncup', 'Mekar Sempurna'];

function PlantVisual({ stage }) {
  if (stage === 0) {
    return (
      <svg viewBox="0 0 80 100" className="plant-svg">
        <ellipse cx="40" cy="88" rx="26" ry="7" fill="#1f1b2e" />
        <ellipse cx="40" cy="82" rx="7" ry="5" fill="#583c28" />
        <ellipse cx="40" cy="80" rx="5" ry="3.5" fill="#7d5334" />
      </svg>
    );
  }

  if (stage === 1) {
    return (
      <svg viewBox="0 0 80 100" className="plant-svg">
        <ellipse cx="40" cy="90" rx="26" ry="7" fill="#1f1b2e" />
        <line x1="40" y1="88" x2="40" y2="68" stroke="#00FF87" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="34" cy="71" rx="8" ry="4.5" fill="#00FF87" transform="rotate(-28 34 71)" />
        <ellipse cx="46" cy="71" rx="8" ry="4.5" fill="#00FF87" transform="rotate(28 46 71)" />
      </svg>
    );
  }

  if (stage === 2) {
    return (
      <svg viewBox="0 0 80 100" className="plant-svg">
        <ellipse cx="40" cy="92" rx="28" ry="7" fill="#1f1b2e" />
        <line x1="40" y1="90" x2="40" y2="52" stroke="#00FF87" strokeWidth="3.5" strokeLinecap="round" />
        <ellipse cx="28" cy="76" rx="12" ry="5" fill="#00FF87" transform="rotate(-32 28 76)" />
        <ellipse cx="52" cy="76" rx="12" ry="5" fill="#00FF87" transform="rotate(32 52 76)" />
        <ellipse cx="31" cy="60" rx="10" ry="4.5" fill="#33FFA0" transform="rotate(-20 31 60)" />
        <ellipse cx="49" cy="60" rx="10" ry="4.5" fill="#33FFA0" transform="rotate(20 49 60)" />
      </svg>
    );
  }

  if (stage === 3) {
    return (
      <svg viewBox="0 0 80 100" className="plant-svg">
        <ellipse cx="40" cy="93" rx="28" ry="6" fill="#1f1b2e" />
        <line x1="40" y1="92" x2="40" y2="44" stroke="#00FF87" strokeWidth="3.5" strokeLinecap="round" />
        <ellipse cx="27" cy="78" rx="12" ry="5" fill="#00FF87" transform="rotate(-35 27 78)" />
        <ellipse cx="53" cy="78" rx="12" ry="5" fill="#00FF87" transform="rotate(35 53 78)" />
        <ellipse cx="29" cy="64" rx="11" ry="5" fill="#33FFA0" transform="rotate(-22 29 64)" />
        <ellipse cx="51" cy="64" rx="11" ry="5" fill="#33FFA0" transform="rotate(22 51 64)" />
        <circle cx="40" cy="38" r="9" fill="#A855F7" />
        <circle cx="40" cy="38" r="5" fill="#E9D5FF" />
      </svg>
    );
  }

  // Stage 4 — Full Bloom with neon glow
  return (
    <svg viewBox="0 0 80 100" className="plant-svg">
      <defs>
        <radialGradient id="bloomGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00FF87" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#00FF87" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="40" cy="36" r="26" fill="url(#bloomGlow)" />
      <ellipse cx="40" cy="94" rx="28" ry="6" fill="#1f1b2e" />
      <line x1="40" y1="92" x2="40" y2="42" stroke="#00FF87" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="26" cy="78" rx="13" ry="5.5" fill="#00FF87" transform="rotate(-38 26 78)" />
      <ellipse cx="54" cy="78" rx="13" ry="5.5" fill="#00FF87" transform="rotate(38 54 78)" />
      <ellipse cx="28" cy="62" rx="12" ry="5" fill="#33FFA0" transform="rotate(-22 28 62)" />
      <ellipse cx="52" cy="62" rx="12" ry="5" fill="#33FFA0" transform="rotate(22 52 62)" />
      {/* Flower petals */}
      <ellipse cx="40" cy="25" rx="5" ry="8" fill="#F472B6" />
      <ellipse cx="40" cy="47" rx="5" ry="8" fill="#F472B6" />
      <ellipse cx="26" cy="36" rx="8" ry="5" fill="#F472B6" />
      <ellipse cx="54" cy="36" rx="8" ry="5" fill="#F472B6" />
      <circle cx="40" cy="36" r="8" fill="#FBBF24" />
      <circle cx="40" cy="36" r="4.5" fill="#FFFBEB" />
    </svg>
  );
}

PlantVisual.propTypes = {
  stage: PropTypes.oneOf([0, 1, 2, 3, 4]).isRequired,
};

export default PlantVisual;
