interface PieceProps {
  color: string;
  piece: string;
  row: number;
  column: number;
}

export default function Piece(props: PieceProps) {
  let x = 12.5 * props.column;
  let y = 12.5 * props.row;
  return (
    <img
      className={`piece ${props.color} ${props.piece}`}
      alt={`${props.color} ${props.piece}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      draggable={true}
    />
  );
}
