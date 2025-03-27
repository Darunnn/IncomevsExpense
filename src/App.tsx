import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NextPage from './pages/NextPage';
import Navbar from './components/Navbar';
import TakeNotes from './pages/TakeNotes';
function App() {
 
 
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/next-page" element={<NextPage />} />
        <Route path="/take-notes" element={<TakeNotes/>} />
      </Routes>
    </Router>
  );
}
export default App;