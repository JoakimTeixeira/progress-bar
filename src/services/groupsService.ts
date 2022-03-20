import axios from 'axios';
import { IGroupData } from 'interfaces/groups';

export const fetchUsersGroups = async (): Promise<IGroupData[]> => {
  try {
    const response = await axios.get(
      'https://gist.githubusercontent.com/JoakimTeixeira/267e1aa04919a5d3f0a236921e942a31/raw/93116cc51ba2ba7141c2c22a6e40da7466d5559d/mock-progress-bar'
    );
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
