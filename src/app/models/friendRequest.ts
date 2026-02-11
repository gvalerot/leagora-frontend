import { User } from './user';

export interface FriendRequest {
  id: number;
  createdAt: Date;
  sender: User;
}
