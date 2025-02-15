"use client";

import { useAuth } from "@/hooks/useAuth";
import authStore from "@/stores/AuthStore";
import { getUserInfo } from "@/utils/jwtUtils";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../../../public/logo.png";

const Header = observer(() => {
  const { loading, setToken } = useAuth();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{
    name: string;
    username: string;
  } | null>(null);

  useEffect(() => {
    if (!loading && authStore.accessToken) {
      const user = getUserInfo(authStore.accessToken);
      setUserInfo({ name: user?.name, username: user?.username });
    } else {
      setUserInfo(null);
    }
  }, [authStore.accessToken, loading, authStore]);

  const signOut = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      authStore.clearTokens();
      setToken(null);
      alert("로그아웃 되었습니다!");
      router.push("/");
    }
  };

  return (
    <div className="flex justify-between items-center w-full px-4 h-16 bg-white">
      <Image src={Logo} alt={"로고"} width={50} height={50} />
      {loading ? (
        <p>로그인 확인 중...</p>
      ) : authStore.accessToken ? (
        <div className="flex flex-row items-center">
          <span className="mr-4 font-bold">{`${userInfo?.name}(${userInfo?.username})`}</span>
          <button
            onClick={signOut}
            className="bg-[#798385] text-white px-4 py-1.5 rounded hover:bg-[#a5b2b4]"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <Link href="/sign-in">
          <button className="bg-[#2aa7be] text-white px-4 py-1.5 rounded-md hover:bg-[#3590a0]">
            로그인
          </button>
        </Link>
      )}
    </div>
  );
});

export default Header;
