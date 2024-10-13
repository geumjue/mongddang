interface PostCollectionRequestData {
  name: string;
  movieIds: number[];
  userIds: number[];
}

interface PostCollectionResponseData {
  id: number;
  content: string;
  like: number;
  collectionId: number;
  userId: number;
  createdAt: Date;
}

export {
  PostCollectionRequestData,
  PostCollectionResponseData
}
