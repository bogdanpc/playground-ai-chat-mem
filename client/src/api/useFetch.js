import { useEffect, useState } from "react";
import { apiClient } from "./client";
import { useLoadingContext } from "../layouts/LoadingProvider";

/**
 *  useFetch hook with loading
 */
const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { startLoading, stopLoading } = useLoadingContext();

  const fetchData = async () => {
    try {
      startLoading();
      setError(null);

      const response = await apiClient(url, options);

      setData(response);
      return response;
    } catch (err) {
      setError(err.message || 'An error occurred during fetching');
      console.error(err);
      return null;
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    if (!url) return;
    fetchData();
  }, [url]);

  return { data, error };
};

const usePost = (url, body) => useFetch(url, { method: 'POST', body });

export { useFetch, usePost };