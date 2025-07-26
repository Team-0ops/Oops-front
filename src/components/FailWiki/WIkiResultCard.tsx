const WikiResultCard = () => {
  return (
    <>
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
        <div className="flex-1 w-full rounded-[4px] border border-[#F6EBE6] bg-[#FFFBF8] shadow-[inset_0_0_5px_rgba(0,0,0,0.25)]">
          {/* 내부 결과값 layout 변경 예정 -> 변경후 반영*/}
        </div>
      </div>
    </>
  );
};

export default WikiResultCard;
