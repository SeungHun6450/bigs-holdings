import { useQuery } from "@tanstack/react-query";

interface Board {
  id: number;
  title: string;
  createdAt: string;
  category: string;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

interface PageResponse<T> {
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  first: boolean;
  empty: boolean;
  content: T[];
}

interface UseGetBoardsParams {
  token: string;
  page: number;
  size: number;
}

export const useGetBoards = (
  { token, page, size }: UseGetBoardsParams,
  enabled: boolean,
) => {
  return useQuery<PageResponse<Board>, Error>({
    queryKey: ["boards", page, size],
    queryFn: async () => {
      const response = await fetch(
        `https://front-mission.bigs.or.kr/boards?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("게시글을 불러오는 데 실패했습니다.");
      }

      return await response.json();
    },
    staleTime: 5 * 60 * 1000,
    enabled,
  });
};
