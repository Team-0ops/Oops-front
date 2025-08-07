const WikiResultCard = () => {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center">
        <div className="flex flex-col pt-[24px] pb-[18px] items-center gap-[20px] px-[17px] w-full h-[409px] bg-[#B3E378] rounded-[10px]">
          <div className="flex flex-col items-center gap-[12px]">
            <div className="body4 text-[#FFF] px-[13px] py-[6px] bg-[#1D1D1D] rounded-[20px]">
              연애 실패 위키
            </div>
            <div className="caption3 text-[#666] flex justify-center gap-[11px]">
              <p>#혼자만의 시간</p>
              <p>#자유</p>
              <p>#자기계발</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-[42px] w-full items-center pt-[28px] rounded-[4px] border border-[#F6EBE6] bg-[#FFFBF8] shadow-[inset_0_0_5px_rgba(0,0,0,0.25)]">
            <div>
              <span className="border-b-2 border-[#B3E378]">극복 팁 요약</span>
            </div>
            <div className="flex flex-col body4 gap-[22px] justify-center itmes-center text-center">
              <p>수동으로 입력된 극복팁 제공</p>
              <p>세상의 반이 이성이다.</p>
              <p>혼자만의 시간에 집중해라.</p>
              <p>취미를 많이 만들어라</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WikiResultCard;
