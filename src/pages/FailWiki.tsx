import WikiCategoryCard from "../components/FailWiki/WikiCategoryCard";
import WikiHead from "../components/FailWiki/WikiHead";
import WikiInput from "../components/FailWiki/WikiInput";
import WikiKeyword from "../components/FailWiki/WikiKeyword";

const FailWiki = () => {
  return (
    <>
      <div className="flex flex-col justify-center gap-[20px]">
        <div>{/*빈 공간*/}</div>
        <div>
          <WikiHead />
        </div>
        <div className="flex flex-col justify-center gap-[20px] px-[18px]">
          <div>
            <WikiInput />
          </div>
          <div className="flex flex-col justify-center gap-[32px]">
            <div>
              <WikiKeyword />
            </div>
            <div className="grid grid-cols-2 justify-items-center gap-y-[10px] ">
              <WikiCategoryCard />
              <WikiCategoryCard />
              <WikiCategoryCard />
              <WikiCategoryCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FailWiki;
