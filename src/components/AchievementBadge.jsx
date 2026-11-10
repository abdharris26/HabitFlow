import PropTypes from 'prop-types';

function AchievementBadge({ achievement }) {
  const { icon, title, desc, hint, unlocked } = achievement;

  return (
    <div className={`achievement-badge ${unlocked ? 'unlocked' : 'locked'}`}>
      <span className="achievement-icon">{icon}</span>
      <div className="achievement-info">
        <h4>{title}</h4>
        <p>{unlocked ? desc : hint}</p>
      </div>
    </div>
  );
}

AchievementBadge.propTypes = {
  achievement: PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    hint: PropTypes.string.isRequired,
    unlocked: PropTypes.bool.isRequired,
  }).isRequired,
};

export default AchievementBadge;
