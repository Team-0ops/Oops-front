import { useAuth } from "../../context/AuthContext";
import useGetAuthPostListInMain from "../../hooks/MainPage/useGetAuthPostList";
import useGetGuestPostListInMain from "../../hooks/MainPage/useGetGuestPostList";
import useGetPostLIstCategory from "../../hooks/MainPage/useGetPostListCategory";
import BestFailerList from "./BestFailerList";
import CategoryList from "./CategoryList";
import FavoritesCategoryList from "./FavoritesCategoryList";

/*
 Main FeedList 컴포넌트
 - 로그인 전 : bestFailerList, categoryList 
 - 로그인 후 : bestFailerList, favoritesCategoryList, categoryList

 useGetAuthPostListInMain : 로그인 한 유저의 메인피드 값
 useGetGuestPostListInMain : 로그인 안한 유저의 메인피드 값
 useGetPostLIstCategory : 카테고리 리스트 값 (로그인 전후 같음)
*/

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
    posts: guestPosts,
    mainLoading: guestLoading,
    mainError: guestError,
  } = useGetGuestPostListInMain();

  const { categoryPosts, categoryLoading, categoryError } =
    useGetPostLIstCategory();

  //어떤 훅에서 데이터 값을 받아올지 isAuted를 통해 결정
  const posts = isAuthed ? authedPosts : guestPosts;
  const mainLoading = isAuthed ? authedLoading : guestLoading;
  const mainError = isAuthed ? authedError : guestError;

  // 로딩 및 에러 -> 이후 컴포넌트 나오면 수정 예정
  if (mainLoading || categoryLoading) return <div>로딩중...</div>;
  if (mainError || categoryError) return <div>에러남.</div>;

  // posts 데이터 구조에 맞게 추출
  const bestPosts = posts?.result?.[0]?.posts || [];
  const favoritesPosts = posts?.result?.[1]?.posts || [];
  const categoryPostsList = categoryPosts?.result?.posts || [];

  return (
    <>
      <div
        key={isAuthed ? "auth" : "guest"}
        className="flex flex-col w-full justify-center items-center gap-[36px]"
      >
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
