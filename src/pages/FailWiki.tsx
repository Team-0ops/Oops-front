import { useState } from "react";
import WikiCategoryCard from "../components/FailWiki/WikiCategoryCard";
import WikiHead from "../components/FailWiki/WikiHead";
import WikiInput from "../components/FailWiki/WikiInput";
import WikiKeyword from "../components/FailWiki/WikiKeyword";
import WikiBestFailerList from "../components/FailWiki/WikiBestFailerList";
import WikiResultCard from "../components/FailWiki/WIkiResultCard";
import { getFailWikiResult } from "../apis/wiki";
import type { ResponseWikiSearch } from "../types/wkik";

const FailWiki = () => {
  const [inputValue, setInputValue] = useState("");
  const [resultList, setResultList] = useState<ResponseWikiSearch | null>(null);

  const handleEnterSubmit = async (value: string) => {
    setInputValue(value);
    try {
      if (value.trim() !== "") {
        const data = await getFailWikiResult({ keyword: value });
        setResultList(data);
      }
    } catch (error) {
      console.log("실패위키 검색 실패", error);
    }
  };

  const bestFailerList = resultList?.bestFailers;
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
              <div>{/*빈 공간*/}</div>
              <div className="flex flex-col w-full gap-[50px]">
                <div className="flex flex-col w-full items-center justify-center gap-[20px]">
                  <WikiResultCard
                    keyword={inputValue}
                    summary={resultList?.summary || ""}
                    aiTip={resultList?.aiTip || ""}
                  />
                  <div className="body5 text-[#999] px-[13px] py-[3px] rounded-[20px] border-[1px] border-[#B3B3B3] itmes-center ">
                    관련 실패담 보러가기
                  </div>
                </div>
                <WikiBestFailerList bestFailers={bestFailerList ?? []} />
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center gap-[32px]">
              <div>
                <WikiKeyword
                  onSelect={(keyword) => {
                    setInputValue(keyword);
                    handleEnterSubmit(keyword);
                  }}
                />
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
