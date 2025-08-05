"use client";

import { Course } from "@/types/course";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  course: Course;
  isSelected: boolean;
  onToggle: () => void;
};

export default function CourseCard({ course, isSelected, onToggle }: Props) {
  return (
    <Card className="transition-shadow hover:shadow-lg border border-gray-700 bg-[#181818] hover:border-white text-white rounded-lg h-full">
      <CardContent className="p-3 flex flex-col justify-between h-full">
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold text-sm leading-tight truncate mb-2">
            {course.Title}
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 text-xs">
            <div className="bg-[#232323] rounded-md px-2 py-1">
              <p className="text-muted-foreground">Subject</p>
              <p className="font-medium truncate">{course.Subject} {course.ClassNumber}</p>
            </div>

            <div className="bg-[#232323] rounded-md px-2 py-1">
              <p className="text-muted-foreground">CRN</p>
              <p className="font-medium">{course.CRN}</p>
            </div>

            <div className="bg-[#232323] rounded-md px-2 py-1 truncate">
              <p className="text-muted-foreground">Instructor</p>
              <p className="font-medium truncate">{course.Instructor}</p>
            </div>

            <div className="bg-[#232323] rounded-md px-2 py-1">
              <p className="text-muted-foreground">Time</p>
              <p className="font-medium">{course.Time}</p>
            </div>

            <div className="bg-[#232323] rounded-md px-2 py-1 truncate">
              <p className="text-muted-foreground">Location</p>
              <p className="font-medium truncate">{course.Mode} | {course.Room}</p>
            </div>

            <div className="bg-[#232323] rounded-md px-2 py-1">
              <p className="text-muted-foreground">Dates</p>
              <p className="font-medium">{course.Dates}</p>
            </div>
          </div>
        </div>

        <Button
          onClick={onToggle}
          variant="outline"
          className={`w-full text-xs font-semibold mt-4 py-1 ${
            isSelected
              ? "bg-neutral-800 border-neutral-500 text-white hover:bg-neutral-700 hover:text-white"
              : "bg-neutral-100 border-neutral-300 text-black hover:bg-neutral-800 hover:text-white"
          }`}
        >
          {isSelected ? "Remove" : "Select"}
        </Button>
      </CardContent>
    </Card>
  );
}
