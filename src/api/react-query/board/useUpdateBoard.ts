import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      token: string;
      id: number;
      boardData: {
        title: string;
        content: string;
        category: string;
        file?: File;
      };
    }) => {
      const { token, id, boardData } = data;

      const formData = new FormData();

      // JSON 데이터를 Blob으로 변환하여 추가
      const jsonBlob = new Blob([JSON.stringify(boardData)], {
        type: "application/json",
      });
      formData.append("request", jsonBlob);

      if (boardData.file) {
        formData.append("file", boardData.file);
      }

      const response = await fetch(
        `https://front-mission.bigs.or.kr/boards/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData, // Content-Type 자동 처리
        },
      );

      if (!response.ok) {
        throw new Error("게시글 수정에 실패했습니다.");
      }

      // SyntaxError: Failed to execute 'json' on 'Response': Unexpected end of JSON input
      // 위의 에러 발생으로 등록 API와 다르게 .json() 삭제
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
      alert("게시글이 수정되었습니다!");
    },
    onError: (err) => {
      alert(err);
    },
  });
};
