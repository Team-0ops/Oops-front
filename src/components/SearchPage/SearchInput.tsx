import { useState } from "react";
interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit: (value: string) => void;
}

const SearchInput = ({ value, onChange, onSubmit }: SearchInputProps) => {
  const [inner, setInner] = useState("");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : inner;

  const handleChange = (v: string) => {
    if (isControlled) onChange?.(v);
    else setInner(v);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSubmit(currentValue.trim());
  };

  return (
    <input
      type="text"
      value={currentValue}
      onChange={(e) => handleChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="무엇이든 검색해 보세요!"
      className="w-full h-[48px] shrink-0 px-4 text-sm text-gray-800 
             bg-[#FFFBF8] border border-[#F6EBE6] rounded 
             shadow-[inset_0_0_5.4px_0_rgba(0,0,0,0.25)] 
             focus:outline-none placeholder:text-gray-400"
    />
  );
};

export default SearchInput;
