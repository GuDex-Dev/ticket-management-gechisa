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
      ID_city: "ID_city",
    };

    const PROCEDURE_NAME = "spAdministrator_GetTrips";

    const result = await db.executeProcedure(data, INPUTS, PROCEDURE_NAME);

    if (result.recordsets.length > 0) {
      return NextResponse.json(
        {
          ok: true,
          data: result.recordsets,
        },
        { status: 200 },
      );
    } else {
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
