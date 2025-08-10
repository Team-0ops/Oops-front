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
}
