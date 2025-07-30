"use client"

import TermSelect from "@/components/TermSelect";
import CourseSearch from "@/components/CourseSearch";
import { Course } from "@/types/course";
import { useState } from "react";




export default function HomePage() {
  
  const [term, setTerm] = useState("");
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false)

  const handleSearch = async (query: string) => {
    if (!term || !query) return;
    setLoading(true);
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/search?term=${term}&query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (e) {
      console.error("search error", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">BearCal</h1>
      <TermSelect selected={term} onSelect={setTerm} />
      <CourseSearch onSearch={handleSearch}/>
    </main>
  );
}
