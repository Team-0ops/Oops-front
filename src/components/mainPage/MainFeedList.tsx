import useGetPostListInMain from "../../hooks/MainPage/useGetPostList";
import useGetPostLIstCategory from "../../hooks/MainPage/useGetPostListCategory";
import BestFailerList from "./BestFailerList";
import CategoryList from "./CategoryList";
import FavoritesCategoryList from "./FavoritesCategoryList";

const MainFeedList = () => {
  const { posts, mainLoading, mainError } = useGetPostListInMain();
  const { categoryPosts, categoryLoading, categoryError } =
    useGetPostLIstCategory();

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
