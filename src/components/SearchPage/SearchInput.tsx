const SearchInput = () => {
  return (
    <>
      <input
        type="text"
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
