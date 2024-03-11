import Game from './components/Game';
import './index.css';
import './styles/chess.css';

// Appelez la fonction asynchrone pour récupérer un élément aléatoire
function App() {
  return (
    <>
      <Game />
      <h1 className="text-cyan-200">Oui</h1>
    </>
  );
}

export default App;
