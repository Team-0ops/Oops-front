import LeftArrow from "../../assets/icons/LeftArrow.svg?react";
const WikiHead = () => {
  return (
    <>
      <div className="flex items-center gap-[10px] ">
        <LeftArrow />
        <p className="h2">실패위키</p>
      </div>
    </>
  );
};

export default WikiHead;
