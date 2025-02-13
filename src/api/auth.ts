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
