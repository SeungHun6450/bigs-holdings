// 회원가입 API 호출
export const signUp = async (userData: {
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
}) => {
  const response = await fetch("https://front-mission.bigs.or.kr/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("회원가입에 실패했습니다.");
  }

  return response;
};

// 로그인 API 호출
export const signIn = async (userData: {
  username: string;
  password: string;
}) => {
  const response = await fetch("https://front-mission.bigs.or.kr/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(
      errorResponse.username
        ? errorResponse.username[0]
        : "로그인에 실패했습니다.",
    );
  }

  return response.json();
};

// 게시판 카테고리 조회 API
export const fetchCategories = async (token: string) => {
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
};

// 게시글 목록 조회 API
export const fetchPosts = async (token: string, page: number, size: number) => {
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
};

// 게시글 상세 조회 API
export const fetchOnePost = async (token: string, id: number) => {
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
};

// 게시글 등록 API
export const createPost = async (
  token: string,
  postData: {
    title: string;
    content: string;
    category: string;
    file?: File | null; // 파일은 선택
  },
) => {
  const formData = new FormData();

  formData.append(
    "request",
    new Blob(
      [
        JSON.stringify({
          title: postData.title,
          content: postData.content,
          category: postData.category,
        }),
      ],
      { type: "application/json" },
    ),
  );

  if (postData.file) {
    formData.append("file", postData.file);
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
};

// 게시글 수정 API
export const updatePost = async (
  token: string,
  id: number,
  postData: {
    title: string;
    content: string;
    category: string;
    file?: File | null; // 파일은 선택 사항
  },
) => {
  const formData = new FormData();

  formData.append(
    "request",
    new Blob(
      [
        JSON.stringify({
          title: postData.title,
          content: postData.content,
          category: postData.category,
        }),
      ],
      { type: "application/json" },
    ),
  );

  if (postData.file) {
    formData.append("file", postData.file);
  }

  const response = await fetch(
    `https://front-mission.bigs.or.kr/boards/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error("게시글 수정에 실패했습니다.");
  }

  // SyntaxError: Failed to execute 'json' on 'Response': Unexpected end of JSON input
  // 위의 에러 발생으로 등록 API와 다르게 .json() 삭제
  return await response;
};

// 게시글 삭제 API
export const deletePost = async (token: string, id: number) => {
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
};
