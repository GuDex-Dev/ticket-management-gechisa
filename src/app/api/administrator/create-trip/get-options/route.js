import { NextResponse } from "next/server";

const db = require("@/lib/db");
// const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
      ID_origin_city: "origin_city_id",
    };

    const PROCEDURE_NAME = "spAdministrator_CreateTrip_GetOptions";

    const result = await db.executeProcedure(data, INPUTS, PROCEDURE_NAME);

    if (result.recordset.length > 0) {
      if (result.recordset[0].ErrorNumber) {
        const { ErrorNumber, ErrorMessage } = result.recordset[0];
        return NextResponse.json(
          {
            ok: false,
            number: ErrorNumber,
            message: ErrorMessage,
          },
          { status: 400 },
        );
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
        // await wait(2000);

        return NextResponse.json(
          {
            ok: true,
            data: {
              destination_city,
              bus,
              driver,
            },
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
