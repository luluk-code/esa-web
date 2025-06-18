import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import BankSoal from "./pages/BankSoal";
import Pretest from "./pages/Pretest";
import Ujian from "./pages/Ujian";
import Pembahasan from "./pages/Pembahasan";
import Admin from "./pages/Admin";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="space-x-4">
      <Link to="/" className={isActive("/") ? "text-blue-600 font-semibold" : "hover:underline"}>
        Beranda
      </Link>
      <Link to="/bank-soal" className={isActive("/bank-soal") ? "text-blue-600 font-semibold" : "hover:underline"}>
        Soal & Pembahasan
      </Link>
      <Link to="/pretest" className={isActive("/pretest") ? "text-blue-600 font-semibold" : "hover:underline"}>
        Pretest
      </Link>
      <Link
        to="/ujian/matematika"
        className={location.pathname.startsWith("/ujian") ? "text-blue-600 font-semibold" : "hover:underline"}
      >
        Ujian
      </Link>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white text-black p-4 shadow">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src="/esa-logo.png" alt="Logo" className="w-10 h-10" />
              <Link to="/" className="text-xl font-bold">Esperoit Smart Apps</Link>
            </div>
            <Navbar />
          </div>
        </header>
        <main className="p-4 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bank-soal" element={<BankSoal />} />
            <Route path="/pretest" element={<Pretest />} />
            <Route path="/ujian/:mapel" element={<Ujian />} />
            <Route path="/pembahasan/:mapel" element={<Pembahasan />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
