import { formatDiagnosticsWithColorAndContext } from "typescript";
import { InvalidPlay } from "./Error";
import { PlayScore } from "./PlayScore";
import { Column, Play, Slot , Row} from "./utils";

type Board = string[];
export const board: Board = new Array(15).fill("-".repeat(15));

const columns: Column[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
];
export const printBoard = (board: Board) => {
  const columnLabels = [
    "  ",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
  ];

  const rowLabels = [
    "1 ",
    "2 ",
    "3 ",
    "4 ",
    "5 ",
    "6 ",
    "7 ",
    "8 ",
    "9 ",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
  ];
  const boardWithRowLabels = board.map((row, i) =>
    [rowLabels[i]]
      .concat(
        Array.from(row)
          .map((cell, index) => {
            if (index === 0) return cell === "-" ? "|_|" : `|${cell}|`;
            return cell === "-" ? "_|" : `${cell}|`;
          })
          .join("")
      )
      .join("")
  );

  const boardWithLabels = [columnLabels.join(" ")]
    .concat(boardWithRowLabels)
    .join("\n");
  console.log(boardWithLabels);
};

export const updateBoard = (board: Board, play: Play): Board => {
  if (play.direction === "right") {
    const row = board[play.start[1] - 1];
    const column = columns.indexOf(play.start[0]);
    const before = row.substring(0, column);
    const after = row.substring(column + play.word.length);
    const updatedRow = before.concat(play.word.toUpperCase(), after);
    board.splice(play.start[1] - 1, 1, updatedRow);
    return board;
  } else {
    const column = columns.indexOf(play.start[0]);
    const row = play.start[1] - 1;
    const rows = board.slice(row, play.word.length + row);

    const updatedRows = rows.map((row, index) => {
      let rowArray = Array.from(row);
      rowArray[column] = play.word[index].toUpperCase();
      return rowArray.join("");
    });
    board.splice(play.start[1] - 1, play.word.length, ...updatedRows);

    return board;
  }
};

//TODO add subPlay flag paramater
export const getCells = (board: Board, play: Play): Slot => {
  if (play.direction === "right") {
    const row = board[play.start[1] - 1];
    const column = columns.indexOf(play.start[0]);

    const append = !row[column - 1] ? false : row[column - 1] !== "-";
    const prepend = !row[column + play.word.length] ? false  : row[column + play.word.length] !== "-";
    let startIndex = column;
    let endIndex = column + play.word.length;
    if (append) {
      const match = row.substring(0, column).match(/\w+$/);
      startIndex = column - row.substring(0, column).match(/\w+$/)![0].length;
    } else if (prepend) {
      endIndex += row.substring(column +  play.word.length).match(/^\w+/)![0].length;
    }
    return {cells: row.slice(startIndex, endIndex),
    start: [columns[startIndex],play.start[1]],
  end: [columns[endIndex -1], play.start[1]]};
  } else {
    const column = columns.indexOf(play.start[0]);
    const row = play.start[1] - 1;
    const append = !board[row - 1] ? false : board[row - 1][column] !== "-";
    const prepend = !board[row + play.word.length] ? false  : board[row + play.word.length][column] !== "-";

    let startRow = row;
    let endRow = row + play.word.length - 1;
    if (append) {
      let flag = true;
      while (flag) {
         (!board[startRow-1][column] || board[startRow - 1][column] !== "-") ? startRow -= 1 : flag = false
      }
    } else if (prepend) {
      let flag = true;
      while (flag) {
        (!board[endRow + 1] || board[endRow + 1][column] !== "-") ? endRow += 1 : flag = false
     }
     
    }
    let result = '';
    for (let i = startRow; i <= endRow; i++) {
       result += (board[i][column])
    }

    return {cells: result,
      start: [play.start[0],startRow + 1 as Row],
    end: [play.start[0], endRow + 1 as Row]};
  }
};

export const insertWord = (play: Play, cells: string): PlayScore => {
const hasTilesInTheMiddle = cells.match(/^-{1,}[A-Z]+-{1,}$/) !== null;
if(!hasTilesInTheMiddle) {
  if(play.word.length !== Array.from(cells).filter(l => l === '-').length) throw new InvalidPlay("Couldnt inser the word");
  const playScore =  new PlayScore(Array.from(play.word));
  const word = cells.replace(/-{1,}/, play.word);
playScore.addWords([word])
return playScore;

} else {
  const middle = cells.match(/[A-Z]+/)![0]
  const beforeLength = cells.match(/^-{1,}/)![0].length
  const afterLength = cells.match(/-{1,}$/)![0].length;
  const before = play.word.substring(0,beforeLength);
  const after = play.word.substring(beforeLength + middle.length);
  const playScore = new PlayScore(Array.from(Array.from(before + after)));
  playScore.addWords([before+middle+after])
  return playScore;
}
} 

export const getAdditionalWords = (board: Board, play: Play): PlayScore => {
  const slot = getCells(board,play);
  const playScore = insertWord(play,slot.cells);
  const tempBoard = updateBoard(board,play);
  if (play.direction === "down") {
    const tiles = playScore.tilesUsed;
    let index = 0;
     for (let cell of Array.from(slot.cells).values()) {
       if(cell === '-') {
         const subPlay: Play = {start: [play.start[0],(slot.start[1] + index) as Row ], direction: 'right', word: tiles.shift()!}

         const subSlot = getCells(board, subPlay)
         subSlot.cells.match(/^[A-Z]+$/) && playScore.addWords([subSlot.cells])
        }
     
       index +=1;
     }


     return playScore;
  }
  //TODO add right play logic
  return playScore;
}