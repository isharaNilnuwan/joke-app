export interface Joke {
  id: number;
  content: string;
  type: string;
  approved: boolean;
}

export interface JokeType {
  type: string;
}
