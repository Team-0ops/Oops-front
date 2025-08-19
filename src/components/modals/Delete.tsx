import X from "../../assets/icons/X.svg?react";

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal = ({ onConfirm, onCancel }: DeleteModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-[#fff] w-[302px] h-[228px] rounded-[10px] shadow-lg p-[20px] flex flex-col">
       <div className="flex justify-end mb-[17px]">
         <X className="w-[24px] h-[24px] cursor-pointer " onClick={onCancel} />
       </div>
       <div className="flex flex-col mb-[40px] justify-center items-center text-center">
        <h2 className="body2 text-[#1d1d1d] mb-[24px]">삭제하시겠습니까?</h2>
        <p className="caption2 text-[#666]">삭제할 경우, 복구할 수 없습니다.</p>
        </div>
        <div className="flex justify-center items-center text-center gap-[12px]">
          <button
            className="body2 w-[124px] h-[48px] px-[20px] py-[14px] rounded-[10px] bg-[#b3e378] text-[#1d1d1d]"
            onClick={onCancel}
          >
            돌아가기
          </button>
          <button
            className="body2 w-[124px] h-[48px] px-[20px] py-[14px] rounded-[10px] bg-[#e6e6e6] text-[#1d1d1d]"
            onClick={onConfirm}
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;