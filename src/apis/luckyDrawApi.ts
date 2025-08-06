
import { axiosInstance } from "./axios";

export const requestLuckyDraw = async () => {


  const res = await axiosInstance.post(
    "/lucky-draw",
    {},
    {
    }
  );

  return res.data;
};
