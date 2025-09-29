import { useEffect, useRef, useState } from "react";
import Down from "../../assets/icons/DownArrow.svg?react";
import Up from "../../assets/icons/UpArrow.svg?react";

interface Props {
  categories: string[]; // 선택 가능한 카테고리 목록
  value: string; // 현재 선택된 카테고리
  onChange: (val: string) => void; // 카테고리 선택 시 실행할 콜백
}

/**
 * 카테고리 드롭다운 컴포넌트
 * - 버튼 클릭 시 드롭다운 열림/닫힘
 * - 외부 클릭 시 자동으로 닫힘 (mousedown 이벤트 감지)
 * - 선택 시 onChange 콜백 실행 및 드롭다운 닫기
 */
export default function CategoryDropdown({
  categories,
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false); // 드롭다운 열림 여부
  const boxRef = useRef<HTMLDivElement>(null); // 드롭다운 영역 참조

  // 외부 클릭 감지 -> 드롭다운 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={boxRef}>
      {/* 선택 버튼 */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-[30px] w-[120px] items-center justify-between
                   rounded-[20px] bg-[#E6E6E6] px-[10px] py-[6px] text-[14px] font-semibold text-[#1D1D1D]"
      >
        {value || "카테고리 선택"}
        {open ? <Up className="h-3 w-3" /> : <Down className="h-3 w-3" />}
      </button>

      {/* 드롭다운 리스트 */}
      {open && (
        <ul
          className="absolute z-10 mt-1 max-h-[118px] w-[120px]
                     overflow-y-auto rounded-b-[10px] bg-white
                     text-[12px] shadow-lg"
        >
          {categories.map((c, idx) => (
            <li
              key={c}
              onClick={() => {
                onChange(c); // 선택된 카테고리 전달
                setOpen(false); // 드롭다운 닫기
              }}
              className={`cursor-pointer px-[13px] py-[8px] ${
                value === c ? "text-black" : "text-[#999999]"
              } ${
                idx !== categories.length - 1 && "border-b border-[#E6E6E6]"
              }`}
            >
              {c}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
