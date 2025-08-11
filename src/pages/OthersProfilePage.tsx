import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import PostCard from "../components/common/PostCard";
import LeftArrow from "../assets/icons/left-point.svg?react";
import othersProfile from "../assets/icons/othersprofile.svg";

import type { OthersProfileResult } from "../types/mypage";
import { getOthersProfile } from "../apis/othersApi";

// function pickPostId(x: any) {
//   return (
//     x.postId ??
//     x.id ??
//     x.post?.postId ??
//     x.post?.id ??
//     x.failureId ??
//     x.failure?.id ??
//     x.failure?.postId ??
//     0
//   );
// }

// 서버 post → PostCard 프롭으로 매핑
function toCard(p: any) {
  return {
    postId: p.postId ?? p.id ?? null,
    title: p.title ?? "",
    content: p.content ?? p.contentPreview ?? "",
    imageUrl: p.thumbnailUrl ?? p.imageUrl ?? undefined,
    likes: p.likes ?? p.like ?? p.likeCount ?? 0,
    comments: p.comments ?? p.commentCount ?? 0,
    views: p.views ?? p.viewCount ?? 0,
    category: p.categoryName ?? p.category ?? "",
    // 작성자 정보
    authorId: p.userId ?? p.authorId ?? p.writerId,
    authorName: p.userName ?? p.nickname ?? p.authorName ?? "익명",
    authorAvatar: p.profileImageUrl ?? p.authorImageUrl ?? null,
  };
}

export default function OthersProfilePage() {
  const { userId } = useParams();
  const nav = useNavigate();

  const [data, setData] = useState<OthersProfileResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await getOthersProfile(userId);
        setData(res);
      } catch (e: any) {
        setErr(e?.response?.data?.message ?? "프로필을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  const nickname = data?.profile.nickname ?? "사용자";
  const avatar = data?.profile.profileImageUrl || othersProfile;
  const cards = (data?.posts ?? []).map(toCard);

  console.log("[others] raw posts", data?.posts);

  const bestFails: string[] =
    ((data as any)?.bestFails as string[] | undefined) ?? [];

  return (
    <div className="min-h-screen bg-[#FFFBF8] flex flex-col">
      <Navbar />

      <div className="flex items-center gap-[4px] px-[20px] pt-[17px]">
        <button onClick={() => nav(-1)} aria-label="뒤로가기">
          <LeftArrow className="h-5 w-5" />
        </button>
        <h2 className="text-[20px] font-semibold text-[#1D1D1D] leading-none">
          {nickname} 님의 프로필
        </h2>
      </div>

      {loading && <div className="p-4">불러오는 중...</div>}
      {err && <div className="p-4 text-red-500">{err}</div>}

      {!loading && !err && (
        <>
          {/* 프로필 헤더 */}
          <div className="flex items-center gap-[20px] px-[20px] pt-[20px]">
            <img
              src={avatar}
              alt="프로필 이미지"
              className="h-[100px] w-[100px] rounded-full object-cover"
            />
            <p className="text-[20px] font-semibold text-[#1D1D1D]">
              {nickname}
            </p>
          </div>

          {/* 게시물 카드 */}
          <div className="mt-[20px] flex flex-col gap-[12px] px-[20px]">
            {cards.map((p) => (
              <PostCard
                key={p.postId}
                postId={p.postId}
                title={p.title}
                content={p.content}
                imageUrl={p.imageUrl}
                likes={p.likes}
                comments={p.comments}
                views={p.views}
                category={p.category}
                // author={{
                //   id: p.authorId,
                //   name: p.authorName,
                //   avatar: p.authorAvatar,
                // }}
              />
            ))}
            {cards.length === 0 && (
              <p className="text-center text-[#808080]">
                작성한 실패담이 없습니다.
              </p>
            )}
          </div>

          {/* 베스트 failures 있을 때만 표시함 */}
          <div className="mt-[32px] px-[20px]">
            <h3 className="mb-[12px] text-[16px] font-semibold">
              베스트 failers
            </h3>
            <ul className="divide-y divide-[#E6E6E6] rounded-[4px] bg-[#F9F5F1]">
              {bestFails.length > 0 ? (
                bestFails.map((title, i) => (
                  <li
                    key={`${title}-${i}`}
                    className="px-[14px] py-[10px] text-[14px]"
                  >
                    {title}
                  </li>
                ))
              ) : (
                <li className="px-[14px] py-[10px] text-[14px] text-[#808080]">
                  아직 베스트 실패담이 없어요.
                </li>
              )}
            </ul>
          </div>
        </>
      )}

      <div className="flex-grow" />
      <Footer />
    </div>
  );
}
