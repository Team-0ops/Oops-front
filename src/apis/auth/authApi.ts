import type { User } from "../../types/User";
import instance from "../instance";
import Cookies from "js-cookie";

type LoginResult = {
  accessToken?: string;
  refreshToken?: string;
  userId?: number;
  id?: number;
  nickName?: string;
  nickname?: string;
  email?: string;
  profileImage?: string | null;
  profileImageUrl?: string | null;
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

const normalizeUser = (raw: Partial<LoginResult> | any): User => {
  const userId = Number(raw?.userId ?? raw?.id ?? 0);
  const nickname = String(raw?.nickname ?? raw?.nickName ?? "");
  const email = raw?.email ? String(raw.email) : "";
  const profileImage =
    (raw?.profileImage ?? raw?.profileImageUrl ?? "") || null;

  return { userId, nickname, email, profileImage };
};

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

  const result: LoginResult = res.data?.result;
  let accessToken = "";
  let refreshToken = "";
  let user: User = { userId: 0, nickname: "", email: "", profileImage: null };

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
      accessToken: at = "",
      refreshToken: rt = "",
      userId = 0,
      nickName: nickname,
      email = "",
      profileImage,
    } = result as Partial<LoginResult>;

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
  localStorage.setItem("userId", String(user.userId) ?? "");
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
export const getMyInfo = async (): Promise<User> => {
  const res = await instance.get("/auth/getUserInfo");
  const raw = res.data?.result;
  return normalizeUser(raw);
};

// 로그아웃
export const postLogout = async () => {
  const res = await instance.post("/auth/logout");
  return res.data;
};

export const getMyProfile = async (): Promise<User> => {
  const res = await instance.get("/my-page/profile");
  const raw = res.data?.result ?? res.data;
  return {
    userId: Number(raw.userId ?? raw.id ?? 0),
    nickname: String(raw.nickname ?? raw.userName ?? raw.nickName ?? ""),
    email: String(raw.email ?? ""),
    profileImage: (raw.profileImage ?? raw.profileImageUrl ?? "") || null,
  };
};
