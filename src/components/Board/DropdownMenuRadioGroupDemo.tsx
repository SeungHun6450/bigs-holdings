"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface DropdownMenuRadioGroupDemoProps {
  categories: Record<string, string>;
}

export function DropdownMenuRadioGroupDemo({
  categories,
}: DropdownMenuRadioGroupDemoProps) {
  const pathname = usePathname();
  const router = useRouter();

  const currentCategory =
    pathname.split("/").pop() || Object.keys(categories)[0];

  const [selectedCategory, setSelectedCategory] =
    useState<string>(currentCategory);

  const handleCategoryChange = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    router.push(`/board/${categoryKey.toLowerCase()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {currentCategory === "notice"
            ? "공지"
            : currentCategory === "etc"
            ? "기타"
            : currentCategory === "free"
            ? "자유"
            : currentCategory === "qna"
            ? "Q&A"
            : "카테고리"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>카테고리 목록</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedCategory}
          onValueChange={handleCategoryChange}
        >
          {Object.entries(categories).map(([key, value]) => (
            <DropdownMenuRadioItem key={key} value={key}>
              {value}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
