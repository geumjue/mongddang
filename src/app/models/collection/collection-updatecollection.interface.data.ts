interface UpdateCollectionRequestData {
  name: string;
  movieIds: number[];
  userId: number[];
}

interface UpdateCollectionResponseData {
  id: number;
  content: string;
  like: number;
  collectionId: number;
  userId: number;
  createdAt: Date;
}

export {
  UpdateCollectionRequestData,
  UpdateCollectionResponseData
}
