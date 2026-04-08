import { Pool } from "pg";
import "dotenv/config";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "expensetracker_db",
  password: process.env.PASSWORD,
  port: "5432",
});

function dbConnect() {
  pool.connect((err, client, release) => {
    if (err) {
      console.error("Error connecting to db: ", err);
    } else {
      console.log("Connected to PostgreSQL database");
      client;
      release();
    }
  });
}

export { dbConnect };
