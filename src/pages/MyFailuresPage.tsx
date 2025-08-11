import { useEffect, useMemo, useState } from "react";
import PostCard from "../components/common/PostCard";
//import PostStatusTab from "../components/FeedPage/PostStatusTab";
import MyStatusTab from "../components/myPage/MyStatusTab";
import type { MyStatus } from "../components/myPage/MyStatusTab";
import CategoryDropdown from "../components/myPage/CategoryDropdown";
import type { MyPostCardVM, MyPostDto } from "../types/mypage";
import { getMyPosts } from "../apis/mypageApi";
import { getAllCategories } from "../apis/categoryApi";

type CategoryVM = {
  id: number;
  name: string;
  active: boolean;
  key: string;
};

export default function MyFailuresPage() {
  const [tabStatus, setTabStatus] = useState<MyStatus>("oops");
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);

  const [categories, setCategories] = useState<CategoryVM[]>([]);
  const [cards, setCards] = useState<MyPostCardVM[]>([]);
  const [page, setPage] = useState(0); // 0 or 1 기반은 pageInfo 확인 후 조정
  const [size] = useState(10);
  const [hasNext, setHasNext] = useState(true);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [catLoading, setCatLoading] = useState(false);
  const [catErr, setCatErr] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCatLoading(true);
        setCatErr(null);
        const list = await getAllCategories(); // [{id, name, active, key}]
        // 맨 앞에 "전체" 추가
        setCategories([
          { id: Number.NaN, name: "전체", active: true, key: "all" },
          ...list,
        ]);
      } catch (e: any) {
        console.error(e);
        setCatErr(
          e?.response?.data?.message ?? "카테고리를 불러오지 못했습니다."
        );
      } finally {
        setCatLoading(false);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const fetchList = async (reset: boolean) => {
      try {
        setLoading(true);
        setErr(null);

        const { result } = await getMyPosts({ page, size, categoryId });
        setHasNext(result.length >= size); // pageInfo 없어서 임시 추정

        if (page === 0 && result[0]) {
          console.log(
            "[MyPosts] dto keys:",
            Object.keys(result[0] as unknown as Record<string, unknown>)
          );
        }

        const mapped: MyPostCardVM[] = result.map(mapToCardVM);
        setCards((prev: MyPostCardVM[]) =>
          reset ? mapped : [...prev, ...mapped]
        );
      } catch (e: any) {
        console.error(e);
        setErr(e?.response?.data?.message ?? "목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchList(page === 0);
  }, [page, categoryId, tabStatus, size]);

  const categoryNames = useMemo(
    () => categories.map((c) => c.name),
    [categories]
  );
  const currentCategoryName = useMemo(() => {
    if (categoryId === undefined) return "전체";
    const found = categories.find((c) => c.id === categoryId);
    return found?.name ?? "전체";
  }, [categoryId, categories]);

  // 카테고리 변경
  const onChangeCategory = (name: string) => {
    const found = categories.find((c) => c.name === name);
    setCategoryId(found?.id);
    setPage(0);
    setCards([]);
  };

  return (
    <section className="space-y-2 px-4 pt-2 pb-4">
      <div className="flex items-center gap-[6px]">
        <MyStatusTab value={tabStatus} onChange={setTabStatus} />

        <CategoryDropdown
          categories={categoryNames}
          value={currentCategoryName}
          onChange={onChangeCategory}
        />
      </div>

      {/* 카테고리 로딩,에러 */}
      {catLoading && <div className="text-gray-500">카테고리 불러오는 중…</div>}
      {catErr && <div className="text-red-500">{catErr}</div>}
      {err && <div className="text-red-500">{err}</div>}

      {/* 게시물 목록 */}
      <div className="flex flex-col gap-[12px]">
        {cards.map((p: MyPostCardVM) => (
          <PostCard
            key={p.id}
            postId={p.id}
            title={p.title}
            content={p.content}
            likes={p.likes}
            comments={p.comments}
            views={p.views}
            category={p.category}
            imageUrl={p.imageUrl}
          />
        ))}

        {loading && <div className="text-center py-4">불러오는 중...</div>}
      </div>

      {/* 더보기
      {!loading && hasNext && (
        <div className="flex justify-center">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 rounded bg-[#B3E378] font-semibold"
          >
            더보기
          </button>
        </div>
      )} */}

      {/* 결과 없음 */}
      {!loading && cards.length === 0 && !err && (
        <div className="text-center text-gray-500 py-10">
          작성한 실패담이 없습니다.
        </div>
      )}
    </section>
  );
}

/** 서버 DTO → PostCard용 VM 안전 매핑(키 확정 전 임시) */
function mapToCardVM(d: MyPostDto): MyPostCardVM {
  const id = (d as any).postId ?? (d as any).id;
  const title = (d as any).title ?? "(제목 없음)";
  const content = (d as any).content ?? (d as any).contentPreview ?? "";
  const imageUrl = (d as any).thumbnailUrl ?? (d as any).imageUrl ?? undefined;

  return {
    id,
    title,
    content,
    imageUrl,
    likes: (d as any).likes ?? (d as any).likeCount ?? 0,
    comments: (d as any).comments ?? (d as any).commentCount ?? 0,
    views: (d as any).views ?? (d as any).viewCount ?? 0,
    category: (d as any).categoryName ?? "",
  };
}
