import { useState, forwardRef, type InputHTMLAttributes } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

/**
 * 비밀번호 입력 전용 인풋 컴포넌트
 * - 비밀번호 보이기/숨기기 토글 지원
 * - 에러 상태시 border 색상 빨간색 표시
 * - ref 전달 기능
 */
type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  error?: boolean; // 에러 상태 여부
  height?: string; // 인풋 높이
  padding?: string; // 인풋 패딩
  borderColor?: string; // 기본 border 색상
};

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className = "",
      error,
      height = "44px",
      padding = "14px 12px",
      borderColor = "#ECE6DF",
      ...rest
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false); // 비밀번호 가시성 상태

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          {...rest}
          type={visible ? "text" : "password"} // 상태에 따라 보이기/숨기기
          style={{
            height,
            padding,
            borderColor: error ? "#FF5A5A" : borderColor,
          }}
          className={`w-full rounded-[4px] border bg-[#FFFBF8]
                     text-[14px] placeholder-[#B3B3B3]
                     shadow-[0_0_5.4px_rgba(0,0,0,0.05)]
                     focus:border-green-400 focus:outline-none
                     pr-[40px] ${className}`}
        />

        {/* 눈 아이콘 버튼 */}
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          tabIndex={-1}
          className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#B3B3B3]
                     hover:text-[#262626] focus:outline-none"
        >
          {visible ? <FiEye size={18} /> : <FiEyeOff size={18} />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
