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
  let piece = pieceChar.toLowerCase() === pieceChar ? 'white' : 'black';
  piece += '-' + getPieceType(pieceChar.toLowerCase());
  return piece;
}

export default function FENToMatrix(fen: string) {
  let grid: string[][] = [];
  let parts = fen.split(' ');
  const turn: string = parts[1] === 'w' ? 'white' : 'black';
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
    grid.push(currentRow);
  }

  return { turn: turn, grid: grid };
}
