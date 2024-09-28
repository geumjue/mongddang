export interface CommentAttachmentAndUseResponseData{
    id: number;
    title: string;
    contents: string;
    author: string;
    createAt: Date;
    updatedAt: Date;
    user: {
        id: number;
        username: string;
        movie: string;

    };
    attachments: {
        id: number;
        filename: string;
        path: string;
        url: string;
    }[];
}