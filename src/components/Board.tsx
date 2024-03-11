import { useEffect, useState } from 'react';
import FENToMatrix, { translateMove } from '../chessUtils';
import Piece from './Piece';

function renderPiece(piece: string, i: number, j: number) {
  if (piece === '') return null;
  let [color, type] = piece.split('-');
  return (
    <Piece key={`${i}-${j}`} color={color} piece={type} row={i} column={j} />
  );
}

export default function Board({ fen, move }: { fen: string; move: string }) {
  const [position, setPosition] = useState<string[][]>([]);
  const [turn, setTurn] = useState<string>('');
  const [moveDisplay, setMove] = useState<string>('');

  console.log(fen);

  useEffect(() => {
    let props = FENToMatrix(fen);
    setPosition(props.grid);
    setTurn(props.turn);
    setMove(translateMove(move, props.grid, props.turn));
  }, [fen]);

  return (
    <div className="board-container">
      <h1>{moveDisplay}</h1>
      <div key={turn} className={`board ${turn}`}>
        {position.map((row, i) =>
          row.map((piece, j) => renderPiece(piece, i, j))
        )}
      </div>
    </div>
  );
}
