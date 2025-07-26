const WikiInput = () => {
  return (
    <>
      <input
        type="text"
        placeholder="어떤 실패의 극복 팁이 궁금한가요?"
        className="body4 shadowcustom-inset w-full h-[48px] shrink-0 px-4 py-[15px] text-[#999]
             bg-[#FFFBF8] border border-[#F6EBE6] rounded 
             shadow-[inset_0_0_5.4px_0_rgba(0,0,0,0.25)] 
             focus:outline-none placeholder:text-gray-400"
      />
    </>
  );
};

export default WikiInput;
