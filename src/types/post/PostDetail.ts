export interface Category {
  categoryId: number;
  name: string;
  stored: boolean;
} 

export interface PostDetail {
  writer: number;
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