export class CommentWithUserResponseData {
    constructor(
      public id: number,             // 댓글 ID
      public username: string,        // 사용자 이름
      public commentContent: string   // 
    ) {}
}