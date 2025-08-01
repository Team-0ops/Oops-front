// luckyDrawApi.ts
import axios from "axios";
import { axiosInstance } from "../../apis/axios";

export const requestLuckyDraw = async () => {


  const res = await axiosInstance.post(
    "/lucky-draw",
    {},
    {
    }
  );

  return res.data;
};
