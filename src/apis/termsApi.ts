// apis/termsApi.ts
import { axiosInstance } from "./axios";

// 백엔드 응답 래퍼(프로젝트 공통 포맷 가정)
type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  pageInfo?: any;
  result: T | { items: T } | null;
};

// 서버에서 내려오는 단일 약관 아이템 형태(필드명은 임시, 매핑 함수에서 유연 처리)
export type TermItem = {
  id: number;
  name: string;
  required: boolean; // 필수 여부
  content: string; // 본문(텍스트/마크다운/HTML)
  version?: string | null;
  updatedAt?: string | null;
};

// 응답 필드명이 다를 수도 있어 안전하게 매핑
function toTerm(raw: any): TermItem {
  let requiredCandidate: boolean | null | undefined =
    raw?.required ?? raw?.isRequired; // <- 둘 다 nullish면 여전히 nullish

  if (requiredCandidate == null) {
    // 여기서 실제 boolean 계산을 하고, ?? 체인에는 넣지 않음
    requiredCandidate = raw?.type === "REQUIRED" || raw?.requiredYn === "Y";
  }
  return {
    id: typeof raw?.id === "number" ? raw.id : (raw?.termId ?? raw?.seq ?? 0),
    name: String(raw?.name ?? raw?.title ?? raw?.key ?? "이용약관"),
    required: Boolean(requiredCandidate), // 최종 boolean
    content: String(raw?.content ?? raw?.body ?? raw?.text ?? ""),
    version: raw?.version ?? raw?.revision ?? null,
    updatedAt: raw?.updatedAt ?? raw?.modifiedAt ?? raw?.updated ?? null,
  };
}

export async function getTerms(): Promise<TermItem[]> {
  // baseURL이 "/api"라서 엔드포인트는 "/terms"
  const { data } = await axiosInstance.get<ApiResponse<any>>("/terms");
  const res = data?.result;
  if (!res) return [];

  if (Array.isArray(res)) return res.map(toTerm);
  if (Array.isArray((res as any).items)) return (res as any).items.map(toTerm);
  if (typeof res === "object") return [toTerm(res)];

  return [];
}
