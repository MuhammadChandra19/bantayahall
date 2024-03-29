
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
  liveId: string;
  title: string;
  type: LiveType;
  description: string;
}

export interface LiveStreamAPIModel extends LiveStreamModel {
  startAt: string;
  finishedAt: string;
  isPlaying: boolean;
  thumbnails?: string;
}

export interface IMessageClient {
  name: string;
  room: string;
  message: string;
  date: string;
}
