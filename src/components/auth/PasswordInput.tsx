import { useState, forwardRef, type InputHTMLAttributes } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // 눈 아이콘 (react-icons)

type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  error?: boolean;
};

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className = "", error, ...rest }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative">
        <input
          ref={ref}
          {...rest}
          type={visible ? "text" : "password"}
          className={`h-[44px] w-full rounded border px-3
                      text-[14px] placeholder-[#B3B3B3]
                      focus:border-green-400 focus:outline-none
                      ${error ? "border-red-400" : "border-[#ECE6DF]"} 
                      ${className}`}
        />

        <button
          type="button"
          onClick={() => setVisible(!visible)}
          tabIndex={-1}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B3B3B3]
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
