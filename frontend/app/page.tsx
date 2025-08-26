"use client"

import TermSelect from "@/components/TermSelect";
import CourseSearch from "@/components/CourseSearch";
import CourseCard from "@/components/CourseCard";
import { Trash2, ChevronLeft, ChevronRight, Github, Twitter } from "lucide-react";
import { Course } from "@/types/course";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState("");
  const [results, setResults] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const RESULTS_PER_PAGE = 6;

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
    if (!term || !term.trim()) {
      setTermError("Please select a term before searching.");
      return;
    }
    setTermError("");
    if (!input) return;
    //if (!term || !input) return;
    try {
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
      const filtered = Array.isArray(data)
        ? data.filter((c) => c && typeof c.CRN === "number")
        : data && typeof data.CRN === "number"
        ? [data]
        : [];

      setResults(filtered);
      setCurrentPage(1);
    } catch (e) {
      console.error("search error", e);
    }
  };

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

  const paginatedResults = results.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE);

  return (
  <main className="min-h-screen flex flex-col bg-[#0f0f0f] text-white relative">
    <header className="sticky top-0 z-40 w-full border-b border-[#2a2a2a] bg-[#0a0a0a]/80 backdrop-blur">
      <div className="max-w-6xl mx-auto flex h-14 items-center justify-between px-4">
        <h1 className="font-semibold tracking-tight">BearCal</h1>

        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/Shashwatpog/bearcal"
            target="_blank"
            className="p-2 hover:text-blue-400 transition"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://x.com/sasquatchpog"
            target="_blank"
            className="p-2 hover:text-blue-400 transition"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">X</span>
          </Link>
        </div>
      </div>
    </header>

    <div className="flex flex-col items-center justify-center py-10 px-4 flex-1">
      <div className="max-w-6xl w-full mx-auto space-y-8">
        <div>
          <h1 className="text-center text-3xl font-semibold tracking-tighter">
            University of Cincinnati Calendar Tool
          </h1>
          <p className="text-center text-md text-muted-foreground">
            Generate your course calendar in seconds :D
          </p>
        </div>

        <div className="w-full max-w-2xl mx-auto p-8 bg-[#0a0909] rounded-xl shadow-xl border border-[#2a2a2a] space-y-6">
          <TermSelect 
            selected={term} 
            onSelect={(t) => { 
              setTerm(t); 
              if (termError) setTermError("");
            }}
            error={termError} />
          <CourseSearch onSearch={handleSearch} />
        </div>

        {selectedCourses.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold">Selected Courses:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {selectedCourses.map((c) => (
                <div
                  key={c.CRN}
                  className="bg-[#1e1e1e] p-4 rounded-lg shadow border border-[#2a2a2a] hover:border-white"
                >
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
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-8 bg-neutral-800 text-white hover:text-black"
                      onClick={() =>
                        setSelectedCourses((prev) =>
                          prev.filter((course) => course.CRN !== c.CRN)
                        )
                      }
                    >
                      <Trash2 />
                    </Button>
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

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedResults.map((course) => (
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

            {totalPages > 1 && (
              <div className="flex justify-center gap-4 mt-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft />
                </Button>
                <p className="text-md text-white">
                  Page {currentPage} of {totalPages}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    <footer className="border-t border-[#2a2a2a] bg-[#0a0a0a]/80">
      <div className="max-w-6xl mx-auto flex items-center justify-center py-4 px-4 text-sm text-gray-400 text-center">
        <p>{new Date().getFullYear()} BearCal · Built for Bearcats</p>
      </div>
    </footer>
  </main>
);
}
