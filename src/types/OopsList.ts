export type OopsPost = {
    id: string;
    status: "웁스 중" | "극복 중" | "극복 완료";
    title: string;
    content: string;
    images: string[];
    category: string;
    commentType: string[];
    overcomeContent?: string; // 극복 중 내용
    completeContent?: string; // 극복 완료 내용
};