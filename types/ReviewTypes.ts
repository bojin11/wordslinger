export interface ReviewData {
  wordsToReview: {
    French: Array<string[]> | [];
    German: Array<string[]> | [];
    Spanish: Array<string[]> | [];
  };
}

export type ReviewCardType = {
  language: "French" | "German" | "Spanish";
  wordList: Array<string[]> | [];
};

export type LanguageAndWords = [
  "French" | "German" | "Spanish",
  string[][] | []
][];
