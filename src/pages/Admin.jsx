// src/pages/Admin.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

export default function Admin() {
  const [hasil, setHasil] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("hasilUjian") || "[]");
    setHasil(data);
  }, []);

  const handleExportExcel = () => {
    const rows = hasilFiltered.map((item) => {
      const jawabanString = Object.entries(item.jawaban)
        .map(([id, j]) => `Soal ${id}: ${j}`)
        .join(" | ");
      return {
        Nama: item.nama,
        Skor: item.skor,
        "Total Soal": item.total,
        Jawaban: jawabanString,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "HasilUjian");

    XLSX.writeFile(workbook, "hasil_ujian_siswa.xlsx");
  };

  const hasilFiltered = hasil.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (index) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      const updated = [...hasil];
      updated.splice(index, 1);
      setHasil(updated);
      localStorage.setItem("hasilUjian", JSON.stringify(updated));
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">📊 Rekapitulasi Hasil Siswa</h2>
      {hasil.length === 0 ? (
        <p>Belum ada data siswa.</p>
      ) : (
        <>
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <input
              type="text"
              placeholder="Cari nama siswa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full md:w-64"
            />
            <button
              onClick={handleExportExcel}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 self-start md:self-auto"
            >
              📥 Unduh Excel
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">No.</th>
                  <th className="px-4 py-2 border">Nama</th>
                  <th className="px-4 py-2 border">Skor</th>
                  <th className="px-4 py-2 border">Total Soal</th>
                  <th className="px-4 py-2 border">Jawaban</th>
                  <th className="px-4 py-2 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {hasilFiltered.map((item, i) => (
                  <tr key={i} className="text-center">
                    <td className="border px-2 py-1">{i + 1}</td>
                    <td className="border px-2 py-1">{item.nama}</td>
                    <td className="border px-2 py-1">{item.skor}</td>
                    <td className="border px-2 py-1">{item.total}</td>
                    <td className="border px-2 py-1 text-left whitespace-pre-wrap break-words">
                      <ul className="list-disc ml-4">
                        {Object.entries(item.jawaban).map(([id, jawab], idx) => (
                          <li key={idx}>
                            Soal {id}: {jawab}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="border px-2 py-1">
                        <button
                        onClick={() => handleDelete(i)}
                        className="text-red-600 hover:text-red-800"
                        title="Hapus data"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22m-5-3H6a2 2 0 00-2 2v0a2 2 0 002 2h12a2 2 0 002-2v0a2 2 0 00-2-2z" />
                            </svg>
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
