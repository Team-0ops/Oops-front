import { axiosInstance } from "./axios";

type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  pageInfo?: any;
  result: T | { items: T } | null;
};

export type TermItem = {
  id: number;
  name: string;
  required: boolean;
  content: string;
  version?: string | null;
  updatedAt?: string | null;
};

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

export async function getTerms(): Promise<TermItem[]> {
  const { data } = await axiosInstance.get<ApiResponse<any>>("/terms");
  const res = data?.result;
  if (!res) return [];

  if (Array.isArray(res)) return res.map(toTerm);
  if (Array.isArray((res as any).items)) return (res as any).items.map(toTerm);
  if (typeof res === "object") return [toTerm(res)];

  return [];
}
