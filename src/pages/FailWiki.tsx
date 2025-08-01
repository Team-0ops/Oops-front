import { useState } from "react";
import WikiCategoryCard from "../components/FailWiki/WikiCategoryCard";
import WikiHead from "../components/FailWiki/WikiHead";
import WikiInput from "../components/FailWiki/WikiInput";
import WikiKeyword from "../components/FailWiki/WikiKeyword";
import WikiResult from "../components/FailWiki/WikiResult";

const FailWiki = () => {
  const [inputValue, setInputValue] = useState("");

  const handleEnterSubmit = (value: string) => {
    setInputValue(value);
  };

  return (
    <>
      <div className="flex flex-col justify-center gap-[20px]">
        <div>{/*빈 공간*/}</div>
        <div>
          <WikiHead />
        </div>
        <div className="flex flex-col justify-center gap-[20px] px-[18px]">
          <div>
            <WikiInput onSubmit={handleEnterSubmit} />
          </div>
          {inputValue ? (
            <>
              <div>
                <div>{/*빈 공간*/}</div>
                <WikiResult />
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center gap-[32px]">
              <div>
                <WikiKeyword />
              </div>
              <div className="grid grid-cols-2 justify-items-start gap-y-[10px]">
                <div className="justify-self-start">
                  <WikiCategoryCard />
                </div>
                <div className="justify-self-end">
                  <WikiCategoryCard />
                </div>
                <div className="justify-self-start">
                  <WikiCategoryCard />
                </div>
                <div className="justify-self-end">
                  <WikiCategoryCard />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FailWiki;
