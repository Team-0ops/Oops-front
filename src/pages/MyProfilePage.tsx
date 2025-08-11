import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Warning from "../assets/icons/warning.svg?react";
import MyProfileIcon from "../assets/icons/myprofile.svg?react";
import { getMyProfile } from "../apis/mypageApi";
import { postLogout } from "../apis/auth/authApi";
import type { MyProfileRes } from "../types/mypage";

export default function MyProfilePage() {
  const [profile, setProfile] = useState<MyProfileRes | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getMyProfile();
        setProfile(data);

        //result(=data) 안의 키/값 확인 로그
        // console.log("[MyProfile] result object:", data);
        // console.log("[MyProfile] result keys:", Object.keys(data as any));
        // Object.entries(data as unknown as Record<string, unknown>).forEach(
        //   ([k, v]) => {
        //     console.log(`key=${k}, type=${typeof v}, value=`, v);
        //   }
        // );
      } catch (e: any) {
        console.error("유저 정보 불러오기 실패:", e);
        setErr(
          e?.response?.data?.message ?? "유저 정보를 불러오지 못했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await postLogout();
    } catch (e) {
      console.warn("logout 호출 실패, 로컬만 초기화합니다.", e);
    } finally {
      // 클라이언트 상태 정리
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      setLoggingOut(false);
      navigate("/", { replace: true });
    }
  };

  if (loading) return <div className="p-4">불러오는 중...</div>;
  if (err) return <div className="p-4 text-red-500">{err}</div>;
  if (!profile) return null;

  //const nickname = (profile as any).nickname ?? (profile as any).userName ?? "";
  const {
    userName,
    email,
    point,
    commentReportCount,
    postReportCount,
    profileImageUrl,
  } = profile;

  return (
    <section className="space-y-6 p-4">
      <div className="flex items-center gap-4">
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt="profile"
            className="h-[100px] w-[100px] rounded-full object-cover"
          />
        ) : (
          <MyProfileIcon className="h-[100px] w-[100px] rounded-full object-cover" />
        )}

        <div className="space-y-[5px]">
          <p className="font-pretendard text-lg font-bold">{userName}</p>
          <p className="font-pretendard text-xs text-gray-500">{email}</p>

          {/* PATCH 연결은 추후에... */}
          <button
            className="inline-flex h-[24px] items-center justify-center rounded-[4px] 
                       bg-[#262626] px-[8px] 
                       font-pretendard text-[12px] font-semibold text-[#FFFFFF]"
            onClick={() => {
              // TODO: 프로필 수정 모달/페이지로 이동
            }}
          >
            프로필 수정
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center rounded-lg bg-[#B3E378] p-4 text-[#1D1D1D]">
        <span className="mr-[6px] font-pretendard text-[12px] font-semibold text-[#4D4D4D]">
          내 포인트 :
        </span>
        <span className="text-[24px] font-semibold text-[#1D1D1D]">
          {point} P
        </span>
      </div>

      <div className="space-y-[10px]">
        <div className="w-[335px] space-y-2 p-5">
          <div className="flex items-center gap-[10px]">
            <Warning className="h-5 w-5 shrink-0" />
            <p className="text-base font-semibold text-[#1D1D1D]">
              댓글 신고 수
            </p>
          </div>
          <p className="text-sm text-[#666666] leading-snug">
            {userName}님의 댓글 신고 수가{" "}
            <span className="font-bold">{commentReportCount}개</span>{" "}
            이상입니다.
            <br />
            80개 이상이 될 경우 계정이 정지될 수 있습니다.
          </p>
        </div>

        {/* 게시물 신고 수 */}
        <div className="w-[335px] space-y-2 p-5">
          <div className="flex items-center gap-[10px]">
            <Warning className="h-5 w-5 shrink-0" />
            <p className="text-base font-semibold text-[#1D1D1D]">
              게시물 신고 수
            </p>
          </div>
          <p className="text-sm text-[#666666] leading-snug">
            {userName}님의 게시물 신고 수가{" "}
            <span className="font-bold">{postReportCount}개</span> 이상입니다.
            <br />
            80개 이상이 될 경우 계정이 정지될 수 있습니다.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="h-[30px] w-[84px] rounded-[20px] border border-[#B3B3B3] px-[13px] py-[3px] text-[14px] font-semibold text-[#1D1D1D] flex items-center justify-center disabled:opacity-60"
        >
          {loggingOut ? "로그아웃 중..." : "로그아웃"}
        </button>
      </div>
    </section>
  );
}
