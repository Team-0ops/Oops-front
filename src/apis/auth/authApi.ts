import type { User } from "../../types/User";
import instance from "../instance";
import Cookies from "js-cookie";

type LoginResult = {
  accessToken: string;
  refreshToken?: string;
  userId: number;
  nickName: string;
  email: string;
  profileImage: string | null;
};

export type TermsAgreementItem = {
  termId: number;
  agreed: boolean;
};

export interface SignupBody {
  email: string;
  userName: string;
  password: string;
  termsAgreement: TermsAgreementItem[];
}

export const postSignup = async (body: SignupBody) => {
  const res = await instance.post("/auth/join", body);
  return res.data;
};

//로그인
export const postLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await instance.post("/auth/login", {
    email,
    password,
  });

  // ✅ result에서 토큰 꺼내기 (문자열/객체 둘 다 대응)
  const result: LoginResult = res.data?.result;
  let accessToken = "";
  let refreshToken = "";
  let user: User = {
    userId: result.userId,
    nickname: result.nickName,
    email: result.email,
    profileImage: result.profileImage,
  };

  //이부분 무조건 객체러 넘어와서 string 부분 빼고 object만 구현할게요! (예은)

  // if (typeof result === "string") {
  //   accessToken = result;
  // } else if (result && typeof result === "object") {
  //   accessToken = result.accessToken;
  //   refreshToken = result.refreshToken ?? "";
  //   user = result.
  // }

  if (result) {
    //result 객체 분해할당 -> user 데이터 넣을려고!
    const {
      accessToken: at,
      refreshToken: rt = "",
      userId,
      nickName: nickname,
      email,
      profileImage,
    } = result;

    accessToken = at;
    refreshToken = rt;
    user = { userId, nickname, email, profileImage };
  }

  if (!accessToken) {
    throw new Error("로그인 응답에 accessToken이 없습니다.");
  }

  //const token = res.data.result;
  localStorage.setItem("accessToken", accessToken);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("userId", String(user.userId));
  localStorage.setItem("profileImage", user.profileImage ?? "");
  // Cookies.set("AccessToken", `Bearer+${accessToken}`, {
  //   path: "/",
  // });

  const old = Cookies.get("AccessToken");
  if (old && /^Bearer(\+|%20|\s)/.test(decodeURIComponent(old))) {
    Cookies.remove("AccessToken", { path: "/" });
  }

  return res.data;
};

//유저정보
export const getMyInfo = async () => {
  //const token = localStorage.getItem("accessToken");
  const res = await instance.get(
    "/auth/getUserInfo"
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  );
  return res.data.result;
};

// 로그아웃
export const postLogout = async () => {
  const res = await instance.post("/auth/logout");
  return res.data;
};
