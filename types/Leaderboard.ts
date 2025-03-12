export type Language = "German" | "Spanish" | "French" | null;

export type LeaderboardEntry = {
  user_id: number;
  rank: number;
  avatar_url: string;
  language: Language;
};
