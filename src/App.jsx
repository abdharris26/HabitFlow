import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyRituals from './pages/MyRituals';
import HabitGarden from './pages/HabitGarden';
import ProgressLab from './pages/ProgressLab';
import About from './pages/About';
import NotFound from './pages/NotFound';

import useLocalStorage from './hooks/useLocalStorage';
import { getTodayString } from './utils/dateUtils';

const INITIAL_HABITS = [
  {
    id: 'habit-1',
    name: 'Minum 8 gelas air putih',
    category: 'health',
    frequency: 'daily',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'habit-2',
    name: 'Membaca buku 20 halaman',
    category: 'study',
    frequency: 'daily',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'habit-3',
    name: 'Olahraga pagi & peregangan',
    category: 'fitness',
    frequency: 'daily',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'habit-4',
    name: 'Refleksi kesadaran diri malam',
    category: 'mindset',
    frequency: 'daily',
    createdAt: new Date().toISOString(),
  },
];

function App() {
  const [habits, setHabits] = useLocalStorage('habitflow-habits', INITIAL_HABITS);
  const [completions, setCompletions] = useLocalStorage('habitflow-completions', {});

  const handleAddHabit = (formData) => {
    const newHabit = {
      id: `habit-${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString(),
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  const handleEditHabit = (updatedHabit) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === updatedHabit.id ? updatedHabit : habit
      )
    );
  };

  const handleDeleteHabit = (id) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));

    setCompletions((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((date) => {
        updated[date] = updated[date].filter((habitId) => habitId !== id);
      });
      return updated;
    });
  };

  const handleToggleHabit = (id) => {
    const today = getTodayString();

    setCompletions((prev) => {
      const todayList = prev[today] || [];
      let newTodayList;

      if (todayList.includes(id)) {
        newTodayList = todayList.filter((habitId) => habitId !== id);
      } else {
        newTodayList = [...todayList, id];
      }

      return {
        ...prev,
        [today]: newTodayList,
      };
    });
  };

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar />

        <main className="page-content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  habits={habits}
                  completions={completions}
                  onToggle={handleToggleHabit}
                />
              }
            />

            <Route
              path="/rituals"
              element={
                <MyRituals
                  habits={habits}
                  completions={completions}
                  onAdd={handleAddHabit}
                  onEdit={handleEditHabit}
                  onDelete={handleDeleteHabit}
                  onToggle={handleToggleHabit}
                />
              }
            />

            {/* Backwards-compatible route for previous URL */}
            <Route path="/habits" element={<Navigate to="/rituals" replace />} />

            <Route
              path="/garden"
              element={
                <HabitGarden
                  habits={habits}
                  completions={completions}
                  onToggle={handleToggleHabit}
                />
              }
            />

            <Route
              path="/lab"
              element={
                <ProgressLab
                  habits={habits}
                  completions={completions}
                  onToggle={handleToggleHabit}
                />
              }
            />

            {/* Backwards-compatible route for previous URL */}
            <Route path="/statistics" element={<Navigate to="/lab" replace />} />

            <Route path="/about" element={<About />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
