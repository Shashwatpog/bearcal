"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { use, useState } from "react";

type Props = {
  onSearch: (query: string, mode: "keyword" | "crn" | "subjectClass") => void;
};

export default function CourseSearch({ onSearch }: Props) {
    const [activeTab, setActiveTab] = useState<"keyword" | "crn" | "subjectClass">("keyword");
    const [query, setQuery] = useState("");
    const [subject, setSubject] = useState("");
    const [classNumber, setClassNumber] =  useState("");

      const handleSearchClick = () => {
            if (activeTab === "subjectClass") {
            onSearch(`${subject}:${classNumber}`, "subjectClass");
            } else {
            onSearch(query, activeTab);
            }
        };

    return (
        <div className="space-y-4">
            <Label>Search Courses</Label>
            <Tabs
                value={activeTab}
                onValueChange={(val) => {
                setActiveTab(val as typeof activeTab);
                setQuery("");
                setSubject("");
                setClassNumber("");
                }}
                className="w-full"
            >
                <TabsList className="grid grid-cols-3 w-full mb-4 bg-stone-300 rounded-md overflow-hidden">
                <TabsTrigger className="text-black text-xs sm:text-sm" value="keyword">Course Name</TabsTrigger>
                <TabsTrigger className="text-black text-xs sm:text-sm" value="crn">Course Number</TabsTrigger>
                <TabsTrigger className="text-black text-xs sm:text-sm" value="subjectClass">Subject + Class</TabsTrigger>
                </TabsList>

                <TabsContent value="keyword">
                    <Input
                    placeholder="example : Introduction to Programming"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full"
                    />
                </TabsContent>

                <TabsContent value="crn">
                    <Input
                    placeholder="Enter 5-digit course number (ex: 15712)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full"
                    />
                </TabsContent>

                <TabsContent value="subjectClass">
                    <div className="space-y-3">
                    <div className="space-y-3">
                    <Label>Subject Name</Label>
                    <Input
                    placeholder="Subject (ex : CS)"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value.toUpperCase())}
                    />
                    </div>
                    <div className="space-y-3">
                    <Label>Class Number</Label>
                    <Input
                    placeholder="Class Number (ex : 2080C)"
                    value={classNumber}
                    onChange={(e) => setClassNumber(e.target.value)}
                    />
                    </div>
                    </div>
                </TabsContent>
            </Tabs>
            <Button
                className="w-full text-white bg-zinc-950 border-2 transition active:scale-95 duration-150 ease-in-out hover:opacity-90"
                onClick={handleSearchClick}
                disabled={
                (activeTab === "subjectClass" && (!subject.trim() || !classNumber.trim())) ||
                ((activeTab === "keyword" || activeTab === "crn") && !query.trim())
                }
            >
                Search
            </Button>
        </div>
    );
}
