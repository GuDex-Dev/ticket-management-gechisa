// hooks.js
import { useState, useEffect } from "react";
import { apiGetbuses } from "./api"; 

export const useBuses = () => { 
  const [buses, setBuses] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuses = async () => { 
      try {
        const response = await apiGetbuses(); 
        if (response.ok) {
          setBuses(response.data); 
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBuses();
  }, []);

  return { buses: buses, isLoading, error }; 
};
