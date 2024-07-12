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
      ID_origin_city: "origin_city_id",
      ID_destination_city: "destination_city_id",
    };

    const PROCEDURE_NAME = "spAdministrator_CreateTrip_GetDefaultPrice";

    const result = await db.executeProcedure(data, INPUTS, PROCEDURE_NAME);

    if (result.recordset.length > 0) {
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
        const price = result.recordset[0].price;

        return NextResponse.json(
          {
            ok: true,
            data: {
              price,
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
