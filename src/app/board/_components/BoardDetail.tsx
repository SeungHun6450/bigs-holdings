"use client";

import { useDeleteBoard } from "@/api/react-query/board/useDeleteBoard";
import { useGetOneBoard } from "@/api/react-query/board/useGetOneBoard";
import { useAuth } from "@/hooks/useAuth";
import boardStore from "@/stores/BoardStore";
import { ArrowLeftIcon } from "lucide-react";
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
      router.push("/");
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

  const goToBack = () => {
    router.back();
  };

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-full m-4">
      {board ? (
        <div className="w-full max-w-6xl">
          <ArrowLeftIcon onClick={goToBack} className="cursor-pointer" />
          <div className="flex flex-row items-center justify-between mt-4 text-sm text-gray-700 pb-4 border-b xl:text-base lg:text-sm md:text-xs sm:text-xs">
            <p>{"[" + categoryMap[board.boardCategory] + "]" || "[기타]"}</p>
            <p>
              {board.createdAt
                ? new Date(board.createdAt).toLocaleString()
                : "날짜 정보 없음"}
            </p>
          </div>
          <h1 className="text-2xl lg:text-xl md:text-lg sm:text-base font-bold mt-4">
            {board.title}
          </h1>
          <p className="mt-8 min-h-80 xl:text-base lg:text-sm md:text-xs sm:text-xs">
            {board.content}
          </p>

          <div className="py-2 flex flex-row items-center justify-end xl:gap-x-4 lg:gap-x-4 md:gap-x-3 sm:gap-x-2">
            <button
              onClick={() => handleEdit(board)}
              className="bg-blue-500 text-white py-1 px-2 rounded-md text-sm hover:bg-blue-400
              xl:text-base lg:text-sm md:text-xs sm:text-xs"
            >
              수정
            </button>
            <button
              onClick={() => handleDelete(board.id)}
              className="bg-red-500 text-white py-1 px-2 rounded-md text-sm hover:bg-red-400
              xl:text-base lg:text-sm md:text-xs sm:text-xs"
            >
              삭제
            </button>
          </div>
        </div>
      ) : (
        !loading &&
        !isLoading && (
          <p className="xl:text-base lg:text-sm md:text-xs sm:text-xs">
            게시글을 찾을 수 없습니다.
          </p>
        )
      )}
      {error && (
        <p className="xl:text-base lg:text-sm md:text-xs sm:text-xs">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default BoardDetail;
