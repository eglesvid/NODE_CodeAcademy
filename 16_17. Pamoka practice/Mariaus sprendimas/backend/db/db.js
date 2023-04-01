import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.DATABASE_URL;

const client = new pg.Pool({
  connectionString,
});

export default client;
