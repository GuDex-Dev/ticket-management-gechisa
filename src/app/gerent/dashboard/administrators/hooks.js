// hooks.js
import { useState, useEffect } from "react";
import { apiGetAdministrator } from "./api"; 

export const useAdminsitrator = () => { 
  const [administrator, setAdministrator] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdministrator = async () => { 
      try {
        const response = await apiGetAdministrator(); 
        if (response.ok) {
          setAdministrator(response.data); 
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdministrator(); 
  }, []);

  return {administrator, isLoading, error }; 
};
