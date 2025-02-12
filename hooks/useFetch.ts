import { useState, useEffect } from "react";
import axios from "axios";

export function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Llamada con Axios
        axios.get(url)
            .then((response) => {
                setData(response.data);  // Axios ya parsea automáticamente el JSON
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Hubo un error al realizar la solicitud.");
                setLoading(false);
            });
    }, [url]); // Dependemos del URL para hacer la solicitud cuando cambie

    return { data, loading, error };
}
