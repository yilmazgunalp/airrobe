export type Column =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O";

export type Row = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
type Point = [Column, Row];

export type Play = {
  start: Point;
  direction: "right" | "down";
  word: string;
};
export type Slot = {
  cells: string;
  start: Point;
  end: Point;
}
