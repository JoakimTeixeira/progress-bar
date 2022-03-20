import axios from 'axios';
import { IGroupData } from 'interfaces/groups';

export const fetchUsersGroups = async (): Promise<IGroupData[]> => {
  try {
    const response = await axios.get(
      'https://gist.githubusercontent.com/huvber/ba0d534f68e34f1be86d7fe7eff92c96/raw/508f46dbf6535f830aa92cf97359853c5700bab1/mock-progress'
    );
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
