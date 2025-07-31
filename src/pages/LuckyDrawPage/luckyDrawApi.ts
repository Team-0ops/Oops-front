// luckyDrawApi.ts
// 실제 API 연결 대신 임시로 Mock 데이터 사용 중

/**
 * 사용자 프로필 조회 API (Mock 데이터)
 * - 실제 API 대신 테스트용 데이터 반환
 */
export const getUserProfile = async () => {
  return {
    isSuccess: true,
    result: {
      point: 220, // 여기 숫자를 바꾸면 버튼 UI가 바뀜 (ex: 100이면 비활성화)
    },
  };
};

/**
 * 행운 부적 추첨 API (실제 API 호출 유지)
 */
import axios from "axios";

export const requestLuckyDraw = async () => {
  try {
    const response = await axios.post("/api/lucky-draw");
    return response.data; // { isSuccess, result: { luckyIndex } }
  } catch (error) {
    console.error("행운 부적 추첨 실패:", error);
    throw error;
  }
};
