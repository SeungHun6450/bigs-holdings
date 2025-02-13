"use client";

import { fetchOnePost } from "@/api/auth";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const PostDetail = ({ detail }: { detail: string }) => {
  const { token } = useAuth();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    </div>
  );
};

export default PostDetail;
