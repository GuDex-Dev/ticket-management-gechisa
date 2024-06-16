import { NextResponse } from "next/server";

const db = require("@/db");

export async function POST(req, res) {
  try {
    const data = await req.json();

    if (!data || typeof data !== "object") {
      return NextResponse.json(
        {
          ok: false,
          message: "Invalid data",
        },
        { status: 400 }
      );
    }

    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        data[key] = null;
      }
    });

    const INPUTS = {
      DNI_Person: "dni",
      first_name: "first_name",
      last_name: "last_name",
      email: "email",
      address: "address",
      phone: "phone",
      plain_password: "plain_password",
    };

    const PROCEDURE_NAME = "spClient_Register";

    const result = await db.executeProcedure(data, INPUTS, PROCEDURE_NAME);

    if (result.recordset.length > 0) {
      const statusCode = result.recordset[0].StatusCode;
      if (statusCode === 0) {
        return NextResponse.json(
          {
            ok: true,
            message: "Registro exitoso",
          },
          { status: 200 }
        );
      } else if (statusCode < 0) {
        let errorMessage = result.recordset[0].ErrorMessage;
        return NextResponse.json(
          {
            ok: false,
            message: errorMessage,
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        ok: false,
        message: "Unexpected error occurred",
      },
      { status: 500 }
    );
  } catch (error) {
    console.error(`Error executing ${PROCEDURE_NAME}:`, error);
    return NextResponse.json(
      {
        ok: false,
        message: "An error occurred during registration.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
