import type { InputHTMLAttributes } from "react";

/**
 * 일반 텍스트 인풋 컴포넌트
 * - Label, hint, error 표시 지원
 * - 오른쪽 버튼 삽입 기능
 * - 스타일 커스터마이징 (height, padding, borderColor) 지원
 */
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; // 상단 라벨 텍스트
  hint?: string; // 하단 안내 문구
  error?: boolean; // 에러 상태
  rightButton?: React.ReactNode; // input 내부 오른쪽 버튼 삽입

  /** 디자인 맞춤용 */
  height?: string; // 인풋 높이
  padding?: string; // 인풋 패딩
  borderColor?: string; // input 내부 오른쪽 버튼 삽입
}

export default function TextInput({
  label,
  hint,
  error,
  rightButton,
  className = "",
  height = "50px",
  padding = "18px 12px",
  borderColor = "#F0E7E0", // 기본 border 색
  ...rest
}: TextInputProps) {
  return (
    <label className="flex flex-col gap-[4px] text-[14px] text-[#4D4D4D]">
      {label && <span className="font-semibold">{label}</span>}

      <div className="relative w-full">
        {/* 입력 필드 */}
        <input
          {...rest}
          style={{
            height,
            padding,
            borderColor: error ? "#FF5A5A" : borderColor,
          }}
          className={`
            w-full rounded-[4px] border
            text-[14px] placeholder-[#B3B3B3]
            shadow-[0_0_5.4px_rgba(0,0,0,0.05)]
            focus:border-green-400 focus:outline-none
            pr-[88px] ${className}
          `}
        />
        {/* 오른쪽 버튼 (옵션) */}
        {rightButton && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightButton}
          </div>
        )}
      </div>

      {hint && <span className="text-[12px] text-[#808080]">{hint}</span>}
    </label>
  );
}
