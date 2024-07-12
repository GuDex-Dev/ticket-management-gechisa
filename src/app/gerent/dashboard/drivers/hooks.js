// hooks.js
import { useState, useEffect } from "react";
import { apiGetDrivers } from "./api"; 

export const useDrivers = () => { 
  const [driver, setDriver] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDriver = async () => { 
      try {
        const response = await apiGetDrivers(); 
        if (response.ok) {
          setDriver(response.data); 
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDriver(); 
  }, []);

  return {driver, isLoading, error }; 
};
