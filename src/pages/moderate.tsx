import React, { useCallback, useEffect, useState } from 'react';
import JokeEditor from '@/component/JokeModerator';
import { acceptJoke, addJokeType, fetchNewJokes, getJokeTypes, rejectJoke, updateJoke } from '@/services/jokeService';
import { Joke, JokeType } from '@/types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import Modal from '@/component/Modal';

const ModeratePage: React.FC = () => {

  const [jokeTypes, setJokeTypes] = useState<JokeType[]>([]);
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [saveTrigger, setSaveTrigger] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


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
    if (!isModalOpen) {
      fetchJokeTypes();
    }    
  }, [isModalOpen]);

  saveTrigger

  useEffect(()=> {
    const loadJokes = async () => {
      try {
        const jokes = await fetchNewJokes();
        console.group("#$ jokes", jokes)
        setJokes(jokes);
      } catch (error) {
        console.error('Error fetching joke :', error);
      }
    };
    loadJokes();
  }, [saveTrigger])

  const onReject = (jokeId: string) => {
    rejectJoke(jokeId);
    setSaveTrigger(prev => prev + 1);
  }

  const onAccept = async(joke: any)=> {
    acceptJoke(joke);
    setSaveTrigger(prev => prev + 1);
  }


  const onSave = useCallback((joke: any) => {
    console.log("#$ onsave", joke)
    updateJoke(joke);
  }, [])

  const onAddType = (type:JokeType) => {
    setIsModalOpen(false);
    addJokeType({"type" :type})

  }

  return (
    <div>
      <h1>Moderater Jokes</h1>
      <button
      style={styles.button}
      onClick={openModal}
    >
      <FontAwesomeIcon icon={faPlus} style={styles.icon} />
      Add Joke Types
    </button>
    <Modal isOpen={isModalOpen} onClose={closeModal} onAdd={onAddType}>
        <h2>Modal Title</h2>
        <p>This is a simple modal pop-up component.</p>
      </Modal>
      <ul>
        {jokes.map((joke, index) => (
          <JokeEditor
            key={joke._id}
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

const styles = {
  button: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 10px',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  icon: {
    marginRight: '8px',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  }
};