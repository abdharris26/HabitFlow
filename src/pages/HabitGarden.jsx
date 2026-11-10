import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Sparkles, Droplets, ArrowRight } from 'lucide-react';
import PropTypes from 'prop-types';
import PlantVisual, { getPlantStage, STAGE_LABELS } from '../components/PlantVisual';
import { getTodayString } from '../utils/dateUtils';

function HabitGarden({ habits, completions, onToggle }) {
  const today = getTodayString();
  const todayCompletedIds = completions[today] || [];
  const [selectedPlant, setSelectedPlant] = useState(null);

  const gardenData = useMemo(() => {
    let totalVitality = 0;
    let bloomingCount = 0;

    const plants = habits.map((habit) => {
      let timesCompleted = 0;
      Object.values(completions).forEach((dayList) => {
        if (dayList.includes(habit.id)) {
          timesCompleted++;
        }
      });

      const stage = getPlantStage(timesCompleted);
      const isDoneToday = todayCompletedIds.includes(habit.id);

      if (stage === 4) bloomingCount++;
      totalVitality += timesCompleted * 10;

      const thresholds = [1, 6, 12, 21];
      const nextThreshold = stage < 4 ? thresholds[stage] : thresholds[3];
      const remainingForNext = stage < 4 ? Math.max(0, nextThreshold - timesCompleted) : 0;

      return {
        ...habit,
        timesCompleted,
        stage,
        stageLabel: STAGE_LABELS[stage],
        isDoneToday,
        remainingForNext,
      };
    });

    return { plants, totalVitality, bloomingCount };
  }, [habits, completions, todayCompletedIds]);

  return (
    <div className="container page-enter">
      {/* Header Halaman */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="badge badge-health">
            <Leaf size={12} />
            <span>EKOLOGI GAMIFIKASI</span>
          </span>
          <span className="text-xs text-muted">
            {gardenData.bloomingCount} dari {habits.length} tanaman mekar sempurna
          </span>
        </div>
        <h1 className="display gradient-text-green mb-3">
          Taman Kebiasaan.
        </h1>
        <p className="text-muted" style={{ maxWidth: 560 }}>
          Konsistensi harianmu secara langsung mewujud sebagai tanaman digital hidup.
          Setiap kebiasaan yang kamu rawat berevolusi dari benih sederhana hingga mekar sempurna.
        </p>
      </header>

      {/* Kartu Ringkasan Vitalitas */}
      <section className="card card-glow-green mb-8" style={{ padding: '1.75rem' }}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 'var(--r-md)',
                background: 'var(--green-dim)',
                border: '1px solid rgba(0,255,135,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--green)',
                boxShadow: 'var(--green-glow)',
              }}
            >
              <Droplets size={26} />
            </div>
            <div>
              <span className="label text-green">Kesehatan Taman</span>
              <h2 className="title" style={{ fontSize: '1.4rem' }}>
                {gardenData.totalVitality} Poin Vitalitas
              </h2>
              <p className="text-xs text-muted mt-1">
                Disiram oleh konsistensi rutinitas harianmu.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="stat-box" style={{ minWidth: 110 }}>
              <span className="label">Jumlah Tanaman</span>
              <div className="stat-value text-green">{habits.length}</div>
            </div>
            <div className="stat-box" style={{ minWidth: 110 }}>
              <span className="label">Mekar Sempurna</span>
              <div className="stat-value text-amber">{gardenData.bloomingCount}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Tanaman atau Kondisi Kosong */}
      {habits.length === 0 ? (
        <div className="card">
          <div className="empty">
            <Leaf size={46} />
            <h3>Tamanmu masih kosong</h3>
            <p>Tanam kebiasaan pertamamu di Kebiasaan Saya untuk mulai menumbuhkan tamanmu.</p>
            <Link to="/rituals" className="btn btn-green btn-sm mt-3">
              Tanam Kebiasaan Baru <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="garden-grid">
          {gardenData.plants.map((plant) => (
            <div
              key={plant.id}
              className={`plant-card ${plant.stage === 4 ? 'blooming' : ''}`}
              onClick={() => setSelectedPlant(plant)}
            >
              <div style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PlantVisual stage={plant.stage} />
              </div>

              <div>
                <span className="plant-stage-label">{plant.stageLabel}</span>
                <p className="plant-name truncate" style={{ maxWidth: 150 }}>
                  {plant.name}
                </p>
              </div>

              <div className="flex items-center justify-between w-full mt-2" style={{ borderTop: '1px solid var(--border)', paddingTop: '0.6rem' }}>
                <span className="text-xs text-muted">
                  {plant.timesCompleted} kali
                </span>

                <button
                  className={`btn-icon ${plant.isDoneToday ? 'check-btn checked' : ''}`}
                  style={{ width: 28, height: 28 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle(plant.id);
                  }}
                  title={plant.isDoneToday ? 'Disiram hari ini (klik untuk batal)' : 'Siram tanaman hari ini'}
                >
                  <Droplets size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Panduan Tahap Evolusi */}
      <section className="card mt-8" style={{ background: 'var(--surface-2)' }}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-green" />
          <h3 className="title">Tahap Evolusi</h3>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1rem',
          }}
        >
          {STAGE_LABELS.map((label, idx) => (
            <div
              key={label}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-md)',
                padding: '0.875rem',
                textAlign: 'center',
              }}
            >
              <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                <PlantVisual stage={idx} />
              </div>
              <h4 className="font-semibold text-xs text-green">{label}</h4>
              <p className="text-xs text-muted mt-1">
                {idx === 0
                  ? '0 penyelesaian'
                  : idx === 1
                  ? '1-5 penyelesaian'
                  : idx === 2
                  ? '6-11 penyelesaian'
                  : idx === 3
                  ? '12-20 penyelesaian'
                  : '21+ penyelesaian'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Detail Tanaman */}
      {selectedPlant && (
        <div className="modal-overlay" onClick={() => setSelectedPlant(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-center text-center gap-3">
              <div style={{ height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PlantVisual stage={selectedPlant.stage} />
              </div>

              <span className="badge badge-health">{selectedPlant.stageLabel}</span>
              <h2 className="title">{selectedPlant.name}</h2>

              <p className="text-sm text-muted">
                {selectedPlant.stage === 4
                  ? 'Tanaman ini telah mencapai tahap mekar sempurna dengan lebih dari 21 penyelesaian! Terus rawat kebiasaan ini.'
                  : `Saat ini telah dirawat ${selectedPlant.timesCompleted} kali. Membutuhkan ${selectedPlant.remainingForNext} penyelesaian lagi untuk mencapai tahap berikutnya.`}
              </p>

              <div className="flex gap-3 w-full mt-4">
                <button
                  className="btn btn-ghost flex-1"
                  onClick={() => setSelectedPlant(null)}
                >
                  Tutup
                </button>
                <button
                  className={`btn ${selectedPlant.isDoneToday ? 'btn-ghost' : 'btn-green'} flex-1`}
                  onClick={() => {
                    onToggle(selectedPlant.id);
                    setSelectedPlant(null);
                  }}
                >
                  {selectedPlant.isDoneToday ? 'Batal Siram' : 'Siram Hari Ini 🌱'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

HabitGarden.propTypes = {
  habits: PropTypes.array.isRequired,
  completions: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default HabitGarden;
