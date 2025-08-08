export interface MyProfileRes {
  userName: string;
  email: string;
  profileImageUrl: string | null;
  point: number;
  commentReportCount: number;
  postReportCount: number;
}
