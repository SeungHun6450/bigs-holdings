"use client";

import { createPost } from "@/api/auth";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const CATEGORIES = [
  { key: "notice", label: "공지" },
  { key: "etc", label: "기타" },
  { key: "free", label: "자유" },
  { key: "qna", label: "Q&A" },
];

const BoardRegister = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const { token, loading } = useAuth();

  useEffect(() => {
    if (!loading && !token) {
      router.push("/sign-in");
    }
  }, [loading, token]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      console.error("Token이 유효하지 않습니다.");
      return;
    }

    try {
      await createPost(token, {
        title,
        content,
        category: category.toUpperCase(),
      });
      router.push("0");
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen m-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full max-w-xl"
      >
        <div className="flex flex-row justify-start w-full">
          <label className="block text-lg font-bold w-24">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border-2 rounded-sm max-w-lg w-full"
          />
        </div>

        <div className="flex flex-row justify-start mt-4 w-full">
          <label className="block text-lg font-bold w-24">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="h-52 w-full max-w-lg border-2 rounded-lg"
          />
        </div>

        <div className="flex flex-row justify-start mt-4 w-full">
          <label className="block text-lg font-bold w-20">카테고리</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border-2 rounded-sm w-full max-w-48"
          >
            <option value="">카테고리를 선택하세요</option>
            {CATEGORIES.map(({ key, label }) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-[#2aa7be] text-white py-2 px-4 mt-4 rounded-md hover:bg-[#3590a0]"
        >
          게시글 등록
        </button>
      </form>
    </div>
  );
};

export default BoardRegister;
