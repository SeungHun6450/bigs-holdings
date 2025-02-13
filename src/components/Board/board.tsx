"use client";

import { useAuth } from "@/hooks/useAuth";
import { useBoardData } from "@/hooks/useBoardData";
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

      <div className="mb-4">
        <DropdownMenuRadioGroupDemo categories={categories} />
      </div>

      <div>
        {loading && <p>로딩 중...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && posts.length === 0 && <p>게시글이 없습니다.</p>}

        <ul>
          {posts.map((post) => (
            <li key={post.id} className="border-b py-2">
              <div>
                <strong>{post.title}</strong>
              </div>
              <div>{categories[post.category]}</div>
              <div>{new Date(post.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Board;
