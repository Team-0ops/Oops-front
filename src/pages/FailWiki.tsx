import { useState } from "react";
import WikiCategoryCard from "../components/FailWiki/WikiCategoryCard";
import WikiHead from "../components/FailWiki/WikiHead";
import WikiInput from "../components/FailWiki/WikiInput";
import WikiKeyword from "../components/FailWiki/WikiKeyword";
import WikiBestFailerList from "../components/FailWiki/WikiBestFailerList";
import WikiResultCard from "../components/FailWiki/WIkiResultCard";
import { getFailWikiResult } from "../apis/wiki";
import type { ResponseWikiSearch } from "../types/wkik";
import { categoryMap } from "../types/common";
import { Link } from "react-router-dom";
import useGetFailWiki from "../hooks/WikiPage/useGetFailWiki";

const FailWiki = () => {
  const { wiki, loading, error } = useGetFailWiki();
  const [inputValue, setInputValue] = useState("");
  const [resultList, setResultList] = useState<ResponseWikiSearch | null>(null);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러남.</div>;

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

  const navKey = Object.keys(categoryMap).find(
    (key) => categoryMap[key] === inputValue
  );

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
                    summary={resultList?.summary || null}
                    aiTip={resultList?.aiTip || null}
                  />
                  <Link
                    to={navKey ? `/category-feed/${navKey}` : location.pathname}
                    className={`body5 px-[13px] py-[3px] rounded-[20px] border border-[#B3B3B3]
          ${navKey ? "text-[#999] hover:underline" : "cursor-not-allowed"}`}
                    aria-disabled={!navKey}
                  >
                    관련 실패담 보러가기
                  </Link>
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
                {wiki?.slice(0, 4).map((item, idx) => (
                  <div
                    key={idx}
                    className={
                      idx % 2 === 0 ? "justify-self-start" : "justify-self-end"
                    }
                  >
                    <WikiCategoryCard
                      keyword={item.keyword}
                      aiTip={item.aiTip}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FailWiki;
