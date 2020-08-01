
export interface UserModel {
  username: string;
  userId: string;
}

export interface AddAudience {
  liveId: string;
  user: UserModel;
}

export type LiveType = 'public' | 'private';

export interface LiveStreamModel {
  userId: string;
  socketId: string;
  liveId: string;
  title: string;
  type: LiveType;
  thumbnails?: string;
  stream: MediaStream;
  audience?: Array<UserModel>
}