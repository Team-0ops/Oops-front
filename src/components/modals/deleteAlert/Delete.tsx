import X from "../../../assets/icons/X.svg?react";

interface DeleteModalProps {
  onConfirm: () => void; // 삭제 확정 시 실행되는 콜백
  onCancel: () => void; // 취소/닫기 시 실행되는 콜백
}

/**
 * DeleteModal 컴포넌트
 * - 삭제 여부를 확인하는 모달 ui
 * - "돌아가기" 버튼 -> oncancel 실행
 * - "삭제하기" 버튼 -> onConfirm 실행
 * - 우측 상단 x 아이콘으로도 닫기 가능
 */

const DeleteModal = ({ onConfirm, onCancel }: DeleteModalProps) => {
  return (
    // 모달 전체 화면 오버레이 (배경 반투명 처리)
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      {/* 모달 박스 */}
      <div className="bg-[#fff] w-[302px] h-[228px] rounded-[10px] shadow-lg p-[20px] flex flex-col">
        {/* 닫기 버튼 (x 아이콘) */}
        <div className="flex justify-end mb-[17px]">
          <X className="w-[24px] h-[24px] cursor-pointer " onClick={onCancel} />
        </div>

        {/* 본문 영역 */}
        <div className="flex flex-col mb-[40px] justify-center items-center text-center">
          <h2 className="body2 text-[#1d1d1d] mb-[24px]">삭제하시겠습니까?</h2>
          <p className="caption2 text-[#666]">
            삭제할 경우, 복구할 수 없습니다.
          </p>
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-center items-center text-center gap-[12px]">
          {/* 취소 버튼 */}
          <button
            className="body2 w-[124px] h-[48px] px-[20px] py-[14px] rounded-[10px] bg-[#b3e378] text-[#1d1d1d]"
            onClick={onCancel}
          >
            돌아가기
          </button>

          {/* 삭제 확정 버튼 */}
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
