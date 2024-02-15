export interface ProfilePassionMatchList {
  profileId: number;
  matchList: Array<ProfilePassionMatch>;
}

export interface ProfilePassionMatch {
  profileId: number;
  similarityScore: number;
}
