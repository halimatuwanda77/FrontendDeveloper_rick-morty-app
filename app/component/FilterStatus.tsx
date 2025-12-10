"use client";
import { useState } from "react";

export default function FilterStatus({ onChange }: { onChange: (value: string) => void }) {
  const [selected, setSelected] = useState("");

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className="flex gap-3 mb-4">
      <button
        onClick={() => handleSelect("")}
        className={`px-3 py-1 rounded ${
          selected === "" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        All
      </button>

      <button
        onClick={() => handleSelect("alive")}
        className={`px-3 py-1 rounded ${
          selected === "alive" ? "bg-green-600 text-white" : "bg-gray-200"
        }`}
      >
        Alive
      </button>

      <button
        onClick={() => handleSelect("dead")}
        className={`px-3 py-1 rounded ${
          selected === "dead" ? "bg-red-600 text-white" : "bg-gray-200"
        }`}
      >
        Dead
      </button>

      <button
        onClick={() => handleSelect("unknown")}
        className={`px-3 py-1 rounded ${
          selected === "unknown" ? "bg-gray-700 text-white" : "bg-gray-200"
        }`}
      >
        Unknown
      </button>
    </div>
  );
}
