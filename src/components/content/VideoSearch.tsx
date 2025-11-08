"use client";

import { useState, useEffect } from "react";
import { Input } from "@/src/components/ui/Input";

interface VideoSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function VideoSearch({
  onSearch,
  placeholder = "Search videos...",
}: VideoSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  return (
    <div className="mb-8">
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-md"
      />
    </div>
  );
}
