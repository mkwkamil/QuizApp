export interface AddCommentPayload {
    quizId: number;
    content: string;
}

export interface CommentDto {
    id: number;
    author: string;
    content: string;
    createdAt: string;
}