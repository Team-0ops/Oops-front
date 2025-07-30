export type OopsPost = {
  title: string;
  content: string;
  situation: "OOPS" | "OVERCOMING" | "OVERCOME";
  categoryId: number;
  topicId: number | null;
  previousPostId?: number | null;
  imageUrls: string[];
  wantedCommentTypes?: ("ADVICE" | "EMPATHY")[];
};

export interface DetailPost {
  postId: number;
  situation: string;
  author: {
    nickname: string;
    profileImageUrl: string | null;
  };
  createdAt: string;
  title: string;
  content: string;
  imageUrl: string | null;
  likes: number;
  commentCount: number;
  watching: number;
  comments: {
    commentId: number;
    content: string;
    createdAt: string;
    likes: number;
    childCommentCount: number;
  }[];
}

export interface DetailResponse {
  category: string;
  postGroup: DetailPost[];
}