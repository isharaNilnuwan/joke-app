import React, { useState } from 'react';
import { submitJoke } from '../services/jokeService';

const JokeForm: React.FC = () => {
  const [content, setContent] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitJoke({ content, type });
    setContent('');
    setType('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Joke Content</label>
        <input value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <div>
        <label>Type</label>
        <input value={type} onChange={(e) => setType(e.target.value)} />
      </div>
      <button type="submit">Submit Joke</button>
    </form>
  );
};

export default JokeForm;
