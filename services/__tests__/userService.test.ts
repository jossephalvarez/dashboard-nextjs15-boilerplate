import axios from 'axios';
import { getUsers, getUsersById } from '@/services/userService'; // Asegúrate de que la ruta sea correcta
import { USERS_API } from '@/constants/api';

jest.mock('axios'); // Mockeamos Axios

describe('API Service - getUsers & getUsersById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getUsers debería retornar datos de usuarios correctamente', async () => {
    const mockData = [
      { id: 1, name: 'Juan' },
      { id: 2, name: 'Ana' },
    ];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await getUsers();

    expect(axios.get).toHaveBeenCalledWith(USERS_API);
    expect(result).toEqual(mockData);
  });

  it('getUsers debería manejar errores correctamente', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Error de API'));

    await expect(getUsers()).rejects.toThrow('Error de API');
    expect(axios.get).toHaveBeenCalledWith(USERS_API);
  });

  it('getUsersById debería retornar datos de un usuario por ID', async () => {
    const mockData = { id: 1, name: 'Juan' };
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await getUsersById('1');

    expect(axios.get).toHaveBeenCalledWith(`${USERS_API}/1`);
    expect(result).toEqual(mockData);
  });

  it('getUsersById debería manejar errores correctamente', async () => {
    (axios.get as jest.Mock).mockRejectedValue(
      new Error('Usuario no encontrado')
    );

    await expect(getUsersById('1')).rejects.toThrow('Usuario no encontrado');
    expect(axios.get).toHaveBeenCalledWith(`${USERS_API}/1`);
  });
});
