import { NavLink } from "react-router-dom";

// 마이페이지 탭 정의
const tabs = [
  { to: "/mypage/failures", label: "내 실패담" },
  { to: "/mypage/lessons", label: "내 교훈" },
  { to: "/mypage/profile", label: "내 정보" },
];

/**
 * 마이페이지 탭바 컴포넌트
 * - "내 실패담" / "내 교훈" / "내 정보" 3개의 탭을 제공
 * - react-router-dom의 NavLink 사용 → 현재 URL에 따라 활성 상태 표시
 * - 활성 상태: 연두색 배경 + 검정 텍스트
 * - 비활성 상태: 회색 배경 + 회색 텍스트
 */
export default function TabBar() {
  return (
    <div className="flex w-full gap-[10px] px-4 py-2">
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          className={({ isActive }) =>
            `flex-1 basis-0 w-[106px] h-10 rounded-[4px] flex items-center justify-center
             text-sm font-medium
             ${
               isActive
                 ? "bg-[#B3E378] text-[#1D1D1D]"
                 : "bg-[#F3F3F3] text-[#999999]"
             }`
          }
        >
          {t.label}
        </NavLink>
      ))}
    </div>
  );
}
