import React, { useCallback, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./pages/navbar/Navbar";
import OldMindMap from "./pages/OldMindMap";
import MindMap from "./pages/MindMap/MindMap";
import Home from "./pages/home/Home";
import MaxMindMap from "./pages/MaxMindMap/MaxMindMap";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/old_mind_map" element={<OldMindMap />} />
        <Route path="/mindmap" element={<MindMap />} />
        <Route path="/maxmindmap" element={<MaxMindMap />} />
      </Routes>
    </div>
  );
}
