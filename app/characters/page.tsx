"use client";

import { useEffect, useState } from "react";
import SearchFilter from "../component/SearchFilter";
import Link from "next/link";



export default function CharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); 

  const fetchCharacters = async (pageNumber: number, search = "", status = "") => {
    setLoading(true);

    let url = `https://rickandmortyapi.com/api/character?page=${pageNumber}`;

    if (search.trim() !== "" || status !== "") {
      url = `https://rickandmortyapi.com/api/character?`;

      if (search.trim() !== "") url += `name=${search}&`;
      if (status !== "") url += `status=${status}&`;
      if (pageNumber !== 1) url += `page=${pageNumber}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.error) {
        setCharacters([]);
        setTotalPages(1);
      } else {
        setCharacters(data.results);
        setTotalPages(data.info.pages ?? 1);
      }
    } catch (err) {
      setCharacters([]);
    }
  

    setLoading(false);
  };
  

  useEffect(() => {
    fetchCharacters(page, searchQuery, statusFilter);
  }, [page]);

  useEffect(() => {
    setPage(1);
    fetchCharacters(1, searchQuery, statusFilter);
  }, [searchQuery]);

  useEffect(() => {
    setPage(1);
    fetchCharacters(1, searchQuery, statusFilter);
  }, [statusFilter]);
  
  


 return (
  <div>
    
    
    <SearchFilter 
      onSearch={setSearchQuery}
      onFilter={setStatusFilter}
    />

    {loading ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="border p-3 rounded-lg shadow animate-pulse"
      >
        <div className="w-full h-40 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded mt-3 w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded mt-2 w-1/2"></div>
      </div>
    ))}
  </div>
) : (
      <>
        {characters.length === 0 ? (
  <div className="text-center p-5 opacity-80 flex flex-col items-center">
    <svg 
      width="90" 
      height="90" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="gray" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="opacity-60 mb-3"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>

    <p>No results found</p>
  </div>
) : (

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      
  {characters.slice(0, 8).map((c: any) => (
    <Link href={`/characters/${c.id}`} key={c.id}>
      <div className="border p-3 rounded-lg shadow hover:scale-105 transition cursor-pointer">
        <img src={c.image} alt={c.name} className="rounded-md" />
        <h2 className="font-bold mt-2 text-lg">{c.name}</h2>

        <p
          className={`inline-block mt-1 px-2 py-1 rounded text-sm text-white 
            ${
              c.status === "Alive"
                ? "bg-green-600"
                : c.status === "Dead"
                ? "bg-red-600"
                : "bg-gray-500"
            }
          `}
        >
          {c.status}
        </p>
      </div>
    </Link>
  ))}
</div>

        )}

        {}
        {searchQuery === "" && statusFilter === "" && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>

            <p className="font-medium">
              Page {page} / {totalPages}
            </p>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </>
    )}
  </div>
);

}
