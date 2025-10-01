import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import LeftArrow from "../assets/icons/left-point.svg?react";
import Button from "../../components/common/Button";
import { getTerms, type TermItem } from "../../apis/termsApi";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * 약관 상세 페이지
 * - API에서 약관 목록 가져오기
 * - 특정 약관 id/key 파라미터로 스크롤 이동
 * - 동의 시 세션스토리지에 저장 후 회원가입 페이지로 돌아감
 */
export default function TermsPage() {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const [terms, setTerms] = useState<TermItem[]>([]);
  const location = useLocation();

  // 약관 제목 가져오기 (title/name 중 존재하는 값)
  const getTitle = (t: TermItem | any): string =>
    (t?.title as string | undefined) ?? (t?.name as string | undefined) ?? "";

  const refs = useRef<Record<number, HTMLDivElement | null>>({});

  // 약관 api 호출
  useEffect(() => {
    void (async () => {
      try {
        const res = await getTerms();
        const list = (Array.isArray(res) ? res : (res as any)?.result) ?? [];
        setTerms(list as TermItem[]);
      } catch (e) {
        console.error("약관 로드 실패:", e);
      }
    })();
  }, []);

  // 검색 파라미터에서 id/key 추출
  const anchor = useMemo(() => {
    const idParam = search.get("id");
    const keyParam = search.get("key");
    const id = idParam ? Number(idParam) : null;
    return { id: Number.isFinite(id) ? (id as number) : null, key: keyParam };
  }, [search]);

  // state로 받은 termId 우선 적용
  const targetId = useMemo(() => {
    if (anchor.id != null) return anchor.id;
    const s = (location.state as any)?.termId;
    return typeof s === "number" ? s : null;
  }, [anchor, location.state]);

  // 약관 키 추출 (privacy/marketing/service)
  const keyFromName = (name: string) => {
    if (!name) return "service";
    if (name.includes("개인정보")) return "privacy";
    if (name.includes("마케팅") || name.includes("광고")) return "marketing";
    return "service";
  };

  // 특정 약관 스크롤 이동
  useEffect(() => {
    if (!terms.length) return;

    const byId =
      anchor.id != null ? terms.find((t: any) => t.id === anchor.id) : null;

    const byKey =
      !byId && anchor.key
        ? terms.find((t) => {
            const title = getTitle(t);
            return anchor.key === "privacy"
              ? title.includes("개인정보")
              : anchor.key === "marketing"
                ? title.includes("마케팅") || title.includes("광고")
                : true;
          })
        : null;

    const target = byId ?? byKey ?? null;

    if (target && refs.current[(target as any).id]) {
      refs.current[(target as any).id]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [terms, anchor]);

  /**
   * 약관 동의 버튼 클릭
   * - sessionStorage에 해당 약관을 동의 상태로 기록
   * - 이후 회원가입 페이지로 이동
   */
  const handleAgree = () => {
    const stored = sessionStorage.getItem("signupTerms");
    const currentTerm = targetId
      ? (terms as any).find((t: any) => t.id === targetId)
      : null;

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // 배열 형태 -> termId, agreed 리스트
          const map = new Map<number, boolean>(
            parsed.map((x: any) => [x.termId, !!x.agreed])
          );
          if (targetId != null) map.set(targetId, true);
          const merged = Array.from(map.entries()).map(([termId, agreed]) => ({
            termId,
            agreed,
          }));
          sessionStorage.setItem("signupTerms", JSON.stringify(merged));
        } else if (parsed && typeof parsed === "object") {
          // 객체 형태 -> TermsGroup 스타일
          const obj = parsed as {
            all?: boolean;
            service?: boolean;
            privacy?: boolean;
            marketing?: boolean;
          };
          if (currentTerm) {
            const k = keyFromName(getTitle(currentTerm)); // ✅ title/name 호환
            (obj as any)[k] = true;
            obj.all = !!(obj.service && obj.privacy && obj.marketing);
          }
          sessionStorage.setItem("signupTerms", JSON.stringify(obj));
        } else if (targetId != null) {
          // 예외 처리 -> 단일 약관 동의만 저장
          sessionStorage.setItem(
            "signupTerms",
            JSON.stringify([{ termId: targetId, agreed: true }])
          );
        }
      } catch {
        if (targetId != null) {
          sessionStorage.setItem(
            "signupTerms",
            JSON.stringify([{ termId: targetId, agreed: true }])
          );
        }
      }
    } else if (targetId != null) {
      sessionStorage.setItem(
        "signupTerms",
        JSON.stringify([{ termId: targetId, agreed: true }])
      );
    }

    navigate("/signup", { state: { fromTerms: true } });
  };

  return (
    <section className="flex min-h-dvh w-full flex-col items-center bg-[#FFFBF8]">
      {/* 헤더 */}
      <div className="mt-[62px] flex w-[335px] items-center gap-[10px]">
        <button type="button" onClick={() => navigate(-1)}>
          <LeftArrow className="h-[18px] w-[18px]" />
        </button>
        <h2 className="text-[20px] font-semibold text-[#1D1D1D]">
          Oops! 이용약관
        </h2>
      </div>

      {/* 본문 */}
      <div className="mt-[18px] flex w-[335px] flex-col gap-[18px]">
        {/* 약관 내용 (API 데이터에서 받아옴) */}
        <div className="h-[600px] overflow-y-auto space-y-[24px]">
          {terms.map((t) => (
            <div
              key={(t as any).id}
              ref={(el) => {
                refs.current[(t as any).id] = el;
              }}
              className="p-[12px] rounded-[8px] bg-white/0"
            >
              {/* 제목 + 필수/선택 표시 */}
              <div className="mb-[8px] flex items-center gap-[8px]">
                <h3 className="text-[14px] font-semibold text-[#1D1D1D]">
                  {getTitle(t)}
                </h3>
                {(t as any).required === "REQUIRED" && (
                  <span className="text-[11px] text-[#808080]">(필수)</span>
                )}
                {(t as any).required === "OPTIONAL" && (
                  <span className="text-[11px] text-[#808080]">(선택)</span>
                )}
              </div>
              {/* 본문 내용 */}
              <div className="text-[12px] whitespace-pre-line leading-[18px] text-[#4D4D4D]">
                {(t as any).content}
              </div>
            </div>
          ))}
        </div>

        <Button variant="primary" size="lg" onClick={handleAgree}>
          동의 후 돌아가기
        </Button>
      </div>
    </section>
  );
}
