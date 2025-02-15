import { useQuery } from "@tanstack/react-query";

interface BoardDetail {
  id: number;
  title: string;
  content: string;
  boardCategory: string;
  createdAt: string;
  imageUrl: string | null;
}

export const useGetOneBoard = (token: string, id: number, enabled: boolean) => {
  return useQuery<BoardDetail, Error>({
    queryKey: ["board", token, id],
    queryFn: async () => {
      const response = await fetch(
        `https://front-mission.bigs.or.kr/boards/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("게시글 상세 조회에 실패했습니다.");
      }

      return await response.json();
    },
    staleTime: 5 * 60 * 1000,
    enabled,
  });
};
