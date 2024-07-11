export const apiGetOptions = async (data) => {
  try {
    const res = await fetch("/api/administrator/create-trip/get-options", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

export const apiGetDefaultPrice = async (data) => {
  try {
    const res = await fetch("/api/administrator/create-trip/get-default-price", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

export const apiCreateTrip = async (data) => {
  try {
    const res = await fetch("/api/administrator/create-trip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
