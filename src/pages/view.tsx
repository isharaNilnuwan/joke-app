import React from 'react';
import JokeList from '@/component/JokeList';

const ViewPage: React.FC = () => {
  return (
    <div>
      <h1>view Jokes</h1>
      <JokeList />
    </div>
  );
};

export default ViewPage;