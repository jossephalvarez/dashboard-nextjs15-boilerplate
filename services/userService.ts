import axios from 'axios';
import { USERS_API } from '@/constants/api';

export const getUsers = async () => {
  try {
    const response = await axios.get(USERS_API);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUsersById = async (id: string | Array<string> | undefined) => {
  try {
    const response = await axios.get(`${USERS_API}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users by Id:', error);
    throw error;
  }
};
