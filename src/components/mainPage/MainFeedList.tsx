import { useAuth } from "../../context/AuthContext";
import useGetAuthPostListInMain from "../../hooks/MainPage/useGetAuthPostList";
import useGetGuestPostListInMain from "../../hooks/MainPage/useGetGuestPostList";
import useGetPostLIstCategory from "../../hooks/MainPage/useGetPostListCategory";
import BestFailerList from "./BestFailerList";
import CategoryList from "./CategoryList";
import FavoritesCategoryList from "./FavoritesCategoryList";

const MainFeedList = () => {
  const { accessToken } = useAuth();
  const isAuthed = !!accessToken;

  // 훅은 항상 호출
  const {
    posts: authedPosts,
    mainLoading: authedLoading,
    mainError: authedError,
  } = useGetAuthPostListInMain();

  const {
    posts: guestPosts, // ← useGetGuestPostListInMain이 posts를 반환하도록 맞춰주세요 (post → posts 오타 주의)
    mainLoading: guestLoading,
    mainError: guestError,
  } = useGetGuestPostListInMain();

  const { categoryPosts, categoryLoading, categoryError } =
    useGetPostLIstCategory();

  const posts = isAuthed ? authedPosts : guestPosts;
  const mainLoading = isAuthed ? authedLoading : guestLoading;
  const mainError = isAuthed ? authedError : guestError;

  if (mainLoading || categoryLoading) return <div>로딩중...</div>;
  if (mainError || categoryError) return <div>에러남.</div>;

  const bestPosts = posts?.result?.[0]?.posts || [];
  const favoritesPosts = posts?.result?.[1]?.posts || [];
  const categoryPostsList = categoryPosts?.result?.posts || [];

  return (
    <>
      <div className="flex flex-col w-full justify-center items-center gap-[36px]">
        <BestFailerList
          bestPosts={bestPosts} // posts prop 전달
        />
        <FavoritesCategoryList
          favoritesPosts={favoritesPosts} // posts prop 전달
        />
        <CategoryList categoryPosts={categoryPostsList} />
      </div>
    </>
  );
};

export default MainFeedList;
