// main.jsx
// Entry point aplikasi React.
// File ini yang pertama kali dieksekusi oleh Vite saat menjalankan npm run dev.
// Tugasnya: "mount" (pasang) komponen App ke dalam elemen HTML dengan id="root".

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Import global CSS yang berlaku untuk seluruh aplikasi
import './index.css';

// Import komponen utama
import App from './App.jsx';

// createRoot: cara modern React 18+ untuk merender komponen ke DOM
createRoot(document.getElementById('root')).render(
  // StrictMode: membantu mendeteksi potensi masalah saat development
  <StrictMode>
    <App />
  </StrictMode>
);
