import React, { useEffect, useState } from 'react';
import { fetchNewJokes } from '../services/jokeService';
import { Joke } from '@/types/types'; 

const JokeSubmitter: React.FC = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);

  useEffect(() => {
    const loadJokes = async () => {
      const jokes = await fetchNewJokes();
      console.group("#$ jokes", jokes)
    //   setJokes(jokes);
    };

    loadJokes();
  }, []);

  return (
    <div>
      <h1>Jokes</h1>
      <ul>
        {jokes.map((joke) => (
          <li key={joke.id}>{joke.content} ({joke.type})</li>
        ))}
      </ul>
    </div>
  );
};