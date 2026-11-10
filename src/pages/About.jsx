import { Zap, Target, Sparkles, Shield, Cpu, Compass } from 'lucide-react';

const PILLARS = [
  {
    icon: <Target size={20} className="text-purple" />,
    title: 'Arsitektur Berarah',
    desc: 'Kebiasaan tidak terbentuk hanya dari kekuatan tekad; kebiasaan memerlukan sistem yang kokoh. HabitFlow menyediakan wadah bersih untuk menstrukturkan dan mengukur komitmen harianmu.',
  },
  {
    icon: <Sparkles size={20} className="text-green" />,
    title: 'Vitalitas Gamifikasi',
    desc: 'Putaran umpan balik visual mempercepat pembentukan kebiasaan. Dengan menghubungkan disiplin ke flora digital, setiap kebiasaan yang tuntas menghasilkan pertumbuhan nyata.',
  },
  {
    icon: <Cpu size={20} className="text-blue" />,
    title: 'Tanpa Hambatan',
    desc: 'Interaksi instan tanpa login berbelit atau latensi server. Seluruh progres disinkronkan secara mulus dan aman di penyimpanan lokal perambanmu.',
  },
  {
    icon: <Shield size={20} className="text-pink" />,
    title: 'Privasi Penuh',
    desc: 'Rutinitas dan catatan pribadimu tetap tersimpan aman di perangkatmu sendiri. Tanpa pelacakan eksternal dan tanpa telemetri yang mengganggu.',
  },
];

const PHILOSOPHIES = [
  {
    quote: 'Kita tidak bangkit ke tingkat tujuan kita. Kita jatuh ke tingkat sistem yang kita bangun.',
    author: 'James Clear',
  },
  {
    quote: 'Kita adalah apa yang kita lakukan berulang kali. Maka, keunggulan bukanlah suatu tindakan, melainkan sebuah kebiasaan.',
    author: 'Will Durant',
  },
];

function About() {
  return (
    <div className="container page-enter">
      {/* Hero */}
      <header className="mb-10 text-center" style={{ maxWidth: 720, margin: '0 auto 3rem' }}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="badge badge-mindset">
            <Zap size={12} />
            <span>FILOSOFI</span>
          </span>
        </div>
        <h1 className="display gradient-text mb-4">
          Seni Membangun Kebiasaan.
        </h1>
        <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
          HabitFlow adalah pengalaman digital kreatif yang dirancang untuk mengubah disiplin
          sehari-hari menjadi sebuah seni yang memikat. Diciptakan dengan estetika editorial,
          animasi responsif, dan umpan balik ekologi gamifikasi.
        </p>
      </header>

      {/* Kutipan Filosofi */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem',
        }}
      >
        {PHILOSOPHIES.map((p, i) => (
          <div key={i} className="card card-hover" style={{ background: 'var(--surface-2)' }}>
            <p style={{ fontStyle: 'italic', color: 'var(--text)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              "{p.quote}"
            </p>
            <p className="text-xs text-muted mt-3 font-semibold">— {p.author}</p>
          </div>
        ))}
      </div>

      {/* Pilar Nilai */}
      <section className="mb-10">
        <div className="mb-4">
          <span className="label text-purple">Fondasi Utama</span>
          <h2 className="headline mt-1">Prinsip Desain & Rekayasa</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
          }}
        >
          {PILLARS.map((item, idx) => (
            <div key={idx} className="card card-hover">
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 'var(--r-sm)',
                  background: 'var(--surface-3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                {item.icon}
              </div>
              <h3 className="title mb-2" style={{ fontSize: '0.95rem' }}>
                {item.title}
              </h3>
              <p className="text-xs text-muted" style={{ lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Spesifikasi Arsitektur */}
      <section className="card mb-8" style={{ borderLeft: '3px solid var(--purple)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Compass size={18} className="text-purple" />
          <h3 className="title">Arsitektur Sistem</h3>
        </div>
        <p className="text-sm text-muted mb-4">
          Dibangun sebagai Single Page Application (SPA) modern yang memanfaatkan model komponen React,
          pencocokan rute di sisi klien, dan manajemen state yang modular.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          <div>
            <h4 className="label text-green mb-1">Mesin Utama</h4>
            <p className="text-xs text-muted">React.js, Vite build toolchain</p>
          </div>
          <div>
            <h4 className="label text-purple mb-1">Navigasi</h4>
            <p className="text-xs text-muted">React Router (Navigasi Klien Deklaratif)</p>
          </div>
          <div>
            <h4 className="label text-blue mb-1">Penyimpanan</h4>
            <p className="text-xs text-muted">Web Storage API (State lokal seketika)</p>
          </div>
          <div>
            <h4 className="label text-pink mb-1">Arah Visual</h4>
            <p className="text-xs text-muted">Komponen SVG Prosedural, UI Dark Mode</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
