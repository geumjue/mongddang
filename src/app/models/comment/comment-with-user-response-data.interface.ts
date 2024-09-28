export interface CommentWithUserResponseData{
    id: number;
    title: string;
    contents: string;
    author:string;
    createdAt: Date;
    updateAt: Date;
    user:{
        id: number;
        username: string;
    }
}