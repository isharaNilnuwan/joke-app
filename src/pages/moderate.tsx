import React, { useEffect, useState } from 'react';
import JokeList from '@/component/JokeList';
import JokeEditor from '@/component/JokeModerator';
import { getJokeTypes } from '@/services/jokeService';
import { JokeType } from '@/types/types';

const ModeratePage: React.FC = () => {

  const [jokeTypes, setJokeTypes] = useState<JokeType[]>([]);

  useEffect(()=> {
    const fetchJokeTypes = async () => {
      try {
        const response = await getJokeTypes();
        console.log("#$ joke types modertr", response)
        setJokeTypes(response);
      } catch (error) {
        console.error('Error fetching joke types:', error);
      }
    };

    fetchJokeTypes();
  }, [])
  const joke = {
    id:12,
    content:"2",
    type: "12"
  }
  const onReject = ()=> {
    
  }


  const onSave =() => {

  }
  return (
    <div>
      <h1>Moderater page</h1>
      <JokeList />
      <JokeEditor 
        jokeTypes={jokeTypes}
        joke={joke}
        onSave={onSave}
        onReject={onReject} />
    </div>
  );
};

export default ModeratePage;

