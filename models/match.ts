import { Profile } from './profile';

export interface Match {
  matchId: number;
  profileId_1: number;
  profileId_2: number;
  like_1: boolean;
  like_2: boolean;
  createdBy: string;
  createdDate: Date;
  updatedBy: string;
  updatedDate: Date;
  profile: Profile;
}

export interface MatchRequestBody {
  userProfileId: number;
  targetProfileId: number;
  like: boolean;
}
