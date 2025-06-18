import React, { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";

export default function BankSoal() {
  const [dataSoal, setDataSoal] = useState([]);
  const [filter, setFilter] = useState("Semua");
  const contentRef = useRef();

  useEffect(() => {
    fetch("/soal/soal.json")
      .then((res) => res.json())
      .then((data) => setDataSoal(data))
      .catch((err) => console.error("Gagal memuat soal:", err));
  }, []);

  const soalFiltered =
    filter === "Semua" ? dataSoal : dataSoal.filter((s) => s.mapel === filter);

    const handleDownloadPDF = () => {
        const element = contentRef.current;
        const opt = {
          margin: 0.5,
          filename: "bank_soal.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        };
        html2pdf().set(opt).from(element).save();
    };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📚 Bank Soal & Pembahasan</h2>

      <div className="mb-4 space-x-2">
        {["Semua", "Matematika", "Bahasa Indonesia", "IPA"].map((mapel) => (
          <button
            key={mapel}
            className={`px-4 py-2 rounded ${
              filter === mapel ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter(mapel)}
          >
            {mapel}
          </button>
        ))}
      </div>

      <div className="mb-4 flex justify-self-end">
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          📄 Download PDF
        </button>
      </div>

      <div ref={contentRef} className="space-y-6">
        {soalFiltered.map((item, index) => (
            <div key={item.id} className="bg-white p-4 rounded shadow border">
                <h4 className="font-semibold text-lg">
                    {index + 1}. {item.soal}
                </h4>
                <ul className="list-disc pl-6 text-gray-700 my-2">
                    {item.pilihan.map((p, i) => (
                        <li key={i}>{p}</li>
                    ))}
                </ul>
                <p className="text-green-700">
                    <strong>✅ Jawaban:</strong> {item.jawaban}
                </p>
                <p className="text-gray-600 mt-1">
                    <strong>📝 Pembahasan:</strong> {item.pembahasan}
                </p>
            </div>
        ))}
      </div>
    </div>
  );
}
