import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  Dashboard  from './pages/Dashboard';
import  NextPage  from './pages/NextPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/next-page" element={<NextPage />} />
      </Routes>
    </Router>
  );
}

export default App;