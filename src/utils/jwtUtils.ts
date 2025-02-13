// JWT 디코딩 함수
export const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );

    const decoded = JSON.parse(jsonPayload);
    return decoded; // JWT payload 반환
  } catch (e) {
    console.error("JWT 디코드 실패", e);
    return null;
  }
};

// 만료 시간 확인 함수
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeJWT(token);
  if (decoded && decoded.exp) {
    const expiryDate = new Date(decoded.exp * 1000); // exp는 초 단위로 제공되므로 밀리초로 변환
    return expiryDate < new Date();
  }
  return true; // 만료된 토큰으로 간주
};
