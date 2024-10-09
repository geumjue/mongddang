export interface MovieWithUserResponseData {
    id: number;
    title: string;
    directorName: string;
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
    actor: string;
    user: {
      id: number;
      username: string;
    };
  }
  