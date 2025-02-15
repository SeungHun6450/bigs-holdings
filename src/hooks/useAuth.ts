import authStore from "@/stores/AuthStore";
import { isTokenExpired } from "@/utils/jwtUtils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const isChecking = useRef(false); // 중복 실행 방지
  const router = useRouter();

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      if (isChecking.current) return;
      isChecking.current = true; // 실행 중 플래그 설정
      setLoading(true); // 로딩 시작

      let storedToken = authStore.accessToken;

      if (storedToken && isTokenExpired(storedToken)) {
        try {
          await authStore.refreshTokens();
          storedToken = authStore.accessToken; // 갱신된 토큰 가져오기
        } catch (err) {
          console.error("토큰 갱신 실패:", err);
          authStore.clearTokens();
          alert("다시 로그인 해주세요!");
          router.replace("/");
          return;
        }
      }

      setToken(storedToken);
      setLoading(false);
      isChecking.current = false; // 실행 완료 후 플래그 해제
    };

    checkAndRefreshToken();
  }, [router]);

  return { token, loading, setToken };
};
