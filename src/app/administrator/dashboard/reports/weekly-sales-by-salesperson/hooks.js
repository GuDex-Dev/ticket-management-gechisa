import { useState, useEffect } from "react";
import { apiGetWeeklySalesReportBySalesperson } from "./api";

const useWeeklySalesReportBySalesperson = () => {
  const [report, setReport] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReport = async () => {
    try {
      const { data } = await apiGetWeeklySalesReportBySalesperson();
      setReport(data);
    } catch (error) {
      console.error("Error fetching weekly sales report by salesperson:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return { report, isLoading };
};

export default useWeeklySalesReportBySalesperson;
