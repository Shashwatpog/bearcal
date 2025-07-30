"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type Props = {
  onSearch: (query: string) => void;
};

export default function CourseSearch({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-2">
      <Label>Search Courses</Label>
      <div className="flex gap-2">
        <Input
          placeholder="e.g. capstone"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
        <Button onClick={() => onSearch(query)} disabled={!query.trim()}>
          Search
        </Button>
      </div>
    </div>
  );
}
