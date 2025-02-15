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
      <Link href={userInfo ? "/board" : "/"}>
        <Image
          src={Logo}
          alt={"로고"}
          width={50}
          height={50}
          className="xl:w-16 xl:h-10 lg:w-14 lg:h-9 md:w-12 md:h-8 sm:w-10 sm:h-7"
        />
      </Link>
      {authStore.accessToken ? (
        <div className="flex flex-row items-center xl:gap-x-4 lg:gap-x-3 md:gap-x-2 sm:gap-x-1 xl:text-base lg:text-sm md:text-xs sm:text-xs">
          <p className="font-bold md:flex md:flex-col md:items-center sm:flex sm:flex-col sm:items-center">
            <span>{`${userInfo?.name}`}</span>
            <span>{`(${userInfo?.username})`}</span>
          </p>
          <button
            onClick={signOut}
            className="bg-[#798385] text-white rounded hover:bg-[#798385]/70 xl:px-4 py-1.5 lg:px-3 md:px-2 sm:px-2 xl:text-sm lg:text-sm md:text-xs sm:text-xs"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <Link href="/sign-in">
          <button className="bg-black text-white rounded-md hover:bg-black/70 xl:px-4 py-1.5 lg:px-3 md:px-2 sm:px-2 xl:text-sm lg:text-sm md:text-xs sm:text-xs">
            로그인
          </button>
        </Link>
      )}
    </div>
  );
});

export default Header;
