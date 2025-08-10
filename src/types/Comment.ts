export interface Comment {
  id: string;            // commentId를 string으로 변환
  content: string;
  userId: number;
  author: string;       
  likes: number;
  createdAt: string;
  parentId: string | null;
  liked:boolean;
}
