import { fetchCategories, fetchPosts } from "@/api/auth";
import { useEffect, useState } from "react";

export const useBoardData = (token: string) => {
  const [categories, setCategories] = useState<Record<string, string>>({});
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const refreshAndLoadBoardData = async () => {
    if (!token) return;

    setLoading(true);

    try {
      // 카테고리 및 게시글 데이터 로드
      const categoriesData = await fetchCategories(token);
      const postsData = await fetchPosts(token, 0, 10);

      setCategories(categoriesData);
      setPosts(postsData.content);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    refreshAndLoadBoardData();
  }, [token]);

  return { categories, posts, error, loading, refreshAndLoadBoardData };
};
