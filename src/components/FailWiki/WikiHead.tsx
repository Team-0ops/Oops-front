import { useNavigate } from "react-router-dom";
import LeftArrow from "../../assets/icons/LeftArrow.svg?react";
const WikiHead = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center gap-[10px] ">
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          <LeftArrow />
        </button>
        <p className="h2">실패위키</p>
      </div>
    </>
  );
};

export default WikiHead;
