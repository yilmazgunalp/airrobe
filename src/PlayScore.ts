import { InvalidPlay } from "./Error";

export class PlayScore {
  words: string[];
  tilesUsed: string[];

  constructor(tilesUsed: string[]) {
    this.words = [];
    this.tilesUsed = tilesUsed;
  }

  addWords(words: string[]) {
    this.words = this.words.concat(words);
  }
  

  score() {
  return this.words.join('').length;
}
}