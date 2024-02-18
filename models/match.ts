export interface Match {
  matchId: number;
  profileId_1: number;
  profileId_2: number;
  like_1: boolean;
  like_2: boolean;
}

export interface MatchRequestBody {
  userProfileId: number;
  targetProfileId: number;
  like: boolean;
}
