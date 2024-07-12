// api.js
export const apiGetSalespersons = async () => {
  try {
    const res = await fetch("/api/gerent/salespersons/show", {
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
