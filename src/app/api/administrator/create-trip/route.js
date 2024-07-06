import { NextResponse } from "next/server";

const db = require("@/lib/db");

export async function POST(req, res) {
  try {
    const data = await req.json();

    if (!data || typeof data !== "object") {
      return NextResponse.json(
        {
          ok: false,
          message: "Invalid data",
        },
        { status: 400 },
      );
    }

    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        data[key] = null;
      }
    });

    const INPUTS = {
      FK_ID_Origin_City: "origin_city_id",
      FK_ID_Destination_City: "destination_city_id",
      FK_ID_Bus: "bus_id",
      FK_ID_Driver: "driver_id",
      scheduled_departure_dateTime: "datetime",
      price: "price",
    };

    const PROCEDURE_NAME = "spAdministrator_CreateTrip";

    const result = await db.executeProcedure(data, INPUTS, PROCEDURE_NAME);

    if (result.recordset.length > 0) {
      console.log(result.recordset[0]);
      if (result.recordset[0].StatusCode < 0) {
        const { StatusCode, ErrorMessage } = result.recordset[0];
        return NextResponse.json(
          {
            ok: false,
            number: StatusCode,
            message: ErrorMessage,
          },
          { status: 400 },
        );
      } else {
        return NextResponse.json(
          {
            ok: true,
            message: "Viaje creado con éxito",
          },
          { status: 200 },
        );
      }
    }

    return NextResponse.json(
      {
        ok: false,
        message: "Unexpected error occurred",
      },
      { status: 500 },
    );
  } catch (error) {
    console.error(`Error executing ${PROCEDURE_NAME}:`, error);
    return NextResponse.json(
      {
        ok: false,
        message: error,
      },
      { status: 500 },
    );
  }
}
