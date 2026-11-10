import { useNavigate } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="container page-enter"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '65vh',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          background: 'var(--surface-3)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          color: 'var(--purple)',
          border: '1px solid var(--border-2)',
          boxShadow: 'var(--purple-glow)',
        }}
      >
        <Compass size={40} />
      </div>

      <h1 className="display gradient-text mb-2">404</h1>
      <h2 className="title mb-3">Halaman Tidak Ditemukan</h2>
      <p className="text-sm text-muted mb-6" style={{ maxWidth: 380, lineHeight: 1.6 }}>
        Koordinat yang kamu tuju tidak ditemukan di HabitFlow.
        Silakan kembali ke rutinitas harianmu.
      </p>

      <button className="btn btn-purple" onClick={() => navigate('/')}>
        <Home size={16} /> Kembali ke Beranda
      </button>
    </div>
  );
}

export default NotFound;
