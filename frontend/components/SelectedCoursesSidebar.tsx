"use client";

import { Course } from "@/types/course";
import { Trash2 } from "lucide-react";

type Props = {
  courses: Course[];
  onGenerate: () => void;
  onRemove: (crn: number) => void; 
};

export default function SelectedCoursesSidebar({ courses, onGenerate, onRemove }: Props) {
  return (
    <aside className="fixed top-0 right-0 h-screen w-80 bg-[#1e1e1e] border-l border-[#2a2a2a] shadow-xl p-4 flex flex-col z-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Selected Courses</h2>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto">
        {courses.map((c) => (
          <div key={c.CRN} className="bg-[#2a2a2a] p-3 rounded-lg shadow relative space-y-2">
            <button
            onClick={() => onRemove(c.CRN)}
            className="absolute top-3 right-3 text-gray-100 hover:text-red-500"
            >
            <Trash2 className="w-4 h-4" />
            </button>
            <h3 className="text-l fognt-medium">{c.Title}</h3>
            <p className="text-md text-muted-foreground">
              {c.Subject} {c.ClassNumber} • CRN: {c.CRN}
            </p>
            <p className="text-md text-muted-foreground">
              Time: {c.Time} • {c.Mode}
            </p>
            <p className="text-md text-muted-foreground">
              Dates: {c.Dates}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={onGenerate}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
      >
        Generate Calendar
      </button>
    </aside>
  );
}
