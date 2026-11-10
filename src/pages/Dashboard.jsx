// pages/Dashboard.jsx
// Halaman Dashboard — halaman utama yang menampilkan ringkasan kebiasaan hari ini.
// Menerima data habits dan completions dari App.jsx melalui props.

import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ListChecks,
  CheckCircle2,
  TrendingUp,
  Flame,
  ArrowRight,
  ClipboardList,
} from 'lucide-react';
import PropTypes from 'prop-types';
import StatCard from '../components/StatCard';
import ProgressCard from '../components/ProgressCard';
import HabitCard from '../components/HabitCard';
import { getTodayString, formatDate } from '../utils/dateUtils';

/**
 * Dashboard Page
 *
 * Props dari App.jsx (Parent → Child):
 * @param {Array}    habits      - Daftar semua kebiasaan
 * @param {Object}   completions - { "YYYY-MM-DD": ["id1", "id2", ...] }
 * @param {Function} onToggle    - Fungsi untuk toggle kebiasaan selesai
 */
function Dashboard({ habits, completions, onToggle }) {
  const today = getTodayString();

  // IDs kebiasaan yang sudah selesai hari ini
  const todayCompletedIds = completions[today] || [];

  // useMemo: hitung statistik hanya ketika habits atau completions berubah
  const stats = useMemo(() => {
    const total = habits.length;
    const completed = todayCompletedIds.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Hitung streak: berapa hari berturut-turut semua kebiasaan selesai 100%
    // (Implementasi sederhana — cek 7 hari terakhir)
    let streak = 0;
    if (total > 0) {
      for (let i = 1; i <= 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const dayCompleted = (completions[dateStr] || []).length;
        if (dayCompleted === total && total > 0) streak++;
        else break;
      }
    }

    return { total, completed, percentage, streak };
  }, [habits, todayCompletedIds, completions]);

  // Ambil jam untuk sapaan
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Selamat Pagi' :
    hour < 15 ? 'Selamat Siang' :
    hour < 18 ? 'Selamat Sore' :
    'Selamat Malam';

  return (
    <div className="page-container">
      {/* ===== HEADER SAPAAN ===== */}
      <div className="page-header">
        <h1>👋 {greeting}!</h1>
        <p>{formatDate(today)} — Yuk cek kebiasaanmu hari ini.</p>
      </div>

      {/* ===== STAT CARDS =====
          Menggunakan map() untuk render kartu statistik — Pertemuan 9
          Data dikirim sebagai props ke StatCard — Pertemuan 10 */}
      <div className="stats-grid">
        <StatCard
          value={stats.total}
          label="Total Kebiasaan"
          icon={<ListChecks size={22} />}
          color="#7C3AED"
          bgColor="#EDE9FE"
        />
        <StatCard
          value={stats.completed}
          label="Selesai Hari Ini"
          icon={<CheckCircle2 size={22} />}
          color="#10B981"
          bgColor="#D1FAE5"
        />
        <StatCard
          value={`${stats.percentage}%`}
          label="Progres Harian"
          icon={<TrendingUp size={22} />}
          color="#6D28D9"
          bgColor="#DDD6FE"
        />
        <StatCard
          value={stats.streak}
          label="Hari Beruntun 🔥"
          icon={<Flame size={22} />}
          color="#F59E0B"
          bgColor="#FEF3C7"
        />
      </div>

      {/* ===== PROGRESS BAR =====
          Data dikirim sebagai props ke ProgressCard — Pertemuan 10 */}
      <ProgressCard
        percentage={stats.percentage}
        completed={stats.completed}
        total={stats.total}
        title="Progres Hari Ini"
      />

      {/* ===== DAFTAR KEBIASAAN HARI INI ===== */}
      <div className="card mt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold" style={{ fontSize: '1rem' }}>
            📋 Kebiasaan Hari Ini
          </h2>
          {/* Link ke halaman My Habits — React Router — Pertemuan 11 */}
          <Link
            to="/habits"
            className="btn btn-secondary btn-sm flex items-center gap-2"
          >
            Kelola <ArrowRight size={14} />
          </Link>
        </div>

        {/* Conditional Rendering: tampilan berbeda tergantung kondisi data — Pertemuan 10 */}
        {habits.length === 0 ? (
          // Kondisi: belum ada kebiasaan sama sekali
          <div className="empty-state">
            <ClipboardList size={48} />
            <h3>Belum Ada Kebiasaan</h3>
            <p>Tambahkan kebiasaan pertamamu di halaman My Habits.</p>
            <Link to="/habits" className="btn btn-primary btn-sm mt-3">
              Tambah Sekarang
            </Link>
          </div>
        ) : (
          // Kondisi: ada kebiasaan — render menggunakan map() — Pertemuan 9
          <div className="habits-grid">
            {habits.map((habit) => (
              // HabitCard adalah reusable component — Pertemuan 9
              // Data dikirim melalui props — Pertemuan 10
              // Fungsi onToggle dikirim sebagai props (fungsi sebagai props) — Pertemuan 10
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
    </div>
  );
}

// PropTypes
Dashboard.propTypes = {
  habits: PropTypes.array.isRequired,
  completions: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Dashboard;
