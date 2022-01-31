import { InvalidPlay } from "./Error";

export class Player {
  rack: string[];
  name: string;

  constructor(name: string) {
    this.rack = [];
    this.name = name;
  }

  replenish(tiles: string[]) {
    this.rack = this.rack.concat(tiles);
  }
  displayRack() {
    return this.rack.join(",");
  }

  play(word: string) {
    const letters: string[] = [];
    Array.from(word).forEach((letter) => {
      const index = this.rack.indexOf(letter);
      if (index > -1) {
        letters.push(letter);
      } else {
        throw new InvalidPlay("You dont have all the letters");
      }
    });
    for (let letter of letters.values()) {
      const index = this.rack.indexOf(letter);
      this.rack.splice(index, 1);
    }
  }
}
