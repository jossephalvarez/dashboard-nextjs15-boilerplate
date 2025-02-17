import { useProductId } from '@/hooks/useProductId';
import ProductList from '@/components/ProductList';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

jest.mock('@/hooks/useProductId');

describe('Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading', () => {
    (useProductId as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<ProductList />);
    expect(screen.getByText('....loading')).toBeInTheDocument();
  });

  it('should show error', () => {
    (useProductId as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: 'error fetching data',
    });

    render(<ProductList />);
    expect(screen.getByText('....error')).toBeInTheDocument();
  });
});
it('show list', async () => {
  const mockUsers = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
  ];
  (useProductId as jest.Mock).mockReturnValue({
    data: mockUsers,
    loading: false,
    error: null,
  });

  render(<ProductList />);
  expect(
    await screen.findByText('THIS IS A PRODUCT LIST COMPONENT: 2')
  ).toBeInTheDocument();
});
