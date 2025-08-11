//import axios from "axios";
import instance from "../instance";
import Cookies from "js-cookie";

type LoginResult =
  | { accessToken: string; refreshToken?: string; userId?: string | number }
  | string;

//회원가입
export const postSignup = async ({
  email,
  userName,
  password,
}: {
  email: string;
  userName: string;
  password: string;
}) => {
  const res = await instance.post("/auth/join", {
    email,
    userName,
    password,
  });
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
  let userId: string | number | undefined;

  if (typeof result === "string") {
    accessToken = result;
  } else if (result && typeof result === "object") {
    accessToken = result.accessToken;
    refreshToken = result.refreshToken ?? "";
    userId = result.userId;
  }

  if (!accessToken) {
    throw new Error("로그인 응답에 accessToken이 없습니다.");
  }

  //const token = res.data.result;
  localStorage.setItem("accessToken", accessToken);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
  if (userId !== undefined) localStorage.setItem("userId", String(userId));

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
