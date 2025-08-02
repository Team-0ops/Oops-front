import { AxiosError } from "axios";

// 서버에서 주는 에러 응답 형식
export interface CustomAxiosErrorResponse {
  code: string;
  message?: string;
}

// 커스텀 에러 타입. 에러 응답 형식 강제용
export type CustomAxiosError = AxiosError<CustomAxiosErrorResponse>;
