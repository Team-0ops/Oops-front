export interface Comment {
  id: string;            // commentId를 string으로 변환
  content: string;
  author: string;        // userId 대신 닉네임 등
  likes: number;
  createdAt: string;
  parentId: string | null;
}
