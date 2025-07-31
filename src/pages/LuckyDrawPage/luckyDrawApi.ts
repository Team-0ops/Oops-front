// luckyDrawApi.ts
export const getUserProfile = async () => {
  return {
    isSuccess: true,
    result: {
      point: 220, // mock 포인트
    },
  };
};

export const requestLuckyDraw = async () => {
  return {
    isSuccess: true,
    result: {
      id: 1,
      name: "행운의 부적",
      imageUrl: "https://example.com/lucky-charm.png",
    },
  };
};
