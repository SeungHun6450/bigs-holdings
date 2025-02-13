"use client";

import { useAuth } from "@/hooks/useAuth";
import { useBoardData } from "@/hooks/useBoardData";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { DropdownMenuRadioGroupDemo } from "../Board/DropdownMenuRadioGroupDemo";

const Board = () => {
  const { token, error: authError } = useAuth();
  const {
    categories,
    posts,
    error: boardError,
    loading: boardLoading,
  } = useBoardData(token || "");

  const error = authError || boardError;
  const loading = boardLoading;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/board") router.push("/board/notice");
  }, [router]);

  return (
    <div className="flex flex-col items-center min-h-screen m-4">
      <h1 className="text-2xl font-bold mb-4">게시판</h1>

      <div className="flex gap-x-4">
        <DropdownMenuRadioGroupDemo categories={categories} />

        <Link href="/board/board-register">
          <button className="bg-[#2aa7be] text-white px-4 py-1.5 rounded hover:bg-[#5db0bf]">
            글쓰기
          </button>
        </Link>
      </div>

      <div>
        {loading && <p>로딩 중...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && posts.length === 0 && <p>게시글이 없습니다.</p>}

        <ul className="flex flex-col w-full">
          {posts.map((items) => (
            <Link
              key={items.id}
              href={`/board/${items.category.toLowerCase()}/${items.id}`}
            >
              <li className="border-b py-2 flex flex-row gap-x-4">
                <div className="text-gray-700">
                  {categories[items.category]}
                </div>
                <strong>{items.title}</strong>
                <div className="text-gray-700">
                  {new Date(items.createdAt).toLocaleString()}
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Board;
