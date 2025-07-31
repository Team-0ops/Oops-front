import { Link } from "react-router-dom";
interface ToSeeButtonProps {
  nav: string;
}

const ToSeeButton = ({ nav }: ToSeeButtonProps) => {
  return (
    <Link
      to={`/${nav}`}
      className="flex w-[75px] h-[30px] py-[3px] justify-center items-center rounded-[20px] border-[1px] border-[#E6E6E6]"
    >
      <span className="body5 text-[#999]">보러가기</span>
    </Link>
  );
};

export default ToSeeButton;
