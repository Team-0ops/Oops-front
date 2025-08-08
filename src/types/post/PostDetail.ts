import type { CommonResponse } from "../common";
import type { Comment } from "../Comment";

export interface Category {
  categoryId: number;
  name: string;
  stored: boolean;
} 

export interface PostDetail {
  nickname: string;
  postId: number;
  title: string;
  content: string;
  likes: number;
  watching: number;
  images: string[];
  comments: Comment[];
  wantedCommentTypes: ("ADVICE" | "EMPATHY")[];
  created_at: Date;
  liked: boolean;
  profileImage: string;
  userId: number;
}

export interface DetailResultType {
  groupId: number;
  category: Category;
  postFailure: PostDetail | null;
  postOvercoming: PostDetail | null;
  postOvercome: PostDetail | null;
}

export type PostDetailResponse = CommonResponse<DetailResultType>;