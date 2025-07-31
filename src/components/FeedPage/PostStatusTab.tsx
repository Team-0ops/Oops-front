type Props = {
  selected: string;
  onSelect: (status: string) => void;
};

const statuses = ["웁스 중", "극복 중", "극복 완료"];

const PostStatusTab = ({ selected, onSelect }: Props) => {
  return (
    <div className="flex gap-[16px] mt-[18px] mb-[20px]">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onSelect(status)}
          className={`text-[14px] font-semibold px-[13px] py-[6.5px] rounded-[20px] ${
            selected === status ? "bg-[#B3E378]" : "bg-[#E6E6E6]"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default PostStatusTab;
