import { useQuery } from "@tanstack/react-query";

export const useGetCategories = (token: string) => {
  return useQuery({
    queryKey: ["categories", token],
    queryFn: async () => {
      const response = await fetch(
        "https://front-mission.bigs.or.kr/boards/categories",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("카테고리를 불러오는 데 실패했습니다.");
      }

      return await response.json();
    },
    staleTime: 5 * 60 * 1000,
  });
};
