"use client";

import { signIn } from "@/api/auth";
import { useAuth } from "@/hooks/useAuth";
import authStore from "@/stores/AuthStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SignInInputFiled from "./SignInInputFiled";

const SignIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      router.push("/board?page=0");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    try {
      const response = await signIn(data);
      const { accessToken, refreshToken } = response;
      authStore.setTokens(accessToken, refreshToken);
      setSuccess("로그인 성공!");
      setError("");
      router.push("/board?page=0");
    } catch (err: any) {
      setError("로그인에 실패했습니다. 아이디나 비밀번호를 확인 해주세요!");
      setSuccess("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen m-4">
      <h2 className="xl:text-2xl lg:text-xl md:text-lg sm:text-lg font-bold text-center">
        로그인
      </h2>
      <form onSubmit={handleSubmit} className="mt-4 w-full max-w-xl">
        <SignInInputFiled
          label="이메일"
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <SignInInputFiled
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/70
          xl:text-base lg:text-base md:text-md sm:text-sm"
        >
          로그인
        </button>
        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        {success && <p className="mt-2 text-green-500 text-sm">{success}</p>}
      </form>
    </div>
  );
};

export default SignIn;
