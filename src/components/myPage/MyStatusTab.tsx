import React from "react";

export type MyStatus = "oops" | "doing" | "done";

interface Props {
  value: MyStatus;
  onChange: (v: MyStatus) => void;
}

export default function MyStatusTab({ value, onChange }: Props) {
  const tabs: { key: MyStatus; label: string }[] = [
    { key: "oops", label: "웁스 중" },
    { key: "doing", label: "극복 중" },
    { key: "done", label: "극복 완료" },
  ];

  return (
    <div className="flex w-full gap-[10px] mt-[18px] mb-[20px]">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`flex-1 basis-0 min-w-[60px] h-[30px] rounded-[20px] whitespace-nowrap
                      px-[12px] py-[6px] text-[12px] font-semibold
                      ${
                        value === t.key
                          ? "bg-[#1D1D1D] text-white"
                          : "bg-[#E6E6E6] text-[#1D1D1D]"
                      }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
