import { type MouseEvent } from "react";

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
  const toggle = (key: keyof Terms) => {
    // 전체선택 토글
    if (key === "all") {
      const next = !value.all;
      onChange({
        all: next,
        service: next,
        privacy: next,
        marketing: next,
      });
      return;
    }

    // 개별 토글
    const nextState = { ...value, [key]: !value[key] };
    nextState.all =
      nextState.service && nextState.privacy && nextState.marketing;
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
  }) => (
    <button
      type="button"
      onClick={(e: MouseEvent) => {
        e.preventDefault();
        toggle(k);
      }}
      className={`
        relative mb-[10px] flex h-[29px] w-full items-center justify-center
        rounded-[4px]
        ${highlight ? "bg-[#B3E378]" : "bg-[#E6E6E6]"}
      `}
    >
      <span
        className={`absolute left-3 top-1/2 -translate-y-1/2    
        h-[16px] w-[16px] rounded-full border border-[#1D1D1D]
        ${value[k] ? (highlight ? "bg-white" : "bg-[#B3E378]") : "bg-white"}
      `}
      />
      <span className="mx-auto text-[14px] font-semibold text-[#1D1D1D]">
        {label}
      </span>
    </button>
  );
  return (
    <div className="flex w-full flex-col">
      <Row k="all" label="전체선택" highlight />
      <Row k="service" label="이용약관 동의" />
      <Row k="privacy" label="개인정보 이용 동의" />
      <Row k="marketing" label="마케팅 동의 (선택)" />
    </div>
  );
}
