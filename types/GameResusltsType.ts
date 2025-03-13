export type GameResult = {
  room_id: string;
  match_date: string;
  language: string;
  winner: number;
  loser: number;
  english_wordlist: string[];
  non_english_wordlist: string[];
  winner_correct_answers: string[];
  loser_correct_answers: string[];
};
