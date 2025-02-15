import { renderHook } from '@testing-library/react';
import axios from 'axios';
import { useProductId } from './useProductId'; // Asegúrate de importar correctamente el hook
import { waitFor } from '@testing-library/react'; // Importar waitFor desde el lugar correcto

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useProductId', () => {
  it('debería devolver los datos correctamente', async () => {
    const mockData = { id: 1, name: 'Product A' }; // Datos de prueba que queremos que devuelva la API
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() =>
      useProductId<{ id: number; name: string }>('/api/products/1')
    );

    // Usamos waitFor para esperar que el estado de `data` se actualice
    await waitFor(() => expect(result.current.data).toEqual(mockData));

    // Verificamos el estado después de que los datos se han cargado
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('debería manejar errores en la solicitud', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Error fetching data'));

    const { result } = renderHook(() =>
      useProductId<{ id: number; name: string }>('/api/products/1')
    );

    // Usamos waitFor para esperar que el estado de `error` se actualice
    await waitFor(() =>
      expect(result.current.error).toBe('Error fetching data')
    );

    // Verificamos el estado después de la falla
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('debería manejar el estado de carga correctamente', async () => {
    const mockData = { id: 1, name: 'Product A' };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() =>
      useProductId<{ id: number; name: string }>('/api/products/1')
    );

    // Verificamos que está en estado de carga inicialmente
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();

    // Esperamos que el hook termine de cargar los datos
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Verificamos el estado después de que los datos se han cargado
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });
});
