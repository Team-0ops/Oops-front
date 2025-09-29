import { useState } from "react";
import LogoMark from "../assets/icons/logoNew.svg?react";
import Button from "../../components/common/Button";
import PasswordInput from "../../components/auth/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../components/auth/TextInput";
import AlertModal from "../../components/modals/commonAlert/AlertModal";

import { useDispatch } from "react-redux";
import { setUserId } from "../../store/slices/userSlice";
import { useAuth } from "../../context/AuthContext";

/**
 * 로그인 페이지
 * - 이메일, 비밀번호 입력 후 로그인
 * - 로그인 실패 시 AlertModal 표시
 * - 로그인 성공 시 Redux store 및 localStorage에 userId 저장
 */
const SigninPage = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [alertMsg, setAlertMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();
  const { login, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email: id, password: pw });

      // userId 저장
      const uid =
        user?.userId ??
        (localStorage.getItem("userId")
          ? Number(localStorage.getItem("userId"))
          : null);

      if (uid) {
        dispatch(setUserId(String(uid)));
        localStorage.setItem("userId", String(uid));
      }

      // 메인페이지로 이동 후 새로 고침
      navigate("/", { replace: true });
      navigate(0);
    } catch (error: any) {
      console.error("로그인 실패:", error);
      setAlertMsg("이메일 또는 비밀번호가 올바르지 않습니다.");
      setShowAlert(true);
    }
  };

  return (
    <>
      {showAlert && (
        <AlertModal message={alertMsg} onClose={() => setShowAlert(false)} />
      )}
      <section className="flex min-h-dvh w-full flex-col items-center bg-[#FFFBF8]">
        <div className="mt-[156px] flex flex-col items-center gap-[50px]">
          <LogoMark className="w-[149px] h-[205px]" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-[36px] w-[310px] flex flex-col gap-3"
        >
          {/* 이메일 입력 */}
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

          {/* 추가 링크 */}
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
