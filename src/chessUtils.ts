function getPieceType(piece: string) {
  const pieceMap: Record<string, string> = {
    p: 'pawn',
    b: 'bishop',
    n: 'knight',
    k: 'king',
    r: 'rook',
    q: 'queen',
  };

  return pieceMap[piece.toLowerCase()] || '';
}

function pieceToString(pieceChar: string) {
  let piece = pieceChar.toUpperCase() === pieceChar ? 'white' : 'black';
  piece += '-' + getPieceType(pieceChar.toLowerCase());
  return piece;
}

export function translateMove(move: string, grid: string[][], turn: string) {
  if (!move) {
    return move;
  }

  let translatedMove = '';
  let [beg, end] = [move.slice(0, 2), move.slice(2, 4)];

  let colBeg = beg[0].charCodeAt(0) - 'a'.charCodeAt(0);
  let rowBeg = parseInt(beg[1]) - 1;

  let colEnd = end[0].charCodeAt(0) - 'a'.charCodeAt(0);
  let rowEnd = parseInt(end[1]) - 1;

  if (turn === 'black') {
    colBeg = 7 - colBeg;
    colEnd = 7 - colEnd;
  } else {
    rowBeg = 7 - rowBeg;
    rowEnd = 7 - rowEnd;
  }
  let start = grid[rowBeg][colBeg].split('-')[1];
  if (start === 'knight') translatedMove += 'N';
  else if (start !== 'pawn') translatedMove += start[0].toUpperCase();

  let dest = grid[rowEnd][colEnd];

  if (dest.length) translatedMove += 'x';

  translatedMove += end;

  return translatedMove;
}

export default function FENToMatrix(fen: string) {
  let grid: string[][] = [];
  let parts = fen.split(' ');
  const turn: string = parts[1][0] === 'w' ? 'white' : 'black';
  const rows: string[] = parts[0].split('/');

  for (let row of rows) {
    let currentRow = [];
    for (let character of row) {
      if (!isNaN(Number(character))) {
        for (let i = 0; i < Number(character); i++) {
          currentRow.push('');
        }
      } else {
        currentRow.push(pieceToString(character));
      }
    }

    if (turn === 'black') {
      currentRow.reverse();
    }

    grid.push(currentRow);
  }

  if (turn === 'black') {
    grid.reverse();
  }

  // grid[0][0] corresponds to the a1 square if turn is white, else h8.

  return { turn: turn, grid: grid };
}
