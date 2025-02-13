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
