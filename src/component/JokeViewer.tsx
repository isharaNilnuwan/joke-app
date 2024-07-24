// @ts-ignore

import React, { useState, useEffect } from 'react';

const JokeViewer = ({ jokeTypes, jokes }) => {
    //   const [joke, setJoke] = useState<string>('');
    const [selectedType, setSelectedType] = useState(jokeTypes[0]);
    const [filteredJokes, setFilteredJokes] = useState([]);
    const [randomJoke, setRandomJoke] = useState(undefined);

    useEffect(() => {
        if (jokeTypes.length > 0 && jokes.length > 0) {
            const filteredJokes = filterByType(jokeTypes[0].type);
            setFilteredJokes(filteredJokes);
        }
    }, [jokes, jokeTypes])

    const handleGetJoke = async () => {
        const randomJoke = getRandomJoke(jokes);
        setRandomJoke(randomJoke);
    };

    const filterByType = (typeToFilter) => {
        return jokes.filter(joke => joke.type === typeToFilter);
    };

    const onTypeSelect = (event) => {
        setSelectedType(event.target.value);
        const filteredJokes = filterByType(event.target.value);
        setFilteredJokes(filteredJokes);
    }

    function getRandomJoke(jokes) {
        const randomIndex = Math.floor(Math.random() * jokes.length);
        return jokes[randomIndex];
    }

    return (
        <div style={containerStyle}>
            <h1> Get Your Daily Laugh!</h1>
            <button onClick={handleGetJoke} style={buttonStyle}>
                Tell Me a Joke
            </button>
            <div style={boxStyle}>
            {
                randomJoke ? (
                    <div style={jokeDisplayStyle}>
                        {randomJoke.content}
                    </div>
                ) :
                    (
                        <div>Want to hear joke?  Click the button</div>
                    )
            }
            </div>
            <div style={boxStyle}>
                <select
                    style={dropdownStyle}
                    value={selectedType}
                    onChange={onTypeSelect}
                >
                    {jokeTypes && jokeTypes.map((type) => (
                        <option key={type.id} value={type.type}>
                            {type.type}
                        </option>
                    ))}
                </select>
                {filteredJokes.length ? (
                    filteredJokes.map((joke, index) => (
                        <div key={index} style={jokeDisplayStyle}>
                            {joke.content}
                        </div>
                    ))
                ) : (
                    <div>No jokes available for this type.</div>
                )}

            </div>
        </div>
    );
};

export default JokeViewer;

// Styles
const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    textAlign: 'center',
};

const buttonStyle: React.CSSProperties = {
    marginBottom: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const boxStyle: React.CSSProperties = {
    width: '70%',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    marginBottom: '40px'
};

const dropdownStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '20px',
};

const jokeDisplayStyle: React.CSSProperties = {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff',
    minHeight: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

