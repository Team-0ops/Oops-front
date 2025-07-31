export type OopsPost = {
  title: string;
  content: string;
  situation: "OOPS" | "OVERCOMING" | "OVERCOME";
  categoryId: number;
  topicId: number | null;
  previousPostId?: number | null;
  imageUrls: string[];
  wantedCommentTypes?: ("ADVICE" | "EMPATHY")[];
};
