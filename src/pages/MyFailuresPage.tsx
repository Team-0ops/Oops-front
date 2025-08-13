import { useEffect, useMemo, useState } from "react";
import PostCard from "../components/common/PostCard";
import MyStatusTab from "../components/myPage/MyStatusTab";
import type { MyStatus } from "../components/myPage/MyStatusTab";
import CategoryDropdown from "../components/myPage/CategoryDropdown";
import type { MyPostCardVM, MyPostDto, MyPostStatus } from "../types/mypage";
import { getMyPosts } from "../apis/mypageApi";
import { getAllCategories } from "../apis/categoryApi";

type CategoryVM = {
  id: number;
  name: string;
  active: boolean;
  key: string;
};

function statusToParam(s: MyStatus): MyPostStatus {
  switch (s) {
    case "oops":
      return "OOPS";
    case "doing":
      return "OVERCOMING";
    case "done":
      return "OVERCOME";
  }
}

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

  const handleChangeTab = (next: MyStatus) => {
    setTabStatus(next);
    setPage(0);
    setCards([]);
    setHasNext(true);
  };

  console.log(hasNext);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCatLoading(true);
        setCatErr(null);
        const list = await getAllCategories();
        setCategories([
          { id: -1, name: "전체", active: true, key: "all" },
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
    const controller = new AbortController();
    if (page > 0 && !hasNext) {
      return () => controller.abort();
    }
    const fetchList = async (reset: boolean) => {
      try {
        setLoading(true);
        setErr(null);

        const situation = statusToParam(tabStatus);
        const params: any = { page, size, situation };

        if (categoryId !== undefined && Number.isFinite(categoryId)) {
          params.categoryId = categoryId;
        }
        const { result, pageInfo }: any = await getMyPosts(params);

        console.log("[MyPosts] request params:", params);
        let next = Array.isArray(result) && result.length >= size;
        if (pageInfo && typeof pageInfo.hasNext === "boolean") {
          next = pageInfo.hasNext;
        }
        setHasNext(next);

        if (pageInfo && typeof pageInfo.hasNext === "boolean") {
          setHasNext(pageInfo.hasNext);
        } else {
          setHasNext(Array.isArray(result) && result.length >= size);
        }

        if (page === 0 && result[0]) {
          console.log(
            "[MyPosts] dto keys:",
            Object.keys(result[0] as unknown as Record<string, unknown>)
          );
        }

        const mapped: MyPostCardVM[] = result.map(mapToCardVM);
        setCards((prev) => (reset ? mapped : [...prev, ...mapped]));
      } catch (e: any) {
        if (e?.name === "CanceledError" || e?.code === "ERR_CANCELED") return; // ✅ 취소 시 무시
        console.error(e);
        setErr(e?.response?.data?.message ?? "목록을 불러오지 못했습니다.");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchList(page === 0);
    return () => controller.abort();
  }, [page, categoryId, tabStatus, size, hasNext]);

  const categoryNames = useMemo(
    () => [
      "전체",
      ...categories.filter((c) => c.key !== "all").map((c) => c.name),
    ],
    [categories]
  );
  const currentCategoryName = useMemo(() => {
    if (categoryId === undefined) return "전체";
    const found = categories.find((c) => c.id === categoryId);
    return found?.name ?? "전체";
  }, [categoryId, categories]);

  const displayCards = useMemo(() => {
    const target = statusToParam(tabStatus);
    return cards.filter((c) => {
      const s = c.status as MyPostStatus | undefined;
      return s ? s === target : true;
    });
  }, [cards, tabStatus]);

  // 카테고리 변경
  const onChangeCategory = (name: string) => {
    if (name === "전체") {
      setCategoryId(undefined);
    } else {
      const found = categories.find((c) => c.name === name);
      setCategoryId(found?.id);
    }
    setPage(0);
    setCards([]);
    setHasNext(true);
  };

  return (
    <section className="space-y-2 px-4 pt-2 pb-4">
      <div className="flex items-center gap-[6px]">
        <MyStatusTab value={tabStatus} onChange={handleChangeTab} />

        <CategoryDropdown
          categories={categoryNames}
          value={currentCategoryName}
          onChange={onChangeCategory}
        />
      </div>

      {catLoading && <div className="text-gray-500">카테고리 불러오는 중…</div>}
      {catErr && <div className="text-red-500">{catErr}</div>}
      {err && <div className="text-red-500">{err}</div>}

      {/* 게시물 목록 */}
      <div className="flex flex-col gap-[12px]">
        {displayCards.map((p: MyPostCardVM) => (
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

      {!loading && hasNext && (
        <div className="flex justify-center py-4">
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            className="rounded border px-4 py-2 text-sm"
          >
            더 보기
          </button>
        </div>
      )}

      {!loading && !hasNext && displayCards.length > 0 && (
        <div className="text-center text-gray-400 py-4">
          {/* 마지막 페이지입니다. */}
        </div>
      )}

      {/* 결과 없음 */}
      {!loading && displayCards.length === 0 && !err && (
        <div className="text-center text-gray-500 py-10">
          작성한 실패담이 없습니다.
        </div>
      )}
    </section>
  );
}

function mapToCardVM(d: MyPostDto): MyPostCardVM {
  const id = (d as any).postId ?? (d as any).id;
  const title = (d as any).title ?? "(제목 없음)";
  const content = (d as any).content ?? (d as any).contentPreview ?? "";
  const imageUrl = (d as any).thumbnailUrl ?? (d as any).imageUrl ?? undefined;

  const status =
    (d as any).status ??
    (d as any).situation ??
    (d as any).situationType ??
    undefined;

  const category =
    (d as any).categoryName ?? (d as any).categoryOrTopicName ?? "";
  const views =
    (d as any).views ?? (d as any).viewCount ?? (d as any).watching ?? 0;

  return {
    id,
    title,
    content,
    imageUrl,
    likes: (d as any).likes ?? (d as any).likeCount ?? 0,
    comments: (d as any).comments ?? (d as any).commentCount ?? 0,
    views,
    category,
    status,
  };
}
