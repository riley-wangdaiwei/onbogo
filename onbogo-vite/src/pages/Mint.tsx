import { useEffect, useState } from 'react';
import NextButton from '../components/NextButton';
import ProgressBar from '../components/ProgressBar';

const STORAGE_KEY = 'votes';

export default function Mint() {
  const [latestVote, setLatestVote] = useState<string | null>(null);

  useEffect(() => {
    const existingVotes = localStorage.getItem(STORAGE_KEY);
    if (existingVotes) {
      const parsedVotes: string[] = JSON.parse(existingVotes);
      if (parsedVotes.length > 0) {
        setLatestVote(parsedVotes[parsedVotes.length - 1]);
      }
    }
  }, []);

  return (
    <div>
      <ProgressBar />
      <h1>Mint Page</h1>

      <div>
        <h2>Your Vote:</h2>
        {latestVote ? <p>{latestVote}</p> : <p>No vote stored.</p>}
      </div>

      <NextButton to="/vote" label="Complete" />
    </div>
  );
}
