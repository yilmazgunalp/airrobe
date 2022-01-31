import { printBoard, board, updateBoard, getCells, insertWord, getAdditionalWords } from "./board";
import { TileBag } from "./TileBag";
import { Player } from "./Player";

printBoard(board);

const tileBag = new TileBag();
console.log(tileBag.replenish(7), tileBag.balance());
const player = new Player("P1");
player.replenish(["a", "b", "c", "d", "e", "f"]);
console.log(player.displayRack());
try {
  player.play("back");
} catch (e: any) {
  console.log(e.message);
}
console.log(player.displayRack());
player.play("def");
console.log(player.displayRack());
let newBoarrd = updateBoard(board, {
  start: ["E", 3],
  direction: "right",
  word: "loader",
});

let c = updateBoard(newBoarrd, {
  start: ["C", 3],
  direction: "right",
  word: "un",
});
let d = updateBoard(c, {
  start: ["K", 3],
  direction: "right",
  word: "s",
});
let e = updateBoard(d, {
  start: ["J", 3],
  direction: "down",
  word: "real",
});
let f = updateBoard(e, {
  start: ["J", 1],
  direction: "down",
  word: "un",
});
let g = updateBoard(f, {
  start: ["J", 7],
  direction: "down",
  word: "astic",
});
printBoard(g);

console.log(
  getCells(g, {
    start: ["F", 2],
    direction: "down",
    word: "now",
  })
);

console.log(insertWord({ start: ["F", 2],
direction: "down",
word: "awesome",}, '-WES---'))

let h = updateBoard(f, {
  start: ["H", 2],
  direction: "right",
  word: "fu",
});
printBoard(h);

let i = updateBoard(h, {
  start: ["K", 5],
  direction: "down",
  word: "tow",
});
printBoard(i);

console.log(
  getCells(i, {
    start: ["F", 4],
    direction: "down",
    word: "wl",
  })
);
console.log(
  insertWord({
    start: ["F", 4],
    direction: "down",
    word: "wl",
  }, getCells(i, {
    start: ["F", 4],
    direction: "down",
    word: "wl",
  }).cells)
);

console.log(getAdditionalWords(i, { start: ["K", 10],
direction: "down",
word: "now",}))