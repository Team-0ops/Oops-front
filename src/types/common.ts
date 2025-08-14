export type CommonResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

export type SearchParams = {
  keyword: string;
  page?: number;
  limit?: number;
};

export const categoryMap: Record<string, string> = {
  daily: "일상",
  love: "연애",
  relationship: "인간관계",
  stock: "주식/투자",
  school: "학교생활",
  work: "회사생활",
  career: "진로",
  startup: "창업",
  college: "대입/입시",
  job: "취업/자격증",
  marriage: "결혼",
  travel: "여행",
  realestate: "부동산",
  mental: "정신건강",
  free: "자유",
};
