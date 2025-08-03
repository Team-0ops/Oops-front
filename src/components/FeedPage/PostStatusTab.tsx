export type PostStatus = "OOPS" | "OVERCOMING" | "OVERCOME";

type Props = {
  selected: PostStatus;
  onSelect: (status: PostStatus) => void;
};

// 라벨과 API용 값 매핑
const statuses: { label: string; value: PostStatus }[] = [
  { label: "웁스 중", value: "OOPS" },
  { label: "극복 중", value: "OVERCOMING" },
  { label: "극복 완료", value: "OVERCOME" },
];

const PostStatusTab = ({ selected, onSelect }: Props) => {
  return (
    <div className="flex gap-[16px] mt-[18px] mb-[20px]">
      {statuses.map((status) => (
        <button
          key={status.value}
          onClick={() => onSelect(status.value)}
          className={`text-[14px] font-semibold px-[13px] py-[6.5px] rounded-[20px] ${
            selected === status.value ? "bg-[#B3E378]" : "bg-[#E6E6E6]"
          }`}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
};

export default PostStatusTab;
