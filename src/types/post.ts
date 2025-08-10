import type { CommonResponse } from "./common";

export type Post = {
  postId: number;
  title: string;
  content: string;
  categoryName: string;
  likes: number;
  comments: number;
  views: number;
  image: string | null;
};

export type ResponseMainPostListDTO = CommonResponse<
  {
    name: string;
    posts: Post[];
    last: boolean;
  }[]
>;

export type ResponseCategoryPostListDTO = CommonResponse<{
  name: string;
  posts: Post[];
  last: boolean;
}>;

export type BestFailers = {
  postId: number;
  title: string;
  situation: string;
};
