import React from 'react';
import JokeForm from '@/component/JokeForm';

const SubmitPage: React.FC = () => {
  return (
    <div>
      <h1>Submit a Joke</h1>
      <JokeForm />
    </div>
  );
};

export default SubmitPage;