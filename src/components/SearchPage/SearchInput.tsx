import { useEffect, useState } from "react";

interface SearchInputProps {
  onChange: (value: string) => void;
}

const SearchInput = ({ onChange }: SearchInputProps) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    onChange(value); // 입력값 변경 시 부모에 전달
  }, [value]);

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="인간"
        className="w-full h-[48px] shrink-0 px-4 text-sm text-gray-800 
             bg-[#FFFBF8] border border-[#F6EBE6] rounded 
             shadow-[inset_0_0_5.4px_0_rgba(0,0,0,0.25)] 
             focus:outline-none placeholder:text-gray-400"
      />
    </>
  );
};

export default SearchInput;
