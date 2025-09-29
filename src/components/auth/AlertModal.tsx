/**
 * 간단한 알림 모달 컴포넌트
 * - 화면 중앙에 메시지를 띄우고, 확인 버튼을 누르면 닫히는 구조
 * - 부모에서 'message', 'onCLose' props 전달 
 */
interface AlertModalProps {
  message: string;
  onClose: () => void;
}

const AlertModal = ({ message, onClose }: AlertModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[280px] rounded-md bg-white px-5 py-6 shadow-md">
        <p className="text-sm text-gray-800 text-center">{message}</p>
        <button
          className="mt-4 w-full rounded bg-[#B3E378] py-2 text-sm font-semibold text-black"
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
