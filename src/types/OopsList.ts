export type OopsPost = {
    id: string;
    status: "웁스 중" | "극복 중" | "극복 완료";
    title: string;
    content: string;
    images: string[];
    category: string;
    commentType: string[];
    parentId?: string; // 이전 단계 게시글 id (웁스중→극복중, 극복중→극복완료)
};