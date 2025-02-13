import { makeAutoObservable } from "mobx";

class AuthStore {
  accessToken: string | null = null;
  refreshToken: string | null = null;

  constructor() {
    makeAutoObservable(this);

    // SSR에서 실행되는 로직, Next.js이기에 발생
    if (typeof window !== "undefined") {
      // 로컬스토리지에서 토큰 가져오기
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");

      if (storedAccessToken) {
        this.accessToken = storedAccessToken;
      }
      if (storedRefreshToken) {
        this.refreshToken = storedRefreshToken;
      }
    }
  }

  setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem("accessToken", accessToken); // 액세스 토큰을 로컬 스토리지에 저장
    localStorage.setItem("refreshToken", refreshToken); // 리프레시 토큰을 로컬 스토리지에 저장
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem("accessToken"); // 로컬 스토리지에서 액세스 토큰 삭제
    localStorage.removeItem("refreshToken"); // 로컬 스토리지에서 리프레시 토큰 삭제
  }

  // 액세스 토큰을 갱신하기 위한 메서드
  async refreshTokens() {
    const storedRefreshToken = this.refreshToken;

    if (!storedRefreshToken) {
      throw new Error("리프레시 토큰이 없습니다.");
    }

    try {
      const response = await fetch(
        "https://front-mission.bigs.or.kr/auth/refresh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken: storedRefreshToken }),
        },
      );

      if (!response.ok) {
        throw new Error("토큰 갱신에 실패했습니다.");
      }

      const data = await response.json();
      this.setTokens(data.accessToken, data.refreshToken); // 새로운 토큰 설정
    } catch (error) {
      console.error(error);
      this.clearTokens(); // 갱신 실패 시 토큰 삭제
      throw error; // 에러 다시 던지기
    }
  }
}

const authStore = new AuthStore();
export default authStore;
