const tilesBag: string[] = [];
const ones = "KJXQZ";
const twos = "BFHMVCPYW-";
const threes = "G";
const fours = "DUSL";
const sixes = "TRN";
const eights = "O";
const nines = "IA";
const twelves = "E";
const letters = {
  1: ones,
  2: twos,
  3: threes,
  4: fours,
  6: sixes,
  8: eights,
  9: nines,
  12: twelves,
};

// const tiles = Object.entries(letters).reduce<string[]>((acc, [key, value]) => {
//   return acc.concat(Array.from(value.repeat(+key)));
// }, []);

export class TileBag {
  tiles: string[];

  constructor() {
    this.tiles = Object.entries(letters).reduce<string[]>(
      (acc, [key, value]) => {
        return acc.concat(Array.from(value.repeat(+key)));
      },
      []
    );
  }

  replenish(count: number) {
    let result: string[] = [];
    for (let i = 0; i < count; i++) {
      const tile = this.tiles.splice(
        Math.floor(Math.random() * this.tiles.length),
        1
      );
      result = result.concat(tile);
    }
    return result;
  }
  balance() {
    return this.tiles.length;
  }
}
