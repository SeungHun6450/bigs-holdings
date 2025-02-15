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
      router.push("/");
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

  const goToBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-full">
      <div className="w-full max-w-6xl items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-start m-4"
        >
          <div className="flex flex-row justify-center mt-4 w-full">
            <label className="block xl:text-lg lg:text-lg md:text-base sm:text-sm font-bold w-24 mr-4 lg:mr-3 md:mr-2 sm:mr-2">
              카테고리
            </label>
            <select
              value={boardCategory.toLowerCase()}
              onChange={(e) => setBoardCategory(e.target.value)}
              required
              className="border-2 rounded-sm max-w-lg w-full xl:text-base lg:text-base md:text-sm sm:text-xs"
            >
              <option value="">카테고리를 선택하세요</option>
              {CATEGORIES.map(({ key, label }) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-row justify-center mt-4 w-full">
            <label className="block xl:text-lg lg:text-lg md:text-base sm:text-sm font-bold w-24 mr-4 lg:mr-3 md:mr-2 sm:mr-2">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border-2 rounded-sm max-w-lg w-full xl:text-base lg:text-base md:text-sm sm:text-xs"
            />
          </div>

          <div className="flex flex-row justify-center mt-4 w-full">
            <label className="block xl:text-lg lg:text-lg md:text-base sm:text-sm font-bold w-24 mr-4 lg:mr-3 md:mr-2 sm:mr-2">
              내용
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="h-52 w-full max-w-lg border-2 rounded-lg xl:text-base lg:text-base md:text-sm sm:text-xs"
            />
          </div>

          <div className="flex flex-row gap-x-4 lg:gap-x-3 md:gap-x-2 sm:gap-x-1">
            <button
              onClick={goToBack}
              type="button"
              className="bg-red-500 text-white rounded hover:bg-red-500/70
              xl:mt-8 lg:mt-7 md:mt-6 sm:mt-5
              xl:text-base lg:text-sm md:text-xs sm:text-xs
              xl:px-3 py-1.5 lg:px-2.5 md:px-2 sm:px-1.5 sm:py-1"
            >
              취소하기
            </button>
            <button
              type="submit"
              className="bg-primary text-white rounded hover:bg-primary/70
              xl:mt-8 lg:mt-7 md:mt-6 sm:mt-5
              xl:text-base lg:text-sm md:text-xs sm:text-xs
              xl:px-3 py-1.5 lg:px-2.5 md:px-2 sm:px-1.5 sm:py-1"
            >
              수정하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardModify;
