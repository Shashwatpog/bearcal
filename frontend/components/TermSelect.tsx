"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  selected: string;
  onSelect: (term: string) => void;
  error?: string;
};

export default function TermSelect({ selected, onSelect, error }: Props) {
  const [terms, setTerms] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/terms`)
      .then(res => res.json())
      .then(data => {
        const termList: string[] = data
            .map((t: any) => t.term ?? t.Term) 
            .filter((term: string): term is string => typeof term === "string");
        setTerms(termList);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-2">
      <Label>Select Term</Label>
      <Select value={selected || ""} onValueChange={onSelect}>
        <SelectTrigger 
          className={`w-full ${error ? "border-red-500 focus-visible:ring-red-500 focus-visible:ring-1" : ""}`}
          aria-invalid={!!error}>
          <SelectValue placeholder="Choose a term" />
        </SelectTrigger>
        <SelectContent>
          {terms.map((term, i) => term ? (
            <SelectItem key={term} value = {term}>
                {term}
            </SelectItem>
          ):null)}
        </SelectContent>
      </Select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
