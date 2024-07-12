export const apiGetWeeklySalesReport = async () => {
  try {
    const res = await fetch("/api/administrator/reports/weekly-sales", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message);
    }

    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};
