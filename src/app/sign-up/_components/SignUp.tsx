"use client";

import { signUp } from "@/api/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import InputField from "./SignUpInputFiled";

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
      <h2 className="xl:text-2xl lg:text-xl md:text-lg sm:text-lg font-bold text-center xl:mb-8 lg:mb-7 md:mb-6 sm:mb-5">
        회원가입
      </h2>
      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        <InputField
          label="이메일"
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          isValid={emailRegex.test(username)}
          validationMessage={
            username
              ? emailRegex.test(username)
                ? "올바른 이메일 형식입니다."
                : "올바른 이메일 형식이 아닙니다."
              : ""
          }
        />

        <InputField
          label="사용자 이름"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          isValid={false}
        />

        <InputField
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          isValid={passwordRegex.test(password)}
          validationMessage={
            password
              ? passwordRegex.test(password)
                ? "올바른 비밀번호 형식입니다."
                : "비밀번호는 8자 이상, 숫자, 영문자, 특수문자(!%*#?&)를 포함해야 합니다."
              : ""
          }
          regex={passwordRegex}
        />

        <InputField
          label="비밀번호 확인"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          isValid={password === confirmPassword}
          validationMessage={
            confirmPassword
              ? password === confirmPassword
                ? "비밀번호가 일치합니다."
                : "비밀번호가 일치하지 않습니다."
              : ""
          }
        />

        <button
          type="submit"
          className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-primary/70
          xl:text-base lg:text-base md:text-md sm:text-sm"
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
