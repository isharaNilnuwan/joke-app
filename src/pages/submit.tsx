import React from 'react';
import JokeSubmitter from '@/component/JokeSubmitter';

const SubmitPage: React.FC = () => {
  return (
    <div>
      <h1>Submit Your Joke</h1>
      <JokeSubmitter />
    </div>
  );
};

export default SubmitPage;