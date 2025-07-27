import EachCategoryCard from "./EachCategoryCard";

const CategoryList = () => {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center gap-[16px]">
        <div className="flex w-full justify-between items-center">
          <h1 className="h2 flex">카테고리 목록</h1>
        </div>
        <EachCategoryCard />
        <EachCategoryCard />
        <EachCategoryCard />
      </div>
    </>
  );
};

export default CategoryList;
