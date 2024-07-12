// hooks.js
import { useState, useEffect } from "react";
import { apiGetRoutes } from "./api"; // ! Change

export const useRoutes = () => { // ! Change
  const [routes, setRoutes] = useState([]); // ! Change
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => { // ! Change
      try {
        const response = await apiGetRoutes(); // ! Change
        if (response.ok) {
          setRoutes(response.data); // ! Change
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoutes(); // ! Change
  }, []);

  return { routes, isLoading, error }; // ! Change
};
