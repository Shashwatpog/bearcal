"use client"

import TermSelect from "@/components/TermSelect";
import CourseSearch from "@/components/CourseSearch";
import CourseCard from "@/components/CourseCard";
import { Course } from "@/types/course";
import { useState } from "react";
import { useEffect } from "react";


export default function HomePage() {
  
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("selectedCourses");
    if (stored) {
      try {
        setSelectedCourses(JSON.parse(stored));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedCourses", JSON.stringify(selectedCourses));
  }, [selectedCourses]);


  const handleSearch = async (input: string, mode: "keyword" | "crn" | "subjectClass") => {
    if (!term || !input) return;
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

  const handleRemoveCourse = (crn: number) => {
    setSelectedCourses((prev) => prev.filter((c) => c.CRN !== crn));
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f0f] py-10 px-4 text-white relative">
      <div className={`max-w-5xl w-full mx-auto space-y-8`}>
        <div>
          <h1 className="text-center text-4xl font-semibold tracking-tighter">BearCal</h1>
          <p className="text-center text-md text-muted-foreground">Generate your course calendar in seconds :D</p>
        </div>
        <div className="w-full max-w-2xl mx-auto p-8 bg-[#0a0909] rounded-xl shadow-xl border border-[#2a2a2a] space-y-6">
            <TermSelect selected={term} onSelect={setTerm} />
            <CourseSearch onSearch={handleSearch}/>
        </div>
        {selectedCourses.length > 0 && (
        <div className="mt-8 space-y-4 px-4">
          <h2 className="text-xl font-semibold">Selected Courses:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectedCourses.map((c) => (
              <div key={c.CRN} className="bg-[#1e1e1e] p-4 rounded-lg shadow border border-[#2a2a2a]">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-md font-medium">{c.Title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {c.Subject} {c.ClassNumber} • CRN: {c.CRN}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {c.Time} • {c.Room}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setSelectedCourses(prev => prev.filter(course => course.CRN !== c.CRN))
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleGenerateCalendar}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            Generate Calendar
          </button>
        </div>
      )}

        {results.length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">Results:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
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
        </div>
      )}
      </div>
    </main>
  );
}