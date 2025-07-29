import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import LogoMark from "../assets/icons/logoNew.svg?react";
import Button from "../components/common/Button";
import PasswordInput from "../components/auth/PasswordInput";
import TermsGroup from "../components/auth/TermsGroup";

interface Terms {
  all: boolean;
  service: boolean;
  privacy: boolean;
  marketing: boolean;
}

const SignupPage = () => {
  //폼 상태
  const [form, setForm] = useState({
    email: "",
    pw: "",
    nickname: "",
  });

  const [emailChecked, setEmailChecked] = useState<boolean | null>(null);

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

  //중복확인
  const handleEmailCheck = () => {
    // TODO: fetch(`/api/check-email?email=${form.email}`)
    //       .then(({ ok }) => setEmailChecked(ok))
    setEmailChecked(true); // ← “확인됨” 상태로 강제
  };

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
        <LogoMark className="w-[149px] h-[205px]" />
      </div>

      {/* 입력 폼 */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-[320px] flex flex-col gap-4"
      >
        {/* 이메일 */}
        <label className="text-[14px] font-semibold text-[#4D4D4D]">
          이메일
          <div className="relative mt-1 w-full">
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={handleInput("email")}
              placeholder=""
              className="
              peer
              h-[42px] w-full rounded-[4px] 
              border border-[#F6EBE6] bg-[#FFFBF8] 
              px-[12px] pr-[88px]
                 text-[14px] placeholder-[#B3B3B3]
                 focus:border-green-400 focus:outline-none
                 shadow-[0_0_5.4px_rgba(0,0,0,0.05)]"
            />

            {/* 중복 확인 / 확인됨 버튼 */}
            <button
              type="button"
              onClick={handleEmailCheck}
              disabled={!form.email}
              className={`absolute right-[10px] top-1/2 -translate-y-1/2
                  flex h-[26px] items-center justify-center 
                  rounded-[4px] px-[7px] text-[12px] font-semibold
                  ${
                    emailChecked
                      ? "bg-[#B3E378] text-[#1D1D1D]"
                      : "bg-[#1D1D1D] text-white"
                  }
                  disabled:opacity-40`}
            >
              {emailChecked ? "확인됨" : "중복 확인"}
            </button>
          </div>
          <span className="mt-[2px] block text-[12px] text-[#808080]">
            아이디/비밀번호 찾기할 때 사용됩니다.
          </span>
        </label>
        {/* 비밀번호 (PasswordInput 컴포넌트) */}
        <label className="text-[14px] font-semibold text-[#4D4D4D]">
          비밀번호
          <PasswordInput
            value={form.pw}
            onChange={(e) => setForm({ ...form, pw: e.target.value })}
          />
          <span className="mt-[2px] block text-[12px] text-[#808080]">
            영문 대소문자, 숫자, 특수문자 중 최소 2종류 이상 조합된 8자 이상
            20자 이하 를 입력해주세요.
          </span>
        </label>
        {/* 닉네임 */}
        <label className="text-[14px] font-semibold text-[#4D4D4D]">
          닉네임
          <input
            type="text"
            placeholder="한영,숫자,기호로 이루어진 3~10자를 입력해주세요."
            value={form.nickname}
            onChange={handleInput("nickname")}
            className="mt-1 h-[44px] w-full rounded border border-[#ECE6DF] px-3
                       text-[14px] placeholder-[#B3B3B3] focus:border-green-400 focus:outline-none"
          />
          {/* 안내 문구 */}
          <span className="text-[12px] text-[#808080]">
            3자 이상 10자 이하 글자수를 지켜 작성해주세요!
          </span>
        </label>

        <div className="mt-6 w-full">
          <hr className="w-full border-t border-[#ECE6DF]" />{" "}
          {/* 얇은 회색 선 */}
          <p className="mt-2 text-center text-[12px] font-semibold text-[#666666]">
            필수항목은 모두 동의해야 합니다
          </p>
        </div>

        {/* 약관 그룹 (TermsGroup 컴포넌트) */}
        <TermsGroup value={terms} onChange={setTerms} />

        <Button
          type="submit"
          disabled={isSubmitDisabled}
          className="mt-[32px] h-[50px] w-full rounded-[4px] bg-[#B3E378] text-[14px] font-semibold text-[#1D1D1D]
+              hover:opacity-90 disabled:opacity-50"
        >
          회원가입
        </Button>
      </form>
    </section>
  );
};

export default SignupPage;
