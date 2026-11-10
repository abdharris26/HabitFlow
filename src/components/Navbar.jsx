import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Zap, Home, Flame, Leaf, FlaskConical, Info, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/',        label: 'Beranda',         icon: Home,         end: true },
  { to: '/rituals', label: 'Kebiasaan Saya',  icon: Flame,        end: false },
  { to: '/garden',  label: 'Taman Kebiasaan', icon: Leaf,         end: false },
  { to: '/lab',     label: 'Statistik',       icon: FlaskConical, end: false },
  { to: '/about',   label: 'Tentang',         icon: Info,         end: false },
];

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-logo" onClick={closeDrawer}>
          <div className="nav-logo-mark">
            <Zap size={16} />
          </div>
          <span className="nav-logo-text">
            Habit<span>Flow</span>
          </span>
        </Link>

        <div className="nav-links">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={15} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        <button
          className="nav-hamburger"
          onClick={() => setDrawerOpen((prev) => !prev)}
          aria-label="Buka atau tutup menu navigasi"
        >
          {drawerOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div className={`mobile-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-overlay" onClick={closeDrawer} />
        <div className="mobile-drawer-panel">
          <button
            className="mobile-drawer-close"
            onClick={closeDrawer}
            aria-label="Tutup menu"
          >
            <X size={20} />
          </button>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`}
                onClick={closeDrawer}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Navbar;
