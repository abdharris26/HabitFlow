import { useMemo } from 'react';
import { FlaskConical, Award, Timer, Calendar, TrendingUp } from 'lucide-react';
import PropTypes from 'prop-types';
import FocusTimer from '../components/FocusTimer';
import ConsistencyCalendar from '../components/ConsistencyCalendar';
import AchievementBadge from '../components/AchievementBadge';
import { getTodayString, getLastNDays, getDayName } from '../utils/dateUtils';
import { getPlantStage } from '../components/PlantVisual';

function ProgressLab({ habits, completions, onToggle }) {
  const today = getTodayString();
  const todayCompletedIds = completions[today] || [];
  const totalHabits = habits.length;

  const last7Days = useMemo(() => getLastNDays(7), []);

  const weeklyData = useMemo(() => {
    return last7Days.map((date) => {
      const done = (completions[date] || []).length;
      const pct = totalHabits > 0 ? Math.round((done / totalHabits) * 100) : 0;
      return {
        date,
        label: getDayName(date),
        pct,
        isToday: date === today,
      };
    });
  }, [last7Days, completions, totalHabits, today]);

  const achievements = useMemo(() => {
    const hasHabit = totalHabits > 0;

    let hadPerfectDay = false;
    Object.values(completions).forEach((ids) => {
      if (totalHabits > 0 && ids.length >= totalHabits) {
        hadPerfectDay = true;
      }
    });

    let currentStreak = 0;
    if (totalHabits > 0) {
      for (let i = 1; i <= 30; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const dateKey = `${y}-${m}-${day}`;
        const done = (completions[dateKey] || []).length;
        if (done === totalHabits) {
          currentStreak++;
        } else {
          break;
        }
      }
    }

    let hasGrowingPlant = false;
    habits.forEach((h) => {
      let count = 0;
      Object.values(completions).forEach((list) => {
        if (list.includes(h.id)) count++;
      });
      if (getPlantStage(count) >= 1) hasGrowingPlant = true;
    });

    return [
      {
        id: 'first-habit',
        icon: '🌱',
        title: 'Langkah Pertama',
        desc: 'Membuat kebiasaan harian pertamamu.',
        hint: 'Tambahkan kebiasaan pertamamu di Kebiasaan Saya.',
        unlocked: hasHabit,
      },
      {
        id: 'perfect-day',
        icon: '✨',
        title: 'Hari Sempurna',
        desc: 'Menyelesaikan 100% dari seluruh kebiasaan dalam satu hari.',
        hint: 'Tuntaskan semua kebiasaan hari ini.',
        unlocked: hadPerfectDay,
      },
      {
        id: 'streak-3',
        icon: '🔥',
        title: 'Konsistensi 3 Hari',
        desc: 'Mempertahankan rekor 100% selesai selama 3 hari berturut-turut.',
        hint: 'Capai 100% penyelesaian selama 3 hari beruntun.',
        unlocked: currentStreak >= 3,
      },
      {
        id: 'streak-7',
        icon: '⚡',
        title: 'Konsistensi 7 Hari',
        desc: 'Mempertahankan rekor 100% selesai selama 7 hari berturut-turut.',
        hint: 'Capai 100% penyelesaian selama 7 hari beruntun.',
        unlocked: currentStreak >= 7,
      },
      {
        id: 'sprout',
        icon: '🌿',
        title: 'Tangan Dingin',
        desc: 'Merawat tanaman di taman hingga melewati tahap benih.',
        hint: 'Selesaikan kebiasaan apa pun minimal sekali hingga bertunas.',
        unlocked: hasGrowingPlant,
      },
      {
        id: 'master',
        icon: '👑',
        title: 'Master Kebiasaan',
        desc: 'Membangun rutinitas aktif dengan 5 atau lebih kebiasaan.',
        hint: 'Bangun sistem yang terdiri dari 5 kebiasaan atau lebih.',
        unlocked: totalHabits >= 5,
      },
    ];
  }, [totalHabits, completions, habits]);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="container page-enter">
      {/* Header Halaman */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="badge badge-mindset">
            <FlaskConical size={12} />
            <span>LABORATORIUM & METRIK</span>
          </span>
          <span className="text-xs text-muted">
            {unlockedCount} dari {achievements.length} pencapaian terbuka
          </span>
        </div>
        <h1 className="display gradient-text mb-3">
          Statistik.
        </h1>
        <p className="text-muted" style={{ maxWidth: 560 }}>
          Ukur konsistensi, masuki sesi fokus mendalam, dan buka
          lencana pencapaian seiring kebiasaanmu mengakar kuat.
        </p>
      </header>

      {/* Grid: Mode Fokus + Grafik Kecepatan */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        {/* Timer Fokus */}
        <div className="card card-glow-purple flex flex-col justify-between" style={{ padding: '2rem 1.5rem' }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Timer size={18} className="text-purple" />
              <span className="label text-purple">Mode Interaktif</span>
            </div>
            <h2 className="title mb-4">Sesi Fokus</h2>
          </div>

          <FocusTimer
            habits={habits}
            todayCompletedIds={todayCompletedIds}
            onToggle={onToggle}
          />
        </div>

        {/* Grafik Tren 7 Hari */}
        <div className="card flex flex-col justify-between" style={{ padding: '2rem 1.5rem' }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={18} className="text-blue" />
              <span className="label text-blue">Kecepatan</span>
            </div>
            <h2 className="title mb-4">Tingkat Penyelesaian 7 Hari</h2>
          </div>

          {totalHabits === 0 ? (
            <div className="empty">
              <p>Tambahkan kebiasaan untuk mengisi grafik kecepatan.</p>
            </div>
          ) : (
            <div>
              <div className="bar-chart mb-3">
                {weeklyData.map((d) => (
                  <div key={d.date} className="bar-col" title={`${d.label} (${d.date}): ${d.pct}%`}>
                    <div className="bar-bg">
                      <div
                        className={`bar-fill ${d.isToday ? 'today' : ''}`}
                        style={{ height: `${d.pct}%` }}
                      />
                    </div>
                    <span className="bar-day" style={{ color: d.isToday ? 'var(--green)' : undefined }}>
                      {d.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-muted mt-4">
                <span>Tinggi batang mencerminkan % kebiasaan tuntas</span>
                <span className="text-green font-semibold">■ Hari Ini</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Matriks Konsistensi (Heat-grid) */}
      <section className="card mb-8">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={18} className="text-green" />
              <span className="label text-green">Kalender Konsistensi</span>
            </div>
            <h2 className="title">Matriks Konsistensi 35 Hari</h2>
          </div>
          <span className="text-xs text-muted">Kerapatan penyelesaian harian</span>
        </div>

        <ConsistencyCalendar habits={habits} completions={completions} />
      </section>

      {/* Grid Pencapaian / Lencana */}
      <section className="card">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Award size={18} className="text-amber" />
              <span className="label text-amber">Tonggak Pencapaian</span>
            </div>
            <h2 className="title">Lencana Kehormatan</h2>
          </div>
          <span className="text-xs text-amber font-semibold">
            {unlockedCount}/{achievements.length} Terbuka
          </span>
        </div>

        <div className="achievement-grid">
          {achievements.map((ach) => (
            <AchievementBadge key={ach.id} achievement={ach} />
          ))}
        </div>
      </section>
    </div>
  );
}

ProgressLab.propTypes = {
  habits: PropTypes.array.isRequired,
  completions: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ProgressLab;
