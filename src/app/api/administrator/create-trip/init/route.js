import { NextResponse } from "next/server";

const db = require("@/db");

export async function POST(req, res) {
  const data = await req.json();

  if (!data || typeof data !== "object") {
    throw new Error("Invalid data");
  }

  Object.keys(data).forEach((key) => {
    if (data[key] === "") {
      data[key] = null;
    }
  });

  const INPUTS = {
    ID_origin_city: "city_id",
  };

  const PROCEDURE_NAME = "spAdministrator_CreateTrip_Init";

  try {
    const result = await db.executeProcedure(data, INPUTS, PROCEDURE_NAME);

    if (result.recordsets.length === 1) {
      const errorNumber = result.recordset[0].ErrorNumber;
      const errorMessage = result.recordset[0].ErrorMessage;
      let errorMessageText = `Error ${errorNumber}: ${errorMessage}`;
      return NextResponse.json({ error: errorMessageText });
    } else {
      const destination_city = result.recordsets[0].map((data) => ({
        id: data.destination_city_id,
        name: data.destination_city_name,
      }));

      const bus = result.recordsets[1].map((data) => ({
        placa: data.bus_placa,
        seats_count: data.seats_count,
      }));

      const driver = result.recordsets[2].map((data) => ({
        id: data.driver_id,
        first_name: data.driver_first_name,
        last_name: data.driver_last_name,
      }));

      return NextResponse.json({ destination_city, bus, driver });
    }
  } catch (error) {
    console.error("Error executing spAdministrator_CreateTrip_Init:", error);
    return NextResponse.json({
      error: "An error occurred during trip initialization.",
    });
  }
}
