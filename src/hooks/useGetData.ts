import { useState } from "react";

export const useGetData = <T,>(service: any) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const getData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await service();
            setData(result);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return {
        getData,
        data,
        loading,
        error
    }
}