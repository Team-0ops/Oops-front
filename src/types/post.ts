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

export type ResponsePostListDTO = CommonResponse<
  {
    name: string;
    posts: Post[];
    last: boolean;
  }[]
>;
