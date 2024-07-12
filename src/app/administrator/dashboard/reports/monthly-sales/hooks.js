import { useState, useEffect } from "react";
import { apiGetMonthlySalesReport } from "./api";

const useMonthlySalesReport = () => {
  const [report, setReport] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReport = async () => {
    try {
      const { data } = await apiGetMonthlySalesReport();
      setReport(data);
    } catch (error) {
      console.error("Error fetching monthly sales report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return { report, isLoading };
};

export default useMonthlySalesReport;
