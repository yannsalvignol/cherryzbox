import { useState, useEffect, useCallback } from 'react';

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fn();
      setData(response);
      return response;
    } catch (error) {  
      console.error('Error fetching data:', error);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [fn]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Return all necessary states and functions
  return {
    data,
    isLoading,
    error,
    refetch: fetchData
  };
};

export default useAppwrite;