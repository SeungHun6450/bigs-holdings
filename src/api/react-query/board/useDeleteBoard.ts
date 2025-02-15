import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { token: string; id: number }) => {
      const { token, id } = data;

      const response = await fetch(
        `https://front-mission.bigs.or.kr/boards/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("게시글 삭제에 실패했습니다.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["boards"],
      }),
        alert("게시글이 삭제되었습니다!");
    },
    onError: (err) => {
      alert(err);
    },
  });
};
