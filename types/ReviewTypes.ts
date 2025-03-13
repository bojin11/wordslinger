export interface ReviewData {
  wordsToReview: {
    French: Array<string[]> | [];
    German: Array<string[]> | [];
    Spanish: Array<string[]> | [];
  };
}

export type ReviewCardType = {
  language: "french" | "german" | "spanish";
  wordList: Array<string[]> | [];
  userID: any;
};

export type LanguageAndWords = [
  "French" | "German" | "Spanish",
  string[][] | []
][];

export type Mastery = "beginner" | "intermediate" | "master" | null;
