import { create } from 'zustand';
import { Post } from '@/types/Post';
import { getPosts } from '@/services/postService';

interface PostStoreI {
  posts: Post[];
  loading: boolean;
  error: string | null;
  getPosts: () => Promise<void>;
}

export const postStore = create<PostStoreI>((set) => ({
  posts: [],
  loading: false,
  error: null,

  getPosts: async () => {
    set({ loading: true, error: null });
    try {
      const posts = await getPosts();
      set({ posts, loading: false });
    } catch (error) {
      set({ error: `${error}`, loading: false });
    }
  },
}));
