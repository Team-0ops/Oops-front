import type { BestFailers } from "./post";

export type ResponseWikiSearch = {
  keyword: string;
  summary: string;
  aiTip: string;
  postCount: number;
  bestFailers: BestFailers[];
};
