// pages/Statistics.jsx
// Halaman Statistics — menampilkan data visual tentang progres kebiasaan.
// Menggunakan data dari props dan menghitungnya dengan useMemo.

import { useMemo } from 'react';
import {
  TrendingUp,
  CheckCircle2,
  XCircle,
  Calendar,
  Award,
} from 'lucide-react';
import PropTypes from 'prop-types';
import StatCard from '../components/StatCard';
import { getTodayString, getLastNDays, getDayName } from '../utils/dateUtils';

/**
 * Statistics Page
 *
 * Props dari App.jsx:
 * @param {Array}  habits      - Daftar semua kebiasaan
 * @param {Object} completions - Riwayat penyelesaian per tanggal
 */
function Statistics({ habits, completions }) {
  const today = getTodayString();
  const todayCompletedIds = completions[today] || [];
  // Ambil 7 hari terakhir untuk grafik mingguan
  const last7Days = getLastNDays(7);

  // ===== KALKULASI STATISTIK =====
  // useMemo agar tidak dihitung ulang setiap render
  const stats = useMemo(() => {
    const total = habits.length;
    const completedToday = todayCompletedIds.length;
    const notCompletedToday = total - completedToday;
    const percentageToday = total > 0 ? Math.round((completedToday / total) * 100) : 0;

    // Hitung rata-rata penyelesaian per hari selama 7 hari terakhir
    let totalPercentage7Days = 0;
    const dailyData = last7Days.map((date) => {
      const dayCompleted = (completions[date] || []).length;
      const pct = total > 0 ? Math.round((dayCompleted / total) * 100) : 0;
      totalPercentage7Days += pct;
      return {
        date,
        label: getDayName(date),
        completed: dayCompleted,
        total,
        percentage: pct,
        isToday: date === today,
      };
    });

    const avgWeekly = last7Days.length > 0
      ? Math.round(totalPercentage7Days / last7Days.length)
      : 0;

    // Hitung habit terbaik (paling sering selesai dalam 7 hari)
    const habitScores = habits.map((habit) => {
      const score = last7Days.filter((date) =>
        (completions[date] || []).includes(habit.id)
      ).length;
      return { ...habit, score };
    });
    habitScores.sort((a, b) => b.score - a.score);

    return {
      total,
      completedToday,
      notCompletedToday,
      percentageToday,
      avgWeekly,
      dailyData,
      topHabits: habitScores.slice(0, 3),
    };
  }, [habits, completions, today, last7Days, todayCompletedIds]);

  return (
    <div className="page-container">
      {/* ===== HEADER ===== */}
      <div className="page-header">
        <h1>📊 Statistics</h1>
        <p>Pantau perkembangan kebiasaanmu dari waktu ke waktu.</p>
      </div>

      {/* ===== STAT CARDS =====
          Komponen reusable StatCard — Pertemuan 9 & 10 */}
      <div className="stats-grid">
        <StatCard
          value={`${stats.percentageToday}%`}
          label="Selesai Hari Ini"
          icon={<TrendingUp size={22} />}
          color="#7C3AED"
          bgColor="#EDE9FE"
        />
        <StatCard
          value={stats.completedToday}
          label="Kebiasaan Selesai"
          icon={<CheckCircle2 size={22} />}
          color="#10B981"
          bgColor="#D1FAE5"
        />
        <StatCard
          value={stats.notCompletedToday}
          label="Belum Selesai"
          icon={<XCircle size={22} />}
          color="#EF4444"
          bgColor="#FEE2E2"
        />
        <StatCard
          value={`${stats.avgWeekly}%`}
          label="Rata-Rata 7 Hari"
          icon={<Calendar size={22} />}
          color="#F59E0B"
          bgColor="#FEF3C7"
        />
      </div>

      {/* ===== GRAFIK MINGGUAN ===== */}
      <div className="card mb-4">
        <h2 className="font-semibold mb-4" style={{ fontSize: '1rem' }}>
          📅 Progres 7 Hari Terakhir
        </h2>

        {/* Conditional Rendering: tampilkan grafik atau pesan kosong — Pertemuan 10 */}
        {habits.length === 0 ? (
          <div className="empty-state" style={{ padding: '2rem' }}>
            <p>Tambahkan kebiasaan untuk melihat grafik progresmu.</p>
          </div>
        ) : (
          <>
            {/* Bar Chart Sederhana */}
            <div className="weekly-chart">
              {/* map() untuk render batang per hari — Pertemuan 9 */}
              {stats.dailyData.map((day) => (
                <div
                  key={day.date}
                  className="weekly-bar-wrapper"
                  title={`${day.label}: ${day.completed}/${day.total} (${day.percentage}%)`}
                >
                  <div className="weekly-bar-bg">
                    <div
                      className="weekly-bar-fill"
                      style={{
                        height: `${day.percentage}%`,
                        // Warna berbeda untuk hari ini
                        background: day.isToday
                          ? 'linear-gradient(to top, #7C3AED, #A78BFA)'
                          : 'linear-gradient(to top, #A78BFA, #C4B5FD)',
                      }}
                    />
                  </div>
                  <span
                    className="weekly-bar-label"
                    style={{
                      color: day.isToday ? 'var(--color-primary)' : undefined,
                      fontWeight: day.isToday ? 700 : undefined,
                    }}
                  >
                    {day.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-3" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', flexWrap: 'wrap' }}>
              <span>📊 Tinggi bar = persentase kebiasaan selesai</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>■ Hari ini</span>
              <span style={{ color: 'var(--color-accent)' }}>■ Hari lain</span>
            </div>
          </>
        )}
      </div>

      {/* ===== TOP HABITS ===== */}
      <div className="card mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Award size={18} color="var(--color-warning)" />
          <h2 className="font-semibold" style={{ fontSize: '1rem' }}>
            Kebiasaan Terkonsisten (7 Hari)
          </h2>
        </div>

        {/* Conditional Rendering — Pertemuan 10 */}
        {stats.topHabits.length === 0 ? (
          <p className="text-sm text-muted">Belum ada data kebiasaan.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* map() untuk render top habits — Pertemuan 9 */}
            {stats.topHabits.map((habit, index) => {
              const pct = Math.round((habit.score / 7) * 100);
              const medals = ['🥇', '🥈', '🥉'];
              return (
                <div key={habit.id} className="flex items-center gap-3">
                  {/* Medal */}
                  <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>
                    {medals[index] || '🏅'}
                  </span>
                  {/* Info kebiasaan */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="text-sm font-semibold" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {habit.name}
                    </p>
                    <div className="progress-bar-container mt-1">
                      <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  {/* Persentase */}
                  <span className="text-sm font-bold text-primary" style={{ flexShrink: 0 }}>
                    {habit.score}/7
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ===== RINGKASAN TEKS ===== */}
      <div className="card" style={{ background: 'var(--color-primary-50)', borderColor: 'var(--color-primary-200)' }}>
        <h2 className="font-semibold mb-2" style={{ fontSize: '1rem', color: 'var(--color-primary-dark)' }}>
          💡 Ringkasan Minggu Ini
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-primary-dark)', opacity: 0.8 }}>
          {/* Conditional Rendering berdasarkan rata-rata — Pertemuan 10 */}
          {stats.avgWeekly >= 80
            ? '🌟 Luar biasa! Konsistensimu minggu ini sangat tinggi. Pertahankan!'
            : stats.avgWeekly >= 50
            ? '💪 Bagus! Kamu sudah cukup konsisten. Tingkatkan sedikit lagi!'
            : stats.avgWeekly > 0
            ? '🚀 Kamu sedang membangun fondasi. Terus semangat, perubahan butuh waktu!'
            : '🌱 Belum ada data minggu ini. Mulai tandai kebiasaanmu sekarang!'}
        </p>
      </div>
    </div>
  );
}

// PropTypes
Statistics.propTypes = {
  habits: PropTypes.array.isRequired,
  completions: PropTypes.object.isRequired,
};

export default Statistics;
