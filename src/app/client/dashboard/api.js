// api.js
export const apiGetCities = async () => {
  try {
    const res = await fetch("/api/client/get-cities", {
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

export const apiGetDestinations = async (originCityId) => {
  try {
    const res = await fetch("/api/client/get-destinations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ID_origin_city: originCityId }),
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

export const apiGetTripsByRouteAndDate = async (originCityId, destinationCityId, date) => {
  try {
    const res = await fetch("/api/client/get-trips-by-route-and-date", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ID_origin_city: originCityId, ID_destination_city: destinationCityId, date }),
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

export const apiBuyTicket = async (clientId, tripId) => {
  try {
    const res = await fetch("/api/client/buy-ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ID_Client: clientId, ID_Trip: tripId }),
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
