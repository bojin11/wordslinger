export type Language = "German" | "Spanish" | "French" | null;

export type LeaderboardEntry = {
  username: string;
  rank: number;
  avatar_url: string;
  language: Language;
};
