export interface Post {
  postId: number;
  title: string;
  content: string;
  categoryName: string;
  likes: number;
  comments: number;
  views: number;
  image: string | null;
  categoryOrTopicName: string;
}
