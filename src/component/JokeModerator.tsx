import { Joke, JokeType } from '@/types/types';
import React, { useState, ChangeEvent } from 'react';


interface JokeEditorProps {
  joke: Joke;
  jokeTypes: JokeType[]
  onSave: (joke: Joke) => void;
  onReject: (jokeId: number) => void;
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
    onReject(joke.id);
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
          {jokeTypes.map((typeObj, index) => (
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
      position: 'relative',
      width: '500px',
      height: '300px',
      border: '1px solid #ccc',
      padding: '10px',
      boxSizing: 'border-box',
    },
    dropdownContainer: {
    //   position: 'absolute',
    //   top: '10px',
    //   left: '10px',
    },
    dropdown: {
      padding: '5px',
    },
    textarea: {
      width: '100%',
      height: '80%',
      padding: '10px',
      boxSizing: 'border-box', 
      resize: 'none',
      border: '1px solid #ccc',
    },
    buttonBar: {
      position: 'absolute',
      bottom: '6px',
      right: '10px',
    },
    button: {
      marginLeft: '10px',
      padding: '5px 10px',
    },
  };
  

export default JokeEditor;
