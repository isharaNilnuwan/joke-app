import JokeViewer from '@/component/JokeViewer';
import React, { useEffect, useState } from 'react';
import { fetchAcceptedJokes, getJokeTypes, submitJoke } from '@/services/jokeService';


const ViewPage: React.FC = () => {
    const [jokeTypes, setJokeTypes] = useState([]);
    const [jokes, setJokes] = useState([]);
    useEffect(() => {
        const fetchJokeTypes = async () => {
            try {
                const response = await getJokeTypes();
                setJokeTypes(response);
            } catch (error) {
                console.error('Error fetching joke types:', error);
            }
        };

        const getAcceptedJokes = async () => {
            try {
                const response = await fetchAcceptedJokes();
                setJokes(response);
            } catch (error) {
                console.error('Error fetching joke types:', error);
            }
        };

        getAcceptedJokes();
        fetchJokeTypes();
    }, [])
    return (
        <JokeViewer jokeTypes={jokeTypes} 
        jokes= {jokes}
        />
    );
};

export default ViewPage;