import { useState, type FormEvent } from "react";
import LogoMark from "../assets/icons/Logo.svg?react";
import LeftArrow from "../assets/icons/left-point.svg?react";
import Button from "../components/common/Button";

export default function FindIdPwPage() {
  /* ------------- state ------------- */
  const [email, setEmail] = useState("");

  /* ------------- submit ------------- */
  const handleFind = (type: "id" | "pw") => (e: FormEvent) => {
    e.preventDefault();
    console.log(`${type === "id" ? "아이디" : "비밀번호"} 찾기`, email);
  };

  /* ------------- UI ------------- */
  return (
    <section className="flex min-h-dvh w-full flex-col items-center bg-[#FFFBF8]">
      {/* --- 로고 영역 ------------------------------------------------ */}
      <div className="mt-[156px] flex flex-col items-center gap-[40px]">
        <LogoMark className="h-[205px] w-[149px]" />
      </div>

      {/* --- 입력 + 버튼 박스 (Figma 폭 310px) ----------------------- */}
      <form className="mt-[32px] flex w-[310px] flex-col gap-[18px]">
        {/* 뒤로가기 + 제목 */}
        <div className="flex items-center gap-2 text-[14px] font-semibold">
          <button type="button">
            <LeftArrow className="h-[18px] w-[18px]" />
          </button>
          로그인 하러 가기
        </div>

        {/* 이메일 입력 */}
        <input
          type="email"
          placeholder="가입된 이메일을 작성해주세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-[50px] w-full rounded-[4px] border border-[#ECE6DF] bg-[#FFFBF8] px-3
                     text-[14px] placeholder-[#B3B3B3] focus:border-green-400 focus:outline-none"
        />

        {/* 아이디 찾기 버튼 */}
        <Button
          variant="primary" /* bg #B3E378 + 검정 텍스트 */
          size="lg"
          onClick={handleFind("id")}
        >
          아이디 찾기
        </Button>

        {/* 비밀번호 찾기 버튼 */}
        <Button variant="primary" size="lg" onClick={handleFind("pw")}>
          비밀번호 찾기
        </Button>

        {/* 안내 문구 */}
        <p className="mt-[12px] text-center text-[11px] text-[#666666]">
          이메일로 아이디가 전송되었습니다.
        </p>
      </form>
    </section>
  );
}
