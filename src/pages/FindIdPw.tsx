import { useState, type FormEvent } from "react";
import LogoMark from "../assets/icons/logoNew.svg?react";
import LeftArrow from "../assets/icons/left-point.svg?react";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/auth/TextInput";

export default function FindIdPwPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleFind = (type: "id" | "pw") => (e: FormEvent) => {
    e.preventDefault();
    console.log(`${type === "id" ? "아이디" : "비밀번호"} 찾기`, email);
  };

  return (
    <section className="flex min-h-dvh w-full flex-col items-center bg-[#FFFBF8]">
      <div className="mt-[156px] flex flex-col items-center gap-[40px]">
        <LogoMark className="h-[205px] w-[149px]" />
      </div>

      <form className="mt-[32px] flex w-[310px] flex-col gap-[18px]">
        <div className="flex items-center gap-2 text-[16px] font-semibold">
          <button type="button" onClick={() => navigate("/signin")}>
            <LeftArrow className="h-[24px] w-[24px]" />
          </button>
          로그인 하러 가기
        </div>

        <TextInput
          placeholder="가입된 이메일을 입력해주세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          variant="primary"
          className="text-[14px]"
          onClick={handleFind("id")}
        >
          아이디 찾기
        </Button>

        <Button
          variant="primary"
          className="text-[14px]"
          onClick={handleFind("pw")}
        >
          비밀번호 찾기
        </Button>

        <p className="mt-[12px] text-center text-[12px] text-[background: #14441A;]">
          이메일로 아이디가 전송되었습니다.
        </p>
      </form>
    </section>
  );
}
