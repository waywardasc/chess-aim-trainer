import { useEffect, useState } from 'react';
import { DEFAULT_TIMER } from './Game';

export default function Score({
  timer,
  score,
}: {
  timer: number;
  score: number;
}) {
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIMER);
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    setCurrentScore(score);
    setTimeLeft(timer);
  }, [timer, score]);

  return (
    <div className="flex items-center">
      <table className="table-auto">
        <thead>
          <tr>
            <th>Timer</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{timeLeft}</td>
            <td>{currentScore}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
