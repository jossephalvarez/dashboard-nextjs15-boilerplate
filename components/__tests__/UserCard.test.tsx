import { render, screen, fireEvent } from '@testing-library/react';
import UserCard from '@/components/UserCard';
import { User } from '@/types/User';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

// Mock de `next/router`
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('UserCard', () => {
  const mockUser: User = {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496',
      },
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  };

  it('debería renderizar el nombre y el email del usuario', () => {
    render(<UserCard user={mockUser} onUpdate={jest.fn()} />);

    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument();
  });

  it('debería llamar a `onUpdate` al hacer clic en "Actualizar"', () => {
    const mockOnUpdate = jest.fn();
    render(<UserCard user={mockUser} onUpdate={mockOnUpdate} />);

    const button = screen.getByText('Actualizar');
    fireEvent.click(button);

    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
  });

  it('debería renderizar el enlace de detalles con la URL correcta', () => {
    render(<UserCard user={mockUser} onUpdate={jest.fn()} />);

    const link = screen.getByRole('link', { name: /ver detalles/i });
    expect(link).toHaveAttribute('href', '/users/1');
  });
});
