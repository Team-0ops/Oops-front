import type { User } from "../../types/User";
import instance from "../instance";
import Cookies from "js-cookie";

/**
 * 로그인/회원가입 API 응답에서 내려오는 유저 및 토큰 관련 데이터 타입
 */

type LoginResult = {
  accessToken?: string; // 액세스 토큰
  refreshToken?: string; // 리프레시 토큰
  userId?: number; // 유저 ID
  id?: number; // 일부 API에서 다른 키로 내려올 수 있는 ID
  nickName?: string; // 닉네임(케이스 차이 대응)
  nickname?: string; // 닉네임(케이스 차이 대응)
  email?: string; // 이메일
  profileImage?: string | null; // 프로필 이미지
  profileImageUrl?: string | null; // 프로필 이미지 (다른 키로 내려올 경우)
};

/**
 * 약관 동의 항목 타입
 */

export type TermsAgreementItem = {
  termId: number; // 약관 ID
  agreed: boolean; // 동의 여부
};

/**
 * 회원가입 요청 바디 타입
 */

export interface SignupBody {
  email: string; // 이메일
  userName: string; // 사용자 이름
  password: string; // 비밀번호
  termsAgreement: TermsAgreementItem[]; // 약관 동의 배열
}

/**
 * API 응답으로 내려온 원시 유저 데이터를 애플리케이션에서 사용하는 User 타입으로 정규화
 */

const normalizeUser = (raw: Partial<LoginResult> | any): User => {
  const userId = Number(raw?.userId ?? raw?.id ?? 0);
  const nickname = String(raw?.nickname ?? raw?.nickName ?? "");
  const email = raw?.email ? String(raw.email) : "";
  const profileImage =
    (raw?.profileImage ?? raw?.profileImageUrl ?? "") || null;

  return { userId, nickname, email, profileImage };
};

/**
 * 회원가입 API 호출
 * @param body - SignupBody 타입의 요청 데이터
 * @returns 서버 응답 데이터
 */

export const postSignup = async (body: SignupBody) => {
  const res = await instance.post("/auth/join", body);
  return res.data;
};

/**
 * 로그인 API 호출
 * @param email - 사용자 이메일
 * @param password - 비밀번호
 * @returns 서버 응답 데이터
 * @throws accessToken이 없을 경우 에러 발생
 */

export const postLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await instance.post("/auth/login", { email, password });
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
    // 응답 객체에서 필요한 데이터만 구조 분해 할당
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

  // 로컬스토리지에 토큰 및 유저 데이터 저장
  localStorage.setItem("accessToken", accessToken);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("userId", String(user.userId) ?? "");
  localStorage.setItem("profileImage", user.profileImage ?? "");

  // 기존 잘못된 AccessToken 쿠키 제거
  const old = Cookies.get("AccessToken");
  if (old && /^Bearer(\+|%20|\s)/.test(decodeURIComponent(old))) {
    Cookies.remove("AccessToken", { path: "/" });
  }

  return res.data;
};

/**
 * 현재 로그인한 유저 정보 조회
 * @returns User 타입의 유저 정보
 */
export const getMyInfo = async (): Promise<User> => {
  const res = await instance.get("/auth/getUserInfo");
  const raw = res.data?.result;
  return normalizeUser(raw);
};

/**
 * 로그아웃 API 호출
 * @returns 서버 응답 데이터
 */
export const postLogout = async () => {
  const res = await instance.post("/auth/logout");
  return res.data;
};

/**
 * 마이페이지에서 프로필 정보 조회
 * @returns User 타입의 유저 프로필 정보
 */

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