"use client";
import { useState } from "react";

export default function SearchFilter({
  onSearch,
  onFilter,
}: {
  onSearch: (value: string) => void;
  onFilter: (value: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  const handleQueryChange = (e: any) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleStatusChange = (e: any) => {
    const value = e.target.value;
    setStatus(value);
    onFilter(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full mb-4">

      {}
      <input
        type="text"
        placeholder="Search characters..."
        value={query}
        onChange={handleQueryChange}
        className="border px-3 py-2 rounded flex-1"
      />

      {}
     <select
  value={status}
  onChange={handleStatusChange}
  className="border px-3 py-2 rounded w-full sm:w-40 bg-black text-white"
>

        <option value="">All Status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>
  );
}
