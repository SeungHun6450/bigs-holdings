import { fetchCategories, fetchPosts } from "@/api/auth";
import { useEffect, useState } from "react";

export const useBoardData = (token: string, page: number) => {
  const [categories, setCategories] = useState<Record<string, string>>({});
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesData, postsData] = await Promise.all([
          fetchCategories(token),
          fetchPosts(token, page, 10),
        ]);
        setCategories(categoriesData);
        setPosts(postsData.content);
        setTotalPages(postsData.totalPages);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [token, page]);

  return { categories, posts, error, loading, totalPages };
};
