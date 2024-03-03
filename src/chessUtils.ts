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

function FENPieceToString(pieceChar: string) {
  let piece = pieceChar.toUpperCase() === pieceChar ? 'white' : 'black';
  piece += '-' + getPieceType(pieceChar.toLowerCase());
  return piece;
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
        currentRow.push(FENPieceToString(character));
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
