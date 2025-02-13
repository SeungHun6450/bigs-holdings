"use client";

import { signUp } from "@/api/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 비밀번호 정규 표현식
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!%*#?&])[A-Za-z\d!%*#?&]{8,}$/;

  // 이메일 정규 표현식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      username,
      name,
      password,
      confirmPassword,
    };

    try {
      await signUp(data);
      alert("회원가입이 성공적으로 완료되었습니다!");
      setSuccess("회원가입이 성공적으로 완료되었습니다!");
      setError("");
      router.push("/sign-in"); // 회원가입 성공 후 로그인 화면으로 이동
    } catch (err: any) {
      alert(err);
      setError(`${err}`);
      setSuccess("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen m-4">
      <h2 className="text-2xl font-bold text-center">회원가입</h2>
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
          {/* 이메일 형식 일치 여부 표시 */}
          <p
            className={`mt-2 text-sm ${
              emailRegex.test(username) ? "text-green-500" : "text-red-500"
            }`}
          >
            {username
              ? emailRegex.test(username)
                ? "올바른 이메일 형식입니다."
                : "올바른 이메일 형식이 아닙니다."
              : ""}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            사용자 이름
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          {/* 정규식 일치 여부 표시 */}
          <p
            className={`mt-2 text-sm ${
              passwordRegex.test(password) ? "text-green-500" : "text-red-500"
            }`}
          >
            {password
              ? passwordRegex.test(password)
                ? "올바른 비밀번호 형식입니다."
                : "비밀번호는 8자 이상, 숫자, 영문자, 특수문자(!%*#?&)를 포함해야 합니다."
              : ""}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            비밀번호 확인
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-bg-[#2aa7be]"
          />
          {/* 비밀번호 일치 여부 표시 */}
          <p
            className={`mt-2 text-sm ${
              password === confirmPassword ? "text-green-500" : "text-red-500"
            }`}
          >
            {confirmPassword
              ? password === confirmPassword
                ? "비밀번호가 일치합니다."
                : "비밀번호가 일치하지 않습니다."
              : ""}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-[#2aa7be] text-white py-2 rounded-md hover:bg-[#3590a0]"
        >
          회원가입
        </button>
        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        {success && <p className="mt-2 text-green-500 text-sm">{success}</p>}
      </form>
    </div>
  );
};

export default SignUp;
