"use client"

import TermSelect from "@/components/TermSelect";
import CourseSearch from "@/components/CourseSearch";
import CourseCard from "@/components/CourseCard";
import { Course } from "@/types/course";
import { useState } from "react";




export default function HomePage() {
  
  const [term, setTerm] = useState("");
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false)
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

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
      setResults( 
        Array.isArray(data)
      ? data.filter((c) => c && typeof c.CRN === "number")
      : data && typeof data.CRN === "number"
        ? [data]
        : []
      );
    } catch (e) {
      console.error("search error", e);
    } finally {
      setLoading(false);
    }
  }

  const handleGenerateCalendar = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          term,
          crns: selectedCourses.map((c) => c.CRN),
        }),
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "calendar.ics";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Failed to generate ICS", e);
    }
  };


  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">BearCal</h1>
      <TermSelect selected={term} onSelect={setTerm} />
      <CourseSearch onSearch={handleSearch}/>
      {results.length > 0 && (
      <div className="mt-6 space-y-4">
        <h2 className="text-xl font-semibold">Results:</h2>
        {results.map((course) => (
          <CourseCard
            key={course.CRN}
            course={course}
            isSelected={selectedCourses.some((c) => c.CRN === course.CRN)}
            onToggle={() =>
              setSelectedCourses((prev) =>
                prev.some((c) => c.CRN === course.CRN)
                  ? prev.filter((c) => c.CRN !== course.CRN)
                  : [...prev, course]
              )
            }
          />
        ))}
      </div>
    )}
    {selectedCourses.length > 0 && (
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Selected Courses:</h2>
        <ul className="list-disc pl-5 mb-4">
          {selectedCourses.map((c) => (
            <li key={c.CRN}>
              {c.Title} ({c.Subject} {c.ClassNumber}) - {c.CRN}
            </li>
          ))}
        </ul>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleGenerateCalendar}
        >
          Generate Calendar
        </button>
      </div>
    )}
    </main>
  );
}
