import { useState, useEffect } from "react";
import { apiGetSalesRankingReport } from "./api";

const useSalesRankingReport = () => {
  const [report, setReport] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReport = async () => {
    try {
      const { data } = await apiGetSalesRankingReport();
      setReport(data);
    } catch (error) {
      console.error("Error fetching sales ranking report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return { report, isLoading };
};

export default useSalesRankingReport;
