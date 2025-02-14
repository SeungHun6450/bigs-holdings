import { fetchCategories, fetchPosts } from "@/api/auth";
import { useEffect, useState } from "react";

export const useBoardData = (token: string) => {
  const [categories, setCategories] = useState<Record<string, string>>({});
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const refreshAndLoadBoardData = async (page: number) => {
    if (!token) return;

    setLoading(true);

    try {
      const categoriesData = await fetchCategories(token);
      const postsData = await fetchPosts(token, page, 10);

      setCategories(categoriesData);
      setPosts(postsData.content);
      setTotalPages(postsData.totalPages);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  const loadPage = (page: number) => {
    setCurrentPage(page);
    refreshAndLoadBoardData(page);
  };

  useEffect(() => {
    if (token) {
      refreshAndLoadBoardData(currentPage); // currentPage가 변경될 때마다 데이터 불러오기
    }
  }, [token, currentPage]);
  console.log(currentPage);

  return {
    categories,
    posts,
    error,
    loading,
    currentPage,
    totalPages,
    refreshAndLoadBoardData,
    loadPage,
  };
};
