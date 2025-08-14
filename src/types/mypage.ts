export interface MyProfileRes {
  userName: string;
  email: string;
  profileImageUrl: string | null;
  point: number;
  commentReportCount: number;
  postReportCount: number;
}

export interface MyPostSummary {
  id: number;
  title: string;
  contentPreview?: string;
  categoryId?: number;
  categoryName?: string;
  likeCount?: number;
  commentCount?: number;
  viewCount?: number;
  thumbnailUrl?: string | null;
  createdAt?: string;
}

export type MyPostsResult = MyPostSummary[];

export interface PostsSection<T> {
  name: string;
  posts: T[];
  last: boolean;
}

export type MyPostStatus = "OOPS" | "OVERCOMING" | "OVERCOME";

export interface MyPostDto {
  postId: number;
  title: string;
  content: string;
  thumbnailUrl?: string | null;
  likes?: number;
  comments?: number;
  views?: number;
  categoryName?: string;
  createdAt?: string;
  status?: MyPostStatus;
  situation?: MyPostStatus;
}

export interface MyPostCardVM {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  views: number;
  category: string;
  status?: MyPostStatus;
}

export type LessonDto = {
  id: number;
  title: string;
  content: string;
  tag: string;
  thumbnailUrl?: string | null;
  bestComment?: string;
  bestCommentWriter?: string;
};

export type LessonWithPostDto = {
  // lesson(교훈)
  lessonId: number;
  lessonTitle: string;
  lessonContent: string;
  tag: string;
  bestComment?: string;
  bestCommentWriter?: string;

  // 원본 실패담(post)
  postId: number;
  postTitle: string;
  postContent?: string;
  postCategoryName?: string;
  postThumbnailUrl?: string | null;

  createdAt?: string;
};

export type OthersProfile = {
  userId?: number | string;
  nickname: string;
  profileImageUrl: string | null;
};

export type OthersPost = {
  id: number;
  title: string;
  contentPreview?: string;
  imageUrl?: string | null;
  likes?: number;
  comments?: number;
  views?: number;
  categoryName?: string;
};

export type OthersProfileResult = {
  profile: OthersProfile;
  posts: OthersPost[]; // 최근 글 목록(백엔드 응답에 따라 없으면 빈 배열)
  bestTitles?: string[]; // "베스트 failures" 제목 리스트(있으면 표시)
};
