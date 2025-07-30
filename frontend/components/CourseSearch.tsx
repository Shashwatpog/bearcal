"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { use, useState } from "react";

type Props = {
  onSearch: (query: string, mode: "keyword" | "crn" | "subjectClass") => void;
};

export default function CourseSearch({ onSearch }: Props) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"keyword" | "crn" | "subjectClass">("keyword");
  const [subject, setSubject] = useState("");
  const [classNumber, setClassNumber] =  useState("");

  return (
    <div className="space-y-2">
        <Label>Search Courses</Label>
        <ToggleGroup 
            type="single"
            value={mode}
            onValueChange={(val) => {
                if (val) {
                    setMode(val as "keyword" | "crn" | "subjectClass")
                    setQuery("");
                    setSubject("");
                    setClassNumber("");
                }
        }} 
        className="mb-2">
            <ToggleGroupItem value = "keyword">Keyword</ToggleGroupItem>
            <ToggleGroupItem value = "crn">CRN</ToggleGroupItem>
            <ToggleGroupItem value = "subjectClass">Subject+Class</ToggleGroupItem>
        </ToggleGroup>

        {mode === "subjectClass" ? (
            <div className="flex gap-2">
                <Input
                    placeholder="Enter Subject Code (example : CS)"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value.toUpperCase())}
                />
                <Input
                    placeholder="Enter Class Number (example : 1010)"
                    value={classNumber}
                    onChange={(e) => setClassNumber(e.target.value)}
                />
                <Button
                    onClick={() => onSearch(`${subject}:${classNumber}`,"subjectClass")}
                    disabled={!subject.trim() || !classNumber}
                >
                    Search
                </Button>
            </div>
        ) : (
            <div className="flex gap-2">
            <Input
                placeholder={mode === "crn" ? "Enter 5 digit CRN (example : 15712)" : "Enter course title (example : Introduction to Programming)"}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full"
            />
            <Button onClick={() => onSearch(query, mode)} disabled={!query.trim()}>
                Search
            </Button>
            </div>
        )}
    </div>
  );
}
