import { NextResponse } from "next/server";

const db = require("@/lib/db");

export async function GET(req, res) {
  try {
    const PROCEDURE_NAME = "spGerent_Show_Routes";

    const result = await db.executeProcedure(null, null, PROCEDURE_NAME);

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
