// hooks/useLocalStorage.js
// Custom hook untuk menyimpan dan membaca data dari localStorage.
// Dengan hook ini, data akan tetap ada meskipun halaman di-refresh.

import { useState, useEffect } from 'react';

/**
 * useLocalStorage
 * Custom hook yang berfungsi seperti useState, tetapi datanya disimpan di localStorage.
 *
 * @param {string} key - Kunci unik untuk menyimpan data di localStorage
 * @param {*} initialValue - Nilai awal jika belum ada data di localStorage
 * @returns {[*, Function]} - [nilai, fungsi untuk mengubah nilai]
 */
function useLocalStorage(key, initialValue) {
  // Inisialisasi state: cek dulu apakah ada data di localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Jika ada data, parse dari JSON string; jika tidak, gunakan initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // useEffect: setiap kali storedValue berubah, simpan ke localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
