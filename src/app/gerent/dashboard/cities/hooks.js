// hooks.js
import { useState, useEffect } from "react";
import { apiGetCities } from "./api"; 

export const useCities = () => { 
  const [cities, setCities] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => { 
      try {
        const response = await apiGetCities(); 
        if (response.ok) {
          setCities(response.data); 
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities(); 
  }, []);

  return { cities, isLoading, error }; 
};
