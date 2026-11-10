import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  CheckCircle2,
  ListChecks,
  Sparkles,
  ArrowRight,
  Leaf,
  Timer,
  Plus,
} from 'lucide-react';
import PropTypes from 'prop-types';
import HabitCard from '../components/HabitCard';
import CircularProgress from '../components/CircularProgress';
import PlantVisual, { getPlantStage, STAGE_LABELS } from '../components/PlantVisual';
import { getTodayString, formatDate, getLastNDays } from '../utils/dateUtils';

function Home({ habits, completions, onToggle }) {
  const today = getTodayString();
  const todayCompletedIds = completions[today] || [];

  const stats = useMemo(() => {
    const total = habits.length;
    const completed = todayCompletedIds.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    let streak = 0;
    if (total > 0) {
      for (let i = 1; i <= 30; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const dateKey = `${y}-${m}-${day}`;
        const dayDone = (completions[dateKey] || []).length;
        if (dayDone === total && total > 0) {
          streak++;
        } else {
          break;
        }
      }
    }

    let lifetimeCompletions = 0;
    Object.values(completions).forEach((ids) => {
      lifetimeCompletions += ids.length;
    });

    const last7 = getLastNDays(7);
    let sum7 = 0;
    last7.forEach((d) => {
      const done = (completions[d] || []).length;
      sum7 += total > 0 ? (done / total) * 100 : 0;
    });
    const avg7 = Math.round(sum7 / 7);

    return { total, completed, percentage, streak, lifetimeCompletions, avg7 };
  }, [habits, todayCompletedIds, completions]);

  const gardenStage = getPlantStage(stats.lifetimeCompletions);

  return (
    <div className="container page-enter">
      {/* Header Utama */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="badge badge-mindset">
            <Sparkles size={12} />
            <span>RUTINITAS HARIAN</span>
          </span>
          <span className="text-xs text-muted">{formatDate(today)}</span>
        </div>

        <h1 className="display gradient-text mb-3">
          Jadikan disiplin <br />
          sebagai seni.
        </h1>
        <p className="text-muted" style={{ maxWidth: 540 }}>
          Ritual kecil yang dilakukan dengan konsisten membentuk kehidupan yang luar biasa.
          Pantau progres harianmu dan saksikan tanaman digitalmu berkembang mekar.
        </p>
      </header>

      {/* Ringkasan Progres & Statistik */}
      <section className="card card-glow-green mb-8" style={{ padding: '2rem 1.75rem' }}>
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div className="flex items-center gap-6 flex-wrap">
            <CircularProgress
              percentage={stats.percentage}
              label="Hari Ini"
              sublabel={`${stats.completed} dari ${stats.total} selesai`}
            />

            <div>
              <span className="label">Ringkasan</span>
              <h2 className="headline mt-1 mb-2">
                {stats.total === 0
                  ? 'Mulai Perjalananmu'
                  : stats.percentage === 100
                  ? 'Kesempurnaan Tercapai ✨'
                  : `${stats.percentage}% Selesai`}
              </h2>
              <p className="text-sm text-muted" style={{ maxWidth: 360 }}>
                {stats.total === 0
                  ? 'Kamu belum mendaftarkan kebiasaan apa pun. Buat kebiasaan pertamamu untuk mulai memantau.'
                  : stats.percentage === 100
                  ? 'Dedikasi yang luar biasa! Setiap kebiasaan untuk hari ini telah tuntas. Tanamanmu mendapatkan vitalitas penuh.'
                  : stats.completed > 0
                  ? `Langkah yang bagus. Hanya tersisa ${stats.total - stats.completed} kebiasaan lagi untuk mencapai 100%.`
                  : 'Awali harimu dengan kebiasaan pertama. Tindakan nyata membangkitkan motivasi.'}
              </p>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <div className="stat-box" style={{ minWidth: 120 }}>
              <div className="flex items-center gap-2 mb-1">
                <Flame size={16} className="text-amber" />
                <span className="label">Konsistensi</span>
              </div>
              <div className="stat-value text-amber">{stats.streak}h</div>
              <div className="stat-label">Hari Penuh 100%</div>
            </div>

            <div className="stat-box" style={{ minWidth: 120 }}>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 size={16} className="text-green" />
                <span className="label">Selesai Hari Ini</span>
              </div>
              <div className="stat-value text-green">
                {stats.completed}/{stats.total}
              </div>
              <div className="stat-label">Kebiasaan tuntas</div>
            </div>

            <div className="stat-box" style={{ minWidth: 120 }}>
              <div className="flex items-center gap-2 mb-1">
                <ListChecks size={16} className="text-blue" />
                <span className="label">Rata-rata 7 Hari</span>
              </div>
              <div className="stat-value text-blue">{stats.avg7}%</div>
              <div className="stat-label">Tingkat konsistensi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian Grid 2-Kolom */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {/* Kolom Kiri: Kebiasaan Hari Ini */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="label">Jadwal Hari Ini</span>
              <h2 className="title mt-1">Kebiasaan Aktif</h2>
            </div>
            <Link to="/rituals" className="btn btn-ghost btn-sm">
              Kelola Semua <ArrowRight size={14} />
            </Link>
          </div>

          {habits.length === 0 ? (
            <div className="empty">
              <ListChecks size={40} />
              <h3>Belum ada kebiasaan</h3>
              <p>Tambahkan kebiasaan pertamamu untuk mulai membangun konsistensi.</p>
              <Link to="/rituals" className="btn btn-purple btn-sm mt-2">
                <Plus size={14} /> Buat Kebiasaan
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  isCompleted={todayCompletedIds.includes(habit.id)}
                  onToggle={onToggle}
                  showActions={false}
                />
              ))}
            </div>
          )}
        </div>

        {/* Kolom Kanan: Pratinjau Interaktif */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Pratinjau Taman */}
          <div className="card card-glow-green flex items-center justify-between gap-4">
            <div>
              <span className="label text-green">Ekologi Gamifikasi</span>
              <h3 className="title mt-1 mb-1">Taman Kebiasaan</h3>
              <p className="text-xs text-muted mb-3" style={{ maxWidth: 220 }}>
                Setiap kebiasaan yang diselesaikan menutrisi tanaman digitalmu.
                Fase saat ini: <strong>{STAGE_LABELS[gardenStage]}</strong>.
              </p>
              <Link to="/garden" className="btn btn-green btn-sm">
                <Leaf size={14} /> Kunjungi Taman
              </Link>
            </div>
            <div style={{ width: 100, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PlantVisual stage={gardenStage} />
            </div>
          </div>

          {/* Pratinjau Mode Fokus */}
          <div className="card card-glow-purple flex items-center justify-between gap-4">
            <div>
              <span className="label text-purple">Kerja Mendalam</span>
              <h3 className="title mt-1 mb-1">Mode Fokus</h3>
              <p className="text-xs text-muted mb-3" style={{ maxWidth: 220 }}>
                Masuki fokus mendalam dengan sesi hitung mundur yang fleksibel.
                Padukan sprint waktu dengan kebiasaan harianmu.
              </p>
              <Link to="/lab" className="btn btn-purple btn-sm">
                <Timer size={14} /> Buka Mode Fokus
              </Link>
            </div>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: '50%',
                background: 'var(--surface-3)',
                border: '2px solid var(--purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(168,85,247,0.25)',
              }}
            >
              <Timer size={28} className="text-purple" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  habits: PropTypes.array.isRequired,
  completions: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Home;
