import Warning from "../assets/icons/warning.svg?react";

export default function MyProfilePage() {
  const dummy = { nickname: "닉네임", email: "oops@naver.com", point: 80 };

  return (
    <section className="space-y-6 p-4">
      {/* 프로필 카드 */}
      <div className="flex items-center gap-4">
        <img
          src="https://placekitten.com/100/100"
          alt=""
          className="h-20 w-20 rounded-full object-cover"
        />
        <div className="space-y-[5px]">
          <p className="font-pretendard text-lg font-bold">{dummy.nickname}</p>
          <p className="font-pretendard text-xs text-gray-500">{dummy.email}</p>
          <button
            className="inline-flex h-[24px] items-center justify-center rounded-[4px] 
                       bg-[#262626] px-[8px] 
                       font-pretendard text-[12px] font-semibold text-[#FFFFFF]"
          >
            프로필 수정
          </button>
        </div>
      </div>

      {/* 포인트 박스 */}
      <div className="rounded-lg bg-[#B3E378] p-4 text-center text-lg font-bold text-[#1D1D1D]">
        <span className="font-pretendard text-[12px] font-semibold text-[#4D4D4D]">
          내 포인트 :
        </span>
        <span className="text-[24px] font-semibold text-[#1D1D1D]">
          {dummy.point} P
        </span>
      </div>

      {/* ───── 신고 영역 ───── */}
      <div className="space-y-[10px]">
        {/* 댓글 신고 수 */}
        <div className="w-[335px] space-y-2 p-5">
          <div className="flex items-center gap-[10px]">
            <Warning className="h-5 w-5 shrink-0" />
            <p className="text-base font-semibold text-[#1D1D1D]">
              댓글 신고 수
            </p>
          </div>
          <p className="text-sm text-[#666666] leading-snug">
            닉네임님의 댓글 신고 수가 <span className="font-bold">50개</span>{" "}
            이상입니다.
            <br />
            80개 이상이 될 경우 계정이 정지될 수 있습니다.
          </p>
          <p className="text-sm text-[#666666] leading-snug">
            해당 댓글 : 아진짜이렇게말도안되는
          </p>
        </div>

        {/* 게시물 신고 수 카드 */}
        <div className="w-[335px] space-y-2 p-5">
          <div className="flex items-center gap-[10px]">
            <Warning className="h-5 w-5 shrink-0" />
            <p className="text-base font-semibold text-[#1D1D1D]">
              게시물 신고 수
            </p>
          </div>

          <p className="text-sm text-[#666666] leading-snug">
            닉네임님의 게시물 신고 수가 <span className="font-bold">50개</span>{" "}
            이상입니다.
            <br />
            80개 이상이 될 경우 계정이 정지될 수 있습니다.
          </p>
          <p className="text-sm text-[#666666] leading-snug">
            해당 게시물 제목 : 아진짜이렇게말도안되는
          </p>
        </div>
      </div>
    </section>
  );
}
