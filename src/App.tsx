import './App.css';
import FENToMatrix from './chessUtils';
import Board from './components/Board';
import './styles/chess.css';

function App() {
  let props = FENToMatrix('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b');
  return <Board turn={props.turn} grid={props.grid} />;
}

export default App;
