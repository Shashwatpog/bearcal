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
    <Card className="w-full">
      <CardContent className="p-4 space-y-1">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">
              {course.Title} ({course.Subject} {course.ClassNumber})
            </h3>
            <p className="text-sm text-muted-foreground">
              {course.Time} | {course.Instructor}
            </p>
            <p className="text-sm text-muted-foreground">
              {course.CRN} | {course.Mode} | {course.Room}
            </p>
          </div>
          <Button variant={isSelected ? "secondary" : "default"} onClick={onToggle}>
            {isSelected ? "Remove" : "Select"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
