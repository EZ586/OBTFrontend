import React, { useCallback, useEffect } from 'react';
import './App.css' 
import { Routes, Route } from 'react-router-dom';

import Navbar from './pages/navbar/Navbar';
import OldMindMap from './pages/OldMindMap';
import MindMap from './pages/MindMap/MindMap'
import Home from './pages/home/Home';


export default function App() {

  return (  
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/old_mind_map" element={<OldMindMap/>} />
        <Route path="/mindmap" element={<MindMap/>} />
      </Routes>
    </div>
    
  );
}