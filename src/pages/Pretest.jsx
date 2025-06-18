// src/pages/Pretest.jsx
import React, { useEffect, useState } from "react";

export default function Pretest() {
  const [soal, setSoal] = useState([]);
  const [jawaban, setJawaban] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [skor, setSkor] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nama, setNama] = useState("");
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    fetch("/soal/pretest.json")
      .then((res) => res.json())
      .then((data) => {
        const mtk = data.filter((item) => item.kategori === "mtk").slice(0, 25);
        const bin = data.filter((item) => item.kategori === "bin").slice(0, 25);
        const ipa = data.filter((item) => item.kategori === "ipa").slice(0, 25);

        const combined = [...bin, ...mtk, ...ipa]; // Urut: BIN, MTK, IPA
        setSoal(combined);
      });
  }, []);

  const handleJawab = (id, value) => {
    setJawaban((prev) => ({ ...prev, [String(id)]: value }));
  };

  const handleSubmit = () => {
    let nilai = 0;
    soal.forEach((item) => {
      if (jawaban[String(item.id)] === item.jawaban) {
        nilai++;
      }
    });
    setSkor(nilai);
    setSubmitted(true);

    const hasil = JSON.parse(localStorage.getItem("hasilUjian") || "[]");
    hasil.push({ nama, skor: nilai, total: soal.length, jawaban });
    localStorage.setItem("hasilUjian", JSON.stringify(hasil));
  };

  const handleNext = () => {
    if (currentIndex < soal.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentSoal = soal[currentIndex];

  if (!isStarted) {
    return (
      <div className="max-w-md mx-auto mt-16 p-6 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Masukkan Nama Anda</h2>
        <input
          type="text"
          className="border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-4 py-2 w-full mb-4"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama Lengkap"
        />
        <button
          onClick={() => setIsStarted(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full transition"
        >
          Mulai Pretest
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Pretest - Soal {currentIndex + 1} dari {soal.length}</h2>

      {/* Navigasi Langsung */}
      <div className="my-10 flex flex-wrap gap-2 justify-center">
        {soal.map((item, idx) => {
          const isActive = idx === currentIndex;
          const isAnswered = Object.keys(jawaban).includes(String(item.id));
          return (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
                ${isActive ? "bg-blue-600 text-white" : isAnswered ? "bg-green-200 hover:bg-green-300" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {currentSoal && (
        <div className="mb-6 p-6 bg-white border-l-4 border-blue-600 rounded shadow">
          <p className="text-lg font-semibold text-gray-800 mb-4">{currentIndex + 1}. {currentSoal.pertanyaan}</p>
          <div className="space-y-2">
            {Object.entries(currentSoal.opsi).map(([key, value]) => (
              <label key={key} className="block bg-blue-50 px-4 py-2 rounded hover:bg-blue-100 cursor-pointer">
                <input
                  type="radio"
                  className="mr-2"
                  name={`soal-${currentSoal.id}`}
                  value={key}
                  disabled={submitted}
                  checked={jawaban[String(currentSoal.id)] === key}
                  onChange={(e) => handleJawab(currentSoal.id, e.target.value)}
                /> {key}. {value}
              </label>
            ))}
          </div>
          {submitted && (
            <div className="mt-4 text-sm">
              {jawaban[String(currentSoal.id)] === currentSoal.jawaban ? (
                <p className="text-green-700 font-semibold">✅ Jawaban Benar</p>
              ) : (
                <div>
                  <p className="text-red-700 font-semibold">❌ Jawaban Salah</p>
                  <p className="text-gray-700">✅ Jawaban benar: <strong>{currentSoal.jawaban}. {currentSoal.opsi[currentSoal.jawaban]}</strong></p>
                  <p className="italic text-gray-600">💡 {currentSoal.pembahasan}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between mb-6">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded disabled:opacity-50"
        >⬅️ Sebelumnya</button>
        <button
          onClick={handleNext}
          disabled={currentIndex === soal.length - 1}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded disabled:opacity-50"
        >Berikutnya ➡️</button>
      </div>

      {!submitted && currentIndex === soal.length - 1 && (
        <button
          onClick={() => {
            if (confirm("Yakin ingin submit jawaban?")) {
              handleSubmit();
            }
          }}
          className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded w-full"
        >
          ✅ Submit Jawaban
        </button>
      )}

      {submitted && (
        <div className="mt-8 p-6 bg-green-50 border border-green-300 rounded text-center">
          <h3 className="text-xl font-bold text-green-700 mb-2">Skor Anda: {skor} / {soal.length}</h3>
          <p className="text-gray-700">Terima kasih telah mengikuti pretest!</p>
        </div>
      )}
    </div>
  );
}
