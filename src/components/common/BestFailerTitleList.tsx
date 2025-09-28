import { useMemo } from "react";
import useGetPostListInMain from "../../hooks/MainPage/useGetAuthPostList";

type TitleLike = { title?: string; name?: string };

export default function BestFailerTitleList() {
  const { posts, mainLoading, mainError } = useGetPostListInMain();

  const titles = useMemo<string[]>(() => {
    const best = (posts as any)?.result?.[0]?.posts ?? [];
    if (!Array.isArray(best)) return [];
    return (best as TitleLike[])
      .map((p) => p.title ?? p.name ?? "")
      .filter((t) => t && t.trim().length > 0);
  }, [posts]);

  return (
    <div className="mt-[32px]">
      <div className="w-full overflow-hidden">
        <div className="h-[39px] bg-[#FBF3EC]/[0.54] flex items-center">
          <h3 className="px-[20px] text-[16px] font-semibold text-[#1D1D1D]">
            베스트 failers
          </h3>
        </div>
        <ul className="bg-[#FFFBF8] border-y border-[#E9E5E2] divide-y divide-[#E9E5E2]">
          {mainLoading ? (
            <li className="px-[20px] py-[12px] text-[12px] text-[#808080]">
              불러오는 중...
            </li>
          ) : mainError ? (
            <li className="px-[20px] py-[12px] text-[12px] text-red-500">
              베스트 실패담을 불러오지 못했습니다.
            </li>
          ) : titles.length > 0 ? (
            titles.map((title, i) => (
              <li
                key={`${title}-${i}`}
                className="px-[20px] py-[12px] text-[12px] font-medium text-[#666666] truncate"
                title={title}
              >
                {title}
              </li>
            ))
          ) : (
            <li className="px-[20px] py-[12px] text-[12px] text-[#808080]">
              아직 베스트 실패담이 없어요.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
