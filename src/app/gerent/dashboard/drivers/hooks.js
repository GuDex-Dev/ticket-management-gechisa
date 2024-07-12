// hooks.js
import { useState, useEffect } from "react";
import { apiGetDrivers } from "./api"; // ! Change

export const useDrivers = () => { // ! Change
  const [driver, setDriver] = useState([]); // ! Change
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDriver = async () => { // ! Change
      try {
        const response = await apiGetDrivers(); // ! Change
        if (response.ok) {
          setDriver(response.data); // ! Change
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDriver(); // ! Change
  }, []);

  return {driver, isLoading, error }; // ! Change
};
