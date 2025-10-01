import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import PostCard from "../../components/common/PostCard";
import LeftArrow from "../../assets/icons/left-point.svg?react";
//import othersProfile from "../assets/icons/othersprofile.svg";
import BasicIconUrl from "../../assets/icons/BasicIcon.svg"

import type { OthersProfileResult } from "../../types/mypage";
import { getOthersProfile } from "../../apis/othersApi";
import { SituationRow, type Situation } from "../../components/common/Row";
import instance from "../../apis/instance";
import type { ApiResponse } from "../../types/api";

//type Props = { avatar?: string | null; nickname: string };

type BestFailer = { postId: number; title: string; situation: Situation };

/**
 * 다른 사람 프로필 페이지 - 게시글 데이터를 카드 형식으로 변환
 * - postId, 제목, 내용, 이미지, 좋아요/댓글/조회수, 카테고리명, 작성자 정보 정규화
 */
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

/**
 * 마이페이지 - 타인 프로필 화면
 * - 특정 userId의 프로필/게시글/베스트 실패담 조회
 * - 프로필 이미지, 닉네임 표시
 * - 게시글은 PostCard로 렌더링
 * - 베스트 실패담은 SituationRow 컴포넌트로 표시
 * - 뒤로가기/접근성 키보드 이벤트 지원
 */
export default function OthersProfilePage() {
  const { userId } = useParams(); // URL에서 userId 추출
  const nav = useNavigate();
  const location = useLocation();

  // 네비게이션 state에서 미리 전달받은 nickname/profileImageUrl (프리로드)
  const preload =
    (location.state as { nickname?: string; profileImageUrl?: string }) || {};

  const [data, setData] = useState<OthersProfileResult | null>(null); // API 응답 데이터
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [bestFailers, setBestFailers] = useState<BestFailer[]>([]); // 베스트 실패담 목록

  /**
   * 프로필 및 게시글, 베스트 실패담 로드
   */
  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        setLoading(true);
        setErr(null);

        // api : 프로필 + 게시글 조회
        const res = await getOthersProfile(userId);
        setData(res);

        // api : 베스트 실패담 별도 조회
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

  // 표시용 데이터 가공
  const nickname = data?.profile.nickname ?? preload.nickname ?? "사용자";
  const avatarRaw =
    data?.profile.profileImageUrl ?? preload.profileImageUrl ?? "";
  const avatar =
    avatarRaw && avatarRaw.trim().length > 0 ? avatarRaw : BasicIconUrl;
  const cards = (data?.posts ?? []).map(toCard);

  console.log("[others] raw posts", data?.posts);

  // 게시글 클릭 -> 상세 페이지 이동
  const goPost = (id?: number) => {
    if (!id) return;
    nav(`${POST_DETAIL_BASE}/${id}`);
  };
  return (
    <div className="min-h-screen bg-[#FFFBF8] flex flex-col">
      <Navbar />

      {/* 헤더: 뒤로가기 + 타이틀 */}
      <div className="flex items-center gap-[4px] px-[20px] pt-[17px]">
        <button onClick={() => nav(-1)} aria-label="뒤로가기">
          <LeftArrow className="h-5 w-5" />
        </button>
        <h2 className="text-[20px] font-semibold text-[#1D1D1D] leading-none">
          {nickname} 님의 프로필
        </h2>
      </div>

      {/* 상태 메시지 */}
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
                const img = e.currentTarget as HTMLImageElement;
                if ((img as any)._fallbackApplied || img.src === BasicIconUrl)
                  return;
                img.onerror = null;
                (img as any)._fallbackApplied = true;
                img.src = BasicIconUrl;
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
