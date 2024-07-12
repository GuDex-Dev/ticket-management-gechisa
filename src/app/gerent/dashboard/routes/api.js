// api.js
export const apiGetRoutes = async () => { // ! Change
  try {
    const res = await fetch("/api/gerent/routes/show", { // ! Change
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
