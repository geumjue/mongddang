import { CommentWithUserResponseData } from "./comment-with-user-response-data.interface";

export interface CommentPaginatedResponse{
    comments: CommentWithUserResponseData[];
    totalCount: number;
}