"use client";

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
      router.push("/");
    }
  }, [loading, token]);

  const {
    data: boardData,
    error: boardError,
    isLoading: boardLoading,
  } = useGetBoards({ token: token || "", page, size: 10 }, !!token && !loading);

  const boards = boardData?.content || [];
  const totalPages = boardData?.totalPages || 0;

  const handlePageChange = (newPage: number) => {
    router.push(`/board?page=${newPage}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen m-4 max-w-full">
      <div className="w-full max-w-6xl overflow-hidden whitespace-nowrap overflow-ellipsis">
        <Link href="/board/?page=0">
          <h1 className="xl:text-2xl lg:text-xl md:text-lg sm:text-lg font-bold text-center my-8">
            BIGS CO.,LTD Boards
          </h1>
        </Link>

        {boardLoading ? (
          <p>로딩 중...</p>
        ) : boardError ? (
          <p className="text-red-500">게시글을 불러오는 데 실패했습니다.</p>
        ) : boards.length === 0 ? (
          <p>게시글이 없습니다.</p>
        ) : (
          <ul className="flex flex-col">
            {boards.map((item) => (
              <li key={item.id} className="border-b py-2 flex flex-row">
                <Link href={`/board/${item.id}`} className="flex-grow">
                  <div
                    className="flex items-center cursor-pointer gap-x-4 lg:gap-x-3 md:gap-x-2 sm:gap-x-2
                  xl:text-base lg:text-sm md:text-xs sm:text-xs"
                  >
                    <div className="text-gray-700 md:w-8 sm:w-8 w-12">
                      {"[" + categoryMap[item.category] + "]" || "[기타]"}
                    </div>
                    <strong className="w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
                      {item.title}
                    </strong>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-end w-full mt-4">
          <Link href="/board/board-register">
            <button
              className="bg-primary text-white rounded hover:bg-primary/70
            xl:text-base lg:text-sm md:text-xs sm:text-xs
            xl:px-3 py-1.5 lg:px-2.5 md:px-2 sm:px-1.5 sm:py-1"
            >
              글쓰기
            </button>
          </Link>
        </div>

        <Pagination className="mt-4 items-center">
          {page > 0 && (
            <PaginationPrevious
              onClick={() => handlePageChange(page - 1)}
              className="cursor-pointer xl:text-base lg:text-sm md:text-xs sm:text-xs lg:pr-2 md:pr-0 sm:pr-0"
            />
          )}
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationLink
              key={index}
              isActive={index === page}
              onClick={() => handlePageChange(index)}
              className="cursor-pointer xl:text-base lg:text-sm md:text-xs sm:text-xs lg:size-9 md:size-8 sm:size-8"
            >
              {index + 1}
            </PaginationLink>
          ))}
          {page < totalPages - 1 && (
            <PaginationNext
              onClick={() => handlePageChange(page + 1)}
              className="cursor-pointer xl:text-base lg:text-sm md:text-xs sm:text-xs lg:pl-2 md:pl-0 sm:pl-0"
              aria-disabled={page === 0}
            />
          )}
        </Pagination>
      </div>
    </div>
  );
};

export default Board;
