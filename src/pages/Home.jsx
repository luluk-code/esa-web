import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6 text-center">
      <img
        src="/esa-logo.png"
        alt="Esperoit Logo"
        className="mx-auto w-96 h-96 object-contain"
      />
      <h1 className="text-3xl font-bold text-blue-700">
        Selamat Datang di <span className="text-gray-800">Esperoit Smart Apps</span>
      </h1>
      <p className="text-gray-600 text-lg">
        Platform latihan soal Ujian Nasional / Tes Kompetensi Akademik (TKA) untuk siswa SMP
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <Link to="/bank-soal" className="bg-purple-100 rounded-lg p-4 shadow hover:shadow-md transition block">
          <h2 className="text-xl font-semibold text-purple-800">📘 Soal & Pembahasan</h2>
          <p className="text-sm text-gray-700">Kumpulan soal dan pembahasan lengkap sebagai bank soal latihan.</p>
        </Link>
        <Link to="/pretest" className="bg-blue-100 rounded-lg p-4 shadow hover:shadow-md transition block">
          <h2 className="text-xl font-semibold text-blue-800">📚 Pretest</h2>
          <p className="text-sm text-gray-700">Uji awal untuk mengetahui kemampuan dasar kamu sebelum mulai latihan.</p>
        </Link>
        <Link to="/ujian/matematika" className="bg-green-100 rounded-lg p-4 shadow hover:shadow-md transition block">
          <h2 className="text-xl font-semibold text-green-800">🧠 Ujian Matematika</h2>
          <p className="text-sm text-gray-700">Latihan soal Matematika kelas 7 hingga 9 dengan tingkat kesulitan variatif.</p>
        </Link>
        <Link to="/ujian/bahasa-indonesia" className="bg-yellow-100 rounded-lg p-4 shadow hover:shadow-md transition block">
          <h2 className="text-xl font-semibold text-yellow-800">📖 Bahasa Indonesia</h2>
          <p className="text-sm text-gray-700">Latihan soal Bahasa Indonesia dengan pembahasan untuk setiap tingkat kelas.</p>
        </Link>
        <Link to="/ujian/ipa" className="bg-red-100 rounded-lg p-4 shadow hover:shadow-md transition block">
          <h2 className="text-xl font-semibold text-red-800">🔬 Ilmu Pengetahuan Alam</h2>
          <p className="text-sm text-gray-700">Kumpulan soal IPA untuk SMP dari kelas 7 hingga 9, dilengkapi penjelasan.</p>
        </Link>
      </div>

      <p className="text-sm text-gray-500 italic mt-4">Silakan pilih jenis ujian dari menu di atas untuk memulai.</p>
    </div>
  );
}
