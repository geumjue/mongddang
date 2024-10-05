export interface MovieWithAttachmentUserResponseData {
  id: number;
  title: string;
  directorName: string;
  actor: string;
  genre: string;
  contents: string;
  posterUrl: string;
  stillUrl: string;
  favorite: number;
  runningTime: number;
  nation: string;
  company: string;
  ratedYn: boolean;
  type: string;
  releasedAt: Date | null; // 여기에 nullable로 추가
  createdAt: Date;
  modifiedAt: Date;
}
