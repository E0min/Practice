import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopsterPage from './pages/TopsterPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<TopsterPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
