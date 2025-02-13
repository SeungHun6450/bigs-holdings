"use client";

import { signIn } from "@/api/auth";
import authStore from "@/stores/AuthStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    try {
      const response = await signIn(data);
      const { accessToken, refreshToken } = response; // accessToken과 refreshToken을 받기
      authStore.setTokens(accessToken, refreshToken); // 스토어에 토큰 저장
      setSuccess("로그인 성공!");
      setError("");
      router.push("/board/notice"); // 로그인 후 게시판 페이지로 이동
    } catch (err: any) {
      setError("로그인에 실패했습니다. 아이디나 비밀번호를 확인 해주세요!");
      setSuccess("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen m-4">
      <h2 className="text-2xl font-bold text-center">로그인</h2>
      <form onSubmit={handleSubmit} className="mt-4 w-full max-w-xl">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            이메일
          </label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-bg-[#2aa7be]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            비밀번호
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-bg-[#2aa7be]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#2aa7be] text-white py-2 rounded-md hover:bg-[#3590a0]"
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
