import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Film from './Components/Film';
import Basket from './Components/Basket';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Film />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
    </Router>
  );
}

export default App;
