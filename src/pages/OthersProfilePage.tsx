import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import PostCard from "../components/common/PostCard";
import LeftArrow from "../assets/icons/left-point.svg?react";
import othersProfile from "../assets/icons/othersprofile.svg";

import type { OthersProfileResult } from "../types/mypage";
import { getOthersProfile } from "../apis/othersApi";
import { SituationRow, type Situation } from "../components/common/Row";
import instance from "../apis/instance";
import type { ApiResponse } from "../types/api";

type BestFailer = { postId: number; title: string; situation: Situation };
function toCard(p: any) {
  const rawId =
    p.postId ?? p.id ?? p.post?.id ?? p.post_id ?? p.postID ?? undefined;
  const n = typeof rawId === "number" ? rawId : Number(rawId);
  const safeId = Number.isFinite(n) && n > 0 ? n : undefined;
  return {
    postId: safeId,
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
const POST_DETAIL_BASE = "/post";
export default function OthersProfilePage() {
  const { userId } = useParams();
  const nav = useNavigate();
  const location = useLocation();
  const preload =
    (location.state as { nickname?: string; profileImageUrl?: string }) || {};

  const [data, setData] = useState<OthersProfileResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  //추천글 게시글로 보내기
  //const goToPost = (id: number) => nav(`/post/${id}`);
  const [bestFailers, setBestFailers] = useState<BestFailer[]>([]);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await getOthersProfile(userId);
        setData(res);

        const { data: raw } = await instance.get<ApiResponse<any>>(
          `/my-page/profile/${userId}`
        );
        const rawBest =
          raw?.result?.bestFailers ??
          //raw?.result?.bestFailures ??
          [];

        const parsed: BestFailer[] = Array.isArray(rawBest)
          ? rawBest
              .map((b: any) => ({
                postId: Number(b?.postId) || 0,
                title: (b?.title ?? "").trim(),
                situation: b?.situation,
              }))
              .filter((b) => b.postId > 0 && b.title.length > 0)
          : [];

        setBestFailers(parsed);
      } catch (e: any) {
        setErr(e?.response?.data?.message ?? "프로필을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  const nickname = data?.profile.nickname ?? preload.nickname ?? "사용자";
  const avatar =
    data?.profile.profileImageUrl ?? preload.profileImageUrl ?? othersProfile;

  const cards = (data?.posts ?? []).map(toCard);

  console.log("[others] raw posts", data?.posts);
  const goPost = (id?: number) => {
    if (!id) return;
    nav(`${POST_DETAIL_BASE}/${id}`);
  };
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
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
                e.currentTarget.insertAdjacentHTML(
                  "afterend",
                  `<div style="width:100px;height:100px;border-radius:50%;background:#D9D9D9;"></div>`
                );
              }}
            />
            <p className="text-[20px] font-semibold text-[#1D1D1D]">
              {nickname}
            </p>
          </div>
          {/* 게시물 카드 */}
          <div className="mt-[20px] flex flex-col gap-[12px] px-[20px]">
            {cards.map((p) => (
              <div
                key={p.postId}
                role="button"
                tabIndex={0}
                onClick={() => goPost(p.postId)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goPost(p.postId);
                  }
                }}
                className="cursor-pointer rounded-lg transition
                 hover:scale-[1.01] hover:shadow-md
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20
                 active:scale-[0.99]"
              >
                <PostCard
                  postId={p.postId}
                  title={p.title}
                  content={p.content}
                  imageUrl={p.imageUrl}
                  likes={p.likes}
                  comments={p.comments}
                  views={p.views}
                  category={p.category}
                />
              </div>
            ))}
            {cards.length === 0 && (
              <p className="text-center text-[#808080]">
                작성한 실패담이 없습니다.
              </p>
            )}
          </div>
          {/* 베스트 실패담 */}
          <section className="bg-[#FFFBF8] -mx-[20px] flex flex-col items-center w-screen mt-[20px]">
            {" "}
            <div className="body2 flex justify-start items-center bg-[#fbf3ec] border-b-[1px] border-[#e9e5e2] w-full h-[39px] pl-[38px]">
              베스트 Failers
            </div>
            {bestFailers.length ? (
              bestFailers
                .slice(0, 5)
                .map((p) => (
                  <SituationRow
                    key={p.postId}
                    title={p.title}
                    situation={p.situation}
                    onClick={() => goPost(p.postId)}
                  />
                ))
            ) : (
              <div className="caption2 text-[#999] w-full pl-[38px] py-[12px] border-b-[1px] border-[#e9e5e2]">
                베스트 글이 아직 없습니다.
              </div>
            )}
          </section>
          <div className="h-[50px]" />
        </>
      )}
      <Footer />
    </div>
  );
}
