export interface Comment {
  type: "post" | "comment";
  id: string;
  author: string;
  content: string;
  createdAt: string; // ISO 문자열 또는 '3월 1일 18:09' 형식
}
