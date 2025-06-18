import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Ujian() {
  const { mapel } = useParams();
  const [nama, setNama] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("nama", nama);
    localStorage.setItem("mapel", mapel);
    navigate(`/ujian/${mapel}/soal`);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Ujian {mapel}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama:</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Masukkan nama lengkap"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Mulai Ujian
        </button>
      </form>
    </div>
  );
}
