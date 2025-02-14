"use client";

import { deletePost } from "@/api/auth";
import {
  Pagination,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAuth } from "@/hooks/useAuth";
import { useBoardData } from "@/hooks/useBoardData";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Board = () => {
  const { token, error: authError } = useAuth();
  const {
    categories,
    posts,
    error: boardError,
    loading: boardLoading,
    refreshAndLoadBoardData,
    totalPages,
    currentPage,
    loadPage,
  } = useBoardData(token || "");

  const router = useRouter();
  const searchParams = useSearchParams();

  const error = authError || boardError;
  const page = Number(searchParams.get("page")) || 0;

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    e.preventDefault();

    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deletePost(token || "", id);
      await refreshAndLoadBoardData(0);
    } catch (err) {
      console.error("게시글 삭제 오류:", err);
    }
  };

  const handlePageChange = (newPage: number) => {
    loadPage(newPage);
    router.push(`/board?page=${newPage}`);
  };

  useEffect(() => {
    if (token) {
      refreshAndLoadBoardData(Number(page));
    }
  }, [token, page]);

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
        ) : !boardLoading && posts.length === 0 ? (
          <p>게시글이 없습니다.</p>
        ) : (
          <ul className="flex flex-col w-full">
            {posts.map((item) => (
              <li
                key={item.id}
                className="border-b py-2 flex flex-row items-center gap-x-4"
              >
                <Link href={`/board/${item.id}`} className="flex-grow">
                  <div className="flex items-center gap-x-4 cursor-pointer">
                    <div className="text-gray-700">
                      {categories[item.category]}
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
        {error && <p className="text-red-500">{error}</p>}
      </div>

      <Pagination className="mt-4">
        {currentPage > 0 && (
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
          />
        )}
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationLink
            key={index}
            isActive={index === currentPage}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </PaginationLink>
        ))}
        {currentPage === page && currentPage < totalPages - 1 && (
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            aria-disabled={currentPage === 0}
          />
        )}
      </Pagination>
    </div>
  );
};

export default Board;
