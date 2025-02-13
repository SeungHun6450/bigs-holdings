import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">
        빅스 게시판에 오신 것을 환영합니다!
      </h1>

      <section className="flex gap-x-2 mt-4">
        <Link href="/sign-up">
          <button className="bg-[#2aa7be] text-white px-4 py-2 rounded hover:bg-[#5db0bf]">
            회원가입
          </button>
        </Link>
        <Link href="/sign-in">
          <button className="bg-[#2aa7be] text-white px-4 py-2 rounded hover:bg-[#5db0bf]">
            로그인
          </button>
        </Link>
      </section>
    </div>
  );
};

export default page;
