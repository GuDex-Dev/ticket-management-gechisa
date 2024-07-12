// hooks.js
import { useState, useEffect } from "react";
import { apiGetRoutes } from "./api"; 

export const useRoutes = () => { 
  const [routes, setRoutes] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => { 
      try {
        const response = await apiGetRoutes(); 
        if (response.ok) {
          setRoutes(response.data); 
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoutes(); 
  }, []);

  return { routes, isLoading, error }; 
};
