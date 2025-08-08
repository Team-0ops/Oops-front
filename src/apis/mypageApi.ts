import instance from "./instance";
import type { ApiResponse } from "../types/api";
import type { MyProfileRes } from "../types/mypage";

// ─────────────────────────────────────────────
// 내 프로필 조회
// baseURL이 .../api 라서 여기 경로는 "/my-page/profile"
export const getMyProfile = async (): Promise<MyProfileRes> => {
  const { data } =
    await instance.get<ApiResponse<MyProfileRes>>("/my-page/profile");
  return data.result;
};

// // (옵션) 만약 서버가 쿼리로 userId를 요구하면 이걸로 바꿔 써
// export const getMyProfileWithQuery = async (
//   userId: string
// ): Promise<MyProfileRes> => {
//   const { data } = await instance.get<ApiResponse<MyProfileRes>>(
//     "/my-page/profile",
//     {
//       params: { userId },
//     }
//   );
//   return data.result;
// };
