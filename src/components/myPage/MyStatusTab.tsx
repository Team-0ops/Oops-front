export type MyStatus = "oops" | "doing" | "done";

interface Props {
  value: MyStatus; // 현재 선택된 상태값
  onChange: (v: MyStatus) => void; // 상태 변경 시 실행할 콜백
}

/**
 * 내 상태 탭 컴포넌트
 * - "웁스 중" / "극복 중" / "극복 완료" 세 가지 상태 중 선택 가능
 * - 선택된 상태는 어두운 배경 + 흰색 텍스트로 강조 표시
 */
export default function MyStatusTab({ value, onChange }: Props) {
  // 탭 정의
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
                      px-[12px] py-[6px] text-[12px] font-bold
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
