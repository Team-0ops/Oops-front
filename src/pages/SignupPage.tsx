import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";
import LogoMark from "../assets/icons/logoNew.svg?react";
import Button from "../components/common/Button";
import PasswordInput from "../components/auth/PasswordInput";
import TermsGroup from "../components/auth/TermsGroup";
import TextInput from "../components/auth/TextInput";
import { postSignup, type TermsAgreementItem } from "../apis/auth/authApi";
import AlertModal from "../components/auth/AlertModal";

interface Terms {
  all: boolean;
  service: boolean;
  privacy: boolean;
  marketing: boolean;
}

const TERM_ID = {
  service: 1,
  privacy: 2,
  marketing: 3,
} as const;

const SignupPage = () => {
  //폼 상태
  const [form, setForm] = useState({
    email: "",
    password: "",
    userName: "",
  });

  const [alertMsg, setAlertMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const [emailChecked, setEmailChecked] = useState<boolean | null>(null);

  const [terms, setTerms] = useState<Terms>({
    all: false,
    service: false,
    privacy: false,
    marketing: false,
  });

  const location = useLocation();
  const setFormAndSave = (next: typeof form) => {
    setForm(next);
    sessionStorage.setItem("signupForm", JSON.stringify(next));
  };

  //핸들러
  const handleInput =
    (key: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) => {
      const nextForm = { ...form, [key]: e.target.value };
      setFormAndSave(nextForm);
      if (key === "email") {
        setEmailChecked(null);
        sessionStorage.removeItem("emailChecked");
      }
    };

  //약관 값 불러오기
  useEffect(() => {
    if (location.state?.fromTerms) {
      const storedTerms = sessionStorage.getItem("signupTerms");

      if (storedTerms) {
        try {
          const parsed = JSON.parse(storedTerms);

          if (Array.isArray(parsed)) {
            const byId = new Map<number, boolean>(
              parsed.map((x: any) => [x.termId, !!x.agreed])
            );
            const service = byId.get(TERM_ID.service) === true;
            const privacy = byId.get(TERM_ID.privacy) === true;
            const marketing = byId.get(TERM_ID.marketing) === true;
            const all = service && privacy && marketing;
            setTerms({ all, service, privacy, marketing });
          } else {
            const obj = parsed as Partial<Terms>;
            const service = !!obj.service;
            const privacy = !!obj.privacy;
            const marketing = !!obj.marketing;
            const all = service && privacy && marketing;
            setTerms({ all, service, privacy, marketing });
          }
        } catch {
          // 무시
        }
      }

      const storedForm = sessionStorage.getItem("signupForm");
      if (storedForm) setForm(JSON.parse(storedForm));

      const storedEmailChecked = sessionStorage.getItem("emailChecked");
      if (storedEmailChecked === "true") setEmailChecked(true);
    }
  }, [location.state]);

  //중복확인
  const handleEmailCheck = () => {
    // api없음
    setEmailChecked(true); // '확인됨' 상태로 강제
    sessionStorage.setItem("emailChecked", "true");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!terms.service || !terms.privacy) {
      setAlertMsg("필수 약관(서비스, 개인정보)에 동의해 주세요.");
      setShowAlert(true);
      return;
    }

    const termsAgreement: TermsAgreementItem[] = [
      { termId: TERM_ID.service, agreed: terms.service },
      { termId: TERM_ID.privacy, agreed: terms.privacy },
      { termId: TERM_ID.marketing, agreed: terms.marketing },
    ];

    try {
      const res = await postSignup({
        email: form.email,
        userName: form.userName,
        password: form.password,
        termsAgreement,
      });

      console.log("회원가입 성공:", res);
      setAlertMsg("회원가입이 완료되었습니다!");
      setShowAlert(true);

      // 가입 완료 시 세션 정리
      sessionStorage.removeItem("signupTerms");
      sessionStorage.removeItem("signupForm");
      sessionStorage.removeItem("emailChecked");
    } catch (error: any) {
      console.error("회원가입 실패:", error);
      console.error("서버 응답:", error.response?.data);
      setAlertMsg(
        error?.response?.data?.message ?? "회원가입 중 오류가 발생했습니다."
      );
      setShowAlert(true);
    }
  };

  const isSubmitDisabled =
    !form.password ||
    !form.email ||
    !form.userName ||
    !terms.service ||
    !terms.privacy;

  return (
    <>
      {showAlert && (
        <AlertModal
          message={alertMsg}
          onClose={() => {
            setShowAlert(false);
            if (alertMsg === "회원가입이 완료되었습니다!") {
              navigate("/signin"); // 성공 시에만 이동
            }
          }}
        />
      )}
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
          <TextInput
            type="email"
            label="이메일"
            value={form.email}
            onChange={handleInput("email")}
            placeholder=""
            height="42px"
            padding="14px 12px"
            borderColor="#F6EBE6"
            hint="아이디/비밀번호 찾기할 때 사용됩니다."
            rightButton={
              <button
                type="button"
                onClick={handleEmailCheck}
                disabled={!form.email}
                className={`h-[26px] rounded-[4px] px-[7px] text-[12px] font-semibold
                ${
                  emailChecked
                    ? "bg-[#B3E378] text-[#1D1D1D]"
                    : "bg-[#1D1D1D] text-white"
                }
                disabled:opacity-40`}
              >
                {emailChecked ? "확인됨" : "중복 확인"}
              </button>
            }
          />

          {/* 비밀번호 */}
          <label className="flex flex-col gap-[4px] text-[14px] text-[#4D4D4D] font-semibold">
            비밀번호
            <PasswordInput
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              height="42px"
              padding="14px 11px"
              borderColor="#F6EBE6"
              placeholder=""
            />
            <span className="text-[12px] text-[#808080] font-normal">
              영문 대소문자, 숫자, 특수문자 중 최소 2종류 이상 조합된 8자 이상
              20자 이하 를 입력해주세요.
            </span>
          </label>
          {/* 닉네임 */}
          <TextInput
            type="text"
            label="닉네임"
            value={form.userName}
            onChange={handleInput("userName")}
            placeholder="한영,숫자,기호로 이루어진 3~10자를 입력해주세요."
            height="44px"
            padding="14px 11px"
            borderColor="#ECE6DF"
            hint="3자 이상 10자 이하 글자수를 지켜 작성해주세요!"
          />

          <div className="mt-6 w-full">
            <hr className="w-full border-t border-[#ECE6DF]" />{" "}
            <p className="mt-2 text-center text-[12px] font-semibold text-[#666666]">
              필수항목은 모두 동의해야 합니다
            </p>
          </div>

          {/* 약관 그룹 */}
          <TermsGroup value={terms} onChange={setTerms} />

          <Button
            type="submit"
            disabled={isSubmitDisabled}
            className="mt-[32px] h-[50px] w-full rounded-[4px] bg-[#B3E378] text-[14px] font-semibold text-[#1D1D1D]
             hover:opacity-90 disabled:opacity-50"
          >
            회원가입
          </Button>
        </form>
      </section>
    </>
  );
};

export default SignupPage;
