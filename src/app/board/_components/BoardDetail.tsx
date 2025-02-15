"use client";

import { useDeleteBoard } from "@/api/react-query/board/useDeleteBoard";
import { useGetOneBoard } from "@/api/react-query/board/useGetOneBoard";
import { useAuth } from "@/hooks/useAuth";
import boardStore from "@/stores/BoardStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const categoryMap: Record<string, string> = {
  NOTICE: "공지",
  ETC: "기타",
  QNA: "Q&A",
  FREE: "자유",
};

interface PostData {
  id: number;
  title: string;
  content: string;
  boardCategory: string;
  createdAt: string;
  imageUrl: string | null;
}

const BoardDetail = ({ detail }: { detail: string }) => {
  const { token, loading } = useAuth();
  const router = useRouter();
  const deleteBoardMutation = useDeleteBoard();

  const {
    data: board,
    isLoading,
    error,
  } = useGetOneBoard(token || "", Number(detail), !!token && !loading);

  useEffect(() => {
    if (!loading && !token) {
      alert("로그인 후 이용 가능합니다.");
      window.location.href = "/";
    }
  }, [loading, token]);

  const handleEdit = (post?: PostData) => {
    if (!post) {
      alert("수정할 게시글 정보를 불러오지 못했습니다.");
      return;
    }
    boardStore.setSelectedPost(post);
    router.push("/board/board-modify");
  };

  const handleDelete = async (id?: number) => {
    if (!id || id === -1) {
      alert("삭제할 게시글 ID를 찾을 수 없습니다.");
      return;
    }
    if (!confirm("정말 삭제하시겠습니까?")) return;

    deleteBoardMutation.mutate(
      { token: token || "", id },
      {
        onSuccess: () => {
          router.push("/board?page=0");
        },
        onError: (err) => {
          console.error("게시글 삭제 오류:", err);
        },
      },
    );
  };

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>게시글 조회에 실패했습니다: {error.message}</p>;
  }

  return (
    <>
      {board ? (
        <div className="p-4">
          <h1 className="text-2xl font-bold">{board.title}</h1>
          <div className="text-gray-700 mb-4">
            {categoryMap[board.boardCategory] || "기타"}
          </div>
          <div className="text-gray-600 mb-4">
            {board.createdAt
              ? new Date(board.createdAt).toLocaleString()
              : "날짜 정보 없음"}
          </div>
          <p>{board.content}</p>

          <div className="border-b py-2 flex flex-row items-center gap-x-4">
            <button
              onClick={() => handleEdit(board)}
              className="bg-blue-500 text-white py-1 px-2 rounded-md text-sm hover:bg-blue-400"
            >
              수정
            </button>
            <button
              onClick={() => handleDelete(board.id)}
              className="bg-red-500 text-white py-1 px-2 rounded-md text-sm hover:bg-red-400"
            >
              삭제
            </button>
          </div>
        </div>
      ) : (
        !loading && !isLoading && <p>게시글을 찾을 수 없습니다.</p>
      )}
    </>
  );
};

export default BoardDetail;
