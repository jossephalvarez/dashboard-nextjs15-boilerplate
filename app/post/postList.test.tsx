import { render, screen, fireEvent } from '@testing-library/react';
import { postStore } from '@/store/postStore';
import PostList from '@/app/post/page';
import '@testing-library/jest-dom';

// 🔹 Mockeamos el store para controlar sus valores
jest.mock('@/store/postStore', () => ({
  postStore: jest.fn(),
}));

describe('PostList Component', () => {
  beforeEach(() => {
    (postStore as unknown as jest.Mock).mockReturnValue({
      posts: [
        {
          userId: 1,
          id: 1,
          title:
            'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
          body: 'quia et suscipit...',
        },
        {
          userId: 1,
          id: 2,
          title: 'qui est esse',
          body: 'est rerum tempore vitae...',
        },
      ],
      getPosts: jest.fn(),
      loading: false,
      error: null,
    });
  });

  it('debería renderizar correctamente los posts', async () => {
    render(<PostList />);

    // Verifica que los posts se renderizan correctamente
    expect(
      await screen.findByRole('link', { name: /sunt aut facere/i })
    ).toBeInTheDocument();

    // expect(screen.getByText('qui est esse')).toBeInTheDocument();
  });

  it('debería filtrar posts correctamente', async () => {
    render(<PostList />);

    // Verificamos que ambos posts estén visibles antes del filtrado
    expect(
      await screen.findByRole('link', {
        name: /sunt aut facere.*quia et suscipit/i,
      })
    ).toBeInTheDocument();

    // expect(screen.getByText('qui est esse')).toBeInTheDocument();

    // 🔹 Simulamos la entrada de texto en el filtro
    fireEvent.change(screen.getByPlaceholderText('Buscar post...'), {
      target: { value: 'qui' },
    });

    // 🔹 Ahora solo debería aparecer el post que contiene "qui"

    expect(
      await screen.findByRole('link', { name: /'qui est esse/i })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole('link', { name: /'sunt aut facere/i })
    ).not.toBeInTheDocument();
    // expect(screen.queryByText('qui est esse')).toBeInTheDocument();
    // expect(screen.queryByText('sunt aut facere')).not.toBeInTheDocument();
  });

  it('debería mostrar "loading" mientras se cargan los posts', async () => {
    (postStore as unknown as jest.Mock).mockReturnValue({
      posts: [],
      getPosts: jest.fn(),
      loading: true,
      error: null,
    });

    render(<PostList />);

    expect(screen.getByText('...Loading')).toBeInTheDocument();
  });

  it('debería mostrar "error" si ocurre un problema al obtener los posts', async () => {
    (postStore as unknown as jest.Mock).mockReturnValue({
      posts: [],
      getPosts: jest.fn(),
      loading: false,
      error: true,
    });

    render(<PostList />);

    expect(screen.getByText('...Error')).toBeInTheDocument();
  });
});
