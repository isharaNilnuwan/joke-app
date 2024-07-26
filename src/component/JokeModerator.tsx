import { Joke, JokeType } from '@/types/types';
import React, { useState, ChangeEvent } from 'react';


interface JokeEditorProps {
  joke: Joke;
  jokeTypes: JokeType[]
  onSave: (joke: Joke) => void;
  onReject: (jokeId: string) => void;
  onAccept: (joke: Joke) => void;
}

const JokeEditor: React.FC<JokeEditorProps> = ({ joke, jokeTypes, onSave, onReject, onAccept }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedJoke, setEditedJoke] = useState(joke.content);
  const [selectedType, setSelectedType] = useState(joke.type);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onSave(getUpdatedJokeObject());
    setIsEditing(false);
  };

  const handleRejectClick = () => {
    onReject(joke._id);
  };

  const handleAcceptClick = () => {
    onAccept(getUpdatedJokeObject(true))
  }  

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  const handleJokeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedJoke(e.target.value);
  };

  const getUpdatedJokeObject = (accept?: boolean) => {
    return {
        ...joke,
        content: editedJoke,
        type: selectedType,
        approved: accept || joke.approved
      }
  }

  return (
    <div style={styles.container}>
      <div style={styles.dropdownContainer}>
        <select
          value={selectedType}
          onChange={handleTypeChange}
          disabled={!isEditing}
          style={styles.dropdown}
        >
          {jokeTypes && jokeTypes.map((typeObj, index) => (
            <option key={index} value={typeObj.type}>
              {typeObj.type}
            </option>
          ))}
        </select>
      </div>
      <textarea
        value={editedJoke}
        onChange={handleJokeChange}
        disabled={!isEditing}
        style={styles.textarea}
      />
      <div style={styles.buttonBar}>
        {isEditing ? (
          <button onClick={handleSaveClick} style={styles.button}>
            Save
          </button>
        ) : (
          <button onClick={handleEditClick} style={styles.button}>
            Edit
          </button>
        )}
        <button disabled={isEditing} onClick={handleAcceptClick} style={styles.button}>
          Accept
        </button>
        <button disabled={isEditing} onClick={handleRejectClick} style={styles.button}>
          Reject
        </button>
      </div>
    </div>
  );
};


const styles: {
    container: React.CSSProperties;
    dropdownContainer: React.CSSProperties;
    dropdown: React.CSSProperties;
    textarea: React.CSSProperties;
    buttonBar: React.CSSProperties;
    button: React.CSSProperties;
  } = {
    container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    position: 'relative', // To position child elements absolutely
  },
  dropdownContainer: {
    marginBottom: '20px',
  },
  dropdown: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    height: '150px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
    resize: 'vertical',
    marginBottom: '20px',
  },
  buttonBar: {
    position: 'absolute',
    bottom: '0px',
    right: '20px',
    display: 'flex',
    gap: '10px', // Spacing between buttons
  },
  button: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  addButton: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#28a745',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },

  };
  

export default JokeEditor;
