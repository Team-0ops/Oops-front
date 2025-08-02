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
  comments: {
    commentId: number;
    content: string;
    createdAt: string;
    likes: number;
    childCommentCount: number;
  }[];
  wantedCommentTypes: ("ADVICE" | "EMPATHY")[];
  created_at: Date;
}

export interface DetailResultType {
  groupId: number;
  category: Category;
  postFailure: PostDetail | null;
  postOvercoming: PostDetail | null;
  postOvercome: PostDetail | null;
}

export interface ServerResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: DetailResultType;
}