import { User } from './user';

export interface League {
  id?: number;
  name?: string;
  logo?: string;
  ownerId?: number;
  urlLogo?: string;
  participants?: User[];
}
