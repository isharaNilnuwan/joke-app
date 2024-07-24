import { getJokeTypes, submitJoke } from '@/services/jokeService';
import React, { useEffect, useState } from 'react';

const JokeSubmitter: React.FC = () => {
  const [joke, setJoke] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [jokeTypes, setJokeTypes] = useState([])

  useEffect(() => {
    const fetchJokeTypes = async () => {
      try {
        const response = await getJokeTypes();
        setJokeTypes(response);
        if (response.length > 0) {
          setSelectedType(response[0]);
        }
      } catch (error) {
        console.error('Error fetching joke types:', error);
      }
    };
    fetchJokeTypes();
  }, []);

  const handleSubmit = async () => {
    submitJoke({
      type: selectedType.type,
      content: joke,
      approved: false
    });
    if (joke.trim()) {
      setJoke('');
      setSelectedType(jokeTypes[0] || '');

    }
  };

  return (
    <div style={containerStyle}>
      <select
        style={dropdownStyle}
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        {jokeTypes && jokeTypes.map((typeObj) => (
          <option key={typeObj.id} value={typeObj.type}>
            {typeObj.type}
          </option>
        ))}
      </select>
      <textarea
        style={textAreaStyle}
        value={joke}
        onChange={(e) => setJoke(e.target.value)}
        placeholder="Enter your joke here..."
      />
      <button
        style={submitButtonStyle}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = submitButtonHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = submitButtonStyle.backgroundColor)}
        onClick={handleSubmit}
        disabled={joke.trim().length === 0}
      >
        Submit
      </button>
    </div>
  );
};

export default JokeSubmitter;


const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '60%',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
};

const textAreaStyle: React.CSSProperties = {
  height: '150px',
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  resize: 'none',
};

const dropdownStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
};

const submitButtonStyle: React.CSSProperties = {
  alignSelf: 'flex-end',
  backgroundColor: '#0070f3',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
};

const submitButtonHoverStyle: React.CSSProperties = {
  backgroundColor: '#005bb5',
};