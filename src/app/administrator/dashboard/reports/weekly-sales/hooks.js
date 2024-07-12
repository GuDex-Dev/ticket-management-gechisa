import { useState, useEffect } from "react";
import { apiGetWeeklySalesReport } from "./api";

const useWeeklySalesReport = () => {
  const [report, setReport] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReport = async () => {
    try {
      const { data } = await apiGetWeeklySalesReport();
      setReport(data);
    } catch (error) {
      console.error("Error fetching weekly sales report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return { report, isLoading };
};

export default useWeeklySalesReport;
