import type { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: boolean;
  rightButton?: React.ReactNode;

  /** 디자인 맞춤용 */
  height?: string;
  padding?: string;
  borderColor?: string;
}

export default function TextInput({
  label,
  hint,
  error,
  rightButton,
  className = "",
  height = "50px",
  padding = "18px 12px",
  borderColor = "#F0E7E0", // 기본: 아이디/비번 찾기용
  ...rest
}: TextInputProps) {
  return (
    <label className="flex flex-col gap-[4px] text-[14px] text-[#4D4D4D]">
      {label && <span className="font-semibold">{label}</span>}

      <div className="relative w-full">
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
