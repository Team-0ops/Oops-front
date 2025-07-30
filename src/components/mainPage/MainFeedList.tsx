import useGetPostListIn from "../../hooks/MainPage/UseGetPostList";
import BestFailerList from "./BestFailerList";
import CategoryList from "./CategoryList";
import FavoritesCategoryList from "./FavoritesCategoryList";

const MainFeedList = () => {
  const { posts, loading, error } = useGetPostListIn();

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>{error}</div>;

  const bestPosts = posts?.result?.[0]?.posts || [];
  const favoritesPosts = posts?.result?.[1]?.posts || [];
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center gap-[36px]">
        <BestFailerList
          bestPosts={bestPosts} // posts prop 전달
        />
        <FavoritesCategoryList
          favoritesPosts={favoritesPosts} // posts prop 전달
        />
        <CategoryList />
      </div>
    </>
  );
};

export default MainFeedList;
