// db.js
const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false, // Usa 'false' si estás trabajando con SQL Server en una máquina local sin cifrado
    trustServerCertificate: true, // Cambia esto a 'true' para evitar problemas de certificados en entornos de desarrollo
  },
  connectionTimeout: 30000, // 30 segundos
  requestTimeout: 30000, // 30 segundos
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
        poolPromise = null; // Reset poolPromise in case of connection failure
        throw err;
      });
  }
  return poolPromise;
}

async function executeProcedure(data = null, inputs = null, procedureName) {
  const pool = await getPool();
  try {
    const request = pool.request();

    if (data !== null) {
      Object.keys(inputs).forEach((key) => {
        request.input(key, data[inputs[key]]);
      });
    }
    const result = await request.execute(procedureName);
    return result;
  } catch (error) {
    console.error(`Error executing stored procedure: ${procedureName}`, error);
    throw error; // re-throw the error to be handled in the calling code
  }
}

// Para verificar las variables de entorno (solo para desarrollo)
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_SERVER:", process.env.DB_SERVER);
console.log("DB_DATABASE:", process.env.DB_DATABASE);

module.exports = {
  sql,
  executeProcedure,
  getPool,
};
