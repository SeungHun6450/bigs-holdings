import { useMutation, useQueryClient } from "@tanstack/react-query";

interface BoardData {
  title: string;
  content: string;
  category: string;
}

interface CreateBoardRequest {
  token: string;
  boardData: BoardData;
  file?: File;
}

interface CreateBoardResponse {
  id: number;
}

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateBoardResponse, Error, CreateBoardRequest>({
    mutationFn: async ({ token, boardData, file }) => {
      const formData = new FormData();

      // JSON 데이터를 Blob으로 변환하여 추가
      const jsonBlob = new Blob([JSON.stringify(boardData)], {
        type: "application/json",
      });
      formData.append("request", jsonBlob);

      if (file) {
        formData.append("file", file);
      }

      const response = await fetch("https://front-mission.bigs.or.kr/boards", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("게시글 등록에 실패했습니다.");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      alert("글이 등록되었습니다!");
    },
    onError: (err) => {
      alert(err);
    },
  });
};
