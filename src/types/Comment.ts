export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string; // ISO 문자열 또는 '3월 1일 18:09' 형식
  type?: "조언" | "공감" | string;
}