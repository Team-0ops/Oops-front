import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import LeftArrow from "../assets/icons/left-point.svg?react";
import Button from "../components/common/Button";
import rawTerms from "../assets/terms/terms.md?raw";
import { getTerms, type TermItem } from "../apis/termsApi";
import { useEffect, useMemo, useRef, useState } from "react";

export default function TermsPage() {
  const navigate = useNavigate();
  const [search] = useSearchParams(); // 특정 약관 섹션으로 스크롤하려고
  const [terms, setTerms] = useState<TermItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const location = useLocation();

  const refs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    void (async () => {
      try {
        setLoading(true);
        setErr(null);
        const list = await getTerms();
        setTerms(list);
      } catch (e: unknown) {
        setErr(
          e instanceof Error ? e.message : "이용약관을 불러오지 못했어요."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const anchor = useMemo(() => {
    const idParam = search.get("id");
    const keyParam = search.get("key");
    const id = idParam ? Number(idParam) : null;
    return { id: Number.isFinite(id) ? (id as number) : null, key: keyParam };
  }, [search]);

  useEffect(() => {
    if (!terms.length) return;
    const target =
      terms.find((t) => (anchor.id ? t.id === anchor.id : false)) ??
      terms.find((t) => (anchor.key ? t.name === anchor.key : false));
    if (target && refs.current[target.id]) {
      refs.current[target.id]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [terms, anchor]);

  const targetId = useMemo(() => {
    if (anchor.id != null) return anchor.id;
    const s = (location.state as any)?.termId;
    return typeof s === "number" ? s : null;
  }, [anchor, location.state]);
  const keyFromName = (name: string) => {
    if (!name) return "service";
    if (name.includes("개인정보")) return "privacy";
    if (name.includes("마케팅") || name.includes("광고")) return "marketing";
    return "service";
  };

  // 동의 후 돌아가기 시 현재 약관 선택값을 저장
  const handleAgree = () => {
    const stored = sessionStorage.getItem("signupTerms");
    const currentTerm = targetId ? terms.find((t) => t.id === targetId) : null;

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
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
          const obj = parsed as {
            all?: boolean;
            service?: boolean;
            privacy?: boolean;
            marketing?: boolean;
          };
          if (currentTerm) {
            const k = keyFromName(currentTerm.name);
            obj[k as "service" | "privacy" | "marketing"] = true;
            obj.all = !!(obj.service && obj.privacy && obj.marketing);
          }
          sessionStorage.setItem("signupTerms", JSON.stringify(obj));
        } else {
          if (targetId != null) {
            sessionStorage.setItem(
              "signupTerms",
              JSON.stringify([{ termId: targetId, agreed: true }])
            );
          }
        }
      } catch {
        if (targetId != null) {
          sessionStorage.setItem(
            "signupTerms",
            JSON.stringify([{ termId: targetId, agreed: true }])
          );
        }
      }
    } else {
      if (targetId != null) {
        sessionStorage.setItem(
          "signupTerms",
          JSON.stringify([{ termId: targetId, agreed: true }])
        );
      }
    }

    navigate("/signup", { state: { fromTerms: true } });
  };

  return (
    <section className="flex min-h-dvh w-full flex-col items-center bg-[#FFFBF8]">
      <div className="mt-[62px] flex w-[335px] items-center gap-[10px]">
        <button type="button" onClick={() => navigate(-1)}>
          <LeftArrow className="h-[18px] w-[18px]" />
        </button>
        <h2 className="text-[20px] font-semibold text-[#1D1D1D]">
          Oops! 이용약관
        </h2>
      </div>

      <div className="mt-[18px] flex w-[335px] flex-col gap-[18px]">
        <div className="h-[600px] overflow-y-auto p-[12px] text-[12px] whitespace-pre-line leading-[18px] text-[#4D4D4D]">
          {rawTerms}
        </div>

        <Button variant="primary" size="lg" onClick={handleAgree}>
          동의 후 돌아가기
        </Button>
      </div>
    </section>
  );
}
