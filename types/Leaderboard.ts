export type Language = "German" | "Spanish" | "French";

export type LeaderboardEntry = {
  username: string;
  rank: number;
  avatar_url: string;
  language: Language;
};
