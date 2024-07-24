export interface Joke {
  id: number;
  content: string;
  type: string;
  approved: boolean;
}

export interface JokeType {
    id: string;
  type: string;
}
