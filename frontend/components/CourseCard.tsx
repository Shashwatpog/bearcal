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
    <Card className="transition-shadow hover:shadow-lg border border-gray-700 bg-[#181818] text-white rounded-xl">
      <CardContent className="p-4 space-y-3">
        <h3 className="font-bold text-base leading-tight">{course.Title}</h3>

        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-2 text-xs">
          <div className="bg-[#232323] rounded-md p-2">
            <p className="text-muted-foreground">Subject</p>
            <p className="font-medium">{course.Subject} {course.ClassNumber}</p>
          </div>

          <div className="bg-[#232323] rounded-md p-2">
            <p className="text-muted-foreground">CRN</p>
            <p className="font-medium">{course.CRN}</p>
          </div>

          <div className="bg-[#232323] rounded-md p-2">
            <p className="text-muted-foreground">Instructor</p>
            <p className="font-medium truncate">{course.Instructor}</p>
          </div>

          <div className="bg-[#232323] rounded-md p-2">
            <p className="text-muted-foreground">Time</p>
            <p className="font-medium">{course.Time}</p>
          </div>

          <div className="bg-[#232323] rounded-md p-2">
            <p className="text-muted-foreground">Location</p>
            <p className="font-medium">{course.Mode} | {course.Room}</p>
          </div>

          <div className="bg-[#232323] rounded-md p-2">
            <p className="text-muted-foreground">Dates</p>
            <p className="font-medium">{course.Dates}</p>
          </div>
        </div>

        <Button
          onClick={onToggle}
          variant="outline"
          className={`w-full text-xs font-semibold py-1.5 ${
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
