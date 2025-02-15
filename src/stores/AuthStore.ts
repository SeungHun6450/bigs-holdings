import Cookies from "js-cookie";
import { makeAutoObservable } from "mobx";

class AuthStore {
  accessToken: string | null = null;
  refreshToken: string | null = null;

  constructor() {
    makeAutoObservable(this);

    const storedAccessToken = Cookies.get("accessToken");
    const storedRefreshToken = Cookies.get("refreshToken");

    if (storedAccessToken) {
      this.accessToken = storedAccessToken;
    }
    if (storedRefreshToken) {
      this.refreshToken = storedRefreshToken;
    }
  }

  setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    Cookies.set("accessToken", accessToken, { expires: 7 });
    Cookies.set("refreshToken", refreshToken, { expires: 7 });
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  }

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
      this.setTokens(data.accessToken, data.refreshToken);
    } catch (error) {
      console.error(error);
      this.clearTokens();
      throw error;
    }
  }
}

const authStore = new AuthStore();
export default authStore;
