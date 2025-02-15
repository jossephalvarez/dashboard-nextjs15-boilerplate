import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export const useProductId = <T>(endPointURL: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fecthData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<T>(endPointURL);
      setData(response.data);
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  }, [endPointURL]);

  useEffect(() => {
    fecthData();
  }, [fecthData]);

  return { data, error, loading };
};
