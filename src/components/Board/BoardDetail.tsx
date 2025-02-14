"use client";

import { deletePost, fetchOnePost } from "@/api/auth";
import { useAuth } from "@/hooks/useAuth";
import boardStore from "@/stores/BoardStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PostDetail = ({ detail }: { detail: string }) => {
  const { token } = useAuth();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getPost = async () => {
      if (!token || !detail) return;

      setIsLoading(true);

      try {
        const postData = await fetchOnePost(token, Number(detail));
        setPost(postData);
      } catch (err: any) {
        console.error(err);
      }
    };

    getPost();
    setIsLoading(false);
  }, [token, detail]);

  const handleEdit = (post: any) => {
    boardStore.setSelectedPost(post); // MobX 상태에 저장
    router.push("/board/board-modify"); // 수정 페이지로 이동
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deletePost(token || "", id);
      alert("게시글이 삭제되었습니다!");
      router.push("/board");
    } catch (err) {
      console.error("게시글 삭제 오류:", err);
    }
  };

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{post?.title}</h1>
      <div className="text-gray-700 mb-4">{post?.category}</div>
      <div className="text-gray-600 mb-4">
        {new Date(post?.createdAt).toLocaleString()}
      </div>
      <p>{post?.content}</p>

      <div className="border-b py-2 flex flex-row items-center gap-x-4">
        <button
          onClick={(e) => handleEdit(post)}
          className="bg-blue-500 text-white py-1 px-2 rounded-md text-sm hover:bg-blue-400"
        >
          수정
        </button>
        <button
          onClick={(e) => handleDelete(post.id)}
          className="bg-red-500 text-white py-1 px-2 rounded-md text-sm hover:bg-red-400"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
