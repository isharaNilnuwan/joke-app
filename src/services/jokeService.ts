import axios from "axios";
import { Joke, JokeType } from "@/types/types";
import { getAuthorizationHeader } from "@/utils/getAuthorizationHeader";

const MODERATE_API_URL =
  process.env.MODERATE_API_URL || "http://localhost:1008";
const SUBMIT_API_URL = process.env.SUBMIT_API_URL || "http://localhost:3000";
const DELIVER_API_URL = process.env.DELIVER_API_URL || "http://localhost:3306";

export const fetchJokes = async (): Promise<any> => {
  try {
    const response = await axios.get(`${DELIVER_API_URL}/jokes`);
    return response.data;
  } catch (error) {}
};

export const fetchNewJokes = async (): Promise<any> => {
  try {
    const response = await axios.get(`${MODERATE_API_URL}/moderate/newJokes`, {
      headers: getAuthorizationHeader(),
    });
    console.log("#$ new jokes", response.data);
    return response.data;
  } catch (error) {}
};

//save public jokes
export const submitJoke = async (
  joke: Partial<Joke>
): Promise<any> => {
  try {
    const response = await axios.post(`${SUBMIT_API_URL}/submitJokes/addNewjoke`, joke);
    return response.data;
  } catch (error) {}
};

//edit joke data
export const updateJoke = async (joke: Partial<Joke>): Promise<any> => {
  try {
    const response = await axios.put(
      `${MODERATE_API_URL}/moderate/editJokes`,
      joke,
      {
        headers: getAuthorizationHeader(),
      }
    );
    return response.data;
  } catch (error) {}
};

//save moderated jokes to deliver service
export const acceptJoke = async (joke: Partial<Joke>): Promise<any> => {
  try {
    const response = await axios.put(
      `${MODERATE_API_URL}/moderate/acceptJoke`,
      joke,
      {
        headers: getAuthorizationHeader(),
      }
    );
    return response.data;
  } catch (error) {
    console.log("error accept joke");
  }
};

export const rejectJoke = async (id: string): Promise<any> => {
  try {
    const response = await axios.delete(
      `${MODERATE_API_URL}/moderate/rejectJoke/${id}`,
      {
        headers: getAuthorizationHeader(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error rejectJoke");
  }
};

export const addJokeType = async (joketype: JokeType): Promise<any> => {
  try {
    console.log("#$ add joke type", joketype);
    const response = await axios.post(
      `${MODERATE_API_URL}/moderate/addNewType`,
      joketype,
      {
        headers: getAuthorizationHeader(),
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding joke type:");
  }
};

export const getJokeTypes = async (): Promise<any> => {
  try {
    const response = await axios.get(`${MODERATE_API_URL}/moderate/getTypes`);
    return jokeTypemapper(response.data);
  } catch (error) {
    console.log(error);
  }
};

const jokeTypemapper = (data: { array: any[] }): JokeType[] => {
  const mapper: JokeType[] = [];
  data.forEach((obj) => {
    mapper.push({
      id: obj.id,
      type: obj.type,
    });
  });

  return mapper;
};
