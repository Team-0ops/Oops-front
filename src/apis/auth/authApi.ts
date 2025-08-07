//import axios from "axios";
import instance from "../instance";

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
  })
  return res.data;
};

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

  const token = res.data.result;
  localStorage.setItem("accessToken", token);
  return res.data;
};

export const getMyInfo = async () => {
  const token = localStorage.getItem("accessToken");
  const res = await instance.get("/api/auth/getUserInfo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.result;
};
