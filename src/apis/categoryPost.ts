import { axiosInstance } from "./axios";
import type { ResponseCategoryPostListDTO } from "../types/post";
import type { Post } from "../types/post/post";


import type { PostStatus } from "../components/FeedPage/PostStatusTab";


//저번주 랜덤주제 리스트 조회

interface LastWeekRandomTopicResponse {
  name: string;
  posts: Post[];
}

export const getLastWeekRandomTopicPosts = async (
  situation: PostStatus,
  page: number = 0,
  limit: number = 10
): Promise<LastWeekRandomTopicResponse> => {
  const { data } = await axiosInstance.get("/feeds/randomTopic/last/all", {
    params: { situation, page, limit },
  });
  return data.result;
};


//랜덤 카테고리 게시글 리스트 조회 
export const getRandomTopicPosts = async (
  situation: PostStatus,
  page = 0,
  limit = 10
) => {
  const response = await axiosInstance.get(
    `/feeds/randomTopic/current/all`,
    {
      params: { situation, page, limit },
    }
  );
  return response.data.result;
};



//  카테고리별 게시글 리스트 조회
export const getPostListByCategoryId = async (
  categoryId: number,
  situation: string,
  page: number = 0,
  limit: number = 10
): Promise<ResponseCategoryPostListDTO> => {
  const { data } = await axiosInstance.get(
    `/feeds/categories/${categoryId}/all`,
    {
      params: { situation, page, limit },
    }
  );
  return data;
};

//  즐겨찾기한 카테고리 게시글 리스트 조회
export const getBookmarkedPosts = async (
  situation: string,
  page: number = 0,
  limit: number = 10
) => {
  const { data } = await axiosInstance.get(`/feeds/bookmarked/all`, {
    params: { situation, page, limit },
  });
  return data;
};

// 베스트 카테고리 게시글 리스트 조회
export const getBestFailersFeed = async (page = 0, limit = 10): Promise<Post[]> => {
  const response = await axiosInstance.get("/feeds/best/all", {
    params: { page, limit },
  });
  return response.data.result.posts;
};
