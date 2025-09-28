import type { CommonResponse } from "./common";

export type BannerResponse = CommonResponse<{
  lastTopicInfo: bannerData | boolean;
  currentTopicInfo: bannerData | boolean;
  bestUser: bannerData | boolean;
}>;

export type bannerData = {
  informNum: number;
  topicId: number;
  topicName: string;
  topicIcon: string;
};
