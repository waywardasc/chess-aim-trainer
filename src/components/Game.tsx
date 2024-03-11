import { collection, getDocs, limit, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import db from '../firebase';
import '../index.css';
import Board from './Board';
import Score from './Score';
export const DEFAULT_FEN =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
export const DEFAULT_TIMER = 60;

async function generatePosition(): Promise<[string, string]> {
  const docRef = collection(db, 'positions');
  const q = query(docRef, limit(1));
  let move: string = '';
  let fen: string = '';

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    move = doc.get('move') || '';
    fen = doc.get('fen') || '';
  });
  return [move, fen];
}

export default function Game() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [timer, setTimer] = useState(DEFAULT_TIMER);
  const [fen, setFen] = useState(DEFAULT_FEN);
  const [move, setMove] = useState('');
  const [score, setScore] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let [genMove, genFen] = await generatePosition();
        setFen(genFen);
        setMove(genMove);
        setShouldRender(false);
      } catch (error) {
        console.error('Failed to fetch move and fen from the database.', error);
      }
    };

    if (shouldRender && timer > 0) {
      console.log(shouldRender);
      fetchData().then(() => setDataLoaded(true));
    } else if (timer === 0) {
      console.log('End of the game');
    }
  }, [shouldRender, timer, fen]);

  return (
    <div className="game">
      {dataLoaded ? (
        <>
          <Score score={score} timer={timer} />
          <Board fen={fen} move={move} />
        </>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
}
