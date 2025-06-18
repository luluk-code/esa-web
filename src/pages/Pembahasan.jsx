import React from "react";
import { useParams } from "react-router-dom";

export default function Pembahasan() {
  const { mapel } = useParams();
  return <div>Halaman Pembahasan Soal: {mapel}</div>;
}