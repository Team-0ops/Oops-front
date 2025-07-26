import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/mypage/failures", label: "내 실패담" },
  { to: "/mypage/lessons", label: "내 교훈" },
  { to: "/mypage/profile", label: "내 정보" },
];

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
