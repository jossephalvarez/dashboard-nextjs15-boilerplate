import { useState, useEffect, useCallback } from "react";

export const useFetchData = <T,>(fetchFunction: () => Promise<T>) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {  // Usa useCallback para evitar recrear la función fetchData.
        try {
            setLoading(true);
            setError(null);
            const result = await fetchFunction();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setLoading(false);
        }
    }, [fetchFunction]);

    useEffect(() => {
        fetchData(); //Llama a fetchFunction (puede ser getUsers(), getPosts(), etc.).
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};
