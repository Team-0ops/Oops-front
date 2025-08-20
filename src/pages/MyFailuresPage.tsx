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

function nonEmpty(x?: string | null): string | undefined {
  if (!x) return undefined;
  const s = String(x).trim();
  return s ? s : undefined;
}

function firstFromArray(arr: any[]): string | undefined {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;
  const first = arr[0];
  if (!first) return undefined;
  if (typeof first === "string") return first;
  if (typeof first === "object") {
    return (
      nonEmpty(first.url) ||
      nonEmpty(first.imageUrl) ||
      nonEmpty(first.thumbnailUrl) ||
      nonEmpty(first.src) ||
      undefined
    );
  }
  return undefined;
}

function pickImage(d: any): string | undefined {
  return (
    nonEmpty(d?.image) ||
    nonEmpty(d?.thumbnailUrl) ||
    nonEmpty(d?.imageUrl) ||
    (Array.isArray(d?.imageUrls) && nonEmpty(firstFromArray(d.imageUrls))) ||
    (Array.isArray(d?.images) && nonEmpty(firstFromArray(d.images))) ||
    undefined
  );
}

export default function MyFailuresPage() {
  const [tabStatus, setTabStatus] = useState<MyStatus>("oops");
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [categories, setCategories] = useState<CategoryVM[]>([]);
  const [cards, setCards] = useState<MyPostCardVM[]>([]);
  const [page, setPage] = useState(0);
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
    if (page > 0 && !hasNext) return;

    const fetchList = async () => {
      try {
        setLoading(true);
        setErr(null);

        const situation = statusToParam(tabStatus);
        const params: any = { page, size, situation };

        if (categoryId !== undefined && Number.isFinite(categoryId)) {
          params.categoryId = categoryId;
        }
        const { result, pageInfo }: any = await getMyPosts(params);
        const next =
          typeof pageInfo?.hasNext === "boolean"
            ? pageInfo.hasNext
            : Array.isArray(result) && result.length >= size;
        setHasNext(next);

        const mapped: MyPostCardVM[] = result.map(mapToCardVM);
        setCards((prev) => (page === 0 ? mapped : [...prev, ...mapped]));
      } catch (e: any) {
        if (e?.name === "CanceledError" || e?.code === "ERR_CANCELED") return;
        console.error(e);
        setErr(e?.response?.data?.message ?? "목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchList();
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

  const displayCards = useMemo(() => {
    const target = statusToParam(tabStatus);
    return cards.filter((c) => {
      const s = c.status as MyPostStatus | undefined;
      return s ? s === target : true;
    });
  }, [cards, tabStatus]);

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

      <div className="flex flex-col gap-[12px]">
        {displayCards.map((p: MyPostCardVM) => {
          const img =
            pickImage((p as any).raw ?? p) ?? nonEmpty((p as any).imageUrl);

          return (
            <div
              key={p.id}
              className="cursor-pointer transition hover:scale-[1.01] hover:shadow-md rounded-lg"
            >
              <PostCard
                postId={p.id}
                title={p.title}
                content={p.content}
                likes={p.likes}
                comments={p.comments}
                views={p.views}
                category={p.category}
                imageUrl={img}
              />
            </div>
          );
        })}

        {loading && <div className="text-center py-4">불러오는 중...</div>}
      </div>

      {!loading && !hasNext && displayCards.length > 0 && (
        <div className="text-center text-gray-400 py-4"></div>
      )}

      {!loading && displayCards.length === 0 && !err && (
        <div className="text-center text-gray-500 py-10">
          작성한 실패담이 없습니다.
        </div>
      )}
    </section>
  );
}

function mapToCardVM(d: MyPostDto): MyPostCardVM {
  const anyD: any = d ?? {};
  const id = anyD.postId ?? anyD.id;
  const title = anyD.title ?? "(제목 없음)";
  const content = anyD.content ?? anyD.contentPreview ?? "";
  const imageUrl = pickImage(anyD);
  const status: MyPostStatus | undefined =
    anyD.status ?? anyD.situation ?? anyD.situationType ?? undefined;

  const category = anyD.categoryName ?? anyD.categoryOrTopicName ?? "";
  const views = anyD.views ?? anyD.viewCount ?? anyD.watching ?? 0;

  return {
    id,
    title,
    content,
    imageUrl,
    likes: anyD.likes ?? anyD.likeCount ?? 0,
    comments: anyD.comments ?? anyD.commentCount ?? 0,
    views,
    category,
    status,
    ...({ raw: d } as any),
  };
}
