import { useState, forwardRef, type InputHTMLAttributes } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  error?: boolean;
  height?: string;
  padding?: string;
  borderColor?: string;
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
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          {...rest}
          type={visible ? "text" : "password"}
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

        <button
          type="button"
          onClick={() => setVisible(!visible)}
          tabIndex={-1}
          className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#B3B3B3]
                     hover:text-[#262626] focus:outline-none"
        >
          {visible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
