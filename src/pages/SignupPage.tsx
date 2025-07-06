import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import LogoMark from "../assets/icons/Logo.svg?react";
import Button from "../components/common/Button";

interface Terms {
  all: boolean;
  service: boolean;
  privacy: boolean;
  marketing: boolean;
}

const SignupPage = () => {
  //폼 상태
  const [form, setForm] = useState({
    id: "",
    pw: "",
    email: "",
    nickname: "",
  });

  const [terms, setTerms] = useState<Terms>({
    all: false,
    service: false,
    privacy: false,
    marketing: false,
  });

  //핸들러
  const handleInput =
    (key: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [key]: e.target.value });

  //개별 체크
  const toggle = (key: keyof Terms) =>
    setTerms((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      //all 체크 상태 동기화
      if (key !== "all") {
        next.all = next.service && next.privacy && next.marketing;
      }
      return next;
    });

  //전체 동의
  const toggleAll = () =>
    setTerms((prev) => {
      const nextValue = !prev.all;
      return {
        all: nextValue,
        service: nextValue,
        privacy: nextValue,
        marketing: nextValue,
      };
    });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: API 연동
    console.log("회원가입 데이터:", form, terms);
  };

  const isSubmitDisabled =
    !form.id ||
    !form.pw ||
    !form.email ||
    !form.nickname ||
    !terms.service ||
    !terms.privacy;

  //JSX
  return (
    <section className="flex min-h-dvh w-full flex-col items-center bg-[#FFFBF8]">
      {/* 로고 */}
      <div className="mt-[84px] flex flex-col items-center gap-4">
        <LogoMark className="w-[84px] h-[116px]" />
      </div>

      {/* 입력 폼 */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-[320px] flex flex-col gap-4"
      >
        {/* 아이디 */}
        <label className="text-[12px] font-semibold text-[#262626]">
          아이디
          <input
            type="text"
            placeholder="영문 대소문자, 숫자 조합 3자 이상 10자 이하"
            value={form.id}
            onChange={handleInput("id")}
            className="mt-1 h-[44px] w-full rounded border border-[#ECE6DF] px-3
                       text-[14px] placeholder-[#B3B3B3] focus:border-green-400 focus:outline-none"
          />
        </label>

        {/* 비밀번호 */}
        <label className="text-[12px] font-semibold text-[#262626]">
          비밀번호
          <input
            type="password"
            placeholder="영문 대소문자, 숫자, 특수문자 최소 2종류 이상 조합 8자 이상"
            value={form.pw}
            onChange={handleInput("pw")}
            className="mt-1 h-[44px] w-full rounded border border-[#ECE6DF] px-3
                       text-[14px] placeholder-[#B3B3B3] focus:border-green-400 focus:outline-none"
          />
        </label>

        {/* 이메일 */}
        <label className="text-[12px] font-semibold text-[#262626]">
          이메일
          <input
            type="email"
            placeholder="아이디/비밀번호 찾기에 사용됩니다."
            value={form.email}
            onChange={handleInput("email")}
            className="mt-1 h-[44px] w-full rounded border border-[#ECE6DF] px-3
                       text-[14px] placeholder-[#B3B3B3] focus:border-green-400 focus:outline-none"
          />
        </label>

        {/* 닉네임 */}
        <label className="text-[12px] font-semibold text-[#262626]">
          닉네임
          <input
            type="text"
            placeholder="한글,숫자,기호 제외 3~10자를 입력해주세요."
            value={form.nickname}
            onChange={handleInput("nickname")}
            className="mt-1 h-[44px] w-full rounded border border-[#ECE6DF] px-3
                       text-[14px] placeholder-[#B3B3B3] focus:border-green-400 focus:outline-none"
          />
        </label>

        {/* 안내 문구 */}
        <p className="text-[11px] text-[#B3B3B3]">
          3자 이상 10자 이하 글자수로 제가 적절히 넣기
        </p>

        {/* 약관 박스 */}
        <div className="mt-4 rounded bg-[#F0F0F0] py-3">
          {/* 전체 동의 */}
          <label
            className="mb-2 flex h-[28px] cursor-pointer items-center bg-[#B3E378] px-3 text-[13px] font-semibold text-[#262626]"
            htmlFor="all"
          >
            <input
              id="all"
              type="checkbox"
              checked={terms.all}
              onChange={toggleAll}
              className="mr-2 scale-125 accent-white"
            />
            전체동의
          </label>

          {/* 개별 약관 */}
          {[
            { key: "service", label: "이용약관 동의 (필수)" },
            { key: "privacy", label: "개인정보 이용 동의 (필수)" },
            { key: "marketing", label: "마케팅 동의 (선택)" },
          ].map(({ key, label }) => (
            <label
              key={key}
              className="mb-1 flex h-[28px] cursor-pointer items-center bg-white px-3 text-[13px] text-[#262626]"
            >
              <input
                type="checkbox"
                checked={terms[key as keyof Terms]}
                onChange={() => toggle(key as keyof Terms)}
                className="mr-2 scale-125 accent-[#B3E378]"
              />
              {label}
            </label>
          ))}
        </div>

        <Button
          variant="secondary"
          type="submit"
          disabled={isSubmitDisabled}
          className="mt-6"
        >
          회원가입
        </Button>
      </form>
    </section>
  );
};

export default SignupPage;
