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

  const handleSearch = async (input: string, mode: "keyword" | "crn" | "subjectClass") => {
    if (!term || !input) return;
    setLoading(true);
    try{
      let url = "";
      if (mode === "keyword") {
        url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/search?term=${term}&query=${encodeURIComponent(input)}`;
      } else if (mode === "crn") {
        url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/course?term=${term}&crn=${input}`;
      } else if (mode === "subjectClass") {
        const [subject, classNumber] = input.split(":");
        url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/filter?term=${term}&subject=${subject}&classNumber=${classNumber}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setResults(Array.isArray(data) ? data : [data]);
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
