import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Loader from './components/Loader';

const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Hotspot = lazy(() => import('./components/Hotspot'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader/>}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/hotspot" element={<Hotspot />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;