"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useEffect } from "react";

const Home = () => {
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      window.location.href = "/board?page=0";
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen mx-4">
      <h1 className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl font-bold text-center">
        Welcome BIGS CO.,LTD Boards
      </h1>

      <section className="flex gap-x-2 mt-4 font-bold">
        <Link href="/sign-up">
          <button className="bg-primary text-white xl:px-4 py-2 lg:px-3 md:px-3 md:py-1.5 sm:px-2.5 sm:py-1.5 rounded hover:bg-primary/70 xl:text-lg lg:text-base md:text-sm sm:text-xs">
            회원가입
          </button>
        </Link>
        <Link href="/sign-in">
          <button className="bg-black text-white xl:px-4 py-2 lg:px-3 md:px-3 md:py-1.5 sm:px-2.5 sm:py-1.5 rounded hover:bg-black/70 xl:text-lg lg:text-base md:text-sm sm:text-xs">
            로그인
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
