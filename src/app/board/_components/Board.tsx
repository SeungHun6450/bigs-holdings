"use client";

import { useDeleteBoard } from "@/api/react-query/board/useDeleteBoard";
import { useGetBoards } from "@/api/react-query/board/useGetBoards";
import {
  Pagination,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const categoryMap: Record<string, string> = {
  NOTICE: "공지",
  ETC: "기타",
  QNA: "Q&A",
  FREE: "자유",
};

const Board = () => {
  const { token, loading } = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 0;

  useEffect(() => {
    if (!loading && !token) {
      alert("로그인 후 이용 가능합니다.");
      window.location.href = "/";
    }
  }, [loading, token]);

  const {
    data: boardData,
    error: boardError,
    isLoading: boardLoading,
  } = useGetBoards({ token: token || "", page, size: 10 }, !!token && !loading);

  const boards = boardData?.content || [];
  const totalPages = boardData?.totalPages || 0;

  const deleteBoardMutation = useDeleteBoard();

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();

    if (!confirm("정말 삭제하시겠습니까?")) return;

    deleteBoardMutation.mutate(
      { token: token || "", id },
      {
        onSuccess: () => {
          router.push(`/board?page=0`);
        },
        onError: (err) => {
          console.error("게시글 삭제 오류:", err);
        },
      },
    );
  };

  const handlePageChange = (newPage: number) => {
    router.push(`/board?page=${newPage}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen m-4">
      <Link href="/board/?page=0">
        <h1 className="text-2xl font-bold mb-4">게시판</h1>
      </Link>

      <div className="flex gap-x-4">
        <Link href="/board/board-register">
          <button className="bg-[#2aa7be] text-white px-4 py-1.5 rounded hover:bg-[#5db0bf]">
            글쓰기
          </button>
        </Link>
      </div>

      <div>
        {boardLoading ? (
          <p>로딩 중...</p>
        ) : boardError ? (
          <p className="text-red-500">게시글을 불러오는 데 실패했습니다.</p>
        ) : boards.length === 0 ? (
          <p>게시글이 없습니다.</p>
        ) : (
          <ul className="flex flex-col w-full">
            {boards.map((item) => (
              <li
                key={item.id}
                className="border-b py-2 flex flex-row items-center gap-x-4"
              >
                <Link href={`/board/${item.id}`} className="flex-grow">
                  <div className="flex items-center gap-x-4 cursor-pointer">
                    <div className="text-gray-700">
                      {categoryMap[item.category] || "기타"}
                    </div>
                    <strong>{item.title}</strong>
                    <div className="text-gray-700">
                      {new Date(item.createdAt).toLocaleString()}
                    </div>
                  </div>
                </Link>

                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded-md text-sm hover:bg-red-400"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Pagination className="mt-4">
        {page > 0 && (
          <PaginationPrevious
            onClick={() => handlePageChange(page - 1)}
            className="cursor-pointer"
          />
        )}
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationLink
            key={index}
            isActive={index === page}
            onClick={() => handlePageChange(index)}
            className="cursor-pointer"
          >
            {index + 1}
          </PaginationLink>
        ))}
        {page < totalPages - 1 && (
          <PaginationNext
            onClick={() => handlePageChange(page + 1)}
            className="cursor-pointer"
            aria-disabled={page === 0}
          />
        )}
      </Pagination>
    </div>
  );
};

export default Board;
