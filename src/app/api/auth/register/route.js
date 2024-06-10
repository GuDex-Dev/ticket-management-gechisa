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
    DNI_Person: "dni",
    first_name: "first_name",
    last_name: "last_name",
    email: "email",
    address: "address",
    phone: "phone",
    plain_password: "plain_password",
  };

  const PROCEDURE_NAME = "spClient_Register";

  try {
    const result = await db.executeProcedure(data, INPUTS, PROCEDURE_NAME);

    if (result.recordset.length > 0) {
      const statusCode = result.recordset[0].StatusCode;
      if (statusCode === 0) {
        return NextResponse.json(result.recordset); // Registro exitoso
      } else if (statusCode < 0) {
        let errorMessage = `Error ${result.recordset[0].StatusCode}: ${result.recordset[0].ErrorMessage}`;
        return NextResponse.json({ error: errorMessage });
      }
    }
    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error("Error executing spClient_Register:", error);
    return NextResponse.json({
      error: "An error occurred during registration.",
    });
  }
}
