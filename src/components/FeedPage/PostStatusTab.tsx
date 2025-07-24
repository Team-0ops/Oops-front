const PostStatusTab = () => {
  return (
    <div className="flex gap-[16px] mt-[18px] mb-[20px]">
      <button className="text-[14px] font-semibold px-[13px] py-[6.5px] rounded-[20px] bg-[#E6E6E6]">
        웁스중
      </button>
      <button className="text-[14px] font-semibold px-[13px] py-[6.5px] rounded-[20px] bg-[#B3E378]">
        극복 중
      </button>
      <button className="text-[14px] font-semibold px-[13px] py-[6.5px] rounded-[20px] bg-[#E6E6E6]">
        극복 완료
      </button>
    </div>
  );
};

export default PostStatusTab;
