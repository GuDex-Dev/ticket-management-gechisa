// db.js
const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // Usa 'false' si estás trabajando con SQL Server en una máquina local sin cifrado
    trustServerCertificate: true, // Cambia esto a 'true' para evitar problemas de certificados en entornos de desarrollo
  },
};

let poolPromise;

async function getPool() {
  if (!poolPromise) {
    poolPromise = sql
      .connect(config)
      .then((pool) => {
        console.log("Connected to SQL Server");
        return pool;
      })
      .catch((err) => {
        console.error("Database connection failed: ", err);
        throw err;
      });
  }
  return poolPromise;
}

async function executeProcedure(data, inputs, procedureName) {
  const pool = await getPool();
  try {
    const request = pool.request();
    Object.keys(inputs).forEach((key) => {
      request.input(key, data[inputs[key]]);
    });
    const result = await request.execute(procedureName);
    return result;
  } catch (error) {
    console.error(`Error executing stored procedure: ${procedureName}`, error);
    throw error; // re-throw the error to be handled in the calling code
  }
}

module.exports = {
  sql,
  executeProcedure,
  poolPromise: getPool(),
};
