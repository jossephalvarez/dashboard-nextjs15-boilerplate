import { Post } from '@/types/Post';
import axios from 'axios';
import { POSTS_API } from '@/constants/api';

export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get<Post[]>(POSTS_API);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching ');
  }
};
