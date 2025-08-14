import { useNavigate } from "react-router-dom";

export interface Terms {
  all: boolean;
  service: boolean;
  privacy: boolean;
  marketing: boolean;
}

interface Props {
  value: Terms;
  onChange: (next: Terms) => void;
}

export default function TermsGroup({ value, onChange }: Props) {
  const navigate = useNavigate();
  const TERM_ID = { service: 1, privacy: 2, marketing: 3 } as const;

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

  const toggle = (key: keyof Terms) => {
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
        {/* 체크박스 */}
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
