import { render, screen } from '@testing-library/react';
import UserPage from '@/app/users/[id]/page'; // Asegúrate de que la ruta es correcta
import '@testing-library/jest-dom';

jest.mock('@/components/UserDetail', () => () => (
  <div data-testid="user-detail">Mock UserDetail</div>
));

describe('UserPage', () => {
  it('debería renderizar UserDetail', () => {
    render(<UserPage />);
    expect(screen.getByTestId('user-detail')).toBeInTheDocument();
  });
});
