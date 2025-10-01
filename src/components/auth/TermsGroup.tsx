import { useNavigate } from "react-router-dom";

// 약관 동의 상태 타입
export interface Terms {
  all: boolean; // 전체 동의
  service: boolean; // 서비스 이용약관 동의
  privacy: boolean; // 개인정보 이용 동의
  marketing: boolean; // 마케팅 수신 동의 (선택)
}

interface Props {
  value: Terms; // 현재 약관 상태
  onChange: (next: Terms) => void; // 상태 변경 핸들러
}

/**
 * 약관 동의 체크박스 그룹 컴포넌트
 * @param value , onChange
 * - 전체 선택 및 개별 선택 기능
 * - service/privacy 필수 약관은 최초 클릭 시 약관 상세 페이지로 이동
 */
export default function TermsGroup({ value, onChange }: Props) {
  const navigate = useNavigate();
  const TERM_ID = { service: 1, privacy: 2, marketing: 3 } as const;

  // 약관 상세 페이지로 이동
  const goToTerms = (k: keyof Terms) => {
    const id =
      k === "service"
        ? TERM_ID.service
        : k === "privacy"
          ? TERM_ID.privacy
          : k === "marketing"
            ? TERM_ID.marketing
            : undefined;
    if (id) {
      navigate(`/terms?id=${id}`, { state: { termId: id, fromTerms: true } });
    } else {
      navigate("/terms", { state: { fromTerms: true } });
    }
  };

  // 토글 처리
  const toggle = (key: keyof Terms) => {
    // 필수 약관 최초 클릭 시 상세 페이지로 이동
    if (
      (key === "service" || key === "privacy" || key === "marketing") &&
      !value[key] &&
      !value.all &&
      Object.entries(value)
        .filter(([k]) => k !== "all")
        .every(([, v]) => v === false)
    ) {
      goToTerms(key);
      return;
    }

    // 전체선택 토글
    if (key === "all") {
      const next = !value.all;
      const updated = {
        all: next,
        service: next,
        privacy: next,
        marketing: next,
      };
      sessionStorage.setItem("signupTerms", JSON.stringify(updated));
      onChange(updated);
      return;
    }

    // 개별 토글
    const nextState = { ...value, [key]: !value[key] };
    nextState.all =
      nextState.service && nextState.privacy && nextState.marketing;

    sessionStorage.setItem("signupTerms", JSON.stringify(nextState));
    onChange(nextState);
  };

  // 체크박스 행 컴포넌트
  const Row = ({
    label,
    k,
    highlight,
  }: {
    label: string;
    k: keyof Terms;
    highlight?: boolean;
  }) => {
    const checked = value[k];
    const bgColor = checked ? "#B3E378" : highlight ? "#B3B3B3" : "#E6E6E6";

    return (
      <label
        className="mb-[10px] grid h-[29px] w-full cursor-pointer
                 grid-cols-[28px_1fr] items-center rounded-[4px]"
        style={{ backgroundColor: bgColor }}
      >
        {/* 체크박스 input*/}
        <input
          type="checkbox"
          checked={checked}
          onChange={() => toggle(k)}
          className="peer sr-only"
        />
        <span
          className="mx-auto flex h-[16px] w-[16px]
                       items-center justify-center rounded-[3px]
                       bg-[#FFFFFF]"
        >
          {/* 체크 표시 */}
          <span
            className={`block h-[10px] w-[6px] rotate-45 
                      border-b-[2px] border-r-[2px] border-[#1D1D1D]
                      transition-opacity
                      ${checked ? "opacity-100" : "opacity-0"}`}
          />
        </span>

        <span className="flex justify-center text-[14px] font-semibold text-[#1D1D1D]">
          {label}
        </span>
      </label>
    );
  };
  return (
    <div className="flex w-full flex-col">
      <Row k="all" label="전체선택" highlight />
      <Row k="service" label="이용약관 동의" />
      <Row k="privacy" label="개인정보 이용 동의" />
      <Row k="marketing" label="마케팅 동의 (선택)" />
    </div>
  );
}
