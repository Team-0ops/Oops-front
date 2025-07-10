import BestFailerList from "./BestFailerList";
import CategoryList from "./CategoryList";
import FavoritesCategoryList from "./FavoritesCategoryList";

const MainFeedList = () => {
    return (
        <>
            <div className="flex flex-col w-full justify-center items-center gap-[36px]">
                <BestFailerList />
                <FavoritesCategoryList />
                <CategoryList />
            </div>
        </>
    )
};

export default MainFeedList;