import pg from "pg";
import dotenv from "dotenv"; //kadangi is process norim url pasiimt, reik sito package
dotenv.config(); //padarom, kad veiktu sitam ir faile

//Pasiimam duomenu bazes url:
const connectionString = process.env.DATABASE_URL;

//Prisijungiam prie db. Galiu isivaizduot kaip kad mongoDB modeli (aisku, skiriasi, bet principas, kad su sito pool'o pagalba darom requestus i db)
const pool = new pg.Pool({
  connectionString,
});

export default pool;
