export interface CommentListResponseData {
  userId: number;            // 예시로 작성된 속성
  commentContent: string;    // 댓글 내용
  username: string;          // 사용자 이름
  movieId:number;
  movieTitle?: string;       // 영화 제목 (optional)
  favoriteCount?: number;    // 좋아요 수 (optional)
  dislikeCount?: number;     // 싫어요 수 (optional)
  commentId: number;
}
