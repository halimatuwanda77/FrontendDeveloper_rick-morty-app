"use client";
import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }: { onSearch: (value: string) => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(delay);
  }, [query, onSearch]);

  return (
    <div className="mb-4 w-full">
      <input
        type="text"
        placeholder="Search characters..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />
    </div>
  );
}
