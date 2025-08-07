//import { type ChangeEvent, type MouseEvent } from "react";
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
  const toggle = (key: keyof Terms) => {
    //이용약관만 단독 클릭한 경우
    if (
      key === "service" &&
      !value.service && // 현재는 체크 안되어 있고
      !value.privacy &&
      !value.marketing &&
      !value.all
    ) {
      navigate("/terms"); // 약관 페이지로 이동
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
      sessionStorage.setItem("signupTerms", JSON.stringify(updated)); // 저장
      onChange(updated);
      return;
    }

    // 개별 토글
    const nextState = { ...value, [key]: !value[key] };
    nextState.all =
      nextState.service && nextState.privacy && nextState.marketing;

    sessionStorage.setItem("signupTerms", JSON.stringify(nextState)); // 저장
    onChange(nextState);
  };

  // /* 공통 스타일 함수 → 배경색 결정 */
  // const bg = (k: keyof Terms, highlight?: boolean) => {
  //   if (value[k]) return "bg-[#B3E378]";
  //   return highlight ? "bg-[#B3B3B3]" : "bg-[#E6E6E6]";
  // };

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
        {/* 체크 아이콘 : pseudo 대신 별도 span 으로 */}
        <span
          className="mx-auto flex h-[16px] w-[16px]
                       items-center justify-center rounded-[3px]
                      bg-[#FFFFFF]"
        >
          {/* ✔︎ 표시 */}
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
