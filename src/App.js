import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Dice from "./pages/Dice";
import Whyproject from "./pages/Whyproject";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dice />} />
        <Route path="/why-project" element={<Whyproject />} />
      </Routes>
    </Router>
  );
}

export default App;
