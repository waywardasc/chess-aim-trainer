import { useEffect, useState } from 'react';
import Piece from './Piece';

function renderPiece(piece: string, i: number, j: number) {
  if (piece === '') return null;
  let [color, type] = piece.split('-');
  return <Piece key={piece} color={color} piece={type} row={i} column={j} />;
}

export default function Board({
  turn,
  grid,
}: {
  turn: string;
  grid: string[][];
}) {
  const [position, setPosition] = useState(grid);

  useEffect(() => {
    setPosition(grid);
  }, [grid]);

  return (
    <div className="board-container">
      <div className={`board ${turn}`}>
        {position.map((row, i) =>
          row.map((piece, j) => renderPiece(piece, i, j))
        )}
      </div>
    </div>
  );
}
