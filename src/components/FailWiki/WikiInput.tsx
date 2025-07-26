import { useState } from "react";

interface WikiInputProps {
  onSubmit: (value: string) => void;
}

const WikiInput = ({ onSubmit }: WikiInputProps) => {
  const [value, setValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit(value.trim()); // 빈 값도 포함해서 전달
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="어떤 실패의 극복 팁이 궁금한가요?"
      className="body4 w-full h-[48px] shrink-0 px-4 py-[15px] text-[#999]
             bg-[#FFFBF8] border border-[#F6EBE6] rounded 
             shadow-[inset_0_0_5.4px_0_rgba(0,0,0,0.25)] 
             focus:outline-none placeholder:text-gray-400"
    />
  );
};

export default WikiInput;
