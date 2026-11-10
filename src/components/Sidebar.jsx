// components/Sidebar.jsx
// Komponen Sidebar — navigasi utama yang tampil di sisi kiri layar (desktop).
// Menggunakan NavLink dari React Router untuk navigasi tanpa reload halaman.

import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ListChecks,
  BarChart3,
  Info,
  Zap,
  X,
} from 'lucide-react';
import PropTypes from 'prop-types';

// ===== DATA NAVIGASI =====
// Dibuat sebagai array agar bisa di-render menggunakan map() — Pertemuan 9
const navItems = [
  {
    label: 'Dashboard',
    to: '/',
    icon: LayoutDashboard,
  },
  {
    label: 'My Habits',
    to: '/habits',
    icon: ListChecks,
  },
  {
    label: 'Statistics',
    to: '/statistics',
    icon: BarChart3,
  },
  {
    label: 'About',
    to: '/about',
    icon: Info,
  },
];

/**
 * Sidebar Component
 *
 * Props yang diterima dari App.jsx (Parent → Child):
 * @param {boolean} isOpen - apakah sidebar terbuka di mobile
 * @param {Function} onClose - fungsi untuk menutup sidebar (Child mengirim event ke Parent)
 */
function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay gelap saat sidebar terbuka di mobile */}
      {/* Conditional Rendering: hanya tampil saat isOpen = true — Pertemuan 10 */}
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}  // Event handling: onClick — Pertemuan 10
        aria-hidden="true"
      />

      {/* Sidebar utama */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Logo / Brand */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Zap size={20} />
          </div>
          <div className="sidebar-logo-text">
            <h1>HabitFlow</h1>
            <p>Habit Tracker</p>
          </div>
          {/* Tombol tutup hanya tampil di mobile */}
          <button
            className="icon-btn"
            onClick={onClose}
            aria-label="Tutup menu"
            style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.5)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigasi */}
        <nav className="sidebar-nav">
          <span className="nav-label">Menu</span>

          {/* map() untuk merender daftar menu secara dinamis — Pertemuan 9 */}
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              // NavLink: menambahkan class 'active' secara otomatis — Pertemuan 11
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}  // 'end' memastikan '/' hanya aktif di halaman home
                className={({ isActive }) =>
                  `nav-item ${isActive ? 'active' : ''}`
                }
                onClick={onClose}  // Tutup sidebar saat link diklik (mobile)
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer sidebar */}
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">M</div>
            <div className="sidebar-user-info">
              <p>Mahasiswa DPW</p>
              <span>Praktikum Aktif</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// PropTypes: validasi tipe props — Pertemuan 10
Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
