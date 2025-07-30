import { useState } from "react";
import LogoMark from "../assets/icons/logoNew.svg?react";
import Button from "../components/common/Button";
import PasswordInput from "../components/auth/PasswordInput";
import { Link } from "react-router-dom";
import TextInput from "../components/auth/TextInput";

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
          className="mt-[36px] w-[310px] flex flex-col gap-3"
        >
          <TextInput
            type="email"
            placeholder="이메일을 입력해주세요."
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          {/* 비밀번호 입력 */}
          <PasswordInput
            placeholder="비밀번호를 입력해주세요."
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            height="44px"
            padding="14px 12px"
            borderColor="#ECE6DF"
          />

          <Button type="submit" disabled={!id || !pw} className="text-[20px]">
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
