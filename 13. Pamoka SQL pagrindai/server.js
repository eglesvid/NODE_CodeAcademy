import pg from "pg";
import express from "express"; //kad jau susikursim viena endpoint'a, susiimportuojam ir expressa

const pool = pg.Pool; //is pg pasiimam Pool klase

const PORT = 3000;
const connectionString =
  "postgres://mmmrbhee:WKrHoj0FJwb5P2LXLI9sgv77ZJe8ebXa@trumpet.db.elephantsql.com/mmmrbhee";
//panaudojam url is ElephantSQL.

const PGpool = new pool({
  connectionString,
}); //Su pool pagalba sukuriam nauja pool'a. Dabar naudodami PGpool galesim daryti queries i db. Sita connectiona padarys kiekviena karta, kai mes prisijunginesim prie db, t. y. kai darysim query. Cia nera tas variantas, kad prisijunge ir viskas. Biski kitaip viskas veikia

const app = express();

app.get("/people", async (req, res) => {
  const people = await PGpool.query("select * from persons");
  //paprasciausias budas prasitestavimui is pradziu yra is pradziu pasirasyti query in dbeaver. Pasiziurim, ka grazina ir tada copy pastinam i node js serveri
  res.json(people.rows); //mums idomi dalis yra rows
});

//pats query skirsis pagal tai, ko mums reikes

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
