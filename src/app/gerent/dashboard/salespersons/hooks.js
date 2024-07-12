// hooks.js
import { useState, useEffect } from "react";
import { apiGetSalespersons } from "./api"; 

export const useSalespersons = () => { 
  const [ salespersons, setSalespersons] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalespersons = async () => { 
      try {
        const response = await apiGetSalespersons(); 
        if (response.ok) {
          setSalespersons(response.data); 
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalespersons(); 
  }, []);

  return { salespersons, isLoading, error }; 
};
