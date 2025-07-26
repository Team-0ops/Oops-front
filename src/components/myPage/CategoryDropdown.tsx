import { useEffect, useRef, useState } from "react";
import Down from "../../assets/icons/DownArrow.svg?react";
import Up from "../../assets/icons/UpArrow.svg?react";

interface Props {
  categories: string[];
  value: string;
  onChange: (val: string) => void;
}

export default function CategoryDropdown({
  categories,
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

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

      {/* 드롭다운 */}
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
                onChange(c);
                setOpen(false);
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
