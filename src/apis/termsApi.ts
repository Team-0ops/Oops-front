import { axiosInstance } from "./axios";

/**
 * API 응답 기본 구조
 */
type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  pageInfo?: any;
  result: T | { items: T } | null;
};

/**
 * 이용약관 항목 타입
 */
export type TermItem = {
  id: number;         // 약관 ID
  name: string;       // 약관 이름
  required: boolean;  // 필수 여부
  content: string;    // 약관 내용
  version?: string | null;   // 약관 버전
  updatedAt?: string | null; // 마지막 수정일
};

/**
 * API에서 내려오는 raw 데이터를 TermItem으로 변환
 * @param raw - 서버에서 내려온 약관 데이터
 * @returns TermItem
 */
function toTerm(raw: any): TermItem {
  let requiredCandidate: boolean | null | undefined =
    raw?.required ?? raw?.isRequired;

  if (requiredCandidate == null) {
    requiredCandidate = raw?.type === "REQUIRED" || raw?.requiredYn === "Y";
  }
  return {
    id: typeof raw?.id === "number" ? raw.id : (raw?.termId ?? raw?.seq ?? 0),
    name: String(raw?.name ?? raw?.title ?? raw?.key ?? "이용약관"),
    required: Boolean(requiredCandidate),
    content: String(raw?.content ?? raw?.body ?? raw?.text ?? ""),
    version: raw?.version ?? raw?.revision ?? null,
    updatedAt: raw?.updatedAt ?? raw?.modifiedAt ?? raw?.updated ?? null,
  };
}

/**
 * 이용약관 조회 API
 * @returns TermItem[] 약관 목록
 */
export async function getTerms(): Promise<TermItem[]> {
  const { data } = await axiosInstance.get<ApiResponse<any>>("/terms");
  const res = data?.result;
  if (!res) return [];

  if (Array.isArray(res)) return res.map(toTerm);
  if (Array.isArray((res as any).items)) return (res as any).items.map(toTerm);
  if (typeof res === "object") return [toTerm(res)];

  return [];
}