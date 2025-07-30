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
    <Card className={`transition-shadow hover:shadow-lg border border-gray-700 bg-[#181818] text-white`}>
      <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
        <div className="space-y-2">
            <h3 className="font-bold text-lg">
              {course.Title} ({course.Subject} {course.ClassNumber})
            </h3>
            <p className="text-zinc-400 text-md text-muted-foreground">
              Time - {course.Time}
            </p>
            <p className="text-zinc-400 text-md text-muted-foreground">
              Instructor - {course.Instructor}
            </p>
            <p className="text-zinc-400 text-md text-muted-foreground">
              Course Number - {course.CRN}
            </p>
            <p className="text-zinc-400 text-md text-muted-foreground">
              {course.Mode} | {course.Room}
            </p>
        </div>
          <Button
          variant="outline"
          className={`mt-4 w-full font-semibold transition ${
            isSelected
            ? "bg-neutral-800 border-neutral-500 text-white hover:bg-neutral-700 hover:text-white"
            : "bg-neutral-100 border-neutral-300 text-black hover:bg-neutral-800 hover:text-white"
          }`}
          onClick={onToggle}
        >
          {isSelected ? "Remove" : "Select"}
        </Button>
      </CardContent>
    </Card>
  );
}