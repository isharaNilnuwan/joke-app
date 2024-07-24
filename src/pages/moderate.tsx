import React, { useCallback, useEffect, useState } from 'react';
import JokeList from '@/component/JokeList';
import JokeEditor from '@/component/JokeModerator';
import { acceptJoke, fetchNewJokes, getJokeTypes, updateJoke } from '@/services/jokeService';
import { Joke, JokeType } from '@/types/types';

const ModeratePage: React.FC = () => {

  const [jokeTypes, setJokeTypes] = useState<JokeType[]>([]);
  const [jokes, setJokes] = useState<Joke[]>([]);

  useEffect(() => {
    const fetchJokeTypes = async () => {
      try {
        const response = await getJokeTypes();
        console.log("#$ joke types modertr", response)
        setJokeTypes(response);
      } catch (error) {
        console.error('Error fetching joke types:', error);
      }
    };

    const loadJokes = async () => {
      try {
        const jokes = await fetchNewJokes();
        console.group("#$ jokes", jokes)
        setJokes(jokes);
      } catch {

      }

    };

    fetchJokeTypes();
    loadJokes();
  }, [])

  const onReject = () => {

  }

  const onAccept = (joke: any)=> {
    acceptJoke(joke)
  }


  const onSave = useCallback((joke: any) => {
    console.log("#$ onsave", joke)
    updateJoke(joke);
  }, [])

  return (
    <div>
      <h1>Moderater page</h1>
      <ul>
        {jokes.map((joke, index) => (
          <JokeEditor
            key={index}
            jokeTypes={jokeTypes}
            joke={joke}
            onSave={onSave}
            onReject={onReject} 
            onAccept={onAccept}/>
        ))}
      </ul>

    </div>
  );
};

export default ModeratePage;

