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
      ID_origin_city: "ID_origin_city",
      ID_destination_city: "ID_destination_city",
      date: "date",
    };

    const PROCEDURE_NAME = "spClient_GetTripsByRouteAndDate";

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
        return NextResponse.json(
          {
            ok: true,
            data: result.recordset,
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
