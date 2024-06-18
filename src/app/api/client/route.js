const { NextResponse } = require("next/server");
const { poolPromise } = require("@/lib/db");

export async function GET(req, res) {
  const pool = await poolPromise;
  const request = pool.request();

  const result = await request.query("SELECT * FROM CLIENT");

  return NextResponse.json(result.recordset);
}
