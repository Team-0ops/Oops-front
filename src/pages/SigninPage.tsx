import { useState } from "react";
import LogoMark from "../assets/icons/Logo.svg?react";
import Button from "../components/common/Button";
import PasswordInput from "../components/auth/PasswordInput";
import { Link } from "react-router-dom";

const SigninPage = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("로그인 시도", { id, pw });
  };

  return (
    <>
      <section className="flex min-h-dvh w-full flex-col items-center bg-[#FFFBF8]">
        <div className="mt-[156px] flex flex-col items-center gap-[50px]">
          <LogoMark className="w-[149px] h-[205px]" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-[36px] w-[320px] flex flex-col gap-3"
        >
          <input
            type="text"
            placeholder="아이디를 입력해주세요."
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="h-[44px] w-full rounded border border-[#ECE6DF] px-3
                       text-[14px] placeholder-[#B3B3B3]
                       focus:border-green-400 focus:outline-none"
          />
          {/* 비밀번호 입력 (PasswordInput 컴포넌트) */}
          <PasswordInput
            placeholder="비밀번호를 입력해주세요."
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />

          <Button type="submit" disabled={!id || !pw}>
            log in
          </Button>

          <div className="mt-2 flex justify-end text-[12px] text-[#B3B3B3]">
            <Link to="/find-idpw" className="hover:underline">
              아이디/비밀번호 찾기
            </Link>
            <span className="mx-2">|</span>
            <Link to="/signup" className="hover:underline">
              회원가입
            </Link>
          </div>
        </form>
      </section>
    </>
  );
};

export default SigninPage;
