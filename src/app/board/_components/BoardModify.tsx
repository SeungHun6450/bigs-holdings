"use client";

import { useUpdateBoard } from "@/api/react-query/board/useUpdateBoard";
import { useAuth } from "@/hooks/useAuth";
import boardStore from "@/stores/BoardStore";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const CATEGORIES = [
  { key: "notice", label: "공지" },
  { key: "etc", label: "기타" },
  { key: "free", label: "자유" },
  { key: "qna", label: "Q&A" },
];

const BoardModify = () => {
  const router = useRouter();
  const { token, loading } = useAuth();
  const post = boardStore.selectedPost;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [boardCategory, setBoardCategory] = useState("");

  useEffect(() => {
    if (post && post.id === -1) {
      alert("올바른 게시판이 아닙니다.");
      router.push("/board?page=0");
    } else if (!loading && !token) {
      alert("로그인 후 이용 가능합니다.");
      window.location.href = "/";
    } else {
      setTitle(post.title);
      setContent(post.content);
      setBoardCategory(post.boardCategory);
    }
  }, [post, token]);

  useEffect(() => {
    if (!loading && !token) {
      router.push("/sign-in");
    }
  }, [loading, token]);

  const updateBoardMutation = useUpdateBoard();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      console.error("Token이 유효하지 않습니다.");
      return;
    }

    updateBoardMutation.mutate(
      {
        token,
        id: post.id,
        boardData: {
          title,
          content,
          category: boardCategory.toUpperCase(),
        },
      },
      {
        onSuccess: () => {
          router.push("/board?page=0");
        },
      },
    );
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
            value={boardCategory.toLowerCase()}
            onChange={(e) => setBoardCategory(e.target.value)}
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
          수정 완료
        </button>
      </form>
    </div>
  );
};

export default BoardModify;
