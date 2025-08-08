import { useState } from "react";
import LogoMark from "../assets/icons/logoNew.svg?react";
import Button from "../components/common/Button";
import PasswordInput from "../components/auth/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../components/auth/TextInput";
import { postLogin } from "../apis/auth/authApi";
import AlertModal from "../components/auth/AlertModal";

import { useDispatch } from "react-redux";
import { setUserId } from "../store/slices/userSlice";

const SigninPage = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [alertMsg, setAlertMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await postLogin({
        email: id,
        password: pw,
      });
      // 외부에서 게시글 작성자와 비교하기위해서 로그인할때 userId 전역으로
      dispatch(setUserId(res.result.userId));
      localStorage.setItem("userId", res.result.userId);

      console.log("로그인 성공:", res.result);

      const tokenObj = res.result;
      // 기존의 로그인에서 token이 객체값이여서 object Object로 헤더 입력되었기에 오류발생
      // 로컬스토리지 확인결과 accessToken과 refreshToken이 있었는데 두개를 동시에 token 변수에 저장하다보니
      // obj obj와 같이 두개의 객체형태가 Bearer 헤더값에 들어가서 오류 발생했음
      // 지피티의 도움으로 아래와같이 accessToken과 refreshToken으로 나누어서 토큰값 전달.
      // accessToken, refreshToken 구조 분리 저장!
      if (tokenObj && typeof tokenObj === "object") {
        if (tokenObj.accessToken) {
          localStorage.setItem("accessToken", tokenObj.accessToken);
          console.log("accessToken:", tokenObj.accessToken);
        }
        if (tokenObj.refreshToken) {
          localStorage.setItem("refreshToken", tokenObj.refreshToken);
          console.log("refreshToken:", tokenObj.refreshToken);
        }
      } else if (typeof tokenObj === "string") {
        localStorage.setItem("accessToken", tokenObj);
        console.log("accessToken:", tokenObj);
      } else {
        // 예외 처리
        console.warn("서버 응답에 토큰 정보가 없습니다.", tokenObj);
        setAlertMsg("서버 응답에 토큰 정보가 없습니다.");
        setShowAlert(true);
        return;
      }

      navigate("/"); // 로그인 후 메인페이지로 이동
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
