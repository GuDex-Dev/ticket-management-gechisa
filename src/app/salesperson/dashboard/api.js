export const apiSearchClient = async (dni) => {
  try {
    const res = await fetch("/api/salesperson/search-client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ DNI_Person: dni }),
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

export const apiRegisterClient = async (data) => {
  try {
    const res = await fetch("/api/salesperson/register-client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DNI_Person: data.dni,
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        email: data.email,
        phone: data.phone,
      }),
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

export const apiGetDestinationCities = async (originCityId) => {
  try {
    const res = await fetch("/api/salesperson/get-destination-cities", {
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

export const apiGetTripsByRoute = async (originCityId, destinationCityId) => {
  try {
    const res = await fetch("/api/salesperson/get-trips-by-route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID_origin_city: originCityId,
        ID_destination_city: destinationCityId,
      }),
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

export const apiSellTicket = async (clientId, salespersonId, tripId) => {
  try {
    const res = await fetch("/api/salesperson/sell-ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID_Client: clientId,
        ID_Salesperson: salespersonId,
        ID_Trip: tripId,
      }),
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
