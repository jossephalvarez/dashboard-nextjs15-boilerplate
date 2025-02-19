import '@testing-library/jest-dom';
import { act, render, renderHook } from '@testing-library/react';
import { postStore } from '@/store/postStore';

jest.mock('@/services/postService', () => ({
  getPosts: jest.fn().mockResolvedValue([
    {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    },
    {
      userId: 1,
      id: 2,
      title: 'qui est esse',
      body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
    },
  ]),
}));

describe('PostStore Test', () => {
  it('should get posts correctly', async () => {
    const { result } = renderHook(() => postStore());

    await act(async () => {
      await result.current.getPosts();
    });
    expect(result.current.posts).toHaveLength(2);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });
});
