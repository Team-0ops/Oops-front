import type { SearchParams } from "../types/common";
import type {
  Post,
  ResponseCategoryPostListDTO,
  ResponseMainPostListDTO,
} from "../types/post";
import { axiosInstance } from "./axios";

export const dummyPostList: Post[] = [
  {
    postId: 1,
    title: "부장님한테 욕함",
    content: "다다다다다다다다 다 다다다다다다 다다다다다다다다",
    categoryName: "회사",
    likes: 13,
    comments: 9,
    views: 210,
    image: "/images/sample1.png",
  },
  {
    postId: 2,
    title: "제목을 적어도 여기에",
    content:
      "사연이 있는 게시물은 어떤 식으로 코멘트를 달아야 할지 고민하게 되네...",
    categoryName: "인간관계",
    likes: 19,
    comments: 5,
    views: 200,
    image: "/images/sample2.png",
  },
  {
    postId: 3,
    title: "지버진이 헤어짐",
    content: "내 지버진이 친구랑 싸우고 헤어졌대요 ㅠㅠ",
    categoryName: "연애",
    likes: 10,
    comments: 4,
    views: 239,
    image: "/images/sample3.png",
  },
  {
    postId: 4,
    title: "비행기 놓침",
    content: "다다다다다다다다 다 다다다다다다 다다다다다다다다",
    categoryName: "여행",
    likes: 8,
    comments: 3,
    views: 150,
    image: "/images/sample4.png",
  },
  {
    postId: 5,
    title: "8년지기 친구랑 손절했다가 화해함",
    content: "힘든 순간에 더 가까워진 느낌이랄까...",
    categoryName: "인간관계",
    likes: 9,
    comments: 2,
    views: 126,
    image: "/images/sample5.png",
  },
  {
    postId: 6,
    title: "인턴 준비",
    content: "인턴 준비한다고 책상에 앉았더니 4시간 째 그대로 앉아있네...",
    categoryName: "일상",
    likes: 21,
    comments: 4,
    views: 239,
    image: "/images/sample6.png",
  },
  {
    postId: 7,
    title: "여친이 너무 인싸라서 힘들어요",
    content: "여자친구는 워낙 외향적이고 나는 아싸인데...",
    categoryName: "연애",
    likes: 9,
    comments: 0,
    views: 126,
    image: "/images/sample7.png",
  },
  {
    postId: 8,
    title: "8년지기 친구랑 손절했다가 화해함",
    content: "힘든 순간에 더 가까워진 느낌이랄까...",
    categoryName: "인간관계",
    likes: 9,
    comments: 2,
    views: 126,
    image: "/images/sample8.png",
  },
  {
    postId: 9,
    title: "코인 투자 실패",
    content: "한 순간에 잃어버린 나의 전재산...",
    categoryName: "주식/투자",
    likes: 14,
    comments: 3,
    views: 300,
    image: "/images/sample9.png",
  },
  {
    postId: 10,
    title: "시험 망침",
    content: "하필 중요한 시험에서 머리가 하얘짐...",
    categoryName: "학교생활",
    likes: 5,
    comments: 1,
    views: 180,
    image: "/images/sample10.png",
  },
  {
    postId: 11,
    title: "첫 출근의 긴장감",
    content: "회사 첫 출근인데 너무 떨려서 손이 덜덜...",
    categoryName: "회사생활",
    likes: 17,
    comments: 6,
    views: 250,
    image: "/images/sample11.png",
  },
  {
    postId: 12,
    title: "진로 고민 중",
    content: "내가 가고 싶은 길이 맞는 걸까?",
    categoryName: "진로",
    likes: 11,
    comments: 3,
    views: 180,
    image: "/images/sample12.png",
  },
  {
    postId: 13,
    title: "창업 아이템 고민",
    content: "100만원으로 창업 도전! 실패했지만 배운 게 많다.",
    categoryName: "창업",
    likes: 13,
    comments: 2,
    views: 126,
    image: "/images/sample13.png",
  },
  {
    postId: 14,
    title: "대입 준비 스트레스",
    content: "수시 준비하다가 너무 힘들어요.",
    categoryName: "대입/입시",
    likes: 8,
    comments: 1,
    views: 120,
    image: "/images/sample14.png",
  },
  {
    postId: 15,
    title: "자격증 준비 중",
    content: "이 시험만 붙으면 바로 취업인데...!",
    categoryName: "취업/자격증",
    likes: 10,
    comments: 4,
    views: 200,
    image: "/images/sample15.png",
  },
  {
    postId: 16,
    title: "결혼 준비 중",
    content: "예식장 계약했는데 너무 떨림...",
    categoryName: "결혼",
    likes: 20,
    comments: 6,
    views: 236,
    image: "/images/sample16.png",
  },
  {
    postId: 17,
    title: "여행 가서 길 잃음",
    content: "구글맵 없었으면 진짜 큰일 날 뻔...",
    categoryName: "여행",
    likes: 7,
    comments: 2,
    views: 140,
    image: "/images/sample17.png",
  },
  {
    postId: 18,
    title: "부동산 투자 실패",
    content: "너무 비싸서 망설이다가 기회를 놓쳤다.",
    categoryName: "부동산",
    likes: 30,
    comments: 9,
    views: 346,
    image: "/images/sample18.png",
  },
  {
    postId: 19,
    title: "멘탈 관리 필요",
    content: "요즘 너무 우울하고 무기력해요...",
    categoryName: "정신건강",
    likes: 18,
    comments: 5,
    views: 200,
    image: "/images/sample19.png",
  },
  {
    postId: 20,
    title: "자유롭게 살고 싶다",
    content: "계획 없이 여행 떠나고 싶은 기분",
    categoryName: "자유",
    likes: 15,
    comments: 3,
    views: 190,
    image: "/images/sample20.png",
  },
];

export const getPostListInMainPage =
  async (): Promise<ResponseMainPostListDTO> => {
    const { data } = await axiosInstance.get("/feeds/home/first-guest");
    console.log(data);
    return data;
  };

export const getPostListCategory =
  async (): Promise<ResponseCategoryPostListDTO> => {
    const { data } = await axiosInstance.get("/feeds/home/later");
    console.log(data);
    return data;
  };

export const getSearchedPostList = async (
  params: SearchParams
): Promise<ResponseCategoryPostListDTO> => {
  const { data } = await axiosInstance.get("/feeds/search", { params });
  console.log(data);
  return data;
};
