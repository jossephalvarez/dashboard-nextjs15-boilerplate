import { act, render, renderHook, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { postStore } from '@/store/postStore';
import { getPosts } from '@/services/postService';

jest.mock('@/services/postService');

describe('postStore test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('debería tener un estado inicial correcto', () => {
    const { result } = renderHook(() => postStore());
    expect(result.current.posts).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should get posts and save correctly', async () => {
    const mockPosts = [
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
    ];

    (getPosts as jest.Mock).mockResolvedValue(mockPosts);

    const { result } = renderHook(() => postStore());
    await act(async () => {
      await result.current.getPosts();
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.posts).toEqual(mockPosts);
    expect(result.current.error).toBeNull();
  });

  it('debería manejar errores al obtener posts', async () => {
    (getPosts as jest.Mock).mockRejectedValue(new Error('Error en la API'));

    const { result } = renderHook(() => postStore());

    await act(async () => {
      await result.current.getPosts();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.posts).toEqual([]);
    expect(result.current.error).toContain('Error en la API'); // 🔹 Usamos toContain en vez de toBe
  });
});
