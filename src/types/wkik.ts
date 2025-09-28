import type { CommonResponse } from "./common";
import type { BestFailers } from "./post";

export type ResponseWikiSearch = CommonResponse<wikiTips>;

type wiki = {
  keyword: string;
  summary: string;
  aiTip: string;
  postCount: number;
  modifiedAt: string;
};

export type wikiTips = {
  keyword: string;
  summary: string;
  aiTip: string;
  postCount: number;
  bestFailers: BestFailers[];
};

export type ResponseCurrentWiki = CommonResponse<wiki[]>;
